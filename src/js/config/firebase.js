// ========================================
// FIREBASE CONFIGURATION MODULE
// ========================================
// This module handles Firebase initialization
// It reads the secret values from environment variables

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Reading values from environment variables (.env file)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate Firebase configuration
const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
    console.error('❌ Missing Firebase configuration:', missingFields);
    console.error('Make sure all environment variables are set in .env file or GitHub Secrets');
}

// Validate Firebase configuration
function validateFirebaseConfig() {
    const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
    const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
    
    if (missingFields.length > 0) {
        console.error('Missing required Firebase configuration:', missingFields);
        console.error('Please ensure all environment variables are set in GitHub Secrets or .env file');
        return false;
    }
    return true;
}

// Initialize Firebase app
let app = null;
let auth = null;
let database = null;
let isInitialized = false;

// Initialize Firebase
export function initializeFirebase() {
    // Check if already initialized
    if (isInitialized) {
        console.log('Firebase already initialized');
        return true;
    }
    
    // Validate configuration before initializing
    if (!validateFirebaseConfig()) {
        console.error('❌ Firebase configuration validation failed');
        // Show user-friendly error message
        if (typeof window !== 'undefined' && window.showNotification) {
            window.showNotification('Firebase configuration error. Please check the deployment.', 'error');
        }
        return false;
    }
    
    try {
        // Initialize Firebase app with modern syntax
        app = initializeApp(firebaseConfig);
        
        // Get Firebase services using modern imports
        auth = getAuth(app);
        database = getDatabase(app);
        
        isInitialized = true;
        console.log('✅ Firebase initialized successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        // Show user-friendly error message
        if (typeof window !== 'undefined' && window.showNotification) {
            window.showNotification('Failed to connect to Firebase. Please try again later.', 'error');
        }
        return false;
    }
}

// Get the auth service
export function getFirebaseAuth() {
    if (!auth) {
        throw new Error('Firebase Auth not initialized. Call initializeFirebase() first.');
    }
    return auth;
}

// Get the database service
export function getFirebaseDatabase() {
    if (!database) {
        throw new Error('Firebase Database not initialized. Call initializeFirebase() first.');
    }
    return database;
}