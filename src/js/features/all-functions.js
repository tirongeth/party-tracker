// ========================================
// ALL ORIGINAL FUNCTIONS FROM safe.html
// ========================================
// This file contains ALL the functions from your original app
// They're organized by category but maintain their original functionality

import { getFirebaseDatabase, getFirebaseAuth } from '../config/firebase.js';
import { getAppState, setStateValue, getCurrentUser } from '../config/app-state.js';
import { DRINK_PRESETS, getBACStatus } from '../config/constants.js';
import { showNotification } from '../ui/notifications.js';
import { ref, set, get, push, remove, onValue, off, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// ========================================
// FRIENDS SYSTEM FUNCTIONS
// ========================================
export async function searchFriends() {
    const searchTerm = document.getElementById('friendSearchInput').value.trim().toLowerCase();
    
    if (!searchTerm || searchTerm.length < 3) {
        showNotification('❌ Please enter at least 3 characters', 'error');
        return;
    }
    
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<p>Searching...</p>';
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const usersSnapshot = await get(ref(database, 'users'));
        const users = usersSnapshot.val() || {};
        
        const results = [];
        Object.entries(users).forEach(([uid, user]) => {
            if (uid !== currentUser.uid && 
                user.settings?.publicProfile !== false &&
                (user.username?.toLowerCase().includes(searchTerm) || 
                 user.email?.toLowerCase().includes(searchTerm))) {
                results.push({ uid, ...user });
            }
        });
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">No users found</p>';
        } else {
            const friendsData = getAppState().friendsData || {};
            resultsDiv.innerHTML = '<h4>Search Results:</h4>' + results.map(user => `
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small">
                            ${(user.username || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div class="friend-details">
                            <h4>${user.username || 'User'}</h4>
                            <p>${user.email || 'Phone user'}</p>
                        </div>
                    </div>
                    <div class="friend-actions">
                        ${friendsData[user.uid] ? 
                            '<span style="color: #00ff88;">✓ Friends</span>' : 
                            `<button class="btn btn-primary" onclick="sendFriendRequest('${user.uid}')">
                                <i class="fas fa-user-plus"></i> Add Friend
                            </button>`
                        }
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsDiv.innerHTML = '<p style="color: #ff4444;">Search failed. Try again.</p>';
    }
}

export async function sendFriendRequest(friendId) {
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        const friendsData = getAppState().friendsData;
        
        if (friendsData[friendId]) {
            showNotification('ℹ️ Already friends');
            return;
        }
        
        await set(ref(database, 'friendRequests/' + friendId + '/' + currentUser.uid), {
            from: userData.username || currentUser.email,
            timestamp: serverTimestamp()
        });
        
        showNotification('📤 Friend request sent!', 'success');
        searchFriends();
        
    } catch (error) {
        console.error('Friend request error:', error);
        showNotification('❌ Failed to send request', 'error');
    }
}

export function updateFriendRequests() {
    const container = document.getElementById('friendRequests');
    const friendRequests = getAppState().friendRequests || [];
    
    if (friendRequests.length === 0) {
        container.innerHTML = '<p style="opacity: 0.7;">No pending requests</p>';
        return;
    }
    
    container.innerHTML = friendRequests.map(request => `
        <div class="friend-request">
            <div>
                <strong>${request.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${getTimeSince(request.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${request.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${request.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
}

export async function acceptFriendRequest(friendId) {
    try {
        const permission = await selectFriendPermission();
        if (!permission) return;
        
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId), {
            permission: permission,
            addedAt: serverTimestamp()
        });
        
        await set(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid), {
            permission: permission,
            addedAt: serverTimestamp()
        });
        
        await remove(ref(database, 'friendRequests/' + currentUser.uid + '/' + friendId));
        
        showNotification('✅ Friend added!', 'success');
        
    } catch (error) {
        console.error('Accept friend error:', error);
        showNotification('❌ Failed to accept request', 'error');
    }
}

export async function selectFriendPermission() {
    return new Promise((resolve) => {
        const modalContent = `
            <h2>Set Friend Permissions</h2>
            <p>Choose what this friend can see:</p>
            <div style="margin: 20px 0;">
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('observer')">
                    <div>
                        <h4>👀 Observer</h4>
                        <p>Can see if you're at a party (no BAC data)</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('buddy')">
                    <div>
                        <h4>🤝 Buddy</h4>
                        <p>Can see your BAC and get notifications</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('guardian')">
                    <div>
                        <h4>🛡️ Guardian</h4>
                        <p>Full access including emergency info</p>
                    </div>
                </div>
            </div>
            <button class="btn" onclick="resolvePermission(null)">Cancel</button>
        `;
        
        document.getElementById('modalBody').innerHTML = modalContent;
        document.getElementById('modal').classList.add('show');
        
        window.resolvePermission = (permission) => {
            window.closeModal();
            resolve(permission);
        };
    });
}

export async function declineFriendRequest(friendId) {
    const database = getFirebaseDatabase();
    const currentUser = getCurrentUser();
    await remove(ref(database, 'friendRequests/' + currentUser.uid + '/' + friendId));
    showNotification('❌ Request declined');
}

export function updateFriendsList() {
    const friendsList = document.getElementById('friendsList');
    if (!friendsList) return;
    
    const friendsData = getAppState().friendsData || {};
    friendsList.innerHTML = '';
    
    if (Object.keys(friendsData).length === 0) {
        friendsList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';
        return;
    }
    
    Object.entries(friendsData).forEach(async ([friendId, friend]) => {
        const database = getFirebaseDatabase();
        const friendSnapshot = await get(ref(database, 'users/' + friendId));
        const friendInfo = friendSnapshot.val();
        
        if (friendInfo) {
            const friendDiv = document.createElement('div');
            friendDiv.className = 'friend-item';
            friendDiv.innerHTML = `
                <div class="friend-info">
                    <div class="friend-avatar-small">
                        ${(friendInfo.username || friendInfo.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div class="friend-details">
                        <h4>${friendInfo.username || 'Friend'}</h4>
                        <p>${friendInfo.email || 'Phone user'}</p>
                    </div>
                </div>
                <div class="friend-actions">
                    <select class="permission-select" onchange="updateFriendPermission('${friendId}', this.value)">
                        <option value="observer" ${friend.permission === 'observer' ? 'selected' : ''}>Observer</option>
                        <option value="buddy" ${friend.permission === 'buddy' ? 'selected' : ''}>Buddy</option>
                        <option value="guardian" ${friend.permission === 'guardian' ? 'selected' : ''}>Guardian</option>
                    </select>
                    <button class="btn btn-danger" onclick="removeFriend('${friendId}')">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            `;
            friendsList.appendChild(friendDiv);
        }
    });
}

export async function updateFriendPermission(friendId, newPermission) {
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        await set(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId + '/permission'), newPermission);
        await set(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid + '/permission'), newPermission);
        showNotification('✅ Permission updated', 'success');
    } catch (error) {
        console.error('Update permission error:', error);
        showNotification('❌ Failed to update permission', 'error');
    }
}

export async function removeFriend(friendId) {
    if (confirm('Remove this friend?')) {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        await remove(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId));
        await remove(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid));
        showNotification('👋 Friend removed');
    }
}

