// Party UI Module - Handles all party-related UI operations
import { 
    createParty, 
    joinParty, 
    leaveParty, 
    getCurrentPartyId, 
    getUserParties, 
    searchPublicParties,
    getPartyLeaderboard,
    getPartyStats,
    performPartySafetyCheck,
    sendPartySafetyAlert,
    approveJoinRequest,
    rejectJoinRequest,
    setCurrentParty,
    quickAddFriend,
    PARTY_PRIVACY
} from './parties.js';
import { showNotification } from '../ui/notifications.js';
import { getCurrentUser } from '../config/app-state.js';

// Create new party from UI
export async function createNewParty() {
    try {
        const name = document.getElementById('partyName')?.value.trim();
        const address = document.getElementById('partyAddress')?.value.trim();
        const description = document.getElementById('partyDescription')?.value.trim();
        const privacy = document.getElementById('partyPrivacy')?.value;
        const duration = document.getElementById('partyDuration')?.value;
        
        if (!name) {
            showNotification('Please enter a party name', 'error');
            return;
        }
        
        showNotification('Creating party...', 'info');
        
        const result = await createParty({
            name,
            address,
            description,
            privacy,
            duration
        });
        
        if (result) {
            // Clear form
            document.getElementById('partyName').value = '';
            document.getElementById('partyAddress').value = '';
            document.getElementById('partyDescription').value = '';
            
            // Update UI
            await updatePartyUI();
            
            // Show success with copy button for code
            showNotification(`Party created! Code: ${result.partyCode} 📋`, 'success');
            
            // Auto-copy code to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(result.partyCode);
            }
        }
    } catch (error) {
        console.error('Error creating party:', error);
        showNotification('Failed to create party. Please try again.', 'error');
    }
}

// Join party by code
export async function joinPartyByCode() {
    try {
        const code = document.getElementById('joinPartyCode')?.value.trim();
        
        if (!code) {
            showNotification('Please enter a party code', 'error');
            return;
        }
        
        showNotification('Joining party...', 'info');
        
        await joinParty(code);
        
        // Clear input
        document.getElementById('joinPartyCode').value = '';
        
        // Update UI
        await updatePartyUI();
    } catch (error) {
        console.error('Error joining party:', error);
        showNotification('Failed to join party. Check the code and try again.', 'error');
    }
}

// Leave current party
export async function leaveCurrentParty() {
    try {
        const currentPartyId = getCurrentPartyId();
        if (!currentPartyId) return;
        
        if (confirm('Are you sure you want to leave this party?')) {
            await leaveParty(currentPartyId);
            await updatePartyUI();
            showNotification('Left the party', 'info');
        }
    } catch (error) {
        console.error('Error leaving party:', error);
        showNotification('Failed to leave party', 'error');
    }
}

// Update all party UI elements
export async function updatePartyUI() {
    try {
        const currentPartyId = getCurrentPartyId();
        
        // Update party sections visibility
        updatePartyVisibility(currentPartyId);
        
        // Update my parties list
        await updateMyPartiesList(currentPartyId);
        
        // Update public parties
        await updatePublicPartiesList();
        
        // Update dashboard if we're in a party
        if (currentPartyId) {
            updateDashboardPartyInfo();
        }
    } catch (error) {
        console.error('Error updating party UI:', error);
    }
}

// Update party visibility
function updatePartyVisibility(currentPartyId) {
    const currentPartySection = document.getElementById('currentPartySection');
    const dashboardPartyInfo = document.getElementById('dashboardPartyInfo');
    
    if (currentPartyId) {
        if (currentPartySection) currentPartySection.style.display = 'block';
        if (dashboardPartyInfo) dashboardPartyInfo.style.display = 'block';
    } else {
        if (currentPartySection) currentPartySection.style.display = 'none';
        if (dashboardPartyInfo) dashboardPartyInfo.style.display = 'none';
    }
}

// Update my parties list
async function updateMyPartiesList(currentPartyId) {
    const myPartiesList = document.getElementById('myPartiesList');
    if (!myPartiesList) return;
    
    const myParties = await getUserParties();
    
    if (myParties.length > 0) {
        myPartiesList.innerHTML = myParties.map(party => createPartyCard(party, currentPartyId)).join('');
    } else {
        myPartiesList.innerHTML = '<p style="opacity: 0.7; text-align: center;">No parties yet. Create one above!</p>';
    }
}

