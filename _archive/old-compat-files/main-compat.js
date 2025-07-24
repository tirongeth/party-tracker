// ========================================
// MAIN ENTRY POINT - CDN COMPATIBLE VERSION
// ========================================
// This version works with Firebase loaded from CDN

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Starting BoozeLens app initialization...');
    
    // Load all the modular code
    try {
        // Import modules dynamically
        const [
            { initializeFirebase, getFirebaseDatabase, getFirebaseAuth },
            { setupAuthListener, handleAuthSubmit, toggleAuthMode, signOut, loadUserData, hideAuthScreen },
            { initializeDevices, pairDeviceById, unpairDevice, renameDevice },
            { updateUI },
            { showNotification },
            AllFunctions,
            Drinks,
            Games,
            Achievements,
            { getAppState, setStateValue, getCurrentUser, clearAppState },
            { DRINK_PRESETS }
        ] = await Promise.all([
            import('./config/firebase-compat.js'),
            import('./auth/auth-compat.js'),
            import('./features/devices.js'),
            import('./ui/dashboard.js'),
            import('./ui/notifications.js'),
            import('./features/all-functions.js'),
            import('./features/drinks.js'),
            import('./features/games.js'),
            import('./features/achievements.js'),
            import('./config/app-state.js'),
            import('./config/constants.js')
        ]);
        
        // Expose all functions globally for onclick handlers
        window.toggleAuthMode = toggleAuthMode;
        window.signOut = signOut;
        window.updateUI = updateUI;
        window.switchSection = switchSection;
        window.toggleMobileMenu = toggleMobileMenu;
        window.showNotification = showNotification;
        window.showModal = showModal;
        window.closeModal = closeModal;
        
        // All functions from all-functions.js
        Object.entries(AllFunctions).forEach(([name, func]) => {
            if (typeof func === 'function') {
                window[name] = func;
            }
        });
        
        // Drink functions
        Object.entries(Drinks).forEach(([name, func]) => {
            if (typeof func === 'function') {
                window[name] = func;
            }
        });
        
        // Game functions
        Object.entries(Games).forEach(([name, func]) => {
            if (typeof func === 'function') {
                window[name] = func;
            }
        });
        
        // Achievement functions
        Object.entries(Achievements).forEach(([name, func]) => {
            if (typeof func === 'function') {
                window[name] = func;
            }
        });
        
        // Device functions
        window.pairDeviceById = pairDeviceById;
        window.unpairDevice = unpairDevice;
        window.renameDevice = renameDevice;
        
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
                if (window.showHydrationReminder) {
                    window.showHydrationReminder();
                }
            }
        }, 60000);
        
        // Window click handlers
        window.onclick = (event) => {
            if (event.target.className === 'modal show') {
                closeModal();
            }
            if (event.target.className === 'game-overlay show') {
                if (window.closeGame) {
                    window.closeGame();
                }
            }
        };
        
        // Save data before unload
        window.addEventListener('beforeunload', () => {
            if (window.saveDrinkHistory) {
                window.saveDrinkHistory();
            }
        });
        
        // Error recovery
        window.addEventListener('unhandledrejection', event => {
            console.error('Unhandled promise rejection:', event.reason);
            if (event.reason && event.reason.code && event.reason.code.includes('auth')) {
                showNotification('⚠️ Authentication issue. Try refreshing.', 'error');
            }
        });
        
        console.log('✅ App initialization complete!');
        
        // User authenticated callback
        async function onUserAuthenticated(user) {
            console.log('User authenticated:', user.email);
            
            try {
                hideAuthScreen();
                await loadUserData(user);
                initializeDevices();
                Achievements.loadAchievements();
                setupFirebaseListeners();
                loadUserSettings();
                Achievements.onFirstLogin();
                updateUI();
                
                const userData = getAppState().userData;
                const displayName = userData.username || user.email.split('@')[0];
                showNotification(`🎉 Welcome, ${displayName}!`, 'success');
                
            } catch (error) {
                console.error('Error during authentication:', error);
                showNotification('⚠️ Error loading profile', 'error');
            }
        }
        
    } catch (error) {
        console.error('Failed to load modules:', error);
        showNotification('❌ Failed to load app modules', 'error');
    }
});

// ========================================
// UI FUNCTIONS (need to be global)
// ========================================
function switchSection(sectionId) {
    try {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.onclick && item.onclick.toString().includes(sectionId)) {
                item.classList.add('active');
            }
        });
        
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }
        
        // Section-specific initializations
        if (sectionId === 'achievements') {
            if (window.updateAchievements) {
                window.updateAchievements();
            }
        } else if (sectionId === 'drinks') {
            if (window.updateDrinkStats) window.updateDrinkStats();
            if (window.updateDrinkChart) window.updateDrinkChart();
            if (window.updateDrinkHistory) window.updateDrinkHistory();
            if (window.updateEmergencySummary) window.updateEmergencySummary();
        } else if (sectionId === 'devices') {
            // Already handled by device module
        } else if (sectionId === 'friends') {
            if (window.updateFriendsList) window.updateFriendsList();
        } else if (sectionId === 'settings') {
            if (window.updateToggleSwitches) window.updateToggleSwitches();
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
            const partyData = window.getAppState ? window.getAppState().partyData : {};
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
            const partyDataSafe = window.getAppState ? window.getAppState().partyData : {};
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
                    ${window.createLocationMap ? window.createLocationMap() : ''}
                </div>
                <div style="margin: 20px 0;">
                    ${window.getActiveLocations ? window.getActiveLocations().map(loc => `
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${loc.name}</strong></div>
                            <div>${loc.count} people</div>
                            <div>Avg BAC: ${loc.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join('') : ''}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('show');
    
    if (type === 'checkin' || type === 'locations') {
        setTimeout(() => {
            if (window.initializeLocationMap) {
                window.initializeLocationMap();
            }
        }, 100);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function setupFirebaseListeners() {
    // This will be implemented by the modules
    console.log('Setting up Firebase listeners...');
}

function loadUserSettings() {
    // This will be implemented by the modules
    console.log('Loading user settings...');
}