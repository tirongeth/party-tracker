// PARTY SYSTEM WITH ACTUAL FEATURES

import { database, auth, ref, set, push, update, get, onValue, serverTimestamp, remove } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';
import { partyCache, leaderboardCache, batchReadingsCache, CACHE_TTL, createCacheKey } from '../utils/cache.js';
import { getAppState } from '../config/app-state.js';
import { isDeveloper, DEV_PERMISSIONS } from '../config/constants.js';

// Party state - support multiple parties
export let currentParty = null;  // Currently viewing party
export let userParties = [];     // All parties user is member of
let partyListeners = new Map();  // Map of partyId -> listener
let chatListener = null;

// Chat optimization
const CHAT_PAGE_SIZE = 50;
const CHAT_BUFFER_SIZE = 100;
let chatMessages = [];
let oldestChatKey = null;

// Create party - ENHANCED
export async function createParty(name, options = {}) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        // Get username from app state
        const userData = getAppState().userData;
        const userName = userData.username || user.email.split('@')[0];
        
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const partyRef = push(ref(database, 'parties'));
        
        const party = {
            id: partyRef.key,
            name: name,
            code: code,
            creatorId: user.uid,
            creatorName: userName,
            privacy: options.privacy || 'private', // private, friends-only, public
            duration: options.duration || '24h', // 24h or ongoing
            address: options.address || '',
            maxMembers: options.maxMembers || 50,
            description: options.description || '',
            members: {
                [user.uid]: {
                    name: userName,
                    joinedAt: Date.now(),
                    role: 'creator'
                }
            },
            pendingRequests: {}, // For private parties
            stats: {
                totalDrinks: 0,
                avgBac: 0,
                peakBac: 0,
                safetyScore: 100
            },
            createdAt: Date.now(),
            expiresAt: options.duration === '24h' ? Date.now() + (24 * 60 * 60 * 1000) : null
        };
        
        await set(partyRef, party);
        
        // Add to user's parties list
        addToUserParties(party);
        
        // Set as current party
        currentParty = party;
        saveUserParties();
        
        // Start listening to party updates
        startPartyListeners(party.id);
        
        return { success: true, code: code, party: party };
    } catch (error) {
        console.error('Create party error:', error);
        return { success: false, error: error.message };
    }
}

// Get party info by code (for preview before joining)
export async function getPartyByCode(code) {
    try {
        const partiesSnapshot = await get(ref(database, 'parties'));
        if (!partiesSnapshot.exists()) return null;
        
        let foundParty = null;
        partiesSnapshot.forEach((child) => {
            const party = child.val();
            if (party.code === code.toUpperCase()) {
                foundParty = { ...party, id: child.key };
            }
        });
        
        return foundParty;
    } catch (error) {
        console.error('Get party error:', error);
        return null;
    }
}

// Join party - ENHANCED with privacy handling
export async function joinParty(code, autoJoin = false) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        // Find party by code
        const foundParty = await getPartyByCode(code);
        if (!foundParty) throw new Error('Invalid code');
        
        // Check if user is banned (unless developer)
        const isBanned = await isUserBanned(foundParty.id, user.uid);
        if (isBanned && !isDeveloper(user.uid)) {
            throw new Error('You have been banned from this party');
        }
        
        // Check if party is locked (unless developer)
        if (foundParty.locked && !autoJoin && !isDeveloper(user.uid)) {
            throw new Error('This party is locked. No new members allowed.');
        }
        
        // Check if already a member
        if (foundParty.members && foundParty.members[user.uid]) {
            // Already in party, just switch to it
            addToUserParties(foundParty);
            currentParty = foundParty;
            saveUserParties();
            startPartyListeners(foundParty.id);
            return { success: true, alreadyMember: true };
        }
        
        // Check party capacity
        const memberCount = Object.keys(foundParty.members || {}).length;
        if (memberCount >= (foundParty.maxMembers || 50)) {
            throw new Error('Party is full');
        }
        
        // Check expiration
        if (foundParty.expiresAt && Date.now() > foundParty.expiresAt) {
            throw new Error('Party has expired');
        }
        
        // Get username from app state
        const userData = getAppState().userData;
        const userName = userData.username || user.email.split('@')[0];
        
        // Handle different privacy levels
        if (foundParty.privacy === 'public' || autoJoin) {
            // Direct join for public parties
            await update(ref(database, `parties/${foundParty.id}/members/${user.uid}`), {
                name: userName,
                joinedAt: Date.now(),
                role: 'member'
            });
            
            // Add to user's parties
            addToUserParties(foundParty);
            currentParty = foundParty;
            saveUserParties();
            
            // Start listening to party updates
            startPartyListeners(foundParty.id);
            
            return { success: true };
            
        } else if (foundParty.privacy === 'friends-only') {
            // Check if creator is a friend
            const friendsSnapshot = await get(ref(database, `users/${user.uid}/friends/${foundParty.creatorId}`));
            if (!friendsSnapshot.exists()) {
                throw new Error('This party is for friends only');
            }
            
            // Join as friend
            await update(ref(database, `parties/${foundParty.id}/members/${user.uid}`), {
                name: userName,
                joinedAt: Date.now(),
                role: 'friend'
            });
            
            addToUserParties(foundParty);
            currentParty = foundParty;
            saveUserParties();
            startPartyListeners(foundParty.id);
            
            return { success: true };
            
        } else {
            // Private party - request to join
            await update(ref(database, `parties/${foundParty.id}/pendingRequests/${user.uid}`), {
                name: userName,
                requestedAt: Date.now()
            });
            
            return { success: true, pending: true, party: foundParty };
        }
        
    } catch (error) {
        console.error('Join party error:', error);
        return { success: false, error: error.message };
    }
}