// ========================================
// CHAT FUNCTIONS
// ========================================
export async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        
        // Check if user is developer
        const { isDeveloper } = await import('../config/constants.js');
        if (!isDeveloper(currentUser.uid)) {
            showNotification('❌ Only developers can send messages in the main chat', 'error');
            input.value = '';
            return;
        }
        
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message own';
        messageDiv.innerHTML = `
            <div class="chat-author">${userData.username || 'You'} <span style="color: #00ff88;">🛠️</span></div>
            <div>${escapeHtml(message)}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = '';
        
        // Save to Firebase
        const database = getFirebaseDatabase();
        if (database && currentUser) {
            push(ref(database, 'chat'), {
                uid: currentUser.uid,
                username: userData.username,
                message: message,
                timestamp: serverTimestamp(),
                isDeveloper: true
            });
        }
    }
}

export function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// ========================================
// HYDRATION & ACHIEVEMENTS
// ========================================
export function showHydrationReminder() {
    showNotification('💧 Time for a water break! Stay hydrated!');
    if (window.confetti) {
        confetti({
            particleCount: 50,
            spread: 60,
            colors: ['#00d4ff', '#0099ff', '#0066ff'],
            origin: { y: 0.6 }
        });
    }
    
    const hydrationCount = parseInt(localStorage.getItem('hydrationCount') || '0') + 1;
    localStorage.setItem('hydrationCount', hydrationCount);
    
    if (hydrationCount >= 12) {
        const achievements = getAppState().achievements;
        achievements.hydroHomie = true;
        showAchievementUnlocked('Hydro Homie');
    }
}

export function updateAchievements() {
    const achievements = getAppState().achievements;
    const achievementElements = document.querySelectorAll('.achievement');
    
    Object.entries(achievements).forEach(([key, unlocked]) => {
        if (unlocked) {
            const element = document.querySelector(`.achievement[data-achievement="${key}"]`);
            if (element && !element.classList.contains('unlocked')) {
                element.classList.add('unlocked');
            }
        }
    });
}

export function showAchievementUnlocked(name) {
    if (!localStorage.getItem(`achievement_${name}`)) {
        localStorage.setItem(`achievement_${name}`, 'true');
        
        if (window.confetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        showNotification(`🏆 Achievement Unlocked: ${name}!`);
    }
}

// ========================================
// LOCATION FUNCTIONS
// ========================================
export function checkInLocation(location) {
    const locationHistory = getAppState().locationHistory;
    const userData = getAppState().userData;
    
    locationHistory.push({
        location: location,
        time: Date.now(),
        user: userData.username
    });
    
    showNotification(`📍 Checked in at ${location}!`);
    
    if (locationHistory.length >= 10) {
        const achievements = getAppState().achievements;
        achievements.partyAnimal = true;
        showAchievementUnlocked('Party Animal');
    }
    
    window.closeModal();
}

export function createLocationMap() {
    const locations = getActiveLocations();
    let mapHtml = '<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';
    
    locations.forEach((loc, index) => {
        const x = 20 + (index % 3) * 30;
        const y = 20 + Math.floor(index / 3) * 30;
        mapHtml += `
            <div class="location-dot" style="left: ${x}%; top: ${y}%;" title="${loc.name}: ${loc.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${loc.name}</span>
            </div>
        `;
    });
    
    mapHtml += '</div>';
    return mapHtml;
}

export function initializeLocationMap() {
    const dots = document.querySelectorAll('.location-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const location = this.getAttribute('title');
            showNotification(`📍 ${location}`);
        });
    });
}

export function getActiveLocations() {
    const partyData = getAppState().partyData || {};
    const locationCounts = {};
    
    Object.values(partyData).forEach(friend => {
        if (!locationCounts[friend.location]) {
            locationCounts[friend.location] = { count: 0, totalBac: 0 };
        }
        locationCounts[friend.location].count++;
        locationCounts[friend.location].totalBac += friend.bac;
    });
    
    return Object.entries(locationCounts).map(([name, data]) => ({
        name,
        count: data.count,
        avgBac: data.totalBac / data.count
    }));
}

// ========================================
// UBER & EMERGENCY FUNCTIONS
// ========================================
export function callUber() {
    const address = localStorage.getItem('homeAddress');
    
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        showNotification('🚕 Opening Uber with your home address...');
        
        navigator.clipboard.writeText(address)
            .then(() => showNotification('📋 Home address copied to clipboard!'))
            .catch(() => {});
        
        window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedAddress}`, '_blank');
    } else {
        showNotification('🚕 Opening Uber app...');
        window.open('https://m.uber.com/ul/', '_blank');
    }
}

