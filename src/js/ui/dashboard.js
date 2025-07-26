// ========================================
// DASHBOARD UI MODULE
// ========================================
// Updates the main dashboard display

import { getStateValue } from '../config/app-state.js';
import { getBACStatus } from '../config/constants.js';
import { getCurrentPartyId, getPartyLeaderboard, quickAddFriend } from '../features/parties.js';


// ========================================
// MAIN UI UPDATE
// ========================================
export function updateUI() {
    try {
        updateFriendsGrid();
        updateStats();
        updateLeaderboard();
        updateVisualizer();
        checkForAlerts();
    } catch (error) {
        console.error('UI update failed:', error);
    }
}

// ========================================
// UPDATE FRIENDS GRID
// ========================================
function updateFriendsGrid() {
    const grid = document.getElementById('friendsGrid');
    if (!grid) return;
    
    const partyData = getStateValue('partyData') || {};
    grid.innerHTML = '';
    
    Object.entries(partyData).forEach(([deviceId, data]) => {
        // Skip data older than 24 hours
        const isRecent = Date.now() - data.lastUpdate < 24 * 60 * 60 * 1000;
        if (!isRecent) return;
        
        const status = getBACStatus(data.bac);
        const timeSince = getTimeSince(data.lastUpdate);
        
        const card = document.createElement('div');
        card.className = 'card friend-card';
        card.setAttribute('data-friend-id', data.friendId || deviceId);
        card.onclick = () => showFriendDetails(data);
        
        const trendIcon = data.trend === 'up' ? '📈' : data.trend === 'down' ? '📉' : '➡️';
        const trendClass = data.trend === 'up' ? 'trend-up' : data.trend === 'down' ? 'trend-down' : '';
        
        const emoji = data.isOwn ? '👤' : data.permission === 'guardian' ? '🛡️' : '👥';
        
        card.innerHTML = `
            <div class="friend-avatar">${emoji}</div>
            <div class="friend-name">${data.name}</div>
            <div class="bac-value ${status.class}">
                ${data.bac.toFixed(3)}‰
                <span class="bac-trend ${trendClass}">${trendIcon}</span>
            </div>
            <div class="friend-status">
                <span class="status-badge">${status.emoji} ${status.text}</span>
            </div>
            <div class="location-tag">
                <i class="fas fa-map-marker-alt"></i> ${data.location}
            </div>
            <div class="last-update" style="margin-top: 10px; opacity: 0.7; font-size: 0.9em;">
                Updated ${timeSince}
            </div>
        `;
        
        // Add pulse animation for high BAC
        if (data.bac >= 0.08) {
            card.classList.add('pulse');
        }
        
        grid.appendChild(card);
    });
}

// ========================================
// UPDATE STATS
// ========================================
function updateStats() {
    const partyData = getStateValue('partyData') || {};
    // Filter only recent data (within 24 hours)
    const friends = Object.values(partyData).filter(data => 
        Date.now() - data.lastUpdate < 24 * 60 * 60 * 1000
    );
    
    // Average BAC
    const avgBac = friends.reduce((sum, f) => sum + f.bac, 0) / friends.length || 0;
    const avgElement = document.getElementById('partyAverage');
    if (avgElement) avgElement.textContent = avgBac.toFixed(3) + '‰';
    
    // Safe friends
    const safeCount = friends.filter(f => f.bac < 0.02).length;
    const safeElement = document.getElementById('safeFriends');
    if (safeElement) safeElement.textContent = safeCount;
    
    // Update hydration timer
    const hydrationMinutes = 15 - (Date.now() % (15 * 60 * 1000)) / 60000;
    const hydrationElement = document.getElementById('hydrationTime');
    if (hydrationElement) hydrationElement.textContent = Math.floor(hydrationMinutes) + 'm';
}