// Leave party - ENHANCED with creator check
export async function leaveParty(partyId = null) {
    try {
        const targetParty = partyId ? userParties.find(p => p.id === partyId) : currentParty;
        if (!targetParty) return { success: true };
        
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        // Check if user is the creator
        if (targetParty.creatorId === user.uid) {
            // Creator leaving should delete the party
            return await deleteParty(targetParty.id);
        }
        
        // Regular member leaving
        await set(
            ref(database, `parties/${targetParty.id}/members/${user.uid}`), 
            null
        );
        
        // Remove from user's parties list
        removeFromUserParties(targetParty.id);
        
        // If it was the current party, switch to another or null
        if (currentParty && currentParty.id === targetParty.id) {
            currentParty = userParties.length > 0 ? userParties[0] : null;
        }
        
        saveUserParties();
        
        // Stop listeners for this party
        stopPartyListener(targetParty.id);
        
        return { success: true };
    } catch (error) {
        console.error('Leave party error:', error);
        return { success: false, error: error.message };
    }
}

// Delete party (creator only or developer)
export async function deleteParty(partyId = null) {
    try {
        if (!auth.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }
        
        const targetParty = partyId ? userParties.find(p => p.id === partyId) : currentParty;
        
        // If developer is trying to delete any party by ID
        if (partyId && !targetParty && isDeveloper(auth.currentUser.uid)) {
            // Delete directly without checks
            await remove(ref(database, `parties/${partyId}`));
            return { success: true };
        }
        
        if (!targetParty) {
            return { success: false, error: 'Party not found' };
        }
        
        const user = auth.currentUser;
        
        // Check if user is the creator or developer
        if (targetParty.creatorId !== user.uid && !isDeveloper(user.uid)) {
            return { success: false, error: 'Only the party creator can delete the party' };
        }
        
        // Delete the entire party from Firebase
        await remove(ref(database, `parties/${targetParty.id}`));
        
        // Remove from user's parties list
        removeFromUserParties(targetParty.id);
        
        // If it was the current party, switch to another or null
        if (currentParty && currentParty.id === targetParty.id) {
            currentParty = userParties.length > 0 ? userParties[0] : null;
        }
        
        saveUserParties();
        
        // Stop listeners
        stopPartyListener(targetParty.id);
        
        return { success: true };
    } catch (error) {
        console.error('Delete party error:', error);
        return { success: false, error: error.message };
    }
}

