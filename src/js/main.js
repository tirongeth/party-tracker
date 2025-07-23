// ========================================
// MAIN ENTRY POINT - With ALL Original Functions
// ========================================

import { initializeFirebase, getDatabase } from './config/firebase.js';
import { setupAuthListener, handleAuthSubmit, toggleAuthMode, signOut, loadUserData, hideAuthScreen } from './auth/auth.js';
import { initializeDevices } from './features/devices.js';
import { updateUI } from './ui/dashboard.js';
import { DRINK_PRESETS } from './config/constants.js';
import { 
    getAppState, 
    setStateValue, 
    addDrinkToHistory,
    getCurrentUser 
} from './config/app-state.js';

// ========================================
// GLOBAL VARIABLES (from your original app)
// ========================================
let drinkChart = null;
let chartVisible = true;
let currentGame = null;
let gameScores = { team1: 0, team2: 0 };

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting app initialization...');
    
    // Initialize Firebase first
    const firebaseReady = initializeFirebase();
    if (!firebaseReady) {
        console.error('Firebase failed to initialize!');
        return;
    }
    
    // Make ALL functions available globally for HTML onclick
    window.toggleAuthMode = toggleAuthMode;
    window.signOut = signOut;
    window.updateUI = updateUI;
    window.switchSection = switchSection;
    window.toggleMobileMenu = toggleMobileMenu;
    window.showNotification = showNotification;
    window.showModal = showModal;
    window.closeModal = closeModal;
    window.callUber = callUber;
    window.checkInLocation = checkInLocation;
    window.startGame = startGame;
    window.callEmergency = callEmergency;
    window.logDrink = logDrink;
    window.sendMessage = sendMessage;
    window.handleChatEnter = handleChatEnter;
    window.showHydrationReminder = showHydrationReminder;
    window.searchFriends = searchFriends;
    window.updateProfile = updateProfile;
    window.changePassword = changePassword;
    window.saveEmergencyInfo = saveEmergencyInfo;
    window.savePrivacySettings = savePrivacySettings;
    window.exportData = exportData;
    window.clearDrinkHistory = clearDrinkHistory;
    window.deleteAccount = deleteAccount;
    window.toggleChart = toggleChart;
    window.removeDrink = removeDrink;
    window.sendFriendRequest = sendFriendRequest;
    window.acceptFriendRequest = acceptFriendRequest;
    window.declineFriendRequest = declineFriendRequest;
    window.updateFriendPermission = updateFriendPermission;
    window.removeFriend = removeFriend;
    window.showEmergencyReport = showEmergencyReport;
    window.copyEmergencyReport = copyEmergencyReport;
    window.downloadEmergencyReport = downloadEmergencyReport;
    window.shareEmergencyReport = shareEmergencyReport;
    window.closeGame = closeGame;
    window.nextNeverHaveIEver = nextNeverHaveIEver;
    window.showTruth = showTruth;
    window.showDare = showDare;
    window.drawCard = drawCard;
    window.addScore = addScore;
    window.resetBeerPong = resetBeerPong;
    window.toggleFlipTimer = toggleFlipTimer;
    window.resetFlipTimer = resetFlipTimer;
    window.nextTrivia = nextTrivia;
    window.answerTrivia = answerTrivia;
    window.pairDeviceFromModal = pairDeviceFromModal;
    window.selectBuddy = selectBuddy;
    window.showFirstAid = showFirstAid;
    window.resolvePermission = resolvePermission;
    
    // Setup auth form
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    // Setup auth listener
    setupAuthListener(onUserAuthenticated);
    
    // Initialize particles
    createParticles();
    
    // Start visualizer
    setInterval(() => {
        updateVisualizer();
    }, 500);
    
    // Load drink history from localStorage
    loadDrinkHistory();
    
    // Update drink type selection to auto-fill amounts
    const drinkTypeSelect = document.getElementById('drinkType');
    if (drinkTypeSelect) {
        drinkTypeSelect.addEventListener('change', function() {
            const preset = DRINK_PRESETS[this.value];
            document.getElementById('drinkAmount').value = preset.amount;
            document.getElementById('alcoholPercent').value = preset.alcohol;
        });
    }
    
    // Hydration reminders
    setInterval(() => {
        const minutes = new Date().getMinutes();
        if (minutes % 15 === 0) {
            showHydrationReminder();
        }
    }, 60000);
});

