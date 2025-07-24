// ========================================
// AUTHENTICATION MODULE
// ========================================
// Handles all login, signup, and user authentication

import { getFirebaseAuth, getFirebaseDatabase, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged 
} from '../config/firebase.js';
import { setCurrentUser, setStateValue } from '../config/app-state.js';
import { ref, set, get } from '../config/firebase.js';
import { handleError, validateInput, safeAsync } from '../utils/error-handler.js';

// Track if we're in signup mode
let isSignUp = false;

// ========================================
// UI TOGGLE FUNCTIONS
// ========================================
export function showAuthScreen() {
    document.getElementById('authContainer').style.display = 'flex';
    document.getElementById('userProfile').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
}

export function hideAuthScreen() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
    document.querySelector('.container').style.display = 'block';
}

function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
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

// ========================================
// TOGGLE BETWEEN LOGIN/SIGNUP
// ========================================
export function toggleAuthMode() {
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

// ========================================
// HANDLE LOGIN/SIGNUP
// ========================================
export async function handleAuthSubmit(event) {
    event.preventDefault();
    
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
        const auth = getFirebaseAuth();
        const database = getFirebaseDatabase();
        
        if (!isSignUp) {
            // LOGIN
            await signInWithEmailAndPassword(auth, email, password);
            showNotification('✅ Welcome back!', 'success');
            
        } else {
            // SIGNUP
            if (!username || username.length < 3) {
                showAuthError('Username must be at least 3 characters');
                hideAuthLoading();
                return;
            }
            
            // Check if username is taken
            const usernameCheck = await get(ref(database, 'usernames/' + username.toLowerCase()));
            if (usernameCheck.exists()) {
                showAuthError('Username already taken');
                hideAuthLoading();
                return;
            }
            
            // Create account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user data
            await set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                createdAt: new Date().toISOString(),
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
            await set(ref(database, 'usernames/' + username.toLowerCase()), user.uid);
            
            showNotification('✅ Account created successfully!', 'success');
        }
        
        hideAuthLoading();
        
    } catch (error) {
        hideAuthLoading();
        const errorInfo = handleError(error, 'Authentication');
        showAuthError(errorInfo.message);
    }
}

// ========================================
// SIGN OUT
// ========================================
export async function signOut() {
    try {
        const auth = getFirebaseAuth();
        await firebaseSignOut(auth);
        showNotification('👋 Signed out successfully');
        location.reload();
    } catch (error) {
        const errorInfo = handleError(error, 'Sign Out');
        showNotification(errorInfo.message, 'error');
    }
}

// ========================================
// SETUP AUTH LISTENER
// ========================================
export function setupAuthListener(onAuthenticated) {
    const auth = getFirebaseAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
            onAuthenticated(user);
        } else {
            setCurrentUser(null);
            showAuthScreen();
        }
    });
}

// ========================================
// LOAD USER DATA
// ========================================
export async function loadUserData(user) {
    try {
        const database = getFirebaseDatabase();
        const snapshot = await get(ref(database, 'users/' + user.uid));
        const userData = snapshot.val() || {};
        
        // Update profile displays
        const displayName = userData.username || user.email.split('@')[0];
        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = user.email;
        
        // Update settings page
        document.getElementById('settingsUsername').textContent = displayName;
        document.getElementById('settingsEmail').textContent = user.email;
        document.getElementById('username').value = userData.username || '';
        document.getElementById('emailDisplay').value = user.email;
        document.getElementById('linkedEmail').textContent = user.email;
        
        // Update profile initial
        const initial = displayName.charAt(0).toUpperCase();
        document.getElementById('profileInitial').textContent = initial;
        
        // Store user data in app state
        setStateValue('userData', userData);
        
        return userData;
        
    } catch (error) {
        console.error('Error loading user data:', error);
        throw error;
    }
}

// ========================================
// HELPER: Show notification (temporary - will move to UI module)
// ========================================
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