// Load user's parties on startup
export async function loadUserParties() {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.log('No authenticated user');
            return;
        }
        
        // Load saved party IDs
        const savedParties = JSON.parse(localStorage.getItem('userParties') || '[]');
        const currentPartyId = localStorage.getItem('currentPartyId');
        
        // Clear arrays
        userParties = [];
        currentParty = null;
        
        // Check each saved party
        for (const partyId of savedParties) {
            const partySnapshot = await get(ref(database, `parties/${partyId}`));
            if (partySnapshot.exists()) {
                const partyData = { ...partySnapshot.val(), id: partyId };
                
                // Validate membership
                if (partyData.members && partyData.members[user.uid]) {
                    // Check expiration
                    if (!partyData.expiresAt || Date.now() <= partyData.expiresAt) {
                        userParties.push(partyData);
                        startPartyListeners(partyId);
                        
                        // Set current party if it matches
                        if (partyId === currentPartyId) {
                            currentParty = partyData;
                        }
                    }
                }
            }
        }
        
        // If no current party but user has parties, set the first one
        if (!currentParty && userParties.length > 0) {
            currentParty = userParties[0];
        }
        
        // Save cleaned up list
        saveUserParties();
        
        // Update UI
        if (typeof window !== 'undefined' && window.updatePartyDisplay) {
            window.updatePartyDisplay();
        }
    } catch (error) {
        console.error('Load parties error:', error);
    }
}

// Start party listeners
function startPartyListeners(partyId) {
    // Don't create duplicate listeners
    if (partyListeners.has(partyId)) return;
    
    // Listen to party updates
    const partyListener = onValue(ref(database, `parties/${partyId}`), (snapshot) => {
        if (snapshot.exists()) {
            const partyData = snapshot.val();
            const user = auth.currentUser;
            
            // Validate party state
            if (!partyData || !user) {
                handlePartyRemoved();
                return;
            }
            
            // Check if user is still a member
            if (!partyData.members || !partyData.members[user.uid]) {
                console.log('User no longer a member of party');
                handlePartyRemoved(partyId);
                return;
            }
            
            // Check if party has expired
            if (partyData.expiresAt && Date.now() > partyData.expiresAt) {
                console.log('Party has expired');
                handlePartyRemoved(partyId);
                return;
            }
            
            // Update party data in our list
            const updatedParty = { ...partyData, id: partyId };
            addToUserParties(updatedParty);
            
            // Update current party if it's the one being viewed
            if (currentParty && currentParty.id === partyId) {
                currentParty = updatedParty;
            }
            
            // Save state
            saveUserParties();
            
            // Update UI
            if (typeof window !== 'undefined' && window.updatePartyDisplay) {
                window.updatePartyDisplay();
            }
        } else {
            // Party was deleted or doesn't exist
            console.log('Party no longer exists in Firebase');
            handlePartyRemoved(partyId);
        }
    });
    
    // Store the listener
    partyListeners.set(partyId, partyListener);
    
    // Listen to chat with pagination
    const chatRef = ref(database, `parties/${partyId}/chat`);
    
    // Initial load - get last CHAT_PAGE_SIZE messages
    get(chatRef).then((snapshot) => {
        chatMessages = [];
        const allMessages = [];
        
        snapshot.forEach((child) => {
            allMessages.push({ id: child.key, ...child.val() });
        });
        
        // Get the last CHAT_PAGE_SIZE messages
        chatMessages = allMessages.slice(-CHAT_PAGE_SIZE);
        if (allMessages.length > 0) {
            oldestChatKey = allMessages[0].id;
        }
        
        // Update UI with initial messages
        window.updatePartyChat && window.updatePartyChat(chatMessages);
    });
    
    // Listen only to new messages (not the entire chat)
    chatListener = onValue(chatRef, (snapshot) => {
        if (!snapshot.exists()) return;
        
        const newMessages = [];
        let hasNewMessages = false;
        
        snapshot.forEach((child) => {
            const message = { id: child.key, ...child.val() };
            
            // Check if this is a new message (not in our current list)
            const existingIndex = chatMessages.findIndex(m => m.id === message.id);
            if (existingIndex === -1) {
                newMessages.push(message);
                hasNewMessages = true;
            }
        });
        
        if (hasNewMessages) {
            // Add new messages and maintain buffer size
            chatMessages = [...chatMessages, ...newMessages].slice(-CHAT_BUFFER_SIZE);
            
            // Update UI with optimized message list
            window.updatePartyChat && window.updatePartyChat(chatMessages.slice(-CHAT_PAGE_SIZE));
        }
    });
}

// Stop all party listeners
function stopAllPartyListeners() {
    partyListeners.forEach((listener, partyId) => {
        listener();
    });
    partyListeners.clear();
    
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
}