export function callEmergency(type) {
    switch(type) {
        case 'ambulance':
            if (confirm('Call emergency services (112)?')) {
                window.location.href = 'tel:112';
            }
            break;
        case 'campus-security':
            if (confirm('Call HSG Campus Security?')) {
                window.location.href = 'tel:+41712242424';
            }
            break;
        case 'taxi':
            showNotification('🚕 Opening taxi options...');
            setTimeout(() => {
                showTaxiOptions();
            }, 500);
            break;
    }
}

export function showTaxiOptions() {
    const address = localStorage.getItem('homeAddress') || '';
    const options = `
        <h2>🚕 Ride Options</h2>
        ${address ? `<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${escapeHtml(address)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${escapeHtml(address)}').then(() => showNotification('📋 Address copied!'))">
                <i class="fas fa-copy"></i> Copy Address
            </button>
        </div>` : ''}
        <div style="margin: 20px 0;">
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callUber()">
                <i class="fab fa-uber"></i> Uber
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="window.location.href='tel:+41712222222'">
                <i class="fas fa-taxi"></i> Local Taxi
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callSoberFriend()">
                <i class="fas fa-user-friends"></i> Call Sober Friend
            </button>
        </div>
        <button class="btn" onclick="closeModal()">Cancel</button>
    `;
    
    document.getElementById('modalBody').innerHTML = options;
    document.getElementById('modal').classList.add('show');
}

export function callSoberFriend() {
    const partyData = getAppState().partyData || {};
    const soberFriends = Object.values(partyData).filter(f => f.bac < 0.02);
    if (soberFriends.length > 0) {
        const friend = soberFriends[0];
        showNotification(`📞 Calling ${friend.name}...`);
    } else {
        showNotification('❌ No sober friends available right now');
    }
}

export function selectBuddy(buddyName) {
    localStorage.setItem('buddy', buddyName);
    showNotification(`👥 ${buddyName} is now your buddy!`);
    
    const achievements = getAppState().achievements;
    achievements.guardianAngel = true;
    showAchievementUnlocked('Guardian Angel');
    
    window.closeModal();
}

export function showFirstAid() {
    window.showModal('first-aid');
}

// ========================================
// SETTINGS & PROFILE FUNCTIONS
// ========================================
export async function updateProfile() {
    const username = document.getElementById('username').value.trim();
    
    if (!username || username.length < 3) {
        showNotification('❌ Username must be at least 3 characters', 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        
        if (username.toLowerCase() !== userData.username?.toLowerCase()) {
            const usernameCheck = await get(ref(database, 'usernames/' + username.toLowerCase()));
            if (usernameCheck.exists() && usernameCheck.val() !== currentUser.uid) {
                showNotification('❌ Username already taken', 'error');
                return;
            }
            
            if (userData.username) {
                await remove(ref(database, 'usernames/' + userData.username.toLowerCase()));
            }
            
            await set(ref(database, 'usernames/' + username.toLowerCase()), currentUser.uid);
        }
        
        await set(ref(database, 'users/' + currentUser.uid + '/username'), username);
        
        showNotification('✅ Profile updated!', 'success');
        
        userData.username = username;
        document.getElementById('profileName').textContent = username;
        document.getElementById('settingsUsername').textContent = username;
        document.getElementById('profileInitial').textContent = username.charAt(0).toUpperCase();
        
    } catch (error) {
        console.error('Update profile error:', error);
        showNotification('❌ Failed to update profile', 'error');
    }
}

export async function changePassword() {
    const newPassword = prompt('Enter new password (min 6 characters):');
    if (newPassword && newPassword.length >= 6) {
        try {
            const currentUser = getCurrentUser();
            await currentUser.updatePassword(newPassword);
            showNotification('✅ Password changed successfully', 'success');
        } catch (error) {
            console.error('Password change error:', error);
            if (error.code === 'auth/requires-recent-login') {
                showNotification('❌ Please sign out and sign in again before changing password', 'error');
            } else {
                showNotification('❌ Failed to change password', 'error');
            }
        }
    }
}

export async function saveEmergencyInfo() {
    const homeAddress = document.getElementById('homeAddress').value;
    const emergencyContact = document.getElementById('emergencyContact').value;
    const medicalInfo = document.getElementById('medicalInfo').value;
    const safetyNotes = document.getElementById('safetyNotes').value;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/emergency'), {
            homeAddress,
            emergencyContact,
            medicalInfo,
            safetyNotes,
            updatedAt: serverTimestamp()
        });
        
        localStorage.setItem('homeAddress', homeAddress);
        localStorage.setItem('emergencyContact', emergencyContact);
        localStorage.setItem('medicalInfo', medicalInfo);
        localStorage.setItem('safetyNotes', safetyNotes);
        
        showNotification('✅ Emergency information saved', 'success');
        showSettingsSaved();
    } catch (error) {
        console.error('Save emergency info error:', error);
        showNotification('❌ Failed to save emergency info', 'error');
    }
}

