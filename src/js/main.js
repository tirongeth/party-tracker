// ========================================
// MAIN ENTRY POINT - Complete Application
// ========================================

import { initializeFirebase, getFirebaseDatabase } from './config/firebase.js';
import { setupAuthListener, handleAuthSubmit, toggleAuthMode, signOut, loadUserData, hideAuthScreen } from './auth/auth.js';
import { initializeDevices } from './features/devices.js';
import { updateUI } from './ui/dashboard.js';
import { showNotification } from './ui/notifications.js';
import { DRINK_PRESETS } from './config/constants.js';
import { ref, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { 
    getAppState, 
    setStateValue, 
    getCurrentUser,
    clearAppState
} from './config/app-state.js';
import { isDeveloper } from './config/constants.js';
import { registerServiceWorker, initializePWA, initializeOfflineStorage } from './utils/pwa.js';
import { safeUpdatePartyDisplay } from './main-party-display.js';

// Import all functions from feature modules
import * as AllFunctions from './features/all-functions.js';
import * as Drinks from './features/drinks.js';
import * as Games from './features/games.js';
import * as Achievements from './features/achievements.js';
import * as Devices from './features/devices.js';
import * as PartiesModule from './features/parties.js';
import * as PartiesUI from './features/parties-ui.js';
import * as Photos from './features/photos.js';

// ========================================
// PARTY MODULE REFERENCE
// ========================================
let Parties = null;

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
    
    // Party functions - ONLY expose if Parties module is loaded
    if (Parties) {
        window.createParty = Parties.createParty;
        window.joinParty = Parties.joinParty;
        window.leaveParty = Parties.leaveParty;
        window.deleteParty = Parties.deleteParty;
        window.sendPartyMessage = Parties.sendPartyMessage;
        window.getPartyByCode = Parties.getPartyByCode;
        window.getNearbyParties = Parties.getNearbyParties;
        window.getFriendsParties = Parties.getFriendsParties;
        window.updatePartyDisplay = updatePartyDisplay; // Use main.js version, not parties.js
        
        // New creator control functions
        window.kickMember = Parties.kickMember;
        window.updatePartySettings = Parties.updatePartySettings;
        window.togglePartyLock = Parties.togglePartyLock;
        
        // Multi-party support
        window.switchToParty = Parties.switchToParty;
        window.getUserParties = () => Parties.userParties;
    }
    
    // Party UI functions
    window.createNewParty = PartiesUI.createNewParty;
    window.joinPartyByCode = PartiesUI.joinPartyByCode;
    window.leaveCurrentParty = PartiesUI.leaveCurrentParty;
    window.sendPartyChat = PartiesUI.sendPartyChat;
    window.refreshPublicParties = PartiesUI.refreshPublicParties;
    window.joinPublicParty = PartiesUI.joinPublicParty;
    window.isDeveloper = isDeveloper; // Expose for parties-ui.js
    
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
    
    // Player management functions
    window.addPlayer = Games.addPlayer;
    window.removePlayer = Games.removePlayer;
    window.resetToPlayerSetup = Games.resetToPlayerSetup;
    window.startNeverHaveIEver = Games.startNeverHaveIEver;
    window.startTruthOrDare = Games.startTruthOrDare;
    window.nextTurnTruthOrDare = Games.nextTurnTruthOrDare;
    
    // New game functions
    window.startWouldYouRather = Games.startWouldYouRather;
    window.nextWouldYouRather = Games.nextWouldYouRather;
    window.voteWouldYouRather = Games.voteWouldYouRather;
    window.startMostLikelyTo = Games.startMostLikelyTo;
    window.nextMostLikelyTo = Games.nextMostLikelyTo;
    window.showVotes = Games.showVotes;
    window.startSpinBottle = Games.startSpinBottle;
    window.spinBottle = Games.spinBottle;
    window.showBeerPongRules = Games.showBeerPongRules;
    window.showBeerPongGame = Games.showBeerPongGame;
    window.showBeerPongTournament = Games.showBeerPongTournament;
    window.setupTournament = Games.setupTournament;
    window.startTournament = Games.startTournament;
    window.selectWinner = Games.selectWinner;
    window.resetTournament = Games.resetTournament;
    window.startNormalBeerPong = Games.startNormalBeerPong;
    window.startSpecialBeerPong = Games.startSpecialBeerPong;
    window.startGameWithNames = Games.startGameWithNames;
    window.hitCup = Games.hitCup;
    window.closeRuleDisplay = Games.closeRuleDisplay;
    window.resetSpecialGame = Games.resetSpecialGame;
    window.selectGameCategory = Games.selectGameCategory;
    window.changeCategoryMidGame = Games.changeCategoryMidGame;
    window.selectSpecialBeerPongCategory = Games.selectSpecialBeerPongCategory;
    
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
    
    // Photo functions
    window.refreshPhotoFeed = Photos.refreshPhotoFeed;
    window.filterPhotos = Photos.filterPhotos;
    window.toggleLike = Photos.toggleLike;
    window.addComment = Photos.addComment;
    window.deletePhoto = Photos.deletePhoto;
    window.viewPhoto = Photos.viewPhoto;
    window.showComments = Photos.showComments;
    window.sharePhoto = Photos.sharePhoto;
    window.handleBoozeLensUpload = Photos.handlePhotoUpload;
    
    console.log('✅ All functions exposed globally including party functions');
}


