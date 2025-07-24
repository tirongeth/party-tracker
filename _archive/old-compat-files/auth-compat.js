// ========================================
// AUTHENTICATION MODULE (CDN COMPATIBLE)
// ========================================
// This version works with Firebase loaded from CDN

import { getFirebaseAuth, getFirebaseDatabase } from '../config/firebase-compat.js';
import { setCurrentUser, setStateValue } from '../config/app-state.js';
import { showNotification } from '../ui/notifications.js';

// Track if we're in signup mode
let isSignUp = false;

// ========================================
// UI TOGGLE FUNCTIONS
// ========================================
export function showAuthScreen() {
    document.getElementById('authContainer').style.display = 'flex';
    document.getElementById('userProfile').style.display = 'none';
}

export function hideAuthScreen() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
}

export function toggleAuthMode() {
    isSignUp = !isSignUp;
    setStateValue('isSignUp', isSignUp);
    
    const authTitle = document.getElementById('authTitle');
    const authButton = document.getElementById('authButton');
    const authToggleText = document.getElementById('authToggleText');
    const authToggleLink = document.getElementById('authToggleLink');
    const usernameGroup = document.getElementById('usernameGroup');
    
    if (isSignUp) {
        authTitle.textContent = 'Create Account';
        authButton.textContent = 'Sign Up';
        authToggleText.textContent = 'Already have an account?';
        authToggleLink.textContent = 'Login';
        usernameGroup.style.display = 'block';
    } else {
        authTitle.textContent = 'Welcome to HSG Party Tracker';
        authButton.textContent = 'Login';
        authToggleText.textContent = "Don't have an account?";
        authToggleLink.textContent = 'Sign up';
        usernameGroup.style.display = 'none';
    }
}

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================
export async function handleAuthSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const username = document.getElementById('authUsername').value.trim();
    const authError = document.getElementById('authError');
    const authLoading = document.getElementById('authLoading');
    const authForm = document.getElementById('authForm');
    
    // Clear previous errors
    authError.style.display = 'none';
    authError.textContent = '';
    
    // Validate inputs
    if (!email || !password) {
        authError.textContent = 'Please fill in all fields';
        authError.style.display = 'block';
        return;
    }
    
    if (isSignUp && !username) {
        authError.textContent = 'Please choose a username';
        authError.style.display = 'block';
        return;
    }
    
    // Show loading
    authLoading.style.display = 'block';
    authForm.style.display = 'none';
    
    try {
        const auth = getFirebaseAuth();
        
        if (isSignUp) {
            // Sign up
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Create user profile
            const database = getFirebaseDatabase();
            await database.ref('users/' + user.uid).set({
                username: username,
                email: email,
                devices: {},
                friends: {},
                achievements: {},
                settings: {
                    notifications: true,
                    shareLocation: false,
                    publicProfile: true
                }
            });
            
            showNotification('✅ Account created successfully!', 'success');
        } else {
            // Login
            await auth.signInWithEmailAndPassword(email, password);
            showNotification('✅ Welcome back!', 'success');
        }
    } catch (error) {
        console.error('Auth error:', error);
        let errorMessage = 'Authentication failed';
        
        // Handle specific errors
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password';
        } else if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Email already registered';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password should be at least 6 characters';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        }
        
        authError.textContent = errorMessage;
        authError.style.display = 'block';
        
        // Hide loading and show form
        authLoading.style.display = 'none';
        authForm.style.display = 'block';
    }
}

export function setupAuthListener(onAuthenticated) {
    const auth = getFirebaseAuth();
    
    auth.onAuthStateChanged((user) => {
        if (user) {
            setCurrentUser(user);
            onAuthenticated(user);
        } else {
            setCurrentUser(null);
            showAuthScreen();
        }
    });
}

export async function signOut() {
    try {
        const auth = getFirebaseAuth();
        await auth.signOut();
        
        // Clear local data
        localStorage.clear();
        setCurrentUser(null);
        
        // Show auth screen
        showAuthScreen();
        showNotification('👋 Signed out successfully', 'success');
        
        // Reload to clear state
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error('Sign out error:', error);
        showNotification('❌ Error signing out', 'error');
    }
}

export async function loadUserData(user) {
    try {
        const database = getFirebaseDatabase();
        const userRef = database.ref('users/' + user.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val() || {};
        
        setStateValue('userData', userData);
        
        // Update profile displays
        const displayName = userData.username || user.email.split('@')[0];
        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileInitial').textContent = displayName.charAt(0).toUpperCase();
        
        // Update settings
        document.getElementById('settingsUsername').textContent = displayName;
        document.getElementById('settingsEmail').textContent = user.email;
        document.getElementById('username').value = userData.username || '';
        document.getElementById('emailDisplay').value = user.email;
        document.getElementById('linkedEmail').textContent = user.email;
        
        return userData;
    } catch (error) {
        console.error('Error loading user data:', error);
        throw error;
    }
}