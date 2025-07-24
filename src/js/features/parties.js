import { database, auth } from '../config/firebase.js';
import { firebaseRef, firebaseOnValue, firebaseSet, firebasePush, firebaseServerTimestamp, firebaseUpdate, firebaseGet, firebaseRemove } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';
import { formatTimestamp } from '../utils/helpers.js';

// Party privacy levels
export const PARTY_PRIVACY = {
    PRIVATE: 'private',
    FRIENDS_ONLY: 'friends_only',
    PUBLIC: 'public'
};

// Party state management
let currentPartyId = null;
let partyListeners = [];

// Generate a unique party code
function generatePartyCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Create a new party
export async function createParty(partyData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            showNotification('You must be logged in to create a party', 'error');
            return;
        }

        const partyCode = generatePartyCode();
        const partyRef = firebasePush(firebaseRef(database, 'parties'));
        const partyId = partyRef.key;

        const party = {
            id: partyId,
            name: partyData.name || 'Unnamed Party',
            description: partyData.description || '',
            address: partyData.address || '',
            privacy: partyData.privacy || PARTY_PRIVACY.PRIVATE,
            code: partyCode,
            creatorId: user.uid,
            creatorName: user.displayName || user.email.split('@')[0],
            createdAt: firebaseServerTimestamp(),
            members: {
                [user.uid]: {
                    name: user.displayName || user.email.split('@')[0],
                    joinedAt: firebaseServerTimestamp(),
                    role: 'creator'
                }
            },
            memberCount: 1,
            pendingRequests: {},
            active: true
        };

        await firebaseSet(partyRef, party);

        // Add party to user's party list
        await firebaseUpdate(firebaseRef(database, `users/${user.uid}/parties`), {
            [partyId]: {
                role: 'creator',
                joinedAt: firebaseServerTimestamp()
            }
        });

        showNotification(`Party created! Share code: ${partyCode}`, 'success');
        return { partyId, partyCode };
    } catch (error) {
        console.error('Error creating party:', error);
        showNotification('Failed to create party', 'error');
    }
}

// Join a party
export async function joinParty(partyCode) {
    try {
        const user = auth.currentUser;
        if (!user) {
            showNotification('You must be logged in to join a party', 'error');
            return;
        }

        // Find party by code
        const partiesSnapshot = await firebaseGet(firebaseRef(database, 'parties'));
        if (!partiesSnapshot.exists()) {
            showNotification('Party not found', 'error');
            return;
        }

        let partyId = null;
        let partyData = null;
        
        partiesSnapshot.forEach((childSnapshot) => {
            const party = childSnapshot.val();
            if (party.code === partyCode.toUpperCase() && party.active) {
                partyId = childSnapshot.key;
                partyData = party;
            }
        });

        if (!partyId) {
            showNotification('Invalid party code', 'error');
            return;
        }

        // Check if already a member
        if (partyData.members && partyData.members[user.uid]) {
            showNotification('You are already in this party', 'info');
            return;
        }

        // Handle different privacy levels
        if (partyData.privacy === PARTY_PRIVACY.PRIVATE) {
            // Add to pending requests
            await firebaseUpdate(firebaseRef(database, `parties/${partyId}/pendingRequests`), {
                [user.uid]: {
                    name: user.displayName || user.email.split('@')[0],
                    requestedAt: firebaseServerTimestamp()
                }
            });
            showNotification('Join request sent! Waiting for approval.', 'info');
        } else {
            // For friends-only, check if friends with creator
            if (partyData.privacy === PARTY_PRIVACY.FRIENDS_ONLY) {
                const friendsSnapshot = await firebaseGet(firebaseRef(database, `users/${user.uid}/friends/${partyData.creatorId}`));
                if (!friendsSnapshot.exists()) {
                    showNotification('This party is friends-only', 'error');
                    return;
                }
            }
            
            // Direct join for public parties or friends
            await addMemberToParty(partyId, user.uid, user.displayName || user.email.split('@')[0]);
        }
    } catch (error) {
        console.error('Error joining party:', error);
        showNotification('Failed to join party', 'error');
    }
}