// Stop specific party listener
function stopPartyListener(partyId) {
    const listener = partyListeners.get(partyId);
    if (listener) {
        listener();
        partyListeners.delete(partyId);
    }
}

// Handle party removal (deleted, expired, or kicked out)
function handlePartyRemoved(partyId) {
    if (!partyId) return;
    
    // Remove from user's parties
    removeFromUserParties(partyId);
    
    // If it was the current party, switch to another
    if (currentParty && currentParty.id === partyId) {
        currentParty = userParties.length > 0 ? userParties[0] : null;
    }
    
    saveUserParties();
    
    // Stop listeners for this party
    stopPartyListener(partyId);
    
    // Update UI with a small delay to ensure state is settled
    setTimeout(() => {
        if (typeof window !== 'undefined' && window.updatePartyDisplay) {
            window.updatePartyDisplay();
        }
    }, 100);
    
    // Show notification
    if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('You have left the party', 'info');
    }
}

// Helper functions for multi-party support
function addToUserParties(party) {
    // Remove if already exists (to update data)
    userParties = userParties.filter(p => p.id !== party.id);
    // Add to list
    userParties.push(party);
}

function removeFromUserParties(partyId) {
    userParties = userParties.filter(p => p.id !== partyId);
}

function saveUserParties() {
    const partyIds = userParties.map(p => p.id);
    localStorage.setItem('userParties', JSON.stringify(partyIds));
    if (currentParty) {
        localStorage.setItem('currentPartyId', currentParty.id);
    } else {
        localStorage.removeItem('currentPartyId');
    }
}

// Switch to a different party
export function switchToParty(partyId) {
    const party = userParties.find(p => p.id === partyId);
    if (party) {
        currentParty = party;
        saveUserParties();
        
        // Update UI
        if (typeof window !== 'undefined' && window.updatePartyDisplay) {
            window.updatePartyDisplay();
        }
        
        return true;
    }
    return false;
}

