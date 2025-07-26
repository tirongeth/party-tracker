// PARTY SYSTEM WITH ACTUAL FEATURES

import { database, auth, ref, set, push, update, get, onValue, serverTimestamp, remove } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';
import { partyCache, leaderboardCache, batchReadingsCache, CACHE_TTL, createCacheKey } from '../utils/cache.js';

// Current party state
export let currentParty = null;
let partyListener = null;
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
        
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const partyRef = push(ref(database, 'parties'));
        
        const party = {
            id: partyRef.key,
            name: name,
            code: code,
            creatorId: user.uid,
            creatorName: user.displayName || user.email.split('@')[0],
            privacy: options.privacy || 'private', // private, friends-only, public
            duration: options.duration || '24h', // 24h or ongoing
            address: options.address || '',
            maxMembers: options.maxMembers || 50,
            description: options.description || '',
            members: {
                [user.uid]: {
                    name: user.displayName || user.email.split('@')[0],
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
        
        // Join the party
        currentParty = party;
        localStorage.setItem('currentPartyId', party.id);
        
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
        
        // Check if already a member
        if (foundParty.members && foundParty.members[user.uid]) {
            // Already in party, just set as current
            currentParty = foundParty;
            localStorage.setItem('currentPartyId', foundParty.id);
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
        
        // Handle different privacy levels
        if (foundParty.privacy === 'public' || autoJoin) {
            // Direct join for public parties
            await update(ref(database, `parties/${foundParty.id}/members/${user.uid}`), {
                name: user.displayName || user.email.split('@')[0],
                joinedAt: Date.now(),
                role: 'member'
            });
            
            // Set as current party
            currentParty = foundParty;
            localStorage.setItem('currentPartyId', foundParty.id);
            
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
                name: user.displayName || user.email.split('@')[0],
                joinedAt: Date.now(),
                role: 'friend'
            });
            
            currentParty = foundParty;
            localStorage.setItem('currentPartyId', foundParty.id);
            startPartyListeners(foundParty.id);
            
            return { success: true };
            
        } else {
            // Private party - request to join
            await update(ref(database, `parties/${foundParty.id}/pendingRequests/${user.uid}`), {
                name: user.displayName || user.email.split('@')[0],
                requestedAt: Date.now()
            });
            
            return { success: true, pending: true, party: foundParty };
        }
        
    } catch (error) {
        console.error('Join party error:', error);
        return { success: false, error: error.message };
    }
}

// Leave party - SIMPLE
export async function leaveParty() {
    try {
        if (!currentParty) return { success: true };
        
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        // Remove from party
        await set(
            ref(database, `parties/${currentParty.id}/members/${user.uid}`), 
            null
        );
        
        currentParty = null;
        localStorage.removeItem('currentPartyId');
        
        // Stop listeners
        stopPartyListeners();
        
        return { success: true };
    } catch (error) {
        console.error('Leave party error:', error);
        return { success: false, error: error.message };
    }
}

// Delete party (creator only)
export async function deleteParty() {
    try {
        if (!auth.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }
        
        if (!currentParty) {
            return { success: false, error: 'Not in a party' };
        }
        
        const user = auth.currentUser;
        
        // Check if user is the creator
        if (currentParty.creatorId !== user.uid) {
            return { success: false, error: 'Only the party creator can delete the party' };
        }
        
        // Delete the entire party from Firebase
        await remove(ref(database, `parties/${currentParty.id}`));
        
        // Clear local state
        currentParty = null;
        localStorage.removeItem('currentPartyId');
        
        // Stop listeners
        stopPartyListeners();
        
        return { success: true };
    } catch (error) {
        console.error('Delete party error:', error);
        return { success: false, error: error.message };
    }
}

// Load current party on startup
export async function loadCurrentParty() {
    try {
        const partyId = localStorage.getItem('currentPartyId');
        if (!partyId) return;
        
        const user = auth.currentUser;
        if (!user) {
            console.log('No authenticated user, clearing party state');
            localStorage.removeItem('currentPartyId');
            return;
        }
        
        const partySnapshot = await get(ref(database, `parties/${partyId}`));
        if (partySnapshot.exists()) {
            const partyData = partySnapshot.val();
            
            // Validate membership
            if (!partyData.members || !partyData.members[user.uid]) {
                console.log('User not a member of stored party');
                localStorage.removeItem('currentPartyId');
                return;
            }
            
            // Check expiration
            if (partyData.expiresAt && Date.now() > partyData.expiresAt) {
                console.log('Stored party has expired');
                localStorage.removeItem('currentPartyId');
                return;
            }
            
            // Set current party and start listeners
            currentParty = { ...partyData, id: partyId };
            startPartyListeners(partyId);
        } else {
            console.log('Stored party no longer exists');
            localStorage.removeItem('currentPartyId');
        }
    } catch (error) {
        console.error('Load party error:', error);
        localStorage.removeItem('currentPartyId');
    }
}

// Start party listeners
function startPartyListeners(partyId) {
    // Stop existing listeners
    stopPartyListeners();
    
    // Listen to party updates
    partyListener = onValue(ref(database, `parties/${partyId}`), (snapshot) => {
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
                handlePartyRemoved();
                return;
            }
            
            // Check if party has expired
            if (partyData.expiresAt && Date.now() > partyData.expiresAt) {
                console.log('Party has expired');
                handlePartyRemoved();
                return;
            }
            
            // Update state with validated data
            currentParty = { ...partyData, id: partyId };
            
            // Ensure localStorage is in sync
            localStorage.setItem('currentPartyId', partyId);
            
            // Update UI
            if (typeof window !== 'undefined' && window.updatePartyDisplay) {
                window.updatePartyDisplay();
            }
        } else {
            // Party was deleted or doesn't exist
            console.log('Party no longer exists in Firebase');
            handlePartyRemoved();
        }
    });
    
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

// Stop party listeners
function stopPartyListeners() {
    if (partyListener) {
        partyListener();
        partyListener = null;
    }
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
}

// Handle party removal (deleted, expired, or kicked out)
function handlePartyRemoved() {
    // Clear state
    currentParty = null;
    localStorage.removeItem('currentPartyId');
    
    // Stop listeners
    stopPartyListeners();
    
    // Update UI
    if (typeof window !== 'undefined' && window.updatePartyDisplay) {
        window.updatePartyDisplay();
    }
    
    // Show notification
    if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('You have left the party', 'info');
    }
}

// Send party message
export async function sendPartyMessage(message) {
    try {
        if (!currentParty || !message.trim()) return { success: false };
        
        const user = auth.currentUser;
        if (!user) return { success: false };
        
        await push(ref(database, `parties/${currentParty.id}/chat`), {
            userId: user.uid,
            userName: user.displayName || user.email.split('@')[0],
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