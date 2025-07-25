// PARTY SYSTEM WITH ACTUAL FEATURES

import { database, auth, ref, set, push, update, get, onValue, serverTimestamp, remove } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';

// Current party state
export let currentParty = null;
let partyListener = null;
let chatListener = null;

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

// Load current party on startup
export async function loadCurrentParty() {
    try {
        const partyId = localStorage.getItem('currentPartyId');
        if (!partyId) return;
        
        const partySnapshot = await get(ref(database, `parties/${partyId}`));
        if (partySnapshot.exists()) {
            currentParty = { ...partySnapshot.val(), id: partyId };
        } else {
            localStorage.removeItem('currentPartyId');
        }
    } catch (error) {
        console.error('Load party error:', error);
    }
}

// Start party listeners
function startPartyListeners(partyId) {
    // Stop existing listeners
    stopPartyListeners();
    
    // Listen to party updates
    partyListener = onValue(ref(database, `parties/${partyId}`), (snapshot) => {
        if (snapshot.exists()) {
            currentParty = { ...snapshot.val(), id: partyId };
            window.updatePartyDisplay && window.updatePartyDisplay();
        }
    });
    
    // Listen to chat
    chatListener = onValue(ref(database, `parties/${partyId}/chat`), (snapshot) => {
        const messages = [];
        snapshot.forEach((child) => {
            messages.push({ id: child.key, ...child.val() });
        });
        window.updatePartyChat && window.updatePartyChat(messages);
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

// Get party leaderboard
export async function getPartyLeaderboard() {
    if (!currentParty) return [];
    
    const leaderboard = [];
    
    // Get BAC data for all party members
    for (const [userId, member] of Object.entries(currentParty.members || {})) {
        // Get user's latest BAC from their devices
        const devicesSnapshot = await get(ref(database, `users/${userId}/devices`));
        let highestBac = 0;
        
        if (devicesSnapshot.exists()) {
            const devices = devicesSnapshot.val();
            for (const deviceId of Object.keys(devices)) {
                const readingSnapshot = await get(ref(database, `readings/${deviceId}`));
                if (readingSnapshot.exists()) {
                    const reading = readingSnapshot.val();
                    if (reading.bac > highestBac) {
                        highestBac = reading.bac;
                    }
                }
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
    
    return leaderboard;
}

// Get nearby public parties
export async function getNearbyParties() {
    try {
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

export function updatePartyUI() {
    console.log('Updating party UI, current party:', currentParty);
    
    // Get all party-related elements
    const currentPartySection = document.getElementById('currentPartySection');
    const dashboardPartyInfo = document.getElementById('dashboardPartyInfo');
    
    if (!currentParty) {
        // Hide party sections when not in a party
        if (currentPartySection) currentPartySection.style.display = 'none';
        if (dashboardPartyInfo) dashboardPartyInfo.style.display = 'none';
        return;
    }
    
    // Show current party section
    if (currentPartySection) {
        currentPartySection.style.display = 'block';
        
        // Update party name and code
        const nameEl = document.getElementById('currentPartyName');
        const codeEl = document.getElementById('currentPartyCode');
        if (nameEl) nameEl.textContent = currentParty.name;
        if (codeEl) codeEl.textContent = currentParty.code;
        
        // Update members list
        const membersEl = document.getElementById('partyMembersList');
        if (membersEl && currentParty.members) {
            const membersList = Object.entries(currentParty.members).map(([uid, member]) => `
                <div class="friend-item" style="margin-bottom: 10px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">${member.role === 'creator' ? '👑' : '🎉'}</div>
                        <div class="friend-details">
                            <h4>${member.name}</h4>
                            <p style="opacity: 0.7;">Joined ${new Date(member.joinedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            `).join('');
            membersEl.innerHTML = membersList;
        }
        
        // Update party stats
        const statsEl = document.getElementById('partyStats');
        if (statsEl && currentParty.stats) {
            statsEl.innerHTML = `
                <div class="stat-card">
                    <div class="stat-icon">🍺</div>
                    <div class="stat-value">${currentParty.stats.totalDrinks || 0}</div>
                    <div class="stat-label">Total Drinks</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${(currentParty.stats.avgBac || 0).toFixed(2)}‰</div>
                    <div class="stat-label">Avg BAC</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⚡</div>
                    <div class="stat-value">${(currentParty.stats.peakBac || 0).toFixed(2)}‰</div>
                    <div class="stat-label">Peak BAC</div>
                </div>
            `;
        }
    }
    
    // Update dashboard party info
    if (dashboardPartyInfo) {
        dashboardPartyInfo.style.display = 'block';
        const dashName = document.getElementById('dashboardPartyName');
        const dashCode = document.getElementById('dashboardPartyCode');
        if (dashName) dashName.textContent = currentParty.name;
        if (dashCode) dashCode.textContent = currentParty.code;
    }
}