// ========================================
// FIREBASE CONFIGURATION (CDN COMPATIBLE)
// ========================================
// This version works with the Firebase CDN scripts

// Firebase configuration
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

let auth = null;
let database = null;
let isInitialized = false;

// Initialize Firebase
export function initializeFirebase() {
    if (isInitialized) {
        console.log('Firebase already initialized');
        return true;
    }
    
    try {
        // Check if Firebase is loaded from CDN
        if (typeof firebase === 'undefined') {
            console.error('Firebase not loaded from CDN');
            return false;
        }
        
        // Initialize Firebase app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        auth = firebase.auth();
        database = firebase.database();
        
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

// Export Firebase references for compatibility
export const ref = (db, path) => {
    if (typeof path === 'string') {
        return database.ref(path);
    }
    // If called with just path (legacy style)
    return database.ref(db);
};

export const set = (ref, value) => ref.set(value);
export const get = (ref) => ref.once('value');
export const push = (ref, value) => ref.push(value);
export const remove = (ref) => ref.remove();
export const onValue = (ref, callback) => {
    ref.on('value', (snapshot) => {
        callback(snapshot);
    });
};
export const off = (ref, callback) => ref.off('value', callback);
export const serverTimestamp = () => firebase.database.ServerValue.TIMESTAMP;

// Auth functions
export const signInWithEmailAndPassword = (auth, email, password) => auth.signInWithEmailAndPassword(email, password);
export const createUserWithEmailAndPassword = (auth, email, password) => auth.createUserWithEmailAndPassword(email, password);
export const onAuthStateChanged = (auth, callback) => auth.onAuthStateChanged(callback);
export const signOut = (auth) => auth.signOut();