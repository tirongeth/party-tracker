// ========================================
// PWA (PROGRESSIVE WEB APP) MODULE
// ========================================
// Handles service worker registration and app installation

import { showNotification } from '../ui/notifications.js';

let deferredPrompt;
let isInstalled = false;

// Check if app is installed
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
    isInstalled = true;
}

// ========================================
// REGISTER SERVICE WORKER
// ========================================
export async function registerServiceWorker() {
    // Service worker registration disabled due to GitHub Pages issues
    console.log('Service worker registration disabled');
    return null;
}

// ========================================
// HANDLE INSTALL PROMPT
// ========================================
export function initializePWA() {
    // Listen for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if not already installed
        if (!isInstalled) {
            showInstallButton();
        }
    });
    
    // Listen for app installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        isInstalled = true;
        hideInstallButton();
        showNotification('App installed successfully!', 'success');
    });
}

// ========================================
// SHOW/HIDE INSTALL BUTTON
// ========================================
function showInstallButton() {
    // Create install button if it doesn't exist
    let installButton = document.getElementById('installButton');
    if (!installButton) {
        installButton = document.createElement('button');
        installButton.id = 'installButton';
        installButton.className = 'btn btn-primary install-button';
        installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
        installButton.onclick = promptInstall;
        
        // Add to header action buttons
        const actionButtons = document.querySelector('.action-buttons');
        if (actionButtons) {
            actionButtons.appendChild(installButton);
        }
    }
    
    installButton.style.display = 'inline-block';
}

function hideInstallButton() {
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'none';
    }
}

// ========================================
// PROMPT INSTALLATION
// ========================================
export async function promptInstall() {
    if (!deferredPrompt) {
        showNotification('App is already installed or not available for installation', 'info');
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
    } else {
        console.log('User dismissed the install prompt');
    }
    
    // Clear the deferred prompt
    deferredPrompt = null;
}

// ========================================
// CHECK FOR UPDATES
// ========================================
export async function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            registration.update();
        }
    }
}

// ========================================
// OFFLINE STORAGE
// ========================================
export function initializeOfflineStorage() {
    // Open IndexedDB for offline data storage
    const request = indexedDB.open('BoozeLensDB', 1);
    
    request.onerror = () => {
        console.error('Failed to open IndexedDB');
    };
    
    request.onsuccess = (event) => {
        const db = event.target.result;
        console.log('IndexedDB opened successfully');
    };
    
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for offline data
        if (!db.objectStoreNames.contains('drinks')) {
            const drinksStore = db.createObjectStore('drinks', { keyPath: 'id', autoIncrement: true });
            drinksStore.createIndex('timestamp', 'timestamp', { unique: false });
            drinksStore.createIndex('synced', 'synced', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('readings')) {
            const readingsStore = db.createObjectStore('readings', { keyPath: 'id', autoIncrement: true });
            readingsStore.createIndex('timestamp', 'timestamp', { unique: false });
            readingsStore.createIndex('synced', 'synced', { unique: false });
        }
    };
}

// ========================================
// SAVE DATA OFFLINE
// ========================================
export async function saveOfflineData(storeName, data) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('BoozeLensDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            const addRequest = store.add({
                ...data,
                synced: false,
                timestamp: new Date().toISOString()
            });
            
            addRequest.onsuccess = () => {
                resolve();
                // Register for background sync
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.ready.then(registration => {
                        if ('sync' in registration) {
                            registration.sync.register(`sync-${storeName}`);
                        }
                    });
                }
            };
            
            addRequest.onerror = () => reject(addRequest.error);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// GET OFFLINE DATA
// ========================================
export async function getOfflineData(storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('BoozeLensDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// NETWORK STATUS
// ========================================
export function isOnline() {
    return navigator.onLine;
}

// Listen for online/offline events
window.addEventListener('online', () => {
    showNotification('Back online! Syncing data...', 'success');
    // Trigger sync
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
            if ('sync' in registration) {
                registration.sync.register('sync-all');
            }
        });
    }
});

window.addEventListener('offline', () => {
    showNotification('You are offline. Data will be saved locally.', 'warning');
});