export async function savePrivacySettings() {
    const shareLocation = document.getElementById('shareLocation').checked;
    const notifications = document.getElementById('notifications').checked;
    const publicProfile = document.getElementById('publicProfile').checked;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/settings'), {
            shareLocation,
            notifications,
            publicProfile
        });
        
        localStorage.setItem('shareLocation', shareLocation);
        localStorage.setItem('notifications', notifications);
        
        showNotification('✅ Privacy settings saved', 'success');
        showSettingsSaved();
    } catch (error) {
        console.error('Save privacy settings error:', error);
        showNotification('❌ Failed to save settings', 'error');
    }
}

export function showSettingsSaved() {
    const savedIcon = document.createElement('div');
    savedIcon.className = 'settings-saved';
    savedIcon.innerHTML = '✅';
    document.body.appendChild(savedIcon);
    
    setTimeout(() => savedIcon.remove(), 1000);
}

export function updateToggleSwitches() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        const input = toggle.querySelector('input');
        if (input && input.checked) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    });
}

export async function deleteAccount() {
    if (!confirm('Delete your account? This cannot be undone!')) return;
    if (!confirm('Are you absolutely sure? All your data will be permanently deleted.')) return;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        const friendsData = getAppState().friendsData;
        
        await remove(ref(database, 'users/' + currentUser.uid));
        
        if (userData.username) {
            await remove(ref(database, 'usernames/' + userData.username.toLowerCase()));
        }
        
        if (friendsData) {
            for (const friendId in friendsData) {
                await remove(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid));
            }
        }
        
        await currentUser.delete();
        
        showNotification('Account deleted. Goodbye!');
        location.reload();
    } catch (error) {
        console.error('Delete account error:', error);
        if (error.code === 'auth/requires-recent-login') {
            showNotification('❌ Please sign out and sign in again before deleting account', 'error');
        } else {
            showNotification('❌ Failed to delete account', 'error');
        }
    }
}