// Create party card HTML
function createPartyCard(party, currentPartyId) {
    const isActive = party.id === currentPartyId;
    const memberCount = Object.keys(party.members || {}).length;
    const timeLeft = party.expiresAt ? getTimeLeft(party.expiresAt) : null;
    
    return `
        <div class="party-card ${isActive ? 'active' : ''}" onclick="window.setCurrentParty('${party.id}')">
            <span class="party-privacy-badge privacy-${party.privacy}">
                ${getPrivacyLabel(party.privacy)}
            </span>
            ${isActive ? '<span class="active-badge">ACTIVE</span>' : ''}
            <h4>${party.name}</h4>
            ${party.address ? `<p><i class="fas fa-map-marker-alt"></i> ${party.address}</p>` : ''}
            <div class="party-stats-mini">
                <span><i class="fas fa-users"></i> ${memberCount} ${memberCount === 1 ? 'member' : 'members'}</span>
                ${party.creatorId === getCurrentUser()?.uid ? '<span><i class="fas fa-crown"></i> Creator</span>' : ''}
            </div>
            <div class="party-code-mini">
                <span>Code: ${party.code}</span>
                <button class="copy-btn" onclick="copyPartyCode('${party.code}'); event.stopPropagation();">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
            <p style="opacity: 0.7; font-size: 0.9em; margin-top: 10px;">
                ${party.duration === 'ongoing' ? '🔄 Ongoing Party' : `⏰ ${timeLeft || 'Expired'}`}
            </p>
        </div>
    `;
}

// Update public parties list
async function updatePublicPartiesList() {
    const publicPartiesList = document.getElementById('publicPartiesList');
    if (!publicPartiesList) return;
    
    const publicParties = await searchPublicParties();
    
    if (publicParties.length > 0) {
        publicPartiesList.innerHTML = publicParties.map(party => createPublicPartyCard(party)).join('');
    } else {
        publicPartiesList.innerHTML = '<p style="opacity: 0.7; text-align: center;">No public parties available right now</p>';
    }
}

// Create public party card
function createPublicPartyCard(party) {
    return `
        <div class="party-card">
            <span class="party-privacy-badge privacy-public">PUBLIC</span>
            <h4>${party.name}</h4>
            ${party.address ? `<p><i class="fas fa-map-marker-alt"></i> ${party.address}</p>` : ''}
            <div class="party-stats-mini">
                <span><i class="fas fa-users"></i> ${party.memberCount} members</span>
                <span><i class="fas fa-user"></i> ${party.creatorName}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" 
                    onclick="document.getElementById('joinPartyCode').value = '${party.code}'; window.joinPartyByCode();">
                <i class="fas fa-sign-in-alt"></i> Join Party
            </button>
        </div>
    `;
}

// Update dashboard party info
function updateDashboardPartyInfo() {
    // This will be updated by the partyUpdate event
}

// Handle party update event
export async function handlePartyUpdate(party) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Update party displays
    updatePartyDisplays(party);
    
    // Update party stats
    await updatePartyStats(party.id);
    
    // Perform safety check
    await performSafetyCheck(party.id);
    
    // Update party leaderboard
    await updatePartyLeaderboard(party);
    
    // Update members list
    updateMembersList(party, currentUser);
    
    // Update join requests if creator
    updateJoinRequests(party, currentUser);
}

// Update party statistics
async function updatePartyStats(partyId) {
    const statsDisplay = document.getElementById('partyStatsDisplay');
    if (!statsDisplay) return;
    
    const stats = await getPartyStats(partyId);
    if (!stats) return;
    
    const duration = formatDuration(stats.duration);
    
    statsDisplay.innerHTML = `
        <div class="stat-card" style="cursor: default;">
            <div class="stat-icon">🎊</div>
            <div class="stat-value">${stats.averageBAC.toFixed(3)}‰</div>
            <div class="stat-label">Party Average</div>
        </div>
        <div class="stat-card" style="cursor: default;">
            <div class="stat-icon">🎆</div>
            <div class="stat-value">${stats.highestBAC.toFixed(3)}‰</div>
            <div class="stat-label">Highest BAC</div>
            ${stats.mostActive ? `<small>${stats.mostActive}</small>` : ''}
        </div>
        <div class="stat-card" style="cursor: default;">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${stats.safeToDrive}</div>
            <div class="stat-label">Safe to Drive</div>
        </div>
        <div class="stat-card" style="cursor: default;">
            <div class="stat-icon">⏱️</div>
            <div class="stat-value">${duration}</div>
            <div class="stat-label">Party Duration</div>
        </div>
    `;
}

