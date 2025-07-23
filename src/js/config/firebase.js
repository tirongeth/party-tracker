// ========================================
// FIREBASE CONFIGURATION MODULE
// ========================================
// This module handles Firebase initialization
// It reads the secret values from environment variables

// For now, we'll use the values directly
// (We'll change this to use .env later when we add Vite)
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

// These will hold our Firebase services
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
        // Initialize Firebase app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        // Get Firebase services
        database = firebase.database();
        auth = firebase.auth();
        
        isInitialized = true;
        console.log('✅ Firebase initialized successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

// Get the auth service
export function getAuth() {
    if (!auth) {
        throw new Error('Firebase Auth not initialized. Call initializeFirebase() first.');
    }
    return auth;
}

// Get the database service
export function getDatabase() {
    if (!database) {
        throw new Error('Firebase Database not initialized. Call initializeFirebase() first.');
    }
    return database;
}