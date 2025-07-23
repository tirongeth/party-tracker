// ========================================
// MAIN APPLICATION ENTRY POINT
// ========================================
// This replaces the old boozelens-app.js initialization

import { initializeFirebase } from './config/firebase.js';
import { getAppState } from './config/app-state.js';
import { 
    setupAuthListener, 
    handleAuthSubmit, 
    toggleAuthMode,
    hideAuthScreen,
    loadUserData,
    signOut 
} from './auth/auth.js';

// Make functions available globally for HTML onclick handlers
window.toggleAuthMode = toggleAuthMode;
window.signOut = signOut;

// ========================================
// INITIALIZATION
// ========================================
async function initializeApp() {
    console.log('🚀 Starting BoozeLens...');
    
    try {
        // Step 1: Initialize Firebase
        console.log('📡 Connecting to Firebase...');
        const initialized = initializeFirebase();
        
        if (!initialized) {
            throw new Error('Failed to initialize Firebase');
        }
        
        // Step 2: Setup auth form handler
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', handleAuthSubmit);
        }
        
        // Step 3: Setup auth state listener
        setupAuthListener(onUserAuthenticated);
        
        // Step 4: Initialize particles (if function exists)
        if (typeof createParticles === 'function') {
            createParticles();
        }
        
        console.log('✅ BoozeLens initialized!');
        
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        alert('Failed to start BoozeLens. Please check your connection and refresh.');
    }
}

// ========================================
// USER AUTHENTICATED HANDLER
// ========================================
async function onUserAuthenticated(user) {
    console.log('👤 User authenticated:', user.email);
    
    try {
        // Hide auth screen
        hideAuthScreen();
        
        // Load user data
        await loadUserData(user);
        
        // TODO: Initialize other features
        // - setupFirebaseListeners()
        // - initializeDevices()
        // - initializeFriends()
        // - initializeDrinks()
        // - updateUI()
        
        // For now, just update connection status
        updateConnectionStatus(true);
        
        // Show welcome message
        const userData = getAppState().userData;
        const displayName = userData.username || user.email.split('@')[0];
        showNotification(`🎉 Welcome, ${displayName}!`);
        
    } catch (error) {
        console.error('Error setting up authenticated user:', error);
        showNotification('⚠️ Error loading profile. Some features may not work.', 'error');
    }
}

// ========================================
// TEMPORARY FUNCTIONS (will be moved to modules)
// ========================================

// Update connection status
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

// Show notification
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

// Create particles effect
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

// Make showNotification global for other functions
window.showNotification = showNotification;

// ========================================
// START THE APP
// ========================================
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM already loaded
    initializeApp();
}