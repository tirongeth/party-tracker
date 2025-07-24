// PARTY SYSTEM WITH ACTUAL FEATURES

import { database, auth } from '../config/firebase.js';
import { firebaseRef, firebaseSet, firebasePush, firebaseUpdate, firebaseGet, firebaseOnValue, firebaseServerTimestamp, firebaseRemove } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';

// Current party state
export let currentParty = null;
let partyListener = null;
let chatListener = null;

// Create party - SIMPLE
export async function createParty(name) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const partyRef = firebasePush(firebaseRef(database, 'parties'));
        
        const party = {
            id: partyRef.key,
            name: name,
            code: code,
            creatorId: user.uid,
            creatorName: user.displayName || user.email.split('@')[0],
            members: {
                [user.uid]: {
                    name: user.displayName || user.email.split('@')[0],
                    joinedAt: Date.now()
                }
            },
            createdAt: Date.now()
        };
        
        await firebaseSet(partyRef, party);
        
        // Join the party
        currentParty = party;
        localStorage.setItem('currentPartyId', party.id);
        
        // Start listening to party updates
        startPartyListeners(party.id);
        
        return { success: true, code: code };
    } catch (error) {
        console.error('Create party error:', error);
        return { success: false, error: error.message };
    }
}

// Join party - SIMPLE
export async function joinParty(code) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not logged in');
        
        // Find party by code
        const partiesSnapshot = await firebaseGet(firebaseRef(database, 'parties'));
        if (!partiesSnapshot.exists()) throw new Error('No parties found');
        
        let foundParty = null;
        let partyId = null;
        
        partiesSnapshot.forEach((child) => {
            const party = child.val();
            if (party.code === code.toUpperCase()) {
                foundParty = party;
                partyId = child.key;
            }
        });
        
        if (!foundParty) throw new Error('Invalid code');
        
        // Add user to party
        await firebaseUpdate(firebaseRef(database, `parties/${partyId}/members/${user.uid}`), {
            name: user.displayName || user.email.split('@')[0],
            joinedAt: Date.now()
        });
        
        // Set as current party
        foundParty.id = partyId;
        currentParty = foundParty;
        localStorage.setItem('currentPartyId', partyId);
        
        // Start listening to party updates
        startPartyListeners(partyId);
        
        return { success: true };
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
        await firebaseSet(
            firebaseRef(database, `parties/${currentParty.id}/members/${user.uid}`), 
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
        
        const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
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
    partyListener = firebaseOnValue(firebaseRef(database, `parties/${partyId}`), (snapshot) => {
        if (snapshot.exists()) {
            currentParty = { ...snapshot.val(), id: partyId };
            window.updatePartyDisplay && window.updatePartyDisplay();
        }
    });
    
    // Listen to chat
    chatListener = firebaseOnValue(firebaseRef(database, `parties/${partyId}/chat`), (snapshot) => {
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
        
        await firebasePush(firebaseRef(database, `parties/${currentParty.id}/chat`), {
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