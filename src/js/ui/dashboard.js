// ========================================
// DASHBOARD UI MODULE
// ========================================
// Updates the main dashboard display

import { getStateValue } from '../config/app-state.js';
import { getBACStatus } from '../config/constants.js';

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
        const status = getBACStatus(data.bac);
        const timeSince = getTimeSince(data.lastUpdate);
        
        const card = document.createElement('div');
        card.className = 'card friend-card';
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
    const friends = Object.values(partyData);
    
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
function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboardList');
    if (!leaderboard) return;
    
    const partyData = getStateValue('partyData') || {};
    leaderboard.innerHTML = '';
    
    const sorted = Object.values(partyData)
        .sort((a, b) => a.bac - b.bac)
        .slice(0, 5);
    
    sorted.forEach((friend, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.onclick = () => {
            if (window.confetti) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            window.showNotification(`${friend.name} is winning! 🏆`);
        };
        
        item.innerHTML = `
            <span class="rank rank-${index + 1}">#${index + 1}</span>
            <span>${friend.name}</span>
            <span>${friend.bac.toFixed(3)}‰</span>
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
function checkForAlerts() {
    const partyData = getStateValue('partyData') || {};
    const criticalFriends = Object.values(partyData).filter(f => f.bac >= 0.08);
    
    if (criticalFriends.length > 0) {
        const alertBanner = document.getElementById('alertBanner');
        const alertText = document.getElementById('alertText');
        
        if (alertBanner && alertText) {
            const names = criticalFriends.map(f => f.name).join(', ');
            alertText.textContent = `⚠️ ${names} need${criticalFriends.length > 1 ? '' : 's'} attention! BAC too high!`;
            
            if (!alertBanner.classList.contains('show')) {
                alertBanner.classList.add('show');
            }
        }
    } else {
        const alertBanner = document.getElementById('alertBanner');
        if (alertBanner) {
            alertBanner.classList.remove('show');
        }
    }
}

// ========================================
// FRIEND DETAILS
// ========================================
function showFriendDetails(friend) {
    // TODO: Implement modal showing friend details
    console.log('Show friend details:', friend);
}

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