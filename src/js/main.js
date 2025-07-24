// ========================================
// MAIN ENTRY POINT - Complete Application
// ========================================

import { initializeFirebase, getFirebaseDatabase } from './config/firebase.js';
import { setupAuthListener, handleAuthSubmit, toggleAuthMode, signOut, loadUserData, hideAuthScreen } from './auth/auth.js';
import { initializeDevices } from './features/devices.js';
import { updateUI } from './ui/dashboard.js';
import { showNotification } from './ui/notifications.js';
import { DRINK_PRESETS } from './config/constants.js';
import { ref, onValue } from 'firebase/database';
import { 
    getAppState, 
    setStateValue, 
    getCurrentUser,
    clearAppState
} from './config/app-state.js';
import { registerServiceWorker, initializePWA, initializeOfflineStorage } from './utils/pwa.js';

// Import all functions from feature modules
import * as AllFunctions from './features/all-functions.js';
import * as Drinks from './features/drinks.js';
import * as Games from './features/games.js';
import * as Achievements from './features/achievements.js';
import * as Devices from './features/devices.js';
import * as Parties from './features/parties.js';

// ========================================
// EXPOSE ALL FUNCTIONS GLOBALLY
// ========================================
// This is necessary for HTML onclick handlers to work
function exposeGlobalFunctions() {
    // Auth functions
    window.toggleAuthMode = toggleAuthMode;
    window.signOut = signOut;
    
    // UI functions
    window.updateUI = updateUI;
    window.switchSection = switchSection;
    window.toggleMobileMenu = toggleMobileMenu;
    window.showNotification = showNotification;
    window.showModal = showModal;
    window.closeModal = closeModal;
    
    // All functions from all-functions.js
    window.searchFriends = AllFunctions.searchFriends;
    window.sendFriendRequest = AllFunctions.sendFriendRequest;
    window.acceptFriendRequest = AllFunctions.acceptFriendRequest;
    window.declineFriendRequest = AllFunctions.declineFriendRequest;
    window.updateFriendPermission = AllFunctions.updateFriendPermission;
    window.removeFriend = AllFunctions.removeFriend;
    window.sendMessage = AllFunctions.sendMessage;
    window.handleChatEnter = AllFunctions.handleChatEnter;
    window.showHydrationReminder = AllFunctions.showHydrationReminder;
    window.checkInLocation = AllFunctions.checkInLocation;
    window.callUber = AllFunctions.callUber;
    window.callEmergency = AllFunctions.callEmergency;
    window.selectBuddy = AllFunctions.selectBuddy;
    window.showFirstAid = AllFunctions.showFirstAid;
    window.updateProfile = AllFunctions.updateProfile;
    window.changePassword = AllFunctions.changePassword;
    window.saveEmergencyInfo = AllFunctions.saveEmergencyInfo;
    window.savePrivacySettings = AllFunctions.savePrivacySettings;
    window.exportData = AllFunctions.exportData;
    window.pairDeviceFromModal = AllFunctions.pairDeviceFromModal;
    window.resolvePermission = AllFunctions.resolvePermission;
    
    // Drink functions
    window.logDrink = Drinks.logDrink;
    window.toggleChart = Drinks.toggleChart;
    window.removeDrink = Drinks.removeDrink;
    window.showEmergencyReport = Drinks.showEmergencyReport;
    window.copyEmergencyReport = Drinks.copyEmergencyReport;
    window.downloadEmergencyReport = Drinks.downloadEmergencyReport;
    window.shareEmergencyReport = Drinks.shareEmergencyReport;
    window.clearDrinkHistory = Drinks.clearDrinkHistory;
    window.deleteAccount = AllFunctions.deleteAccount;
    
    // Game functions
    window.startGame = Games.startGame;
    window.closeGame = Games.closeGame;
    window.nextNeverHaveIEver = Games.nextNeverHaveIEver;
    window.showTruth = Games.showTruth;
    window.showDare = Games.showDare;
    window.drawCard = Games.drawCard;
    window.addScore = Games.addScore;
    window.resetBeerPong = Games.resetBeerPong;
    window.toggleFlipTimer = Games.toggleFlipTimer;
    window.resetFlipTimer = Games.resetFlipTimer;
    window.nextTrivia = Games.nextTrivia;
    window.answerTrivia = Games.answerTrivia;
    
    // Also expose some internal functions that are used
    window.getActiveLocations = AllFunctions.getActiveLocations;
    window.createLocationMap = AllFunctions.createLocationMap;
    window.initializeLocationMap = AllFunctions.initializeLocationMap;
    window.updateFriendRequests = AllFunctions.updateFriendRequests;
    window.updateFriendsList = AllFunctions.updateFriendsList;
    window.escapeHtml = AllFunctions.escapeHtml;
    
    // Achievement functions
    window.updateAchievements = Achievements.updateAchievements;
    window.updateAchievementProgress = Achievements.updateAchievementProgress;
    window.checkAchievements = Achievements.checkAchievements;
    
    // Device functions
    window.pairDeviceById = Devices.pairDeviceById;
    window.unpairDevice = Devices.unpairDevice;
    window.renameDevice = Devices.renameDevice;
    
    // Party functions
    window.createNewParty = createNewParty;
    window.joinPartyByCode = joinPartyByCode;
    window.leaveCurrentParty = leaveCurrentParty;
    window.approveJoinRequest = Parties.approveJoinRequest;
    window.rejectJoinRequest = Parties.rejectJoinRequest;
    window.setCurrentParty = Parties.setCurrentParty;
    window.quickAddPartyFriend = Parties.quickAddFriend;
}

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting BoozeLens app initialization...');
    
    // Expose all functions globally first
    exposeGlobalFunctions();
    
    // First, unregister any existing service workers that might be blocking auth
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            if (registrations.length > 0) {
                registrations.forEach(registration => {
                    registration.unregister();
                    console.log('Unregistered old service worker:', registration.scope);
                });
                // Reload after unregistering to ensure clean state
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return;
            }
        });
    }
    
    // Initialize PWA features with fixed service worker
    try {
        if (registerServiceWorker) {
            registerServiceWorker().catch(err => {
                console.warn('Service worker registration failed:', err);
            });
        }
        if (initializePWA) {
            initializePWA();
        }
        if (initializeOfflineStorage) {
            initializeOfflineStorage();
        }
    } catch (pwaError) {
        console.warn('PWA initialization error (non-critical):', pwaError);
    }
    
    // Initialize Firebase
    const firebaseReady = initializeFirebase();
    if (!firebaseReady) {
        console.error('Firebase failed to initialize!');
        showNotification('❌ Failed to connect to Firebase', 'error');
        return;
    }
    
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
    Drinks.loadDrinkHistory();
    
    // Setup drink type selection
    const drinkTypeSelect = document.getElementById('drinkType');
    if (drinkTypeSelect) {
        drinkTypeSelect.addEventListener('change', function() {
            const preset = DRINK_PRESETS[this.value];
            document.getElementById('drinkAmount').value = preset.amount;
            document.getElementById('alcoholPercent').value = preset.alcohol;
        });
    }
    
    // Setup toggle switches
    document.querySelectorAll('.toggle-switch input').forEach(input => {
        input.addEventListener('change', function() {
            const toggle = this.closest('.toggle-switch');
            if (this.checked) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });
    });
    
    // Hydration reminders
    setInterval(() => {
        const minutes = new Date().getMinutes();
        if (minutes % 15 === 0) {
            AllFunctions.showHydrationReminder();
        }
    }, 60000);
    
    // Window click handlers
    window.onclick = (event) => {
        if (event.target.className === 'modal show') {
            closeModal();
        }
        if (event.target.className === 'game-overlay show') {
            Games.closeGame();
        }
    };
    
    // Save data before unload
    window.addEventListener('beforeunload', () => {
        Drinks.saveDrinkHistory();
    });
    
    // Error recovery
    window.addEventListener('unhandledrejection', event => {
        console.error('Unhandled promise rejection:', event.reason);
        if (event.reason && event.reason.code && event.reason.code.includes('auth')) {
            showNotification('⚠️ Authentication issue. Try refreshing.', 'error');
        }
    });
    
    console.log('✅ App initialization complete!');
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
        
        // Load achievements
        Achievements.loadAchievements();
        
        // Setup Firebase listeners
        setupFirebaseListeners();
        
        // Load user settings
        loadUserSettings();
        
        // Track first timer achievement
        Achievements.onFirstLogin();
        
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
// FIREBASE LISTENERS
// ========================================
function setupFirebaseListeners() {
    const database = getFirebaseDatabase();
    const currentUser = getCurrentUser();
    if (!database || !currentUser) return;
    
    // Listen for friends
    onValue(ref(database, 'users/' + currentUser.uid + '/friends'), (snapshot) => {
        const friendsData = snapshot.val() || {};
        setStateValue('friendsData', friendsData);
        AllFunctions.updateFriendsList();
        document.getElementById('friendCount').textContent = Object.keys(friendsData).length;
        
        // Listen to friends' data
        Object.keys(friendsData).forEach(friendId => {
            listenToFriend(friendId);
        });
    });
    
    // Listen for friend requests
    onValue(ref(database, 'friendRequests/' + currentUser.uid), (snapshot) => {
        const requests = snapshot.val() || {};
        const friendRequests = Object.entries(requests).map(([id, data]) => ({
            id,
            ...data
        }));
        setStateValue('friendRequests', friendRequests);
        AllFunctions.updateFriendRequests();
    });
    
    // Connection status
    onValue(ref(database, '.info/connected'), (snapshot) => {
        const connected = snapshot.val();
        updateConnectionStatus(connected);
    });
}

