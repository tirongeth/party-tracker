// ========================================
// FIREBASE CONFIGURATION MODULE
// ========================================
// This module handles Firebase initialization using modular SDK

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile as firebaseUpdateProfile,
    updatePassword as firebaseUpdatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    getDatabase, 
    ref as firebaseRef, 
    onValue as firebaseOnValue,
    set as firebaseSet,
    get as firebaseGet,
    push as firebasePush,
    update as firebaseUpdate,
    remove as firebaseRemove,
    off as firebaseOff,
    serverTimestamp as firebaseServerTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Firebase configuration - these are public keys, safe to expose
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

// Initialize Firebase app
let app = null;
let auth = null;
let database = null;
let storage = null;
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
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }
        
        // Get Firebase services
        auth = getAuth(app);
        database = getDatabase(app);
        storage = getStorage(app);
        
        isInitialized = true;
        console.log('✅ Firebase initialized successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        if (typeof window !== 'undefined' && window.showNotification) {
            window.showNotification('Failed to connect to Firebase', 'error');
        }
        return false;
    }
}

// Get the auth service
export function getFirebaseAuth() {
    if (!auth) {
        console.error('Firebase Auth not initialized. Call initializeFirebase() first.');
        return null;
    }
    return auth;
}

// Get the database service
export function getFirebaseDatabase() {
    if (!database) {
        console.error('Firebase Database not initialized. Call initializeFirebase() first.');
        return null;
    }
    return database;
}

// Get the storage service
export function getFirebaseStorage() {
    if (!storage) {
        console.error('Firebase Storage not initialized. Call initializeFirebase() first.');
        return null;
    }
    return storage;
}

// Export Firebase Auth functions
export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    firebaseSignOut as signOut,
    onAuthStateChanged,
    firebaseUpdateProfile as updateProfile,
    firebaseUpdatePassword as updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
};

// Export Firebase Database functions with consistent naming
export const ref = (pathOrDatabase, maybePath) => {
    const db = getFirebaseDatabase();
    if (!db) return null;
    
    // Handle both ref(database, path) and ref(path) signatures
    if (typeof pathOrDatabase === 'string') {
        return firebaseRef(db, pathOrDatabase);
    } else if (maybePath !== undefined) {
        return firebaseRef(pathOrDatabase, maybePath);
    }
    return firebaseRef(db, pathOrDatabase);
};

export const onValue = (reference, callback) => {
    if (!reference) return;
    return firebaseOnValue(reference, callback);
};

export const set = (reference, value) => {
    if (!reference) return Promise.reject('No ref provided');
    return firebaseSet(reference, value);
};

export const get = (reference) => {
    if (!reference) return Promise.reject('No ref provided');
    return firebaseGet(reference);
};

export const push = (reference, value) => {
    if (!reference) return null;
    return firebasePush(reference, value);
};

export const update = (reference, values) => {
    if (!reference) return Promise.reject('No ref provided');
    return firebaseUpdate(reference, values);
};

export const remove = (reference) => {
    if (!reference) return Promise.reject('No ref provided');
    return firebaseRemove(reference);
};

export const off = (reference, callback) => {
    if (!reference) return;
    return firebaseOff(reference, callback);
};

export const serverTimestamp = () => {
    return firebaseServerTimestamp();
};

// Export auth and database for other modules
export { auth, database };