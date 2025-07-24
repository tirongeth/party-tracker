
        // ========================================
        // FIREBASE CONFIGURATION
        // ========================================
        const firebaseConfig = {
            apiKey: "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",
            authDomain: "hsg-party-tracker.firebaseapp.com",
            databaseURL: "https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "hsg-party-tracker",
            storageBucket: "hsg-party-tracker.firebasestorage.app",
            messagingSenderId: "1047483086606",
            appId: "1:1047483086606:web:a02d77baacd21166fb095f",
            measurementId: "G-VFS4W30Z7P"
        };
        
        // ========================================
        // GLOBAL VARIABLES AND DATA
        // ========================================
        let auth = null;
        let database = null;
        let currentUser = null;
        let userData = {};
        let partyData = {};
        let deviceData = {};
        let friendsData = {};
        let friendRequests = [];
        let currentGame = null;
        let gameScores = { team1: 0, team2: 0 };
        let partyStartTime = Date.now();
        // Achievement definitions with progress tracking
        const achievementDefinitions = {
            firstTimer: {
                name: "First Timer",
                icon: "🎉",
                description: "Joined your first party!",
                requirement: 1,
                progress: 0,
                unlocked: false,
                category: "beginner"
            },
            responsible: {
                name: "Responsible",
                icon: "😇",
                description: "Stayed under 0.05 BAC all night",
                requirement: 1,
                progress: 0,
                unlocked: false,
                category: "safety"
            },
            gameMaster: {
                name: "Game Master",
                icon: "🏆",
                description: "Win 5 party games",
                requirement: 5,
                progress: 0,
                unlocked: false,
                category: "games"
            },
            partyAnimal: {
                name: "Party Animal",
                icon: "📍",
                description: "Check in at 10 parties",
                requirement: 10,
                progress: 0,
                unlocked: false,
                category: "social"
            },
            guardianAngel: {
                name: "Guardian Angel",
                icon: "🦸",
                description: "Help 3 friends get home safe",
                requirement: 3,
                progress: 0,
                unlocked: false,
                category: "safety"
            },
            hydroHomie: {
                name: "Hydro Homie",
                icon: "💧",
                description: "Stay hydrated for 3 hours",
                requirement: 12,
                progress: 0,
                unlocked: false,
                category: "health"
            },
            danceMachine: {
                name: "Dance Machine",
                icon: "🕺",
                description: "Log 50 songs danced to",
                requirement: 50,
                progress: 0,
                unlocked: false,
                category: "fun"
            },
            sunriseWarrior: {
                name: "Sunrise Warrior",
                icon: "🌅",
                description: "Party until sunrise (6+ hours)",
                requirement: 1,
                progress: 0,
                unlocked: false,
                category: "endurance"
            },
            socialButterfly: {
                name: "Social Butterfly",
                icon: "🦋",
                description: "Add 20 friends",
                requirement: 20,
                progress: 0,
                unlocked: false,
                category: "social"
            },
            safetyFirst: {
                name: "Safety First",
                icon: "🛡️",
                description: "Use emergency services 0 times in 10 parties",
                requirement: 10,
                progress: 0,
                unlocked: false,
                category: "safety"
            },
            mixologist: {
                name: "Mixologist",
                icon: "🍸",
                description: "Try 15 different drink types",
                requirement: 15,
                progress: 0,
                unlocked: false,
                category: "drinks"
            },
            designated: {
                name: "Designated Hero",
                icon: "🚗",
                description: "Be the designated driver 5 times",
                requirement: 5,
                progress: 0,
                unlocked: false,
                category: "safety"
            }
        };
        
        let userAchievements = {};
        let locationHistory = [];
        let drinkHistory = [];
        let drinkChart = null;
        let chartVisible = true;
        let isSignUp = false;
        let isInitialized = false;
        
        // Drink presets
        const drinkPresets = {
            beer: { amount: 330, alcohol: 5, emoji: '🍺' },
            wine: { amount: 150, alcohol: 12, emoji: '🍷' },
            shot: { amount: 40, alcohol: 40, emoji: '🥃' },
            cocktail: { amount: 200, alcohol: 15, emoji: '🍸' },
            mixed: { amount: 250, alcohol: 10, emoji: '🥤' },
            champagne: { amount: 150, alcohol: 12, emoji: '🥂' },
            water: { amount: 250, alcohol: 0, emoji: '💧' },
            other: { amount: 200, alcohol: 5, emoji: '🍹' }
        };
        
        // ========================================
        // FIREBASE INITIALIZATION
        // ========================================
        function initializeFirebase() {
            if (isInitialized) return;
            
            try {
                // Initialize Firebase
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                
                database = firebase.database();
                auth = firebase.auth();
                
                // Setup auth state listener
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        currentUser = user;
                        onUserAuthenticated();
                    } else {
                        currentUser = null;
                        showAuthScreen();
                    }
                });
                
                isInitialized = true;
                console.log('Firebase initialized successfully');
                updateConnectionStatus(true);
                
            } catch (error) {
                console.error('Firebase initialization error:', error);
                showNotification('❌ Firebase connection failed. Please refresh the page.', 'error');
                updateConnectionStatus(false);
            }
        }
        
        // ========================================
        // AUTHENTICATION FUNCTIONS
        // ========================================
        function showAuthScreen() {
            document.getElementById('authContainer').style.display = 'flex';
            document.getElementById('userProfile').style.display = 'none';
            document.querySelector('.container').style.display = 'none';
        }
        
        function hideAuthScreen() {
            document.getElementById('authContainer').style.display = 'none';
            document.getElementById('userProfile').style.display = 'block';
            document.querySelector('.container').style.display = 'block';
        }
        
        function showAuthError(message) {
            const errorDiv = document.getElementById('authError');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
            
            // Hide loading
            hideAuthLoading();
            
            setTimeout(() => {
                errorDiv.classList.remove('show');
            }, 5000);
        }
        
        function showAuthLoading() {
            document.getElementById('authLoading').classList.add('show');
            document.getElementById('authSubmitBtn').disabled = true;
        }
        
        function hideAuthLoading() {
            document.getElementById('authLoading').classList.remove('show');
            document.getElementById('authSubmitBtn').disabled = false;
        }
        
        function toggleAuthMode() {
            isSignUp = !isSignUp;
            
            if (isSignUp) {
                // Switch to signup
                document.getElementById('authTitle').textContent = 'Create Your Account';
                document.getElementById('authButton').textContent = 'Sign Up';
                document.getElementById('usernameGroup').style.display = 'block';
                document.getElementById('authToggleText').textContent = 'Already have an account?';
                document.getElementById('authToggleLink').textContent = 'Login';
            } else {
                // Switch to login
                document.getElementById('authTitle').textContent = 'Welcome Back';
                document.getElementById('authButton').textContent = 'Login';
                document.getElementById('usernameGroup').style.display = 'none';
                document.getElementById('authToggleText').textContent = "Don't have an account?";
                document.getElementById('authToggleLink').textContent = 'Sign up';
            }
        }
        
        // Handle auth form submission
        document.getElementById('authForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value;
            const username = document.getElementById('authUsername').value.trim();
            
            // Validation
            if (!email || !password) {
                showAuthError('Please fill in all fields');
                return;
            }
            
            if (password.length < 6) {
                showAuthError('Password must be at least 6 characters');
                return;
            }
            
            showAuthLoading();
            
            try {
                if (!isSignUp) {
                    // Login
                    await auth.signInWithEmailAndPassword(email, password);
                    showNotification('✅ Welcome back!', 'success');
                } else {
                    // Signup
                    if (!username || username.length < 3) {
                        showAuthError('Username must be at least 3 characters');
                        hideAuthLoading();
                        return;
                    }
                    
                    // Check if username is taken
                    const usernameCheck = await database.ref('usernames/' + username.toLowerCase()).once('value');
                    if (usernameCheck.exists()) {
                        showAuthError('Username already taken');
                        hideAuthLoading();
                        return;
                    }
                    
                    // Create account
                    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                    const user = userCredential.user;
                    
                    // Save user data
                    await database.ref('users/' + user.uid).set({
                        username: username,
                        email: email,
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        devices: {},
                        friends: {},
                        achievements: {},
                        settings: {
                            notifications: true,
                            shareLocation: false,
                            publicProfile: true
                        }
                    });
                    
                    // Reserve username
                    await database.ref('usernames/' + username.toLowerCase()).set(user.uid);
                    
                    showNotification('✅ Account created successfully!', 'success');
                }
                
                hideAuthLoading();
                
            } catch (error) {
                console.error('Auth error:', error);
                hideAuthLoading();
                
                let errorMessage = 'Authentication failed';
                
                switch(error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password';
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = 'Email already registered';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password should be at least 6 characters';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many attempts. Please try again later';
                        break;
                    default:
                        errorMessage = error.message;
                }
                
                showAuthError(errorMessage);
            }
        });
        
        async function signOut() {
            try {
                await auth.signOut();
                showNotification('👋 Signed out successfully');
                location.reload();
            } catch (error) {
                console.error('Sign out error:', error);
                showNotification('❌ Error signing out', 'error');
            }
        }
        
        // ========================================
        // USER AUTHENTICATED - SETUP
        // ========================================
        async function onUserAuthenticated() {
            hideAuthScreen();
            
            // Load user data
            try {
                const userRef = database.ref('users/' + currentUser.uid);
                const snapshot = await userRef.once('value');
                userData = snapshot.val() || {};
                
                // Update profile displays
                const displayName = userData.username || currentUser.email.split('@')[0];
                document.getElementById('profileName').textContent = displayName;
                document.getElementById('profileEmail').textContent = currentUser.email;
                
                // Update settings page
                document.getElementById('settingsUsername').textContent = displayName;
                document.getElementById('settingsEmail').textContent = currentUser.email;
                document.getElementById('username').value = userData.username || '';
                document.getElementById('emailDisplay').value = currentUser.email;
                document.getElementById('linkedEmail').textContent = currentUser.email;
                
                // Update profile initial
                const initial = displayName.charAt(0).toUpperCase();
                document.getElementById('profileInitial').textContent = initial;
                
                // Setup listeners
                setupFirebaseListeners();
                
                // Load saved settings
                loadUserSettings();
                
                // Initialize UI
                updateUI();
                
                showNotification(`🎉 Welcome, ${displayName}!`, 'success');
                
            } catch (error) {
                console.error('Error loading user data:', error);
                showNotification('⚠️ Error loading profile. Some features may not work.', 'error');
            }
        }
        
        // Setup Firebase listeners for authenticated user
        function setupFirebaseListeners() {
            if (!database || !currentUser) return;
            
            // Listen for user's devices
            database.ref('users/' + currentUser.uid + '/devices').on('value', (snapshot) => {
                deviceData = snapshot.val() || {};
                updateDeviceList();
                document.getElementById('deviceCount').textContent = Object.keys(deviceData).length;
                
                // Start listening to each device
                Object.keys(deviceData).forEach(deviceId => {
                    listenToDevice(deviceId);
                });
            });
            
            // Listen for friends
            database.ref('users/' + currentUser.uid + '/friends').on('value', (snapshot) => {
                friendsData = snapshot.val() || {};
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
                friendRequests = Object.entries(requests).map(([id, data]) => ({
                    id,
                    ...data
                }));
                updateFriendRequests();
            });
            
            // Connection status
            database.ref('.info/connected').on('value', (snapshot) => {
                const connected = snapshot.val();
                updateConnectionStatus(connected);
            });
        }
        
        // Listen to specific device
        function listenToDevice(deviceId) {
            database.ref('readings/' + deviceId).on('value', (snapshot) => {
                const reading = snapshot.val();
                if (reading) {
                    processDeviceReading(deviceId, reading);
                }
            });
        }
        
        // Listen to friend's data
        function listenToFriend(friendId) {
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
        
        // ========================================
        // DEVICE PAIRING SYSTEM
        // ========================================
        async function pairDeviceById() {
            const deviceId = document.getElementById('deviceIdInput').value.trim().toUpperCase();
            
            if (!deviceId) {
                showNotification('❌ Please enter a Device ID', 'error');
                return;
            }
            
            try {
                // Check if device exists in readings
                const deviceSnapshot = await database.ref('readings/' + deviceId).once('value');
                
                if (!deviceSnapshot.exists()) {
                    showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
                    return;
                }
                
                // Check if already paired
                if (deviceData[deviceId]) {
                    showNotification('ℹ️ Device already paired');
                    return;
                }
                
                // Add device to user
                await database.ref('users/' + currentUser.uid + '/devices/' + deviceId).set({
                    pairedAt: firebase.database.ServerValue.TIMESTAMP,
                    name: 'My Breathalyzer'
                });
                
                // Clear input
                document.getElementById('deviceIdInput').value = '';
                
                showNotification('✅ Device paired successfully!', 'success');
                
                // Start listening to this device
                listenToDevice(deviceId);
                
            } catch (error) {
                console.error('Pairing error:', error);
                showNotification('❌ Pairing failed', 'error');
            }
        }
        
        // Update device list display
        function updateDeviceList() {
            const deviceList = document.getElementById('deviceList');
            deviceList.innerHTML = '';
            
            if (Object.keys(deviceData).length === 0) {
                deviceList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';
                return;
            }
            
            Object.entries(deviceData).forEach(([deviceId, device]) => {
                const lastReading = partyData[deviceId];
                const item = document.createElement('div');
                item.className = 'device-item';
                item.innerHTML = `
                    <div class="device-info">
                        <h4>${device.name || 'Breathalyzer'}</h4>
                        <p>ID: ${deviceId}</p>
                        <p>Last Reading: ${lastReading ? lastReading.bac.toFixed(3) + '‰' : 'No data'}</p>
                    </div>
                    <div>
                        <button class="btn" onclick="renameDevice('${deviceId}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="unpairDevice('${deviceId}')">
                            <i class="fas fa-unlink"></i>
                        </button>
                    </div>
                `;
                deviceList.appendChild(item);
            });
        }
        
        async function unpairDevice(deviceId) {
            if (confirm('Unpair this device?')) {
                await database.ref('users/' + currentUser.uid + '/devices/' + deviceId).remove();
                showNotification('🔓 Device unpaired');
            }
        }
        
        async function renameDevice(deviceId) {
            const newName = prompt('Enter new name for device:', deviceData[deviceId]?.name || 'My Breathalyzer');
            if (newName) {
                await database.ref('users/' + currentUser.uid + '/devices/' + deviceId + '/name').set(newName);
                showNotification('✏️ Device renamed');
            }
        }
        
        // Process device reading
        function processDeviceReading(deviceId, reading) {
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
            
            updateUI();
            
            // Check for alerts
            if (reading.bac >= 0.08) {
                showNotification(`⚠️ Your BAC is too high: ${reading.bac.toFixed(3)}‰`, 'error');
            }
        }
        
        // ========================================
        // FRIENDS SYSTEM
        // ========================================
        async function searchFriends() {
            const searchTerm = document.getElementById('friendSearchInput').value.trim().toLowerCase();
            
            if (!searchTerm || searchTerm.length < 3) {
                showNotification('❌ Please enter at least 3 characters', 'error');
                return;
            }
            
            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '<p>Searching...</p>';
            
            try {
                // Search by username
                const usersSnapshot = await database.ref('users').once('value');
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
        
        async function sendFriendRequest(friendId) {
            try {
                // Check if already friends
                if (friendsData[friendId]) {
                    showNotification('ℹ️ Already friends');
                    return;
                }
                
                // Send friend request
                await database.ref('friendRequests/' + friendId + '/' + currentUser.uid).set({
                    from: userData.username || currentUser.email,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
                
                showNotification('📤 Friend request sent!', 'success');
                
                // Update UI
                searchFriends();
                
            } catch (error) {
                console.error('Friend request error:', error);
                showNotification('❌ Failed to send request', 'error');
            }
        }
        
        // Update friend requests display
        function updateFriendRequests() {
            const container = document.getElementById('friendRequests');
            
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
        
        async function acceptFriendRequest(friendId) {
            try {
                // Show permission selection modal
                const permission = await selectFriendPermission();
                if (!permission) return;
                
                // Add friend to both users
                await database.ref('users/' + currentUser.uid + '/friends/' + friendId).set({
                    permission: permission,
                    addedAt: firebase.database.ServerValue.TIMESTAMP
                });
                
                await database.ref('users/' + friendId + '/friends/' + currentUser.uid).set({
                    permission: permission,
                    addedAt: firebase.database.ServerValue.TIMESTAMP
                });
                
                // Remove request
                await database.ref('friendRequests/' + currentUser.uid + '/' + friendId).remove();
                
                showNotification('✅ Friend added!', 'success');
                
            } catch (error) {
                console.error('Accept friend error:', error);
                showNotification('❌ Failed to accept request', 'error');
            }
        }
        
        async function selectFriendPermission() {
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
                    closeModal();
                    resolve(permission);
                };
            });
        }
        
        async function declineFriendRequest(friendId) {
            await database.ref('friendRequests/' + currentUser.uid + '/' + friendId).remove();
            showNotification('❌ Request declined');
        }
        
        // Process friend data
        function processFriendData(friendId, friendData) {
            const permission = friendsData[friendId]?.permission || 'observer';
            
            // Get friend's device data based on permission
            if (permission === 'guardian' || permission === 'buddy') {
                // Can see BAC data
                Object.keys(friendData.devices || {}).forEach(deviceId => {
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
                    }
                    
                    // Listen to their device readings
                    listenToDevice(deviceId);
                });
            }
        }
        
        // Update friends list display
        function updateFriendsList() {
            const friendsList = document.getElementById('friendsList');
            friendsList.innerHTML = '';
            
            if (Object.keys(friendsData).length === 0) {
                friendsList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';
                return;
            }
            
            // Load friend details
            Object.entries(friendsData).forEach(async ([friendId, friend]) => {
                const friendSnapshot = await database.ref('users/' + friendId).once('value');
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
        
        async function updateFriendPermission(friendId, newPermission) {
            try {
                await database.ref('users/' + currentUser.uid + '/friends/' + friendId + '/permission').set(newPermission);
                await database.ref('users/' + friendId + '/friends/' + currentUser.uid + '/permission').set(newPermission);
                showNotification('✅ Permission updated', 'success');
            } catch (error) {
                console.error('Update permission error:', error);
                showNotification('❌ Failed to update permission', 'error');
            }
        }
        
        async function removeFriend(friendId) {
            if (confirm('Remove this friend?')) {
                await database.ref('users/' + currentUser.uid + '/friends/' + friendId).remove();
                await database.ref('users/' + friendId + '/friends/' + currentUser.uid).remove();
                showNotification('👋 Friend removed');
            }
        }
        
        // ========================================
        // SETTINGS FUNCTIONS
        // ========================================
        async function updateProfile() {
            const username = document.getElementById('username').value.trim();
            
            if (!username || username.length < 3) {
                showNotification('❌ Username must be at least 3 characters', 'error');
                return;
            }
            
            try {
                // Check if username changed
                if (username.toLowerCase() !== userData.username?.toLowerCase()) {
                    // Check if new username is available
                    const usernameCheck = await database.ref('usernames/' + username.toLowerCase()).once('value');
                    if (usernameCheck.exists() && usernameCheck.val() !== currentUser.uid) {
                        showNotification('❌ Username already taken', 'error');
                        return;
                    }
                    
                    // Remove old username
                    if (userData.username) {
                        await database.ref('usernames/' + userData.username.toLowerCase()).remove();
                    }
                    
                    // Reserve new username
                    await database.ref('usernames/' + username.toLowerCase()).set(currentUser.uid);
                }
                
                // Update user data
                await database.ref('users/' + currentUser.uid + '/username').set(username);
                
                showNotification('✅ Profile updated!', 'success');
                
                // Update UI
                userData.username = username;
                document.getElementById('profileName').textContent = username;
                document.getElementById('settingsUsername').textContent = username;
                document.getElementById('profileInitial').textContent = username.charAt(0).toUpperCase();
                
            } catch (error) {
                console.error('Update profile error:', error);
                showNotification('❌ Failed to update profile', 'error');
            }
        }
        
        async function changePassword() {
            const newPassword = prompt('Enter new password (min 6 characters):');
            if (newPassword && newPassword.length >= 6) {
                try {
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
        
        async function saveEmergencyInfo() {
            const homeAddress = document.getElementById('homeAddress').value;
            const emergencyContact = document.getElementById('emergencyContact').value;
            const medicalInfo = document.getElementById('medicalInfo').value;
            const safetyNotes = document.getElementById('safetyNotes').value;
            
            try {
                await database.ref('users/' + currentUser.uid + '/emergency').set({
                    homeAddress,
                    emergencyContact,
                    medicalInfo,
                    safetyNotes,
                    updatedAt: firebase.database.ServerValue.TIMESTAMP
                });
                
                // Also save locally for offline access
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
        
        async function savePrivacySettings() {
            const shareLocation = document.getElementById('shareLocation').checked;
            const notifications = document.getElementById('notifications').checked;
            const publicProfile = document.getElementById('publicProfile').checked;
            
            try {
                await database.ref('users/' + currentUser.uid + '/settings').update({
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
        
        function showSettingsSaved() {
            const savedIcon = document.createElement('div');
            savedIcon.className = 'settings-saved';
            savedIcon.innerHTML = '✅';
            document.body.appendChild(savedIcon);
            
            setTimeout(() => savedIcon.remove(), 1000);
        }
        
        async function deleteAccount() {
            if (!confirm('Delete your account? This cannot be undone!')) return;
            if (!confirm('Are you absolutely sure? All your data will be permanently deleted.')) return;
            
            try {
                // Delete user data
                await database.ref('users/' + currentUser.uid).remove();
                
                // Remove username
                if (userData.username) {
                    await database.ref('usernames/' + userData.username.toLowerCase()).remove();
                }
                
                // Remove friend connections
                if (friendsData) {
                    for (const friendId in friendsData) {
                        await database.ref('users/' + friendId + '/friends/' + currentUser.uid).remove();
                    }
                }
                
                // Delete auth account
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
        
        function loadUserSettings() {
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
            updateToggleSwitches();
            
            // Load local data as fallback
            loadDrinkHistory();
            
            // Load achievements from Firebase
            loadAchievements();
            
            // Track first timer achievement
            if (userAchievements && userAchievements.firstTimer && !userAchievements.firstTimer.unlocked) {
                updateAchievementProgress('firstTimer');
            }
        }
        
        function updateToggleSwitches() {
            document.querySelectorAll('.toggle-switch').forEach(toggle => {
                const input = toggle.querySelector('input');
                if (input && input.checked) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            });
        }
        
        // Add event listeners for toggle switches
        document.addEventListener('DOMContentLoaded', () => {
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
        });
        
        // ========================================
        // UI UPDATE FUNCTIONS
        // ========================================
        function updateUI() {
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
        
        // Update connection status
        function updateConnectionStatus(connected) {
            const statusElement = document.getElementById('connectionStatus');
            const dotElement = document.querySelector('.status-dot');
            const connectionContainer = document.querySelector('.connection-status');
            
            if (statusElement && dotElement) {
                if (connected) {
                    statusElement.textContent = 'Connected';
                    dotElement.style.background = '#00ff88';
                    // Hide after 1 second when connected
                    if (connectionContainer) {
                        setTimeout(() => {
                            connectionContainer.classList.add('connected');
                        }, 1000);
                    }
                } else {
                    statusElement.textContent = 'Offline';
                    dotElement.style.background = '#ff4444';
                    // Show when offline
                    if (connectionContainer) {
                        connectionContainer.classList.remove('connected');
                    }
                }
            }
        }
        
        // Get BAC status
        function getBACStatus(bac) {
            if (bac < 0.02) return { class: 'bac-safe', text: 'Sober', emoji: '😊' };
            if (bac < 0.05) return { class: 'bac-caution', text: 'Buzzed', emoji: '😎' };
            if (bac < 0.08) return { class: 'bac-danger', text: 'No Driving!', emoji: '🚫' };
            return { class: 'bac-critical', text: 'Too Much!', emoji: '🤢' };
        }
        
        // Update friends grid
        function updateFriendsGrid() {
            const grid = document.getElementById('friendsGrid');
            if (!grid) return;
            
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
        
        // Update stats
        function updateStats() {
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
            
            // Check achievements
            checkAchievements(friends);
        }
        
        // Update leaderboard
        function updateLeaderboard() {
            const leaderboard = document.getElementById('leaderboardList');
            if (!leaderboard) return;
            
            leaderboard.innerHTML = '';
            
            const sorted = Object.values(partyData)
                .sort((a, b) => a.bac - b.bac)
                .slice(0, 5);
            
            sorted.forEach((friend, index) => {
                const item = document.createElement('div');
                item.className = 'leaderboard-item';
                item.onclick = () => {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    showNotification(`${friend.name} is winning! 🏆`);
                };
                
                item.innerHTML = `
                    <span class="rank rank-${index + 1}">#${index + 1}</span>
                    <span>${friend.name}</span>
                    <span>${friend.bac.toFixed(3)}‰</span>
                `;
                leaderboard.appendChild(item);
            });
        }
        
        // Music visualizer
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
        
        // Alert system
        function checkForAlerts() {
            const criticalFriends = Object.values(partyData).filter(f => f.bac >= 0.08);
            
            if (criticalFriends.length > 0) {
                const alertBanner = document.getElementById('alertBanner');
                const alertText = document.getElementById('alertText');
                
                if (alertBanner && alertText) {
                    const names = criticalFriends.map(f => f.name).join(', ');
                    alertText.textContent = `⚠️ ${names} need${criticalFriends.length > 1 ? '' : 's'} attention! BAC too high!`;
                    
                    if (!alertBanner.classList.contains('show')) {
                        alertBanner.classList.add('show');
                        playSound('alert');
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
        // EXISTING FUNCTIONS (Chat, Games, etc.)
        // ========================================
        
        // Initialize particles
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
        
        // Navigation
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
                    if (typeof updateAchievementsUI === 'function') {
                        updateAchievementsUI();
                    }
                } else if (sectionId === 'drinks') {
                    updateDrinkStats();
                    updateDrinkChart();
                } else if (sectionId === 'devices') {
                    updateDeviceList();
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
        
        // Chat functionality
        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                const chatMessages = document.getElementById('chatMessages');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message own';
                messageDiv.innerHTML = `
                    <div class="chat-author">${userData.username || 'You'}</div>
                    <div>${escapeHtml(message)}</div>
                `;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                input.value = '';
                
                // Save to Firebase
                if (database && currentUser) {
                    database.ref('chat').push({
                        uid: currentUser.uid,
                        username: userData.username,
                        message: message,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    });
                }
            }
        }
        
        function handleChatEnter(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        
        // Hydration reminder
        function showHydrationReminder() {
            showNotification('💧 Time for a water break! Stay hydrated!');
            confetti({
                particleCount: 50,
                spread: 60,
                colors: ['#00d4ff', '#0099ff', '#0066ff'],
                origin: { y: 0.6 }
            });
            
            // Achievement check - hydration tracking
            if (typeof updateAchievementProgress === 'function') {
                updateAchievementProgress('hydroHomie');
            }
        }
        
        // Show friend details
        function showFriendDetails(friend) {
            showModal('friend-details');
            setTimeout(() => {
                const content = document.getElementById('friendDetailsContent');
                if (!content) return;
                
                const status = getBACStatus(friend.bac);
                
                content.innerHTML = `
                    <div style="text-align: center; margin: 20px 0;">
                        <div class="friend-avatar" style="width: 100px; height: 100px; font-size: 3em; margin: 0 auto 20px;">
                            ${friend.isOwn ? '👤' : '👥'}
                        </div>
                        <h3>${friend.name}</h3>
                        <div class="bac-value ${status.class}" style="font-size: 2em; margin: 20px 0;">
                            ${friend.bac.toFixed(3)}‰
                        </div>
                        <p><i class="fas fa-map-marker-alt"></i> ${friend.location}</p>
                        <div style="margin: 20px 0;">
                            <canvas id="friendChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                `;
                
                // Draw friend's BAC chart
                drawFriendChart(friend);
            }, 100);
        }
        
        // Draw friend's BAC chart
        function drawFriendChart(friend) {
            const canvas = document.getElementById('friendChart');
            if (!canvas || !friend.history || friend.history.length === 0) return;
            
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: friend.history.map((_, i) => i),
                    datasets: [{
                        label: 'BAC Level',
                        data: friend.history.map(h => h.value),
                        borderColor: '#00ff88',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 0.15
                        }
                    }
                }
            });
        }
        
        // Modal functions
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
                    const safeFriends = Object.values(partyData).filter(f => f.bac < 0.02);
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
        
        async function pairDeviceFromModal() {
            const deviceId = document.getElementById('modalDeviceId').value.trim().toUpperCase();
            
            if (!deviceId) {
                showNotification('❌ Please enter a Device ID', 'error');
                return;
            }
            
            try {
                // Check if device exists in readings
                const deviceSnapshot = await database.ref('readings/' + deviceId).once('value');
                
                if (!deviceSnapshot.exists()) {
                    showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
                    return;
                }
                
                // Check if already paired
                if (deviceData[deviceId]) {
                    showNotification('ℹ️ Device already paired');
                    closeModal();
                    return;
                }
                
                // Add device to user
                await database.ref('users/' + currentUser.uid + '/devices/' + deviceId).set({
                    pairedAt: firebase.database.ServerValue.TIMESTAMP,
                    name: 'My Breathalyzer'
                });
                
                showNotification('✅ Device paired successfully!', 'success');
                closeModal();
                
                // Start listening to this device
                listenToDevice(deviceId);
                
            } catch (error) {
                console.error('Pairing error:', error);
                showNotification('❌ Pairing failed', 'error');
            }
        }
        
        // Location functions
        function checkInLocation(location) {
            locationHistory.push({
                location: location,
                time: Date.now(),
                user: userData.username
            });
            
            showNotification(`📍 Checked in at ${location}!`);
            
            // Update achievement
            if (typeof updateAchievementProgress === 'function') {
                updateAchievementProgress('partyAnimal');
            }
            
            closeModal();
        }
        
        function createLocationMap() {
            // Simulated map with dots
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
        
        function initializeLocationMap() {
            // Add interactive features to location map
            const dots = document.querySelectorAll('.location-dot');
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const location = this.getAttribute('title');
                    showNotification(`📍 ${location}`);
                });
            });
        }
        
        function getActiveLocations() {
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
        
        function selectBuddy(buddyName) {
            localStorage.setItem('buddy', buddyName);
            showNotification(`👥 ${buddyName} is now your buddy!`);
            
            // Achievement check
            if (typeof updateAchievementProgress === 'function') {
                updateAchievementProgress('guardianAngel');
            }
            
            closeModal();
        }
        
        function showFirstAid() {
            showModal('first-aid');
        }
        
        // Emergency functions
        function callEmergency(type) {
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
        
        function callUber() {
            const address = localStorage.getItem('homeAddress');
            
            if (address) {
                // Try to open Uber app with pre-filled destination
                const encodedAddress = encodeURIComponent(address);
                showNotification('🚕 Opening Uber with your home address...');
                
                // Copy address to clipboard
                navigator.clipboard.writeText(address)
                    .then(() => showNotification('📋 Home address copied to clipboard!'))
                    .catch(() => {});
                
                // Open Uber
                window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedAddress}`, '_blank');
            } else {
                showNotification('🚕 Opening Uber app...');
                window.open('https://m.uber.com/ul/', '_blank');
            }
        }
        
        function showTaxiOptions() {
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
        
        function callSoberFriend() {
            const soberFriends = Object.values(partyData).filter(f => f.bac < 0.02);
            if (soberFriends.length > 0) {
                const friend = soberFriends[0];
                showNotification(`📞 Calling ${friend.name}...`);
            } else {
                showNotification('❌ No sober friends available right now');
            }
        }
        
        // Game functions
        function startGame(gameType) {
            currentGame = gameType;
            
            const gameOverlay = document.createElement('div');
            gameOverlay.className = 'game-overlay';
            gameOverlay.id = 'gameOverlay';
            
            let gameContent = '';
            
            switch(gameType) {
                case 'never-have-i-ever':
                    gameContent = createNeverHaveIEverGame();
                    break;
                case 'truth-or-dare':
                    gameContent = createTruthOrDareGame();
                    break;
                case 'kings-cup':
                    gameContent = createKingsCupGame();
                    break;
                case 'beer-pong':
                    gameContent = createBeerPongGame();
                    break;
                case 'flip-cup':
                    gameContent = createFlipCupGame();
                    break;
                case 'trivia':
                    gameContent = createTriviaGame();
                    break;
            }
            
            gameOverlay.innerHTML = `
                <div class="game-container">
                    <div class="game-header">
                        <div class="game-title">${getGameTitle(gameType)}</div>
                        <div class="close-game" onclick="closeGame()">×</div>
                    </div>
                    ${gameContent}
                </div>
            `;
            
            document.body.appendChild(gameOverlay);
            setTimeout(() => gameOverlay.classList.add('show'), 10);
            
            // Initialize game
            initializeGame(gameType);
            
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        function closeGame() {
            const overlay = document.getElementById('gameOverlay');
            if (overlay) {
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 500);
            }
            currentGame = null;
        }
        
        // Game creators
        function createNeverHaveIEverGame() {
            const questions = [
                "Never have I ever skipped a lecture for a party",
                "Never have I ever kissed someone at a HSG party",
                "Never have I ever failed an exam because of partying",
                "Never have I ever woken up in the library",
                "Never have I ever used ChatGPT for an assignment",
                "Never have I ever been to a professor's office hours drunk",
                "Never have I ever stolen food from a dorm kitchen",
                "Never have I ever dated someone from my study group"
            ];
            
            return `
                <div class="question-card" id="gameQuestion">
                    Click "Next Question" to start!
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" onclick="nextNeverHaveIEver()">
                        <i class="fas fa-arrow-right"></i> Next Question
                    </button>
                </div>
                <div style="text-align: center; opacity: 0.7;">
                    <p>Drink if you've done it! 🍻</p>
                </div>
            `;
        }
        
        function createTruthOrDareGame() {
            return `
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" style="margin: 10px;" onclick="showTruth()">
                        <i class="fas fa-comment"></i> Truth
                    </button>
                    <button class="btn btn-danger" style="margin: 10px;" onclick="showDare()">
                        <i class="fas fa-fire"></i> Dare
                    </button>
                </div>
                <div class="question-card" id="gameQuestion">
                    Choose Truth or Dare!
                </div>
                <div id="playerName" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
            `;
        }
        
        function createKingsCupGame() {
            const rules = {
                'A': '🍉 Waterfall - Everyone drinks!',
                '2': '👉 You - Choose someone to drink',
                '3': '👈 Me - You drink!',
                '4': '👯 Floor - Last to touch floor drinks',
                '5': '🙋 Guys - All guys drink',
                '6': '💃 Chicks - All girls drink',
                '7': '🌈 Heaven - Last to raise hand drinks',
                '8': '🤝 Mate - Choose a drinking buddy',
                '9': '🎵 Rhyme - Say a word, others rhyme',
                '10': '📏 Categories - Name things in category',
                'J': '👑 Make a Rule',
                'Q': '❓ Questions - Ask questions only',
                'K': '🏆 King\'s Cup - Pour into center cup'
            };
            
            return `
                <div style="text-align: center;">
                    <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
                    <button class="btn btn-primary" onclick="drawCard()">
                        <i class="fas fa-clone"></i> Draw Card
                    </button>
                </div>
                <div class="question-card" id="gameQuestion">
                    Click "Draw Card" to start!
                </div>
            `;
        }
        
        function createBeerPongGame() {
            return `
                <div class="score-display">
                    <div class="team-score">
                        <div class="team-name">Team 1</div>
                        <div class="team-points" id="team1Score">0</div>
                        <button class="btn" onclick="addScore('team1')">+1</button>
                    </div>
                    <div class="team-score">
                        <div class="team-name">Team 2</div>
                        <div class="team-points" id="team2Score">0</div>
                        <button class="btn" onclick="addScore('team2')">+1</button>
                    </div>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" onclick="resetBeerPong()">
                        <i class="fas fa-redo"></i> New Game
                    </button>
                </div>
                <div id="gameStatus" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
            `;
        }
        
        function createFlipCupGame() {
            return `
                <div class="timer-display" id="flipTimer">00:00</div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" id="timerBtn" onclick="toggleFlipTimer()">
                        <i class="fas fa-play"></i> Start Timer
                    </button>
                    <button class="btn" onclick="resetFlipTimer()">
                        <i class="fas fa-redo"></i> Reset
                    </button>
                </div>
                <div id="bestTime" style="text-align: center; font-size: 1.2em; margin-top: 20px;">
                    Best Time: --:--
                </div>
            `;
        }
        
        function createTriviaGame() {
            return `
                <div class="question-card" id="gameQuestion">
                    Click "Next Question" to start HSG Trivia!
                </div>
                <div id="triviaOptions" style="margin: 20px 0;"></div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" onclick="nextTrivia()">
                        <i class="fas fa-arrow-right"></i> Next Question
                    </button>
                </div>
                <div class="score-display">
                    <div class="team-score">
                        <div class="team-name">Score</div>
                        <div class="team-points" id="triviaScore">0</div>
                    </div>
                </div>
            `;
        }
        
        // Game logic
        let gameData = {
            neverHaveIEver: [
                "Never have I ever skipped a lecture for a party",
                "Never have I ever kissed someone at a HSG party",
                "Never have I ever failed an exam because of partying",
                "Never have I ever woken up in the library",
                "Never have I ever used ChatGPT for an assignment",
                "Never have I ever been to a professor's office hours drunk",
                "Never have I ever stolen food from a dorm kitchen",
                "Never have I ever dated someone from my study group",
                "Never have I ever fallen asleep during a presentation",
                "Never have I ever pretended to be sick to avoid a group project"
            ],
            truths: [
                "What's your most embarrassing HSG moment?",
                "Who's your secret crush on campus?",
                "What's the worst grade you've ever gotten?",
                "Have you ever cheated on an exam?",
                "What's your biggest fear about graduation?",
                "Which professor do you have a crush on?",
                "What's the craziest thing you've done at HSG?"
            ],
            dares: [
                "Text your crush right now!",
                "Do 20 pushups",
                "Sing the HSG anthem",
                "Call a random contact and say 'I love you'",
                "Post an embarrassing photo on Instagram",
                "Dance without music for 1 minute",
                "Let someone go through your phone for 30 seconds"
            ],
            trivia: [
                {
                    question: "When was HSG founded?",
                    options: ["1898", "1923", "1945", "1967"],
                    correct: 0
                },
                {
                    question: "What does HSG stand for?",
                    options: ["High School Gymnasium", "Hochschule St. Gallen", "Higher Studies Group", "Helvetic Study Group"],
                    correct: 1
                },
                {
                    question: "How many students attend HSG?",
                    options: ["5,000", "9,000", "12,000", "15,000"],
                    correct: 1
                },
                {
                    question: "What's the most popular major at HSG?",
                    options: ["Law", "Business Administration", "Computer Science", "International Affairs"],
                    correct: 1
                }
            ]
        };
        
        let gameState = {
            flipTimer: null,
            flipTime: 0,
            bestFlipTime: null,
            triviaScore: 0,
            currentTriviaIndex: 0
        };
        
        function initializeGame(gameType) {
            switch(gameType) {
                case 'beer-pong':
                    gameScores = { team1: 0, team2: 0 };
                    updateBeerPongScore();
                    break;
                case 'trivia':
                    gameState.triviaScore = 0;
                    gameState.currentTriviaIndex = 0;
                    document.getElementById('triviaScore').textContent = '0';
                    break;
            }
        }
        
        function nextNeverHaveIEver() {
            const questions = gameData.neverHaveIEver;
            const random = Math.floor(Math.random() * questions.length);
            document.getElementById('gameQuestion').textContent = questions[random];
        }
        
        function showTruth() {
            const truths = gameData.truths;
            const random = Math.floor(Math.random() * truths.length);
            document.getElementById('gameQuestion').textContent = truths[random];
            selectRandomPlayer();
        }
        
        function showDare() {
            const dares = gameData.dares;
            const random = Math.floor(Math.random() * dares.length);
            document.getElementById('gameQuestion').textContent = dares[random];
            selectRandomPlayer();
        }
        
        function selectRandomPlayer() {
            const players = Object.values(partyData).map(p => p.name);
            if (players.length === 0) players.push('You');
            const random = Math.floor(Math.random() * players.length);
            const player = players[random];
            document.getElementById('playerName').textContent = `${player}'s turn!`;
        }
        
        function drawCard() {
            const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            const suits = ['♠️', '♥️', '♦️', '♣️'];
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const randomSuit = suits[Math.floor(Math.random() * suits.length)];
            
            document.getElementById('currentCard').textContent = randomCard + randomSuit;
            
            const rules = {
                'A': '🍉 Waterfall - Everyone drinks!',
                '2': '👉 You - Choose someone to drink',
                '3': '👈 Me - You drink!',
                '4': '👯 Floor - Last to touch floor drinks',
                '5': '🙋 Guys - All guys drink',
                '6': '💃 Chicks - All girls drink',
                '7': '🌈 Heaven - Last to raise hand drinks',
                '8': '🤝 Mate - Choose a drinking buddy',
                '9': '🎵 Rhyme - Say a word, others rhyme',
                '10': '📏 Categories - Name things in category',
                'J': '👑 Make a Rule',
                'Q': '❓ Questions - Ask questions only',
                'K': '🏆 King\'s Cup - Pour into center cup'
            };
            
            document.getElementById('gameQuestion').textContent = rules[randomCard];
        }
        
        function addScore(team) {
            gameScores[team]++;
            updateBeerPongScore();
            
            if (gameScores[team] >= 10) {
                document.getElementById('gameStatus').textContent = `${team === 'team1' ? 'Team 1' : 'Team 2'} Wins! 🏆`;
                confetti({
                    particleCount: 200,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
        
        function updateBeerPongScore() {
            document.getElementById('team1Score').textContent = gameScores.team1;
            document.getElementById('team2Score').textContent = gameScores.team2;
        }
        
        function resetBeerPong() {
            gameScores = { team1: 0, team2: 0 };
            updateBeerPongScore();
            document.getElementById('gameStatus').textContent = '';
        }
        
        function toggleFlipTimer() {
            const btn = document.getElementById('timerBtn');
            
            if (gameState.flipTimer) {
                clearInterval(gameState.flipTimer);
                gameState.flipTimer = null;
                btn.innerHTML = '<i class="fas fa-play"></i> Start Timer';
                
                if (!gameState.bestFlipTime || gameState.flipTime < gameState.bestFlipTime) {
                    gameState.bestFlipTime = gameState.flipTime;
                    document.getElementById('bestTime').textContent = `Best Time: ${formatTime(gameState.bestFlipTime)}`;
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                gameState.flipTime = 0;
                gameState.flipTimer = setInterval(() => {
                    gameState.flipTime++;
                    document.getElementById('flipTimer').textContent = formatTime(gameState.flipTime);
                }, 10);
                btn.innerHTML = '<i class="fas fa-pause"></i> Stop Timer';
            }
        }
        
        function resetFlipTimer() {
            if (gameState.flipTimer) {
                clearInterval(gameState.flipTimer);
                gameState.flipTimer = null;
            }
            gameState.flipTime = 0;
            document.getElementById('flipTimer').textContent = '00:00';
            document.getElementById('timerBtn').innerHTML = '<i class="fas fa-play"></i> Start Timer';
        }
        
        function formatTime(centiseconds) {
            const minutes = Math.floor(centiseconds / 6000);
            const seconds = Math.floor((centiseconds % 6000) / 100);
            const cs = centiseconds % 100;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
        }
        
        function nextTrivia() {
            const trivia = gameData.trivia;
            const current = trivia[gameState.currentTriviaIndex % trivia.length];
            
            document.getElementById('gameQuestion').textContent = current.question;
            
            const optionsHtml = current.options.map((option, index) => 
                `<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${index}, ${current.correct})">${option}</button>`
            ).join('');
            
            document.getElementById('triviaOptions').innerHTML = optionsHtml;
            gameState.currentTriviaIndex++;
        }
        
        function answerTrivia(selected, correct) {
            const buttons = document.getElementById('triviaOptions').querySelectorAll('button');
            
            if (selected === correct) {
                gameState.triviaScore++;
                document.getElementById('triviaScore').textContent = gameState.triviaScore;
                buttons[selected].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
                showNotification('✅ Correct! +1 point');
            } else {
                buttons[selected].style.background = 'linear-gradient(45deg, #ff4444, #ff0088)';
                buttons[correct].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
                showNotification('❌ Wrong answer!');
            }
            
            // Disable all buttons
            buttons.forEach(btn => btn.disabled = true);
            
            // Auto next question after 2 seconds
            setTimeout(nextTrivia, 2000);
        }
        
        function getGameTitle(gameType) {
            const titles = {
                'never-have-i-ever': '🙊 Never Have I Ever',
                'truth-or-dare': '🎯 Truth or Dare',
                'kings-cup': '👑 King\'s Cup',
                'beer-pong': '🏓 Beer Pong',
                'flip-cup': '🥤 Flip Cup',
                'trivia': '🧠 HSG Trivia'
            };
            return titles[gameType] || 'Party Game';
        }
        
        // Achievement System Functions
        function loadAchievements() {
            if (!currentUser) return;
            
            const achievementsRef = firebase.database().ref(`users/${currentUser.uid}/achievements`);
            achievementsRef.on('value', (snapshot) => {
                const data = snapshot.val() || {};
                
                // Initialize achievements with saved data
                Object.keys(achievementDefinitions).forEach(key => {
                    userAchievements[key] = {
                        ...achievementDefinitions[key],
                        ...data[key]
                    };
                });
                
                // Update UI
                updateAchievementsUI();
            });
        }
        
        function saveAchievement(achievementKey) {
            if (!currentUser) return;
            
            const achievement = userAchievements[achievementKey];
            if (!achievement) return;
            
            firebase.database().ref(`users/${currentUser.uid}/achievements/${achievementKey}`).set({
                progress: achievement.progress,
                unlocked: achievement.unlocked,
                unlockedAt: achievement.unlockedAt || null
            });
        }
        
        function updateAchievementProgress(achievementKey, increment = 1) {
            if (!userAchievements[achievementKey]) return;
            
            const achievement = userAchievements[achievementKey];
            
            // Don't update if already unlocked
            if (achievement.unlocked) return;
            
            // Update progress
            achievement.progress = Math.min(achievement.progress + increment, achievement.requirement);
            
            // Check if achievement is now unlocked
            if (achievement.progress >= achievement.requirement) {
                achievement.unlocked = true;
                achievement.unlockedAt = Date.now();
                
                // Show unlock notification
                showAchievementUnlocked(achievement);
                
                // Update stats
                updateAchievementStats();
            }
            
            // Save to Firebase
            saveAchievement(achievementKey);
            
            // Update UI
            updateAchievementsUI();
        }
        
        function updateAchievementsUI() {
            const container = document.querySelector('.achievements-grid');
            if (!container) return;
            
            // Clear existing achievements
            container.innerHTML = '';
            
            // Sort achievements by category and unlocked status
            const sortedAchievements = Object.entries(userAchievements)
                .sort(([, a], [, b]) => {
                    if (a.unlocked && !b.unlocked) return -1;
                    if (!a.unlocked && b.unlocked) return 1;
                    return a.category.localeCompare(b.category);
                });
            
            // Create achievement elements
            sortedAchievements.forEach(([key, achievement]) => {
                const achievementEl = document.createElement('div');
                achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
                achievementEl.setAttribute('data-achievement', key);
                
                // Calculate progress percentage
                const progressPercent = (achievement.progress / achievement.requirement) * 100;
                
                achievementEl.innerHTML = `
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    ${!achievement.unlocked ? `
                        <div class="achievement-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                            <div class="progress-text">${achievement.progress}/${achievement.requirement}</div>
                        </div>
                    ` : `
                        <div class="achievement-unlocked-date">
                            Unlocked ${new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                    `}
                `;
                
                container.appendChild(achievementEl);
            });
            
            // Update achievement stats
            updateAchievementStats();
        }
        
        function updateAchievementStats() {
            const totalAchievements = Object.keys(userAchievements).length;
            const unlockedAchievements = Object.values(userAchievements).filter(a => a.unlocked).length;
            
            // Update any stats displays
            const statsElements = document.querySelectorAll('[data-achievement-stats]');
            statsElements.forEach(el => {
                el.textContent = `${unlockedAchievements}/${totalAchievements}`;
            });
        }
        
        function checkAchievements(friends) {
            // Responsible - stayed safe all night
            if (friends.every(f => f.bac < 0.05) && Date.now() - partyStartTime > 3600000) {
                updateAchievementProgress('responsible');
            }
            
            // Sunrise Warrior - party for 6+ hours
            if (Date.now() - partyStartTime > 21600000) {
                updateAchievementProgress('sunriseWarrior');
            }
            
            // Social Butterfly - check friend count
            if (Object.keys(friendsData).length >= 20) {
                updateAchievementProgress('socialButterfly', Object.keys(friendsData).length);
            }
        }
        
        function showAchievementUnlocked(achievement) {
            // Play confetti animation
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            
            // Show notification with custom styling
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-popup">
                    <div class="achievement-popup-icon">${achievement.icon}</div>
                    <div class="achievement-popup-content">
                        <div class="achievement-popup-title">Achievement Unlocked!</div>
                        <div class="achievement-popup-name">${achievement.name}</div>
                        <div class="achievement-popup-description">${achievement.description}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 5000);
        }
        
        // Toggle chart visibility
        function toggleChart() {
            chartVisible = !chartVisible;
            const wrapper = document.getElementById('chartWrapper');
            const toggleText = document.getElementById('chartToggleText');
            
            if (chartVisible) {
                wrapper.classList.remove('collapsed');
                toggleText.textContent = 'Hide Chart';
            } else {
                wrapper.classList.add('collapsed');
                toggleText.textContent = 'Show Chart';
            }
        }
        
        // Drink tracking functions
        function logDrink() {
            try {
                const type = document.getElementById('drinkType').value;
                const amount = parseInt(document.getElementById('drinkAmount').value) || 0;
                const alcoholPercent = parseFloat(document.getElementById('alcoholPercent').value) || 0;
                
                if (amount <= 0) {
                    showNotification('❌ Please enter a valid amount', 'error');
                    return;
                }
                
                const drink = {
                    id: Date.now(),
                    type: type,
                    amount: amount,
                    alcoholPercent: alcoholPercent,
                    pureAlcohol: (amount * alcoholPercent / 100).toFixed(1),
                    time: new Date(),
                    emoji: drinkPresets[type].emoji
                };
                
                drinkHistory.unshift(drink);
                
                // Save to localStorage
                saveDrinkHistory();
                
                // Update UI
                updateDrinkStats();
                updateDrinkHistory();
                updateDrinkChart();
                updateEmergencySummary();
                
                // Send to Firebase if connected
                if (database && currentUser) {
                    database.ref('users/' + currentUser.uid + '/drinks/' + drink.id).set({
                        ...drink,
                        time: drink.time.toISOString()
                    });
                }
                
                // Track achievements
                if (userAchievements) {
                    // Track unique drink types for Mixologist achievement
                    const uniqueDrinkTypes = new Set(drinkHistory.map(d => d.type));
                    const currentProgress = userAchievements.mixologist?.progress || 0;
                    if (uniqueDrinkTypes.size > currentProgress) {
                        updateAchievementProgress('mixologist', uniqueDrinkTypes.size - currentProgress);
                    }
                    
                    // Track hydration for Hydro Homie
                    if (type === 'water') {
                        updateAchievementProgress('hydroHomie');
                    }
                }
                
                // Confetti for water!
                if (type === 'water') {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        colors: ['#00d4ff', '#0099ff', '#0066ff'],
                        origin: { y: 0.6 }
                    });
                    showNotification('💧 Great job staying hydrated!', 'success');
                } else {
                    showNotification(`${drink.emoji} Drink logged!`);
                }
                
                // Reset form to defaults
                document.getElementById('drinkAmount').value = drinkPresets[type].amount;
                document.getElementById('alcoholPercent').value = drinkPresets[type].alcohol;
            } catch (error) {
                console.error('Error logging drink:', error);
                showNotification('❌ Failed to log drink', 'error');
            }
        }
        
        function updateDrinkStats() {
            try {
                const now = Date.now();
                const oneHourAgo = now - 3600000;
                
                // Calculate totals
                const totalDrinks = drinkHistory.filter(d => d.type !== 'water').length;
                const totalWater = drinkHistory.filter(d => d.type === 'water').length;
                const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol || 0), 0);
                const recentDrinks = drinkHistory.filter(d => new Date(d.time).getTime() > oneHourAgo && d.type !== 'water').length;
                
                // Update display
                const totalDrinksEl = document.getElementById('totalDrinks');
                if (totalDrinksEl) totalDrinksEl.textContent = totalDrinks;
                
                const totalWaterEl = document.getElementById('totalWater');
                if (totalWaterEl) totalWaterEl.textContent = totalWater;
                
                const totalAlcoholEl = document.getElementById('totalAlcohol');
                if (totalAlcoholEl) totalAlcoholEl.textContent = totalAlcohol.toFixed(0) + 'ml';
                
                const drinkRateEl = document.getElementById('drinkRate');
                if (drinkRateEl) drinkRateEl.textContent = recentDrinks + '/hr';
            } catch (error) {
                console.error('Error updating drink stats:', error);
            }
        }
        
        function updateDrinkHistory() {
            try {
                const historyContainer = document.getElementById('drinkHistory');
                if (!historyContainer) return;
                
                if (drinkHistory.length === 0) {
                    historyContainer.innerHTML = '<p style="text-align: center; opacity: 0.7;">No drinks logged yet</p>';
                    return;
                }
                
                historyContainer.innerHTML = drinkHistory.slice(0, 20).map(drink => `
                    <div class="buddy-card" style="margin: 10px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="font-size: 2em;">${drink.emoji}</div>
                                <div>
                                    <div style="font-weight: bold;">${drink.type.charAt(0).toUpperCase() + drink.type.slice(1)}</div>
                                    <div style="opacity: 0.7; font-size: 0.9em;">
                                        ${drink.amount}ml • ${drink.alcoholPercent}% • ${drink.pureAlcohol}ml pure
                                    </div>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 0.9em;">${formatDrinkTime(drink.time)}</div>
                                <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${drink.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Error updating drink history:', error);
            }
        }
        
        function updateDrinkChart() {
            try {
                const ctx = document.getElementById('drinkChart');
                if (!ctx || !chartVisible) return;
                
                // Count drinks by type
                const drinkCounts = {};
                drinkHistory.forEach(drink => {
                    if (!drinkCounts[drink.type]) {
                        drinkCounts[drink.type] = 0;
                    }
                    drinkCounts[drink.type]++;
                });
                
                if (Object.keys(drinkCounts).length === 0) {
                    // No data yet
                    if (drinkChart) {
                        drinkChart.destroy();
                        drinkChart = null;
                    }
                    return;
                }
                
                const labels = Object.keys(drinkCounts);
                const data = Object.values(drinkCounts);
                const emojis = labels.map(type => drinkPresets[type]?.emoji || '🍹');
                
                if (drinkChart) {
                    // Update existing chart
                    drinkChart.data.labels = labels.map((label, i) => `${emojis[i]} ${label}`);
                    drinkChart.data.datasets[0].data = data;
                    drinkChart.update();
                } else {
                    // Create new chart
                    drinkChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: labels.map((label, i) => `${emojis[i]} ${label}`),
                            datasets: [{
                                data: data,
                                backgroundColor: [
                                    '#00ff88',
                                    '#00d4ff',
                                    '#ff00ff',
                                    '#ffcc00',
                                    '#ff4444',
                                    '#0099ff',
                                    '#00ccff',
                                    '#ff0088'
                                ],
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        color: '#fff',
                                        padding: 10,
                                        font: {
                                            size: window.innerWidth < 768 ? 10 : 12
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            } catch (error) {
                console.error('Error updating drink chart:', error);
            }
        }
        
        function updateEmergencySummary() {
            const summary = document.getElementById('emergencySummary');
            if (!summary) return;
            
            const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol), 0);
            const timeSpan = drinkHistory.length > 0 ? 
                ((Date.now() - drinkHistory[drinkHistory.length - 1].time) / 3600000).toFixed(1) : 0;
            
            const drinkTypes = {};
            drinkHistory.forEach(d => {
                if (!drinkTypes[d.type]) drinkTypes[d.type] = 0;
                drinkTypes[d.type]++;
            });
            
            const medicalInfo = localStorage.getItem('medicalInfo') || 'None provided';
            const safetyNotes = localStorage.getItem('safetyNotes') || 'None provided';
            
            summary.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
                    <p><strong>Time Period:</strong> ${timeSpan} hours</p>
                    <p><strong>Total Pure Alcohol:</strong> ${totalAlcohol.toFixed(0)}ml</p>
                    <p><strong>Drink Breakdown:</strong></p>
                    <ul style="margin-left: 20px;">
                        ${Object.entries(drinkTypes).map(([type, count]) => 
                            `<li>${drinkPresets[type].emoji} ${type}: ${count}</li>`
                        ).join('')}
                    </ul>
                    <p><strong>Last Drink:</strong> ${drinkHistory.length > 0 ? 
                        formatDrinkTime(drinkHistory[0].time) : 'None'}</p>
                    <p><strong>Estimated BAC:</strong> ${estimateBAC().toFixed(3)}‰</p>
                    <p><strong>Medical Info:</strong> ${escapeHtml(medicalInfo)}</p>
                    <p><strong>Safety Notes:</strong> ${escapeHtml(safetyNotes)}</p>
                </div>
            `;
        }
        
        function removeDrink(drinkId) {
            drinkHistory = drinkHistory.filter(d => d.id !== drinkId);
            saveDrinkHistory();
            updateDrinkStats();
            updateDrinkHistory();
            updateDrinkChart();
            updateEmergencySummary();
            showNotification('🗑️ Drink removed');
        }
        
        function saveDrinkHistory() {
            localStorage.setItem('drinkHistory', JSON.stringify(drinkHistory));
        }
        
        function loadDrinkHistory() {
            const saved = localStorage.getItem('drinkHistory');
            if (saved) {
                try {
                    drinkHistory = JSON.parse(saved);
                    // Convert time strings back to Date objects
                    drinkHistory.forEach(d => {
                        d.time = new Date(d.time);
                    });
                } catch (error) {
                    console.error('Failed to load drink history:', error);
                }
            }
        }
        
        function formatDrinkTime(time) {
            const now = new Date();
            const drinkTime = new Date(time);
            const diffMinutes = Math.floor((now - drinkTime) / 60000);
            
            if (diffMinutes < 1) return 'Just now';
            if (diffMinutes < 60) return `${diffMinutes}m ago`;
            if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
            return drinkTime.toLocaleDateString();
        }
        
        function estimateBAC() {
            // Widmark formula estimation (simplified)
            const weight = 70; // kg (average)
            const gender = 0.68; // male average (0.55 for female)
            const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol), 0);
            const hoursSinceFirst = drinkHistory.length > 0 ? 
                ((Date.now() - drinkHistory[drinkHistory.length - 1].time) / 3600000) : 0;
            
            // BAC = (alcohol in grams / (weight * gender factor)) - (0.015 * hours)
            const alcoholGrams = totalAlcohol * 0.789; // ml to grams
            const bac = Math.max(0, (alcoholGrams / (weight * 1000 * gender)) * 100 - (0.015 * hoursSinceFirst));
            
            return bac;
        }
        
        function showEmergencyReport() {
            try {
                const report = {
                    timestamp: new Date().toISOString(),
                    estimatedBAC: estimateBAC().toFixed(3),
                    drinkHistory: drinkHistory,
                    totalAlcohol: drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol || 0), 0),
                    userData: {
                        name: userData.username || currentUser?.email || 'Unknown',
                        address: localStorage.getItem('homeAddress') || 'Not provided',
                        emergencyContact: localStorage.getItem('emergencyContact') || 'Not provided',
                        medicalInfo: localStorage.getItem('medicalInfo') || 'None',
                        safetyNotes: localStorage.getItem('safetyNotes') || 'None'
                    }
                };
                
                const reportText = `EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${report.userData.name}
Address: ${report.userData.address}
Emergency Contact: ${report.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${report.userData.medicalInfo}

SAFETY NOTES
------------
${report.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY
---------------------------
Estimated BAC: ${report.estimatedBAC}‰
Total Pure Alcohol: ${report.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${drinkHistory.filter(d => d.type !== 'water').length}
Water Consumed: ${drinkHistory.filter(d => d.type === 'water').length} glasses

DETAILED DRINK LOG
------------------
${drinkHistory.map(d => 
    `${formatDrinkTime(d.time)}: ${d.emoji} ${d.type} - ${d.amount}ml @ ${d.alcoholPercent}%`
).join('\n')}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`;
                
                // Create modal with report
                const modalContent = `
                    <h2>🚨 Emergency Medical Report</h2>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                        <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${escapeHtml(reportText)}</pre>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="copyEmergencyReport()">
                            <i class="fas fa-copy"></i> Copy Report
                        </button>
                        <button class="btn btn-primary" onclick="downloadEmergencyReport()">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="btn btn-danger" onclick="shareEmergencyReport()">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="btn" onclick="closeModal()">Close</button>
                    </div>
                `;
                
                // Store report in window for other functions
                window.currentEmergencyReport = reportText;
                
                document.getElementById('modalBody').innerHTML = modalContent;
                document.getElementById('modal').classList.add('show');
            } catch (error) {
                console.error('Error generating emergency report:', error);
                showNotification('❌ Error generating report', 'error');
            }
        }
        
        function copyEmergencyReport() {
            if (window.currentEmergencyReport) {
                navigator.clipboard.writeText(window.currentEmergencyReport)
                    .then(() => showNotification('📋 Report copied to clipboard!', 'success'))
                    .catch(() => {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = window.currentEmergencyReport;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showNotification('📋 Report copied!', 'success');
                    });
            }
        }
        
        function downloadEmergencyReport() {
            try {
                const blob = new Blob([window.currentEmergencyReport], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `emergency_report_${new Date().toISOString().slice(0,10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                showNotification('📥 Report downloaded!', 'success');
            } catch (error) {
                console.error('Download error:', error);
                showNotification('❌ Download failed - use copy instead', 'error');
            }
        }
        
        function shareEmergencyReport() {
            if (navigator.share && window.currentEmergencyReport) {
                navigator.share({
                    title: 'Emergency Medical Report',
                    text: window.currentEmergencyReport
                })
                .then(() => showNotification('📤 Report shared!', 'success'))
                .catch(() => showNotification('❌ Sharing cancelled'));
            } else {
                // Fallback - copy to clipboard
                copyEmergencyReport();
                showNotification('📋 Report copied - share manually');
            }
        }
        
        // Export data
        function exportData() {
            const data = {
                user: {
                    email: currentUser?.email,
                    username: userData.username
                },
                settings: userData.settings,
                emergency: userData.emergency,
                devices: deviceData,
                friends: friendsData,
                drinkHistory: drinkHistory,
                achievements: achievements,
                partyData: partyData
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
        
        // Clear drink history
        function clearDrinkHistory() {
            if (confirm('Clear all drink history? This cannot be undone!')) {
                drinkHistory = [];
                saveDrinkHistory();
                updateDrinkStats();
                updateDrinkHistory();
                updateDrinkChart();
                updateEmergencySummary();
                
                // Clear from Firebase
                if (database && currentUser) {
                    database.ref('users/' + currentUser.uid + '/drinks').remove();
                }
                
                showNotification('🗑️ Drink history cleared');
            }
        }
        
        // Sound effects (placeholder)
        function playSound(soundName) {
            // In real implementation, would play actual sound files
            console.log(`Playing sound: ${soundName}`);
        }
        
        // Utility functions
        function getTimeSince(timestamp) {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            if (seconds < 60) return 'just now';
            if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
            return `${Math.floor(seconds / 3600)}h ago`;
        }
        
        function showNotification(message, type = 'success') {
            const notif = document.createElement('div');
            notif.className = `notification ${type}`;
            notif.innerHTML = escapeHtml(message);
            notif.onclick = () => notif.remove();
            document.body.appendChild(notif);
            
            setTimeout(() => {
                if (notif.parentNode) {
                    notif.remove();
                }
            }, 4000);
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        // Error boundary
        window.addEventListener('error', (e) => {
            console.error('Application error:', e);
            // Don't show error notifications for minor issues
            if (e.message && !e.message.includes('ResizeObserver')) {
                showNotification('⚠️ Something went wrong. Refreshing might help.', 'error');
            }
        });
        
        // Window events
        window.onclick = (event) => {
            if (event.target.className === 'modal show') {
                closeModal();
            }
            if (event.target.className === 'game-overlay show') {
                closeGame();
            }
        };
        
        window.addEventListener('beforeunload', () => {
            saveDrinkHistory();
        });
        
        // Error recovery
        window.addEventListener('unhandledrejection', event => {
            console.error('Unhandled promise rejection:', event.reason);
            // Only show notification for serious errors
            if (event.reason && event.reason.code && event.reason.code.includes('auth')) {
                showNotification('⚠️ Authentication issue. Try refreshing.', 'error');
            }
        });
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Update drink type selection to auto-fill amounts
                const drinkTypeSelect = document.getElementById('drinkType');
                if (drinkTypeSelect) {
                    drinkTypeSelect.addEventListener('change', function() {
                        const preset = drinkPresets[this.value];
                        document.getElementById('drinkAmount').value = preset.amount;
                        document.getElementById('alcoholPercent').value = preset.alcohol;
                    });
                }
                
                // Initialize particles
                createParticles();
                
                // Initialize Firebase
                initializeFirebase();
                
                // Update intervals
                setInterval(updateVisualizer, 500);
                
                // Hydration reminders
                setInterval(() => {
                    const minutes = new Date().getMinutes();
                    if (minutes % 15 === 0) {
                        showHydrationReminder();
                    }
                }, 60000);
            });
        } else {
            // DOM already loaded
            createParticles();
            initializeFirebase();
            setInterval(updateVisualizer, 500);
        }
   