// ========================================
// UPDATE LEADERBOARD
// ========================================
async function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboardList');
    if (!leaderboard) return;
    
    leaderboard.innerHTML = '';
    
    // Check if in a party
    const currentPartyId = getCurrentPartyId();
    let sorted = [];
    
    if (currentPartyId) {
        // Use party-specific leaderboard
        sorted = await getPartyLeaderboard(currentPartyId);
        sorted = sorted.slice(0, 5);
    } else {
        // Use regular leaderboard
        const partyData = getStateValue('partyData') || {};
        sorted = Object.values(partyData)
            .sort((a, b) => b.bac - a.bac)
            .slice(0, 5);
    }
    
    // Position-specific messages
    const positionMessages = [
        (name) => `🏆 ${name} is absolutely dominating the party! Living their best life!`,
        (name) => `🥈 ${name} is so close! One more and they could take the crown!`,
        (name) => `🥉 ${name} is holding strong! The podium suits them well!`,
        (name) => `${name} is warming up! The night is still young!`,
        (name) => `${name} is taking it easy... or are they just getting started? 🤔`
    ];
    
    sorted.forEach((friend, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.onclick = () => {
            // Only confetti for first place
            if (index === 0 && window.confetti) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            // Show position-specific message
            const message = positionMessages[index] ? positionMessages[index](friend.name) : `${friend.name} is participating!`;
            window.showNotification(message);
        };
        
        item.innerHTML = `
            <span class="rank rank-${index + 1}">#${index + 1}</span>
            <span>${friend.name}</span>
            <span>${friend.bac.toFixed(3)}‰</span>
            ${currentPartyId && friend.id ? `<button class="quick-add-btn" onclick="window.quickAddPartyFriend('${friend.id}')">+</button>` : ''}
        `;
        leaderboard.appendChild(item);
    });
}

// ========================================
// MUSIC VISUALIZER
// ========================================
function updateVisualizer() {
    const visualizer = document.getElementById('visualizer');
    if (!visualizer) return;
    
    if (visualizer.children.length === 0) {
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            visualizer.appendChild(bar);
        }
    }
    
    visualizer.querySelectorAll('.bar').forEach(bar => {
        const height = Math.random() * 150 + 20;
        bar.style.height = height + 'px';
    });
}

// ========================================
// ALERT SYSTEM
// ========================================
let lastAlertTime = 0;
const ALERT_COOLDOWN = 5 * 60 * 1000; // 5 minutes between alerts

function checkForAlerts() {
    const partyData = getStateValue('partyData') || {};
    // Only check recent data (within 24 hours)
    const criticalFriends = Object.values(partyData).filter(f => 
        Date.now() - f.lastUpdate < 24 * 60 * 60 * 1000 && f.bac >= 0.08
    );
    
    if (criticalFriends.length > 0) {
        const now = Date.now();
        
        // Show notification instead of persistent banner (with cooldown)
        if (now - lastAlertTime > ALERT_COOLDOWN) {
            const names = criticalFriends.map(f => f.name).join(', ');
            showNotification(
                `⚠️ ${names} need${criticalFriends.length > 1 ? '' : 's'} attention! BAC too high!`, 
                'warning'
            );
            lastAlertTime = now;
        }
        
        // Add subtle indicator to friend cards instead
        criticalFriends.forEach(friend => {
            const card = document.querySelector(`[data-friend-id="${friend.friendId || friend.deviceId}"]`);
            if (card) {
                card.classList.add('bac-warning');
            }
        });
    } else {
        // Remove warning indicators
        document.querySelectorAll('.bac-warning').forEach(card => {
            card.classList.remove('bac-warning');
        });
    }
    
    // Hide the old alert banner if it exists
    const alertBanner = document.getElementById('alertBanner');
    if (alertBanner) {
        alertBanner.style.display = 'none';
    }
}

// ========================================
// FRIEND DETAILS
// ========================================
function showFriendDetails(friend) {
    // TODO: Implement modal showing friend details
    console.log('Show friend details:', friend);
}

// Quick add friend from party
window.quickAddPartyFriend = async function(userId) {
    await quickAddFriend(userId);
};

// ========================================
// UTILITY FUNCTIONS
// ========================================
function getTimeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
}

// Make updateUI available globally
window.updateUI = updateUI;