// Add member to party
async function addMemberToParty(partyId, userId, userName) {
    try {
        // Add to party members
        await firebaseUpdate(firebaseRef(database, `parties/${partyId}/members`), {
            [userId]: {
                name: userName,
                joinedAt: firebaseServerTimestamp(),
                role: 'member'
            }
        });

        // Update member count
        const partyRef = firebaseRef(database, `parties/${partyId}`);
        const snapshot = await firebaseGet(partyRef);
        const memberCount = Object.keys(snapshot.val().members || {}).length;
        await firebaseUpdate(partyRef, { memberCount });

        // Add party to user's party list
        await firebaseUpdate(firebaseRef(database, `users/${userId}/parties`), {
            [partyId]: {
                role: 'member',
                joinedAt: firebaseServerTimestamp()
            }
        });

        showNotification('Successfully joined the party!', 'success');
        setCurrentParty(partyId);
    } catch (error) {
        console.error('Error adding member to party:', error);
        showNotification('Failed to join party', 'error');
    }
}

// Approve join request
export async function approveJoinRequest(partyId, userId) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        // Get party data to check if user is creator
        const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
        if (!partySnapshot.exists() || partySnapshot.val().creatorId !== user.uid) {
            showNotification('Only the party creator can approve requests', 'error');
            return;
        }

        // Get request data
        const requestSnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}/pendingRequests/${userId}`));
        if (!requestSnapshot.exists()) {
            showNotification('Request not found', 'error');
            return;
        }

        const requestData = requestSnapshot.val();
        
        // Add member to party
        await addMemberToParty(partyId, userId, requestData.name);
        
        // Remove from pending requests
        await firebaseRemove(firebaseRef(database, `parties/${partyId}/pendingRequests/${userId}`));
        
        showNotification(`${requestData.name} has been added to the party!`, 'success');
    } catch (error) {
        console.error('Error approving join request:', error);
        showNotification('Failed to approve request', 'error');
    }
}

// Reject join request
export async function rejectJoinRequest(partyId, userId) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        // Check if user is creator
        const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
        if (!partySnapshot.exists() || partySnapshot.val().creatorId !== user.uid) {
            showNotification('Only the party creator can reject requests', 'error');
            return;
        }

        // Remove from pending requests
        await firebaseRemove(firebaseRef(database, `parties/${partyId}/pendingRequests/${userId}`));
        
        showNotification('Request rejected', 'info');
    } catch (error) {
        console.error('Error rejecting join request:', error);
        showNotification('Failed to reject request', 'error');
    }
}

// Leave party
export async function leaveParty(partyId) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        // Remove from party members
        await firebaseRemove(firebaseRef(database, `parties/${partyId}/members/${user.uid}`));
        
        // Update member count
        const partyRef = firebaseRef(database, `parties/${partyId}`);
        const snapshot = await firebaseGet(partyRef);
        const memberCount = Object.keys(snapshot.val().members || {}).length;
        await firebaseUpdate(partyRef, { memberCount });

        // Remove party from user's list
        await firebaseRemove(firebaseRef(database, `users/${user.uid}/parties/${partyId}`));

        if (currentPartyId === partyId) {
            setCurrentParty(null);
        }

        showNotification('Left the party', 'info');
    } catch (error) {
        console.error('Error leaving party:', error);
        showNotification('Failed to leave party', 'error');
    }
}

// Set current active party
export function setCurrentParty(partyId) {
    currentPartyId = partyId;
    
    // Clean up old listeners
    partyListeners.forEach(unsubscribe => unsubscribe());
    partyListeners = [];
    
    if (partyId) {
        // Subscribe to party updates
        const partyRef = firebaseRef(database, `parties/${partyId}`);
        const unsubscribe = firebaseOnValue(partyRef, (snapshot) => {
            if (snapshot.exists()) {
                const partyData = snapshot.val();
                window.dispatchEvent(new CustomEvent('partyUpdate', { detail: partyData }));
            }
        });
        partyListeners.push(unsubscribe);
    }
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('partyChanged', { detail: { partyId } }));
}

// Get current party ID
export function getCurrentPartyId() {
    return currentPartyId;
}

// Get party leaderboard
export async function getPartyLeaderboard(partyId) {
    try {
        const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
        if (!partySnapshot.exists()) return [];
        
        const party = partySnapshot.val();
        const memberIds = Object.keys(party.members || {});
        
        // Get BAC data for all members
        const leaderboard = [];
        for (const memberId of memberIds) {
            const userSnapshot = await firebaseGet(firebaseRef(database, `users/${memberId}`));
            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                leaderboard.push({
                    id: memberId,
                    name: party.members[memberId].name,
                    bac: userData.currentBAC || 0,
                    avatar: userData.profilePicture || null
                });
            }
        }
        
        // Sort by BAC (highest first)
        return leaderboard.sort((a, b) => b.bac - a.bac);
    } catch (error) {
        console.error('Error getting party leaderboard:', error);
        return [];
    }
}

// Get user's parties
export async function getUserParties() {
    try {
        const user = auth.currentUser;
        if (!user) return [];

        const userPartiesSnapshot = await firebaseGet(firebaseRef(database, `users/${user.uid}/parties`));
        if (!userPartiesSnapshot.exists()) return [];

        const userParties = userPartiesSnapshot.val();
        const parties = [];

        for (const partyId of Object.keys(userParties)) {
            const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
            if (partySnapshot.exists() && partySnapshot.val().active) {
                parties.push({
                    ...partySnapshot.val(),
                    id: partyId,
                    userRole: userParties[partyId].role
                });
            }
        }

        return parties.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error('Error getting user parties:', error);
        return [];
    }
}

// Search public parties
export async function searchPublicParties(query = '') {
    try {
        const partiesSnapshot = await firebaseGet(firebaseRef(database, 'parties'));
        if (!partiesSnapshot.exists()) return [];

        const parties = [];
        partiesSnapshot.forEach((childSnapshot) => {
            const party = childSnapshot.val();
            if (party.active && party.privacy === PARTY_PRIVACY.PUBLIC) {
                if (!query || party.name.toLowerCase().includes(query.toLowerCase())) {
                    parties.push({
                        ...party,
                        id: childSnapshot.key
                    });
                }
            }
        });

        return parties.sort((a, b) => b.memberCount - a.memberCount);
    } catch (error) {
        console.error('Error searching parties:', error);
        return [];
    }
}

// Quick add friend from party
export async function quickAddFriend(userId) {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser || currentUser.uid === userId) return;

        // Check if already friends
        const friendSnapshot = await firebaseGet(firebaseRef(database, `users/${currentUser.uid}/friends/${userId}`));
        if (friendSnapshot.exists()) {
            showNotification('Already friends!', 'info');
            return;
        }

        // Send friend request
        await firebaseUpdate(firebaseRef(database, `users/${userId}/friendRequests`), {
            [currentUser.uid]: {
                from: currentUser.displayName || currentUser.email.split('@')[0],
                timestamp: firebaseServerTimestamp()
            }
        });

        showNotification('Friend request sent!', 'success');
    } catch (error) {
        console.error('Error sending friend request:', error);
        showNotification('Failed to send friend request', 'error');
    }
}

// End party (creator only)
export async function endParty(partyId) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        // Check if user is creator
        const partySnapshot = await firebaseGet(firebaseRef(database, `parties/${partyId}`));
        if (!partySnapshot.exists() || partySnapshot.val().creatorId !== user.uid) {
            showNotification('Only the party creator can end the party', 'error');
            return;
        }

        // Mark party as inactive
        await firebaseUpdate(firebaseRef(database, `parties/${partyId}`), {
            active: false,
            endedAt: firebaseServerTimestamp()
        });

        if (currentPartyId === partyId) {
            setCurrentParty(null);
        }

        showNotification('Party ended', 'info');
    } catch (error) {
        console.error('Error ending party:', error);
        showNotification('Failed to end party', 'error');
    }
}