// ========================================
// USER AUTHENTICATED
// ========================================
async function onUserAuthenticated(user) {
    console.log('User authenticated:', user.email);
    
    try {
        // Hide auth screen
        hideAuthScreen();
        
        // Load user data
        await loadUserData(user);
        
        // Initialize features
        initializeDevices();
        
        // Setup Firebase listeners
        setupFirebaseListeners();
        
        // Initialize UI
        updateUI();
        
        const userData = getAppState().userData;
        const displayName = userData.username || user.email.split('@')[0];
        showNotification(`🎉 Welcome, ${displayName}!`, 'success');
        
    } catch (error) {
        console.error('Error during authentication:', error);
        showNotification('⚠️ Error loading profile', 'error');
    }
}

// ========================================
// FIREBASE LISTENERS (from your original)
// ========================================
function setupFirebaseListeners() {
    const database = getDatabase();
    const currentUser = getCurrentUser();
    if (!database || !currentUser) return;
    
    // Listen for friends
    database.ref('users/' + currentUser.uid + '/friends').on('value', (snapshot) => {
        const friendsData = snapshot.val() || {};
        setStateValue('friendsData', friendsData);
        updateFriendsList();
        document.getElementById('friendCount').textContent = Object.keys(friendsData).length;
        
        // Listen to friends' data
        Object.keys(friendsData).forEach(friendId => {
            listenToFriend(friendId);
        });
    });
    
    // Listen for friend requests
    database.ref('friendRequests/' + currentUser.uid).on('value', (snapshot) => {
        const requests = snapshot.val() || {};
        const friendRequests = Object.entries(requests).map(([id, data]) => ({
            id,
            ...data
        }));
        setStateValue('friendRequests', friendRequests);
        updateFriendRequests();
    });
    
    // Connection status
    database.ref('.info/connected').on('value', (snapshot) => {
        const connected = snapshot.val();
        updateConnectionStatus(connected);
    });
}

// ========================================
// ALL YOUR ORIGINAL FUNCTIONS
// ========================================

// Listen to friend's data
function listenToFriend(friendId) {
    const database = getDatabase();
    const friendsData = getAppState().friendsData;
    const permission = friendsData[friendId]?.permission || 'observer';
    
    if (permission !== 'none') {
        database.ref('users/' + friendId).on('value', (snapshot) => {
            const friendData = snapshot.val();
            if (friendData) {
                processFriendData(friendId, friendData);
            }
        });
    }
}

// Process friend data
function processFriendData(friendId, friendData) {
    const friendsData = getAppState().friendsData;
    const permission = friendsData[friendId]?.permission || 'observer';
    
    // Get friend's device data based on permission
    if (permission === 'guardian' || permission === 'buddy') {
        // Can see BAC data
        Object.keys(friendData.devices || {}).forEach(deviceId => {
            let partyData = getAppState().partyData;
            if (!partyData[deviceId]) {
                partyData[deviceId] = {
                    name: friendData.username,
                    bac: 0,
                    lastUpdate: Date.now(),
                    location: 'Unknown',
                    trend: 'steady',
                    history: [],
                    isFriend: true,
                    friendId: friendId,
                    permission: permission
                };
                setStateValue('partyData', partyData);
            }
            
            // Listen to their device readings
            listenToDevice(deviceId);
        });
    }
}