// Format duration
function formatDuration(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

// Perform and display safety check
async function performSafetyCheck(partyId) {
    const alerts = await performPartySafetyCheck(partyId);
    if (!alerts || alerts.length === 0) return;
    
    // Display most critical alert
    const criticalAlert = alerts.find(a => a.type === 'danger') || alerts[0];
    
    // Show notification
    showNotification(criticalAlert.message, criticalAlert.type);
    
    // Send to party chat if critical
    if (criticalAlert.type === 'danger') {
        await sendPartySafetyAlert(partyId, criticalAlert);
    }
}

// Update party displays
function updatePartyDisplays(party) {
    const elements = {
        currentPartyName: document.getElementById('currentPartyName'),
        currentPartyCode: document.getElementById('currentPartyCode'),
        dashboardPartyName: document.getElementById('dashboardPartyName'),
        dashboardPartyCode: document.getElementById('dashboardPartyCode')
    };
    
    if (elements.currentPartyName) elements.currentPartyName.textContent = party.name;
    if (elements.currentPartyCode) elements.currentPartyCode.textContent = party.code;
    if (elements.dashboardPartyName) elements.dashboardPartyName.textContent = party.name;
    if (elements.dashboardPartyCode) elements.dashboardPartyCode.textContent = party.code;
}

// Update party leaderboard
async function updatePartyLeaderboard(party) {
    const partyLeaderboard = document.getElementById('partyLeaderboard');
    if (!partyLeaderboard) return;
    
    const leaderboard = await getPartyLeaderboard(party.id);
    
    if (leaderboard.length > 0) {
        partyLeaderboard.innerHTML = leaderboard.map((member, index) => createLeaderboardItem(member, index)).join('');
    } else {
        partyLeaderboard.innerHTML = '<p style="text-align: center; opacity: 0.7;">No BAC data yet</p>';
    }
}

// Create leaderboard item
function createLeaderboardItem(member, index) {
    const currentUser = getCurrentUser();
    const isCurrentUser = member.id === currentUser?.uid;
    
    return `
        <div class="party-leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
            <span class="rank rank-${index + 1}">#${index + 1}</span>
            <span>${member.name} ${isCurrentUser ? '(You)' : ''}</span>
            <span class="bac-display">${member.bac.toFixed(3)}‰</span>
            ${!isCurrentUser ? 
                `<button class="quick-add-btn" onclick="window.quickAddPartyFriend('${member.id}')">
                    <i class="fas fa-user-plus"></i>
                </button>` : ''}
        </div>
    `;
}

// Update members list
function updateMembersList(party, currentUser) {
    const membersList = document.getElementById('partyMembersList');
    if (!membersList || !party.members) return;
    
    membersList.innerHTML = Object.entries(party.members)
        .map(([id, member]) => createMemberItem(id, member, party, currentUser))
        .join('');
}

// Create member item
function createMemberItem(id, member, party, currentUser) {
    const isCreator = id === party.creatorId;
    const isCurrentUser = id === currentUser.uid;
    const canRemove = party.creatorId === currentUser.uid && !isCurrentUser;
    
    return `
        <div class="friend-item">
            <div class="friend-info">
                <div class="friend-avatar-small">
                    ${isCreator ? '👑' : '👤'}
                </div>
                <div class="friend-details">
                    <h4>${member.name} ${isCurrentUser ? '(You)' : ''}</h4>
                    <p>${member.role} ${isCreator ? '• Party Creator' : ''}</p>
                </div>
            </div>
            ${canRemove ? 
                `<button class="btn btn-sm btn-danger" onclick="removePartyMember('${party.id}', '${id}')">
                    Remove
                </button>` : ''}
        </div>
    `;
}

// Update join requests
function updateJoinRequests(party, currentUser) {
    const requestsSection = document.getElementById('partyRequestsSection');
    const requestsList = document.getElementById('partyRequestsList');
    
    if (!requestsSection || !requestsList) return;
    
    const hasRequests = party.creatorId === currentUser.uid && 
                       party.pendingRequests && 
                       Object.keys(party.pendingRequests).length > 0;
    
    if (hasRequests) {
        requestsSection.style.display = 'block';
        requestsList.innerHTML = Object.entries(party.pendingRequests)
            .map(([userId, request]) => createRequestItem(party.id, userId, request))
            .join('');
    } else {
        requestsSection.style.display = 'none';
    }
}

// Create request item
function createRequestItem(partyId, userId, request) {
    return `
        <div class="party-request-item">
            <div>
                <strong>${request.name}</strong>
                <p style="opacity: 0.7; font-size: 0.9em;">
                    Requested ${new Date(request.requestedAt).toLocaleString()}
                </p>
            </div>
            <div class="party-request-actions">
                <button class="approve-btn" onclick="window.approveJoinRequest('${partyId}', '${userId}')">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="reject-btn" onclick="window.rejectJoinRequest('${partyId}', '${userId}')">
                    <i class="fas fa-times"></i> Reject
                </button>
            </div>
        </div>
    `;
}

// Utility functions
function getPrivacyLabel(privacy) {
    switch (privacy) {
        case PARTY_PRIVACY.PRIVATE: return 'PRIVATE';
        case PARTY_PRIVACY.FRIENDS_ONLY: return 'FRIENDS';
        case PARTY_PRIVACY.PUBLIC: return 'PUBLIC';
        default: return privacy.toUpperCase();
    }
}

function getTimeLeft(expiresAt) {
    const now = Date.now();
    const timeLeft = expiresAt - now;
    
    if (timeLeft <= 0) return 'Expired';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m left`;
    } else {
        return `${minutes}m left`;
    }
}

// Copy party code
window.copyPartyCode = function(code) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
        showNotification('Party code copied!', 'success');
    }
};

// Export all party UI functions for global access
export const partyUIFunctions = {
    createNewParty,
    joinPartyByCode,
    leaveCurrentParty,
    updatePartyUI,
    handlePartyUpdate,
    setCurrentParty,
    approveJoinRequest,
    rejectJoinRequest,
    quickAddPartyFriend: quickAddFriend
};