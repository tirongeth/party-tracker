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