// Listen to device
function listenToDevice(deviceId) {
    const database = getDatabase();
    database.ref('readings/' + deviceId).on('value', (snapshot) => {
        const reading = snapshot.val();
        if (reading) {
            processDeviceReading(deviceId, reading);
        }
    });
}

// Process device reading
function processDeviceReading(deviceId, reading) {
    let partyData = getAppState().partyData || {};
    const userData = getAppState().userData;
    
    if (!partyData[deviceId]) {
        partyData[deviceId] = {
            name: userData.username || 'You',
            bac: 0,
            lastUpdate: Date.now(),
            location: 'Party',
            trend: 'steady',
            history: [],
            isOwn: true
        };
    }
    
    const oldBac = partyData[deviceId].bac;
    partyData[deviceId].bac = reading.bac || 0;
    partyData[deviceId].lastUpdate = Date.now();
    partyData[deviceId].trend = reading.bac > oldBac ? 'up' : reading.bac < oldBac ? 'down' : 'steady';
    
    // Add to history
    partyData[deviceId].history.push({
        time: Date.now(),
        value: reading.bac
    });
    
    // Keep history reasonable
    if (partyData[deviceId].history.length > 50) {
        partyData[deviceId].history.shift();
    }
    
    setStateValue('partyData', partyData);
    updateUI();
    
    // Check for alerts
    if (reading.bac >= 0.08) {
        showNotification(`⚠️ Your BAC is too high: ${reading.bac.toFixed(3)}‰`, 'error');
    }
}

// ========================================
// UI FUNCTIONS
// ========================================
function switchSection(sectionId) {
    try {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
        
        // Find and activate the correct nav item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.onclick && item.onclick.toString().includes(sectionId)) {
                item.classList.add('active');
            }
        });
        
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }
        
        // Section-specific initializations
        if (sectionId === 'achievements') {
            updateAchievements();
        } else if (sectionId === 'drinks') {
            updateDrinkStats();
            updateDrinkChart();
        } else if (sectionId === 'devices') {
            // Already handled by device module
        } else if (sectionId === 'friends') {
            updateFriendsList();
        } else if (sectionId === 'settings') {
            updateToggleSwitches();
        }
    } catch (error) {
        console.error('Section switch failed:', error);
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('show');
    }
}

function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.onclick = () => notif.remove();
    document.body.appendChild(notif);
    
    setTimeout(() => {
        if (notif.parentNode) {
            notif.remove();
        }
    }, 4000);
}

function createParticles() {
    try {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    } catch (error) {
        console.error('Particle creation failed:', error);
    }
}

function updateVisualizer() {
    const visualizer = document.getElementById('visualizer');
    if (!visualizer || !document.getElementById('dashboard').classList.contains('active')) return;
    
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

function updateConnectionStatus(connected) {
    const statusElement = document.getElementById('connectionStatus');
    const dotElement = document.querySelector('.status-dot');
    
    if (statusElement && dotElement) {
        if (connected) {
            statusElement.textContent = 'Connected';
            dotElement.style.background = '#00ff88';
        } else {
            statusElement.textContent = 'Offline';
            dotElement.style.background = '#ff4444';
        }
    }
}

// ========================================
// MODAL FUNCTIONS (Complete from original)
// ========================================
function showModal(type, data = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    
    switch(type) {
        case 'pair-device':
            content = `
                <h2>📱 Pair New Device</h2>
                <p>After setting up your breathalyzer, enter the Device ID shown on its screen:</p>
                
                <div class="form-group" style="margin: 20px 0;">
                    <input type="text" id="modalDeviceId" placeholder="Enter Device ID (e.g., HSG_abc123)" style="text-transform: uppercase;">
                </div>
                
                <button class="btn btn-primary" onclick="pairDeviceFromModal()">
                    <i class="fas fa-link"></i> Pair Device
                </button>
                <button class="btn" onclick="closeModal()">Cancel</button>
                
                <div class="info-box" style="margin-top: 20px;">
                    <p><strong>Can't find your Device ID?</strong></p>
                    <ol>
                        <li>Power on your device</li>
                        <li>Double-flip the switch for setup mode</li>
                        <li>Connect to the device's WiFi</li>
                        <li>Complete setup to see your Device ID</li>
                    </ol>
                </div>
            `;
            break;
            
        case 'checkin':
            content = `
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${['Dorm A - Room Party', 'Student Bar', 'Library Cafe', 'Sports Center', 'Main Campus', 'Off Campus'].map(loc => 
                        `<button class="btn" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('${loc}')">${loc}</button>`
                    ).join('')}
                </div>
                <button class="btn" onclick="closeModal()">Cancel</button>
            `;
            break;
            
        case 'emergency':
            content = `
                <h2>🚨 Emergency Contacts</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Ambulance:</strong> 112</p>
                    <p><strong>HSG Security:</strong> +41 71 224 2424</p>
                    <p><strong>Poison Control:</strong> 145</p>
                    <p><strong>Mental Health Crisis:</strong> 143</p>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">
                    <i class="fas fa-phone"></i> Call 112 Now
                </button>
                <button class="btn" onclick="showFirstAid()">
                    <i class="fas fa-medkit"></i> First Aid Guide
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
            
        case 'first-aid':
            content = `
                <h2>🏥 First Aid Guide</h2>
                <div class="first-aid-card">
                    <h3>Signs of Alcohol Poisoning:</h3>
                    <ul>
                        <li>Confusion, stupor</li>
                        <li>Vomiting</li>
                        <li>Seizures</li>
                        <li>Slow or irregular breathing</li>
                        <li>Unconsciousness</li>
                    </ul>
                </div>
                <div class="first-aid-card">
                    <h3>What to Do:</h3>
                    <div class="first-aid-step" data-step="1">Call 112 immediately</div>
                    <div class="first-aid-step" data-step="2">Keep them awake and sitting up</div>
                    <div class="first-aid-step" data-step="3">Give them water if conscious</div>
                    <div class="first-aid-step" data-step="4">Keep them warm</div>
                    <div class="first-aid-step" data-step="5">Stay with them</div>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">Emergency Call</button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
            
        case 'friend-details':
            content = `
                <h2>Friend Details</h2>
                <div id="friendDetailsContent"></div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
            
        case 'buddy-system':
            const partyData = getAppState().partyData;
            content = `
                <h2>👥 Buddy System</h2>
                <p>Choose your buddy for tonight:</p>
                <div class="buddy-list">
                    ${Object.values(partyData).map(friend => `
                        <div class="buddy-card" onclick="selectBuddy('${friend.name}')">
                            <div style="font-size: 2em; margin-bottom: 10px;">${friend.isOwn ? '👤' : '👥'}</div>
                            <div>${friend.name}</div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
            
        case 'safe-friends':
            const partyDataSafe = getAppState().partyData;
            const safeFriends = Object.values(partyDataSafe).filter(f => f.bac < 0.02);
            content = `
                <h2>✅ Friends Safe to Drive</h2>
                <div style="margin: 20px 0;">
                    ${safeFriends.length > 0 ? safeFriends.map(friend => `
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div>${friend.name}</div>
                            <div>BAC: ${friend.bac.toFixed(3)}‰</div>
                        </div>
                    `).join('') : '<p>No friends are currently safe to drive.</p>'}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
            
        case 'locations':
            content = `
                <h2>📍 Active Party Locations</h2>
                <div class="location-map" style="height: 400px;">
                    ${createLocationMap()}
                </div>
                <div style="margin: 20px 0;">
                    ${getActiveLocations().map(loc => `
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${loc.name}</strong></div>
                            <div>${loc.count} people</div>
                            <div>Avg BAC: ${loc.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('show');
    
    // Initialize location map if needed
    if (type === 'checkin' || type === 'locations') {
        setTimeout(initializeLocationMap, 100);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}