// ========================================
// PARTY EVENT MANAGEMENT SYSTEM
// ========================================
class PartyEventManager {
    constructor() {
        this.initialized = false;
        this.handlers = new Map();
        this.moduleReady = false;
    }

    // Initialize the event system
    async init() {
        if (this.initialized) return;
        
        console.log('🎯 Initializing Party Event Manager');
        
        // Wait for party module to be ready
        await this.waitForModule();
        
        // Set up event delegation
        this.setupEventDelegation();
        
        // Set up form handlers
        this.setupFormHandlers();
        
        this.initialized = true;
        console.log('✅ Party Event Manager initialized');
    }

    // Wait for party module to load
    async waitForModule() {
        const maxAttempts = 50; // 5 seconds max
        let attempts = 0;
        
        while (!window.Parties && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.Parties) {
            throw new Error('Party module failed to load');
        }
        
        this.moduleReady = true;
    }

    // Set up centralized event delegation
    setupEventDelegation() {
        // Remove any existing listeners first
        if (this.delegationHandler) {
            document.removeEventListener('click', this.delegationHandler);
        }
        
        // Create delegation handler
        this.delegationHandler = async (e) => {
            // Party button handlers
            const handlers = {
                '#createPartyBtn': () => this.handleCreateParty(),
                '#joinPartyBtn': () => this.handleJoinParty(),
                '#leavePartyBtn': () => this.handleLeaveParty(),
                '#sendPartyChatBtn': () => this.handleSendChat(),
                '#refreshPartiesBtn': () => this.handleRefreshParties(),
                '#refreshFriendsPartiesBtn': () => this.handleRefreshFriendsParties(),
                '[data-action="join-public-party"]': (target) => this.handleJoinPublicParty(target.dataset.partyCode)
            };
            
            // Check each handler
            for (const [selector, handler] of Object.entries(handlers)) {
                const target = e.target.closest(selector);
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (!this.moduleReady) {
                        showNotification('App still loading, please wait...', 'warning');
                        return;
                    }
                    
                    try {
                        await handler(target);
                    } catch (error) {
                        console.error('Event handler error:', error);
                        showNotification('An error occurred. Please try again.', 'error');
                    }
                    break;
                }
            }
        };
        
