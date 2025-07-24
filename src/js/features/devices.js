// ========================================
// DEVICE MANAGEMENT MODULE
// ========================================
// Handles breathalyzer pairing and BAC readings

import { getFirebaseDatabase } from '../config/firebase.js';
import { getCurrentUser, getStateValue, setStateValue } from '../config/app-state.js';
import { ref, set, get, remove, onValue, off, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { showNotification } from '../ui/notifications.js';
import { handleError, validateInput, safeAsync } from '../utils/error-handler.js';

// Store device listeners
const deviceListeners = {};

// ========================================
// INITIALIZE DEVICES
// ========================================
export function initializeDevices() {
    const user = getCurrentUser();
    if (!user) return;
    
    const database = getFirebaseDatabase();
    
    // Listen for user's devices
    onValue(ref(database, 'users/' + user.uid + '/devices'), (snapshot) => {
        const devices = snapshot.val() || {};
        setStateValue('deviceData', devices);
        updateDeviceList();
        document.getElementById('deviceCount').textContent = Object.keys(devices).length;
        
        // Start listening to each device
        Object.keys(devices).forEach(deviceId => {
            listenToDevice(deviceId);
        });
    });
}

// ========================================
// PAIR NEW DEVICE
// ========================================
export async function pairDeviceById() {
    const deviceId = document.getElementById('deviceIdInput').value.trim().toUpperCase();
    
    // Validate device ID format
    const deviceIdErrors = validateInput(deviceId, 'deviceId', 'Device ID');
    if (deviceIdErrors.length > 0) {
        showNotification(deviceIdErrors[0], 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        
        // Check if device exists in readings
        const deviceSnapshot = await get(ref(database, 'readings/' + deviceId));
        
        if (!deviceSnapshot.exists()) {
            showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
            return;
        }
        
        // Check if already paired
        const deviceData = getStateValue('deviceData');
        if (deviceData[deviceId]) {
            showNotification('ℹ️ Device already paired');
            return;
        }
        
        // Add device to user
        await set(ref(database, 'users/' + user.uid + '/devices/' + deviceId), {
            pairedAt: serverTimestamp(),
            name: 'My Breathalyzer'
        });
        
        // Clear input
        document.getElementById('deviceIdInput').value = '';
        
        showNotification('✅ Device paired successfully!', 'success');
        
    } catch (error) {
        const errorInfo = handleError(error, 'Device Pairing');
        showNotification(errorInfo.message, 'error');
    }
}

// ========================================
// LISTEN TO DEVICE READINGS
// ========================================
function listenToDevice(deviceId) {
    // Don't create duplicate listeners
    if (deviceListeners[deviceId]) return;
    
    const database = getFirebaseDatabase();
    const listener = onValue(ref(database, 'readings/' + deviceId), (snapshot) => {
        const reading = snapshot.val();
        if (reading) {
            processDeviceReading(deviceId, reading);
        }
    });
    
    deviceListeners[deviceId] = listener;
}

// ========================================
// PROCESS DEVICE READING
// ========================================
function processDeviceReading(deviceId, reading) {
    let partyData = getStateValue('partyData') || {};
    
    if (!partyData[deviceId]) {
        partyData[deviceId] = {
            name: getStateValue('userData').username || 'You',
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
    
    setStateValue('partyData', partyData);
    
    // Update UI
    if (window.updateUI) {
        window.updateUI();
    }
    
    // Check for alerts
    if (reading.bac >= 0.08) {
        showNotification(`⚠️ Your BAC is too high: ${reading.bac.toFixed(3)}‰`, 'error');
    }
}

// ========================================
// UPDATE DEVICE LIST UI
// ========================================
function updateDeviceList() {
    const deviceList = document.getElementById('deviceList');
    if (!deviceList) return;
    
    const deviceData = getStateValue('deviceData') || {};
    deviceList.innerHTML = '';
    
    if (Object.keys(deviceData).length === 0) {
        deviceList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';
        return;
    }
    
    const partyData = getStateValue('partyData') || {};
    
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

// ========================================
// DEVICE ACTIONS
// ========================================
export async function unpairDevice(deviceId) {
    if (confirm('Unpair this device?')) {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        await remove(ref(database, 'users/' + user.uid + '/devices/' + deviceId));
        
        // Stop listening to this device
        if (deviceListeners[deviceId]) {
            const database = getFirebaseDatabase();
            off(ref(database, 'readings/' + deviceId), 'value', deviceListeners[deviceId]);
            delete deviceListeners[deviceId];
        }
        
        showNotification('🔓 Device unpaired');
    }
}

export async function renameDevice(deviceId) {
    const deviceData = getStateValue('deviceData');
    const newName = prompt('Enter new name for device:', deviceData[deviceId]?.name || 'My Breathalyzer');
    
    if (newName) {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        await set(ref(database, 'users/' + user.uid + '/devices/' + deviceId + '/name'), newName);
        showNotification('✏️ Device renamed');
    }
}

// Make functions available globally for onclick handlers
window.pairDeviceById = pairDeviceById;
window.unpairDevice = unpairDevice;
window.renameDevice = renameDevice;