// ========================================
// DATA EXPORT
// ========================================
export function exportData() {
    const currentUser = getCurrentUser();
    const appState = getAppState();
    
    const data = {
        user: {
            email: currentUser?.email,
            username: appState.userData.username
        },
        settings: appState.userData.settings,
        emergency: appState.userData.emergency,
        devices: appState.deviceData,
        friends: appState.friendsData,
        drinkHistory: appState.drinkHistory,
        achievements: appState.achievements,
        partyData: appState.partyData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('📥 Data exported successfully!', 'success');
}

// ========================================
// DEVICE PAIRING FROM MODAL
// ========================================
export async function pairDeviceFromModal() {
    const deviceId = document.getElementById('modalDeviceId').value.trim().toUpperCase();
    
    if (!deviceId) {
        showNotification('❌ Please enter a Device ID', 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const deviceData = getAppState().deviceData;
        
        const deviceSnapshot = await get(ref(database, 'readings/' + deviceId));
        
        if (!deviceSnapshot.exists()) {
            showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
            return;
        }
        
        if (deviceData[deviceId]) {
            showNotification('ℹ️ Device already paired');
            window.closeModal();
            return;
        }
        
        await set(ref(database, 'users/' + currentUser.uid + '/devices/' + deviceId), {
            pairedAt: serverTimestamp(),
            name: 'My Breathalyzer'
        });
        
        showNotification('✅ Device paired successfully!', 'success');
        window.closeModal();
        
    } catch (error) {
        console.error('Pairing error:', error);
        showNotification('❌ Pairing failed', 'error');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
export function getTimeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
}

export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function resolvePermission(permission) {
    // This will be set dynamically when modal is shown
    console.log('Permission resolved:', permission);
}