        // Add the delegation handler
        document.addEventListener('click', this.delegationHandler);
    }

    // Set up form-specific handlers
    setupFormHandlers() {
        // Party chat enter key
        const chatInput = document.getElementById('partyChatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendChat();
                }
            });
        }
        
        // Privacy select change
        const privacySelect = document.getElementById('partyPrivacy');
        const durationSelect = document.getElementById('partyDuration');
        if (privacySelect && durationSelect) {
            privacySelect.addEventListener('change', (e) => {
                const ongoingOption = durationSelect.querySelector('option[value="ongoing"]');
                if (!ongoingOption) return;
                
                if (e.target.value === 'public') {
                    ongoingOption.style.display = 'none';
                    if (durationSelect.value === 'ongoing') {
                        durationSelect.value = '24h';
                    }
                } else {
                    ongoingOption.style.display = '';
                }
            });
        }
    }

    // Handle create party
    async handleCreateParty() {
        // Check authentication first
        if (!getCurrentUser()) {
            showNotification('Please sign in to create a party', 'error');
            return;
        }
        
        const nameInput = document.getElementById('partyName');
        const privacySelect = document.getElementById('partyPrivacy');
        const durationSelect = document.getElementById('partyDuration');
        const addressInput = document.getElementById('partyAddress');
        
        if (!nameInput?.value.trim()) {
            showNotification('Please enter a party name', 'error');
            return;
        }
        
        const options = {
            privacy: privacySelect?.value || 'private',
            duration: durationSelect?.value || '24h',
            address: addressInput?.value || ''
        };
        
        try {
            const result = await Parties.createParty(nameInput.value.trim(), options);
            if (result.success) {
                showNotification(`Party created! Code: ${result.code}`, 'success');
                nameInput.value = '';
                if (addressInput) addressInput.value = '';
                updatePartyDisplay();
            } else {
                showNotification(result.error || 'Failed to create party', 'error');
            }
        } catch (error) {
            console.error('Create party error:', error);
            showNotification('Failed to create party', 'error');
        }
    }

    // Handle join party
    async handleJoinParty() {
        // Check authentication first
        if (!getCurrentUser()) {
            showNotification('Please sign in to join a party', 'error');
            return;
        }
        
        const codeInput = document.getElementById('joinPartyCode');
        if (!codeInput?.value.trim()) {
            showNotification('Please enter a party code', 'error');
            return;
        }
        
        const code = codeInput.value.trim().toUpperCase();
        
        try {
            // Preview party first
            showNotification('Checking party...', 'info');
            const party = await Parties.getPartyByCode(code);
            
            if (!party) {
                showNotification('Invalid party code', 'error');
                return;
            }
            
            // Show confirmation dialog
            const memberCount = Object.keys(party.members || {}).length;
            const confirmMsg = `Join "${party.name}"?\n` +
                `👥 ${memberCount} members\n` +
                `🔒 Privacy: ${party.privacy || 'Unknown'}\n` +
                `📍 ${party.address || 'No location set'}\n` +
                `⏱️ ${party.duration === '24h' ? '24 hour party' : 'Ongoing party'}`;
            
            if (!confirm(confirmMsg)) return;
            
            const result = await Parties.joinParty(code);
            if (result.success) {
                if (result.pending) {
                    showNotification('Join request sent! Waiting for approval.', 'info');
                } else if (result.alreadyMember) {
                    showNotification('Rejoined party!', 'success');
                } else {
                    showNotification('Joined party!', 'success');
                }
                codeInput.value = '';
                updatePartyDisplay();
            } else {
                showNotification(result.error || 'Failed to join party', 'error');
            }
        } catch (error) {
            console.error('Join party error:', error);
            showNotification('Failed to join party', 'error');
        }
    }

    // Handle leave party
    async handleLeaveParty() {
        const currentParty = Parties.currentParty;
        const currentUser = getCurrentUser();
        
        if (!currentParty) return;
        
        const isCreator = currentUser && currentParty.creatorId === currentUser.uid;
        const confirmMsg = isCreator 
            ? 'Delete this party? This will remove all members.' 
            : 'Leave this party?';
        
        if (!confirm(confirmMsg)) return;
        
        try {
            const result = isCreator 
                ? await Parties.deleteParty()
                : await Parties.leaveParty();
                
            if (result.success) {
                showNotification(isCreator ? 'Party deleted' : 'Left party', 'info');
                updatePartyDisplay();
            } else {
                showNotification(result.error || 'Operation failed', 'error');
            }
        } catch (error) {
            console.error('Leave/delete party error:', error);
            showNotification('Operation failed', 'error');
        }
    }

    // Handle send chat
    async handleSendChat() {
        const input = document.getElementById('partyChatInput');
        if (!input?.value.trim()) return;
        
        try {
            const result = await Parties.sendPartyMessage(input.value.trim());
            if (result.success) {
                input.value = '';
            }
        } catch (error) {
            console.error('Send chat error:', error);
            showNotification('Failed to send message', 'error');
        }
    }

    // Handle refresh public parties
    async handleRefreshParties() {
        const listEl = document.getElementById('publicPartiesList');
        if (!listEl) return;
        
        listEl.innerHTML = '<p style="opacity: 0.7;">Loading parties...</p>';
        
        try {
            const publicParties = await Parties.getNearbyParties();
            
            if (publicParties.length === 0) {
                listEl.innerHTML = '<p style="opacity: 0.7;">No public parties found. Create one!</p>';
                return;
            }
            
            listEl.innerHTML = publicParties.map(party => `
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4>${party.name}</h4>
                            <p style="opacity: 0.7;">
                                👥 ${party.memberCount} members
                                ${party.address ? `• 📍 ${party.address}` : ''}
                                ${party.duration === '24h' ? '• ⏰ 24h party' : ''}
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-party-code="${party.code}">
                        Join
                    </button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Refresh parties error:', error);
            listEl.innerHTML = '<p style="opacity: 0.7;">Failed to load parties</p>';
        }
    }

    // Handle refresh friends' parties
    async handleRefreshFriendsParties() {
        const listEl = document.getElementById('friendsPartiesList');
        if (!listEl) return;
        
        listEl.innerHTML = '<p style="opacity: 0.7;">Loading friends\' parties...</p>';
        
        try {
            const parties = await Parties.getFriendsParties();
            
            if (parties.length === 0) {
                listEl.innerHTML = '<p style="opacity: 0.7;">No friends\' parties found.</p>';
                return;
            }
            
            listEl.innerHTML = parties.map(party => `
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4>${party.name}</h4>
                            <p style="opacity: 0.7;">
                                👤 by ${party.creatorName} • 
                                👥 ${party.memberCount} members
                                ${party.address ? ` • 📍 ${party.address}` : ''}
                                ${party.duration === '24h' ? ' • ⏰ 24h party' : ''}
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-party-code="${party.code}">
                        Join
                    </button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Refresh friends parties error:', error);
            listEl.innerHTML = '<p style="opacity: 0.7;">Failed to load friends\' parties</p>';
        }
    }

    // Handle join public party
    async handleJoinPublicParty(code) {
        if (!code) return;
        
        try {
            const result = await Parties.joinParty(code, true);
            if (result.success) {
                showNotification('Joined party!', 'success');
                updatePartyDisplay();
                // Refresh the list
                await this.handleRefreshParties();
            } else {
                showNotification(result.error || 'Failed to join party', 'error');
            }
        } catch (error) {
            console.error('Join public party error:', error);
            showNotification('Failed to join party', 'error');
        }
    }

    // Clean up event handlers
    destroy() {
        if (this.delegationHandler) {
            document.removeEventListener('click', this.delegationHandler);
        }
        this.handlers.clear();
        this.initialized = false;
    }
}