// Listen to friend's data
function listenToFriend(friendId) {
    const database = getFirebaseDatabase();
    const friendsData = getAppState().friendsData;
    const permission = friendsData[friendId]?.permission || 'observer';
    
    if (permission !== 'none') {
        onValue(ref(database, 'users/' + friendId), (snapshot) => {
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
    const database = getFirebaseDatabase();
    onValue(ref(database, 'readings/' + deviceId), (snapshot) => {
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
            Achievements.updateAchievements();
        } else if (sectionId === 'drinks') {
            Drinks.updateDrinkStats();
            Drinks.updateDrinkChart();
            Drinks.updateDrinkHistory();
            Drinks.updateEmergencySummary();
        } else if (sectionId === 'devices') {
            // Already handled by device module
        } else if (sectionId === 'friends') {
            AllFunctions.updateFriendsList();
        } else if (sectionId === 'settings') {
            AllFunctions.updateToggleSwitches();
        } else if (sectionId === 'parties') {
            updatePartyUI();
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
// MODAL FUNCTIONS
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
                    ${AllFunctions.createLocationMap()}
                </div>
                <div style="margin: 20px 0;">
                    ${AllFunctions.getActiveLocations().map(loc => `
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
        setTimeout(AllFunctions.initializeLocationMap, 100);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

// ========================================
// LOAD USER SETTINGS
// ========================================
function loadUserSettings() {
    const userData = getAppState().userData;
    
    // Load from Firebase
    if (userData.settings) {
        const settings = userData.settings;
        
        if (settings.shareLocation !== undefined) {
            document.getElementById('shareLocation').checked = settings.shareLocation;
        }
        if (settings.notifications !== undefined) {
            document.getElementById('notifications').checked = settings.notifications;
        }
        if (settings.publicProfile !== undefined) {
            document.getElementById('publicProfile').checked = settings.publicProfile;
        }
    }
    
    // Load emergency info
    if (userData.emergency) {
        const emergency = userData.emergency;
        
        if (emergency.homeAddress) {
            document.getElementById('homeAddress').value = emergency.homeAddress;
            localStorage.setItem('homeAddress', emergency.homeAddress);
        }
        if (emergency.emergencyContact) {
            document.getElementById('emergencyContact').value = emergency.emergencyContact;
            localStorage.setItem('emergencyContact', emergency.emergencyContact);
        }
        if (emergency.medicalInfo) {
            document.getElementById('medicalInfo').value = emergency.medicalInfo;
            localStorage.setItem('medicalInfo', emergency.medicalInfo);
        }
        if (emergency.safetyNotes) {
            document.getElementById('safetyNotes').value = emergency.safetyNotes;
            localStorage.setItem('safetyNotes', emergency.safetyNotes);
        }
    }
    
    // Update toggle switches visual state
    AllFunctions.updateToggleSwitches();
}

// ========================================
// PARTY FUNCTIONS
// ========================================
async function createNewParty() {
    const name = document.getElementById('partyName').value.trim();
    const address = document.getElementById('partyAddress').value.trim();
    const description = document.getElementById('partyDescription').value.trim();
    const privacy = document.getElementById('partyPrivacy').value;
    
    if (!name) {
        showNotification('Please enter a party name', 'error');
        return;
    }
    
    const result = await Parties.createParty({
        name,
        address,
        description,
        privacy
    });
    
    if (result) {
        // Clear form
        document.getElementById('partyName').value = '';
        document.getElementById('partyAddress').value = '';
        document.getElementById('partyDescription').value = '';
        
        // Update UI
        updatePartyUI();
    }
}

async function joinPartyByCode() {
    const code = document.getElementById('joinPartyCode').value.trim();
    
    if (!code) {
        showNotification('Please enter a party code', 'error');
        return;
    }
    
    await Parties.joinParty(code);
    
    // Clear input
    document.getElementById('joinPartyCode').value = '';
    
    // Update UI
    updatePartyUI();
}

async function leaveCurrentParty() {
    const currentPartyId = Parties.getCurrentPartyId();
    if (currentPartyId) {
        await Parties.leaveParty(currentPartyId);
        updatePartyUI();
    }
}

async function updatePartyUI() {
    // Update current party section
    const currentPartyId = Parties.getCurrentPartyId();
    const currentPartySection = document.getElementById('currentPartySection');
    
    if (currentPartyId && currentPartySection) {
        // Show current party section
        currentPartySection.style.display = 'block';
        
        // We'll update the party details when we receive the partyUpdate event
    } else if (currentPartySection) {
        currentPartySection.style.display = 'none';
    }
    
    // Update my parties list
    const myParties = await Parties.getUserParties();
    const myPartiesList = document.getElementById('myPartiesList');
    if (myPartiesList) {
        myPartiesList.innerHTML = myParties.map(party => `
            <div class="party-card ${party.id === currentPartyId ? 'active' : ''}" onclick="setCurrentParty('${party.id}')">
                <span class="party-privacy-badge privacy-${party.privacy}">
                    ${party.privacy.replace('_', ' ')}
                </span>
                <h4>${party.name}</h4>
                ${party.address ? `<p><i class="fas fa-map-marker-alt"></i> ${party.address}</p>` : ''}
                <div class="party-members">
                    ${Object.keys(party.members || {}).slice(0, 5).map(() => 
                        `<div class="member-avatar">👤</div>`
                    ).join('')}
                    ${Object.keys(party.members || {}).length > 5 ? 
                        `<span class="party-member-count">+${Object.keys(party.members).length - 5}</span>` : ''}
                </div>
                <p style="margin-top: 10px; opacity: 0.7;">Code: ${party.code}</p>
            </div>
        `).join('') || '<p style="opacity: 0.7;">No parties yet. Create one above!</p>';
    }
    
    // Update public parties
    const publicParties = await Parties.searchPublicParties();
    const publicPartiesList = document.getElementById('publicPartiesList');
    if (publicPartiesList) {
        publicPartiesList.innerHTML = publicParties.map(party => `
            <div class="party-card" onclick="Parties.joinParty('${party.code}')">
                <h4>${party.name}</h4>
                ${party.address ? `<p><i class="fas fa-map-marker-alt"></i> ${party.address}</p>` : ''}
                <div class="party-members">
                    <span>${party.memberCount} members</span>
                </div>
                <button class="btn btn-primary" style="margin-top: 10px;">
                    <i class="fas fa-sign-in-alt"></i> Join
                </button>
            </div>
        `).join('') || '<p style="opacity: 0.7;">No public parties available</p>';
    }
}

// Listen for party events
window.addEventListener('partyChanged', (event) => {
    updatePartyUI();
    updateUI(); // Update main dashboard
});

window.addEventListener('partyUpdate', async (event) => {
    const party = event.detail;
    const currentUser = getCurrentUser();
    
    // Update current party display
    document.getElementById('currentPartyName').textContent = party.name;
    document.getElementById('currentPartyCode').textContent = party.code;
    
    // Update party leaderboard
    const leaderboard = await Parties.getPartyLeaderboard(party.id);
    const partyLeaderboard = document.getElementById('partyLeaderboard');
    if (partyLeaderboard) {
        partyLeaderboard.innerHTML = leaderboard.map((member, index) => `
            <div class="party-leaderboard-item">
                <span class="rank rank-${index + 1}">#${index + 1}</span>
                <span>${member.name}</span>
                <span>${member.bac.toFixed(3)}‰</span>
                ${member.id !== currentUser.uid ? 
                    `<button class="quick-add-btn" onclick="quickAddPartyFriend('${member.id}')">+</button>` : ''}
            </div>
        `).join('') || '<p>No data yet</p>';
    }
    
    // Update members list
    const membersList = document.getElementById('partyMembersList');
    if (membersList && party.members) {
        membersList.innerHTML = Object.entries(party.members).map(([id, member]) => `
            <div class="friend-item">
                <div class="friend-info">
                    <div class="friend-avatar-small">👤</div>
                    <div class="friend-details">
                        <h4>${member.name}</h4>
                        <p>${member.role}</p>
                    </div>
                </div>
                ${id !== currentUser.uid && party.creatorId === currentUser.uid ? 
                    `<button class="btn btn-sm" onclick="Parties.removeFromParty('${party.id}', '${id}')">Remove</button>` : ''}
            </div>
        `).join('');
    }
    
    // Show join requests if user is creator
    const requestsSection = document.getElementById('partyRequestsSection');
    const requestsList = document.getElementById('partyRequestsList');
    if (party.creatorId === currentUser.uid && party.pendingRequests && Object.keys(party.pendingRequests).length > 0) {
        requestsSection.style.display = 'block';
        requestsList.innerHTML = Object.entries(party.pendingRequests).map(([userId, request]) => `
            <div class="party-request-item">
                <div>
                    <strong>${request.name}</strong>
                    <p style="opacity: 0.7; font-size: 0.9em;">Requested ${new Date(request.requestedAt).toLocaleString()}</p>
                </div>
                <div class="party-request-actions">
                    <button class="approve-btn" onclick="approveJoinRequest('${party.id}', '${userId}')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="reject-btn" onclick="rejectJoinRequest('${party.id}', '${userId}')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                </div>
            </div>
        `).join('');
    } else if (requestsSection) {
        requestsSection.style.display = 'none';
    }
});

// Make sure to expose setCurrentParty
window.setCurrentParty = function(partyId) {
    Parties.setCurrentParty(partyId);
}