// Send party message
export async function sendPartyMessage(message) {
    try {
        if (!currentParty || !message.trim()) return { success: false };
        
        const user = auth.currentUser;
        if (!user) return { success: false };
        
        // Get username from app state
        const userData = getAppState().userData;
        const userName = userData.username || user.email.split('@')[0];
        
        await push(ref(database, `parties/${currentParty.id}/chat`), {
            userId: user.uid,
            userName: userName,
            message: message.trim(),
            timestamp: Date.now()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Send message error:', error);
        return { success: false };
    }
}

// Get party stats
export function getPartyStats() {
    if (!currentParty) return null;
    
    const memberCount = Object.keys(currentParty.members || {}).length;
    const duration = Date.now() - currentParty.createdAt;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        memberCount,
        duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        code: currentParty.code
    };
}

// Approve or decline join request (for party creator)
export async function handleJoinRequest(userId, approve) {
    try {
        if (!currentParty || currentParty.creatorId !== auth.currentUser.uid) {
            throw new Error('Only party creator can manage requests');
        }
        
        const requestRef = ref(database, `parties/${currentParty.id}/pendingRequests/${userId}`);
        const requestSnapshot = await get(requestRef);
        
        if (!requestSnapshot.exists()) {
            throw new Error('Request not found');
        }
        
        const request = requestSnapshot.val();
        
        if (approve) {
            // Add to members
            await update(ref(database, `parties/${currentParty.id}/members/${userId}`), {
                name: request.name,
                joinedAt: Date.now(),
                role: 'member'
            });
        }
        
        // Remove from pending
        await remove(requestRef);
        
        return { success: true };
    } catch (error) {
        console.error('Handle join request error:', error);
        return { success: false, error: error.message };
    }
}

// Get party leaderboard with caching
export async function getPartyLeaderboard() {
    if (!currentParty) return [];
    
    // Check cache first
    const cacheKey = createCacheKey('leaderboard', currentParty.id);
    const cached = leaderboardCache.get(cacheKey);
    if (cached) {
        return cached;
    }
    
    const leaderboard = [];
    const memberIds = Object.keys(currentParty.members || {});
    
    // Batch fetch all user devices and readings in parallel
    const devicePromises = memberIds.map(userId => 
        get(ref(database, `users/${userId}/devices`))
    );
    
    const devicesResults = await Promise.all(devicePromises);
    
    // Collect all device IDs that need reading
    const allDeviceIds = [];
    const userDeviceMap = new Map();
    
    devicesResults.forEach((snapshot, index) => {
        const userId = memberIds[index];
        if (snapshot.exists()) {
            const deviceIds = Object.keys(snapshot.val());
            userDeviceMap.set(userId, deviceIds);
            allDeviceIds.push(...deviceIds);
        } else {
            userDeviceMap.set(userId, []);
        }
    });
    
    // Check cache for device readings
    const cachedReadings = batchReadingsCache.getMany(allDeviceIds);
    const uncachedDeviceIds = allDeviceIds.filter(id => !cachedReadings.has(id));
    
    // Batch fetch only uncached readings
    const readingPromises = uncachedDeviceIds.map(deviceId => 
        get(ref(database, `readings/${deviceId}`))
    );
    
    const readingsResults = await Promise.all(readingPromises);
    
    // Create a map of device readings (combining cached and fresh data)
    const deviceReadings = new Map(cachedReadings);
    
    uncachedDeviceIds.forEach((deviceId, index) => {
        const snapshot = readingsResults[index];
        if (snapshot.exists()) {
            const bac = snapshot.val().bac || 0;
            deviceReadings.set(deviceId, bac);
            // Cache the fresh reading
            batchReadingsCache.set(deviceId, bac, CACHE_TTL.DEVICE_READINGS);
        }
    });
    
    // Build leaderboard with fetched data
    for (const [userId, member] of Object.entries(currentParty.members || {})) {
        let highestBac = 0;
        const userDevices = userDeviceMap.get(userId) || [];
        
        for (const deviceId of userDevices) {
            const bac = deviceReadings.get(deviceId) || 0;
            if (bac > highestBac) {
                highestBac = bac;
            }
        }
        
        leaderboard.push({
            userId,
            name: member.name,
            bac: highestBac,
            joinedAt: member.joinedAt,
            role: member.role || 'member'
        });
    }
    
    // Sort by BAC descending
    leaderboard.sort((a, b) => b.bac - a.bac);
    
    // Cache the result
    leaderboardCache.set(cacheKey, leaderboard, CACHE_TTL.LEADERBOARD);
    
    return leaderboard;
}

// Get friends' parties
export async function getFriendsParties() {
    try {
        if (!auth.currentUser) return [];
        
        const user = auth.currentUser;
        
        // Get user's friends list
        const friendsSnapshot = await get(ref(database, `users/${user.uid}/friends`));
        const friends = friendsSnapshot.val() || {};
        const friendIds = Object.keys(friends);
        
        if (friendIds.length === 0) return [];
        
        // Get all parties
        const partiesSnapshot = await get(ref(database, 'parties'));
        const parties = partiesSnapshot.val() || {};
        
        const friendsParties = [];
        const now = Date.now();
        
        // Filter for friends-only parties created by friends
        Object.entries(parties).forEach(([id, party]) => {
            // Check if party is friends-only and not expired
            if (party.privacy === 'friends-only' && 
                (!party.expiresAt || party.expiresAt > now) &&
                friendIds.includes(party.creatorId)) {
                
                const memberCount = Object.keys(party.members || {}).length;
                friendsParties.push({
                    ...party,
                    id,
                    memberCount,
                    code: party.code,
                    creatorName: friends[party.creatorId]?.name || 'Friend'
                });
            }
        });
        
        // Sort by member count (popularity)
        return friendsParties.sort((a, b) => b.memberCount - a.memberCount);
    } catch (error) {
        console.error('Error getting friends parties:', error);
        return [];
    }
}

// Get nearby public parties
export async function getNearbyParties() {
    try {
        // Check cache first
        const cacheKey = 'public:parties';
        const cached = partyCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        
        const partiesSnapshot = await get(ref(database, 'parties'));
        if (!partiesSnapshot.exists()) return [];
        
        const publicParties = [];
        const now = Date.now();
        
        partiesSnapshot.forEach((child) => {
            const party = child.val();
            
            // Only show public, non-expired parties
            if (party.privacy === 'public' && (!party.expiresAt || party.expiresAt > now)) {
                publicParties.push({
                    ...party,
                    id: child.key,
                    memberCount: Object.keys(party.members || {}).length
                });
            }
        });
        
        // Sort by member count (popularity)
        publicParties.sort((a, b) => b.memberCount - a.memberCount);
        
        // Cache the result
        partyCache.set(cacheKey, publicParties, CACHE_TTL.PUBLIC_PARTIES);
        
        return publicParties;
    } catch (error) {
        console.error('Get nearby parties error:', error);
        return [];
    }
}

// Kick member from party (creator only)
export async function kickMember(memberId, reason = '') {
    try {
        if (!currentParty || !auth.currentUser) {
            return { success: false, error: 'Not in a party or not authenticated' };
        }
        
        // Only creator or developer can kick
        if (currentParty.creatorId !== auth.currentUser.uid && !isDeveloper(auth.currentUser.uid)) {
            return { success: false, error: 'Only the party creator can kick members' };
        }
        
        // Can't kick yourself
        if (memberId === auth.currentUser.uid) {
            return { success: false, error: 'Cannot kick yourself. Use delete party instead.' };
        }
        
        // Check if member exists
        if (!currentParty.members || !currentParty.members[memberId]) {
            return { success: false, error: 'Member not found in party' };
        }
        
        // Log the kick action (for potential moderation history)
        await push(ref(database, `parties/${currentParty.id}/moderation`), {
            action: 'kick',
            targetId: memberId,
            targetName: currentParty.members[memberId].name,
            moderatorId: auth.currentUser.uid,
            reason: reason,
            timestamp: Date.now()
        });
        
        // Remove member
        await remove(ref(database, `parties/${currentParty.id}/members/${memberId}`));
        
        // Add to banned list to prevent immediate rejoin
        await set(ref(database, `parties/${currentParty.id}/banned/${memberId}`), {
            bannedAt: Date.now(),
            bannedBy: auth.currentUser.uid,
            reason: reason
        });
        
        return { success: true };
    } catch (error) {
        console.error('Kick member error:', error);
        return { success: false, error: error.message };
    }
}

// Update party settings (creator only)
export async function updatePartySettings(settings) {
    try {
        if (!currentParty || !auth.currentUser) {
            return { success: false, error: 'Not in a party or not authenticated' };
        }
        
        // Only creator or developer can update settings
        if (currentParty.creatorId !== auth.currentUser.uid && !isDeveloper(auth.currentUser.uid)) {
            return { success: false, error: 'Only the party creator can update settings' };
        }
        
        // Validate settings
        const allowedSettings = ['name', 'privacy', 'maxMembers', 'description', 'address', 'locked'];
        const updates = {};
        
        for (const [key, value] of Object.entries(settings)) {
            if (allowedSettings.includes(key)) {
                updates[key] = value;
            }
        }
        
        if (Object.keys(updates).length === 0) {
            return { success: false, error: 'No valid settings provided' };
        }
        
        // Update Firebase
        await update(ref(database, `parties/${currentParty.id}`), updates);
        
        return { success: true };
    } catch (error) {
        console.error('Update party settings error:', error);
        return { success: false, error: error.message };
    }
}

// Lock/unlock party (creator only)
export async function togglePartyLock(locked) {
    try {
        if (!currentParty || !auth.currentUser) {
            return { success: false, error: 'Not in a party or not authenticated' };
        }
        
        // Only creator can lock/unlock
        if (currentParty.creatorId !== auth.currentUser.uid) {
            return { success: false, error: 'Only the party creator can lock/unlock the party' };
        }
        
        await update(ref(database, `parties/${currentParty.id}`), {
            locked: locked,
            lockedAt: locked ? Date.now() : null
        });
        
        return { success: true, locked: locked };
    } catch (error) {
        console.error('Toggle party lock error:', error);
        return { success: false, error: error.message };
    }
}


// Check if user is banned from party
export async function isUserBanned(partyId, userId) {
    try {
        const bannedSnapshot = await get(ref(database, `parties/${partyId}/banned/${userId}`));
        return bannedSnapshot.exists();
    } catch (error) {
        console.error('Check ban status error:', error);
        return false;
    }
}

// Update party UI - called when party state changes
export function getCurrentPartyId() {
    return currentParty?.id || null;
}

export async function quickAddFriend(friendId) {
    // Placeholder for friend functionality
    showNotification('Friend system coming soon!', 'info');
    return { success: false };
}

// Note: UI updates are handled by updatePartyDisplay() in main.js
// This avoids circular dependencies and keeps UI logic centralized