// Create global instance
const partyEventManager = new PartyEventManager();

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Starting BoozeLens app initialization...');
    
    try {
        // Step 1: Initialize Firebase FIRST
        const firebaseReady = initializeFirebase();
        if (!firebaseReady) {
            console.error('Firebase failed to initialize!');
            showNotification('❌ Failed to connect to Firebase', 'error');
            return;
        }
        console.log('✅ Firebase initialized');
        
        // Step 2: Set up party module references
        Parties = PartiesModule;
        window.Parties = PartiesModule;
        console.log('✅ Party module references set');
        
        // Step 3: Expose all functions globally
        exposeGlobalFunctions();
        console.log('✅ Global functions exposed');
        
        // Step 4: Initialize the party event manager
        await partyEventManager.init().catch(err => {
            console.error('Failed to initialize party event manager:', err);
            showNotification('Party features may not work properly', 'warning');
        });
        console.log('✅ Party event manager initialized');
        
        // Step 5: Handle service workers (non-critical)
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
        
        // Step 6: Initialize PWA features (non-critical)
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
    
    // Save data and cleanup before unload
    window.addEventListener('beforeunload', () => {
        Drinks.saveDrinkHistory();
        partyEventManager.destroy();
    });
    
    // Error recovery
    window.addEventListener('unhandledrejection', event => {
        console.error('Unhandled promise rejection:', event.reason);
        if (event.reason && event.reason.code && event.reason.code.includes('auth')) {
            showNotification('⚠️ Authentication issue. Try refreshing.', 'error');
        }
    });
    
    // Add scroll effect to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const currentScroll = window.pageYOffset;
        
        if (nav) {
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
    
        console.log('✅ App initialization complete!');
        
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        showNotification('Failed to initialize app', 'error');
    }
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
        
        // Initialize photos module
        Photos.initializePhotos();
        
        // Load achievements
        Achievements.loadAchievements();
        
        // Setup Firebase listeners
        setupFirebaseListeners();
        
        // Load user settings
        loadUserSettings();
        
        // Track first timer achievement
        Achievements.onFirstLogin();
        
        // Clean up old BAC data on login
        cleanupOldBACData();
        
        // Initialize UI
        updateUI();
        
        // Load and display parties
        await Parties.loadUserParties();
        updatePartyDisplay();
        
        // Set up periodic cleanup (every hour)
        setInterval(cleanupOldBACData, 60 * 60 * 1000);
        
        const userData = getAppState().userData;
        const displayName = userData.username || user.email.split('@')[0];
        showNotification(`🎉 Welcome, ${displayName}!`, 'success');
        
        // Log UID for developer setup
        console.log('🔑 Your Firebase UID:', user.uid);
        if (isDeveloper(user.uid)) {
            console.log('✅ You have developer rights!');
            showNotification('🛠️ Developer mode active', 'info');
            // Enable chat input
            updateChatUIForDeveloper(true);
        } else {
            console.log('💡 To get developer rights, add this UID to DEVELOPER_UIDS in constants.js');
            // Disable chat input
            updateChatUIForDeveloper(false);
        }
        
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
    
    // Listen for main chat messages
    onValue(ref(database, 'chat'), (snapshot) => {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        // Clear current messages except system message
        chatMessages.innerHTML = `
            <div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! Stay safe and have fun! 🎉</div>
            </div>
        `;
        
        if (snapshot.exists()) {
            const messages = [];
            snapshot.forEach((child) => {
                messages.push({ id: child.key, ...child.val() });
            });
            
            // Sort by timestamp and take last 50 messages
            messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
            const recentMessages = messages.slice(-50);
            
            recentMessages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message';
                messageDiv.style.position = 'relative';
                const devBadge = msg.isDeveloper ? ' <span style="color: #00ff88;">🛠️</span>' : '';
                
                // Add delete button for developers
                const deleteBtn = isDeveloper(currentUser.uid) ? 
                    `<button onclick="deleteMessage('${msg.id}')" style="position: absolute; right: 10px; top: 5px; background: rgba(255,68,68,0.2); border: 1px solid rgba(255,68,68,0.5); color: #ff4444; padding: 2px 8px; border-radius: 5px; cursor: pointer; font-size: 0.8em;">×</button>` : '';
                
                messageDiv.innerHTML = `
                    ${deleteBtn}
                    <div class="chat-author">${msg.username || 'Anonymous'}${devBadge}</div>
                    <div>${escapeHtml(msg.message || '')}</div>
                `;
                chatMessages.appendChild(messageDiv);
            });
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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

// Clean up old BAC data
function cleanupOldBACData() {
    const partyData = getAppState().partyData || {};
    const cleaned = {};
    
    Object.entries(partyData).forEach(([deviceId, data]) => {
        // Only keep data from last 24 hours
        if (Date.now() - data.lastUpdate < 24 * 60 * 60 * 1000) {
            cleaned[deviceId] = data;
        }
    });
    
    setStateValue('partyData', cleaned);
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
    
    // Check for alerts only if reading is less than 24 hours old
    const isRecent = Date.now() - partyData[deviceId].lastUpdate < 24 * 60 * 60 * 1000;
    if (isRecent && reading.bac >= 0.08) {
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
        } else if (sectionId === 'friends') {
            AllFunctions.updateFriendsList();
        } else if (sectionId === 'photos') {
            // Photos feed updates automatically via listener
            Photos.refreshPhotoFeed();
        } else if (sectionId === 'settings') {
            AllFunctions.updateToggleSwitches();
        } else if (sectionId === 'parties') {
            updatePartyDisplay();
            // Refresh public parties
            document.querySelector('button[onclick*="refreshPublicParties"]')?.click();
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
async function showModal(type, data = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    
    switch(type) {
        case 'pair-device':
            const deviceData = getAppState().deviceData || {};
            const hasDevices = Object.keys(deviceData).length > 0;
            
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
                
                ${hasDevices ? `
                    <div class="paired-devices" style="margin-top: 30px;">
                        <h3>My Paired Devices</h3>
                        <div id="modalDeviceList">
                            ${Object.entries(deviceData).map(([deviceId, device]) => {
                                const partyData = getAppState().partyData || {};
                                const lastReading = partyData[deviceId];
                                return `
                                    <div class="device-item" style="padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 10px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
                                            <div style="flex: 1;">
                                                <h4 style="margin: 0 0 5px 0;">${device.name || 'My Breathalyzer'}</h4>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">ID: ${deviceId}</p>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">Last Reading: ${lastReading ? lastReading.bac.toFixed(3) + '‰' : 'No data'}</p>
                                            </div>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn" onclick="renameDevice('${deviceId}')" title="Rename">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-danger" onclick="unpairDevice('${deviceId}')" title="Unpair">
                                                    <i class="fas fa-unlink"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            `;
            break;
            
        case 'checkin':
            const party = Parties.currentParty;
            
            content = `
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${party ? `
                        <button class="btn btn-primary" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('Party: ${party.name}')">
                            <i class="fas fa-champagne-glasses"></i> ${party.name}
                        </button>
                    ` : ''}
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

// ENHANCED party display update
function updatePartyDisplay() {
    // Delegate to the safe implementation
    safeUpdatePartyDisplay(Parties);
}

// Update party chat
function updatePartyChat(messages) {
    const chatEl = document.getElementById('partyChat');
    if (!chatEl) return;
    
    chatEl.innerHTML = messages.map(msg => `
        <div style="margin-bottom: 10px;">
            <strong style="color: #00ff88;">${msg.userName}:</strong>
            <span>${msg.message}</span>
            <span style="opacity: 0.5; font-size: 0.8em; margin-left: 10px;">
                ${new Date(msg.timestamp).toLocaleTimeString()}
            </span>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatEl.scrollTop = chatEl.scrollHeight;
}

// Update party leaderboard
async function updatePartyLeaderboard() {
    const leaderboardEl = document.getElementById('partyLeaderboard');
    if (!leaderboardEl || !Parties || !Parties.currentParty) return;
    
    leaderboardEl.innerHTML = '<p style="opacity: 0.7;">Loading leaderboard...</p>';
    
    const leaderboard = await Parties.getPartyLeaderboard();
    
    if (leaderboard.length === 0) {
        leaderboardEl.innerHTML = '<p style="opacity: 0.7;">No BAC data yet</p>';
        return;
    }
    
    leaderboardEl.innerHTML = leaderboard.map((member, index) => {
        const position = index + 1;
        let badge = '';
        if (position === 1) badge = '🥇';
        else if (position === 2) badge = '🥈';
        else if (position === 3) badge = '🥉';
        
        return `
            <div class="friend-item" style="margin-bottom: 10px;">
                <div class="friend-info">
                    <div style="font-size: 2em; margin-right: 15px;">${badge || position}</div>
                    <div class="friend-avatar-small">${member.role === 'creator' ? '👑' : '👤'}</div>
                    <div class="friend-details">
                        <h4>${member.name}</h4>
                        <p style="opacity: 0.7;">BAC: ${member.bac.toFixed(3)}‰</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Handle party join request
async function handlePartyRequest(userId, approve) {
    const result = await Parties.handleJoinRequest(userId, approve);
    if (result.success) {
        showNotification(approve ? 'Request approved!' : 'Request declined', 'success');
        updatePartyDisplay();
    } else {
        showNotification(result.error || 'Failed to handle request', 'error');
    }
}

// Kick member from party
async function kickMemberFromParty(memberId, memberName) {
    const confirmMsg = `Kick ${memberName} from the party?`;
    if (!confirm(confirmMsg)) return;
    
    const reason = prompt('Reason for kick (optional):') || '';
    
    const result = await Parties.kickMember(memberId, reason);
    if (result.success) {
        showNotification(`${memberName} has been removed from the party`, 'info');
        updatePartyDisplay();
    } else {
        showNotification(result.error || 'Failed to kick member', 'error');
    }
}

// Toggle party lock UI
async function togglePartyLockUI() {
    if (!Parties.currentParty) return;
    
    const isLocked = Parties.currentParty.locked;
    const confirmMsg = isLocked 
        ? 'Unlock the party? New members will be able to join.' 
        : 'Lock the party? No new members will be able to join.';
    
    if (!confirm(confirmMsg)) return;
    
    const result = await Parties.togglePartyLock(!isLocked);
    if (result.success) {
        showNotification(result.locked ? 'Party locked' : 'Party unlocked', 'info');
        updatePartyDisplay();
    } else {
        showNotification(result.error || 'Failed to update party lock', 'error');
    }
}

// Edit party settings UI
function editPartySettings() {
    const party = Parties.currentParty;
    if (!party) return;
    
    const newName = prompt('Party name:', party.name);
    if (newName && newName !== party.name) {
        Parties.updatePartySettings({ name: newName }).then(result => {
            if (result.success) {
                showNotification('Party name updated', 'success');
                updatePartyDisplay();
            } else {
                showNotification(result.error || 'Failed to update', 'error');
            }
        });
    }
}


// Update chat UI based on developer status
function updateChatUIForDeveloper(isDev) {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.querySelector('.chat-input button');
    
    if (chatInput && sendButton) {
        if (isDev) {
            chatInput.placeholder = "Type a message... (Dev mode 🛠️)";
            chatInput.disabled = false;
            sendButton.disabled = false;
            chatInput.style.opacity = '1';
            sendButton.style.opacity = '1';
        } else {
            chatInput.placeholder = "Chat is read-only (Developers only)";
            chatInput.disabled = true;
            sendButton.disabled = true;
            chatInput.style.opacity = '0.5';
            sendButton.style.opacity = '0.5';
        }
    }
}

// Delete chat message (developers only)
async function deleteMessage(messageId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !isDeveloper(currentUser.uid)) {
        showNotification('Not authorized', 'error');
        return;
    }
    
    const database = getFirebaseDatabase();
    if (!database) return;
    
    try {
        await remove(ref(database, `chat/${messageId}`));
        showNotification('Message deleted', 'info');
    } catch (error) {
        console.error('Delete message error:', error);
        showNotification('Failed to delete message', 'error');
    }
}

// Expose globally
window.updatePartyDisplay = updatePartyDisplay;
window.updatePartyChat = updatePartyChat;
window.updatePartyLeaderboard = updatePartyLeaderboard;
window.handlePartyRequest = handlePartyRequest;
window.kickMemberFromParty = kickMemberFromParty;
window.updateChatUIForDeveloper = updateChatUIForDeveloper;
window.deleteMessage = deleteMessage;

// Developer function to delete any party
async function deletePartyAsDev(partyId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !isDeveloper(currentUser.uid)) {
        showNotification('Not authorized', 'error');
        return;
    }
    
    if (!confirm('Developer action: Delete this party permanently?')) {
        return;
    }
    
    try {
        const result = await Parties.deleteParty(partyId);
        if (result.success) {
            showNotification('Party deleted', 'success');
            // Refresh the public parties list
            if (window.refreshPublicParties) {
                window.refreshPublicParties();
            }
        } else {
            showNotification(result.error || 'Failed to delete party', 'error');
        }
    } catch (error) {
        showNotification('Failed to delete party', 'error');
    }
}
window.deletePartyAsDev = deletePartyAsDev;
window.switchToParty = (partyId) => {
    if (Parties && Parties.switchToParty) {
        Parties.switchToParty(partyId);
    }
};

// Add party switcher UI
function addPartySwitcher() {
    const userParties = Parties.userParties || [];
    const currentParty = Parties.currentParty;
    
    // Remove old switcher if exists
    const oldSwitcher = document.getElementById('partySwitcher');
    if (oldSwitcher) {
        oldSwitcher.remove();
    }
    
    // Create new switcher
    const switcher = document.createElement('div');
    switcher.id = 'partySwitcher';
    switcher.style.cssText = 'position: fixed; top: 80px; right: 20px; background: rgba(0,0,0,0.95); border: 2px solid #00ff88; border-radius: 10px; padding: 15px; z-index: 1000; max-width: 250px; box-shadow: 0 4px 20px rgba(0,255,136,0.3); max-height: 400px; overflow-y: auto;';
    
    document.body.appendChild(switcher);
    
    // Update switcher content
    switcher.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4 style="margin: 0; color: #00ff88;">My Parties (${userParties.length})</h4>
            <button onclick="document.getElementById('partySwitcher').remove()" 
                    style="background: none; border: none; color: #fff; cursor: pointer; font-size: 20px;">×</button>
        </div>
        ${userParties.map(party => {
            const memberCount = party.members ? Object.keys(party.members).length : 0;
            const isActive = currentParty && currentParty.id === party.id;
            return `
                <button class="btn ${isActive ? 'btn-primary' : ''}" 
                        style="display: block; width: 100%; margin: 5px 0; text-align: left; padding: 10px;"
                        onclick="switchToParty('${party.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>🎉 ${party.name}</span>
                        <span style="font-size: 0.8em; opacity: 0.7;">${memberCount} 👥</span>
                    </div>
                    ${isActive ? '<small style="color: #00ff88;">Currently viewing</small>' : ''}
                </button>
            `;
        }).join('')}
    `;
}
window.togglePartyLockUI = togglePartyLockUI;
window.editPartySettings = editPartySettings;