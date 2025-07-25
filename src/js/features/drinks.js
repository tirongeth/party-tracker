// ========================================
// DRINK TRACKING MODULE
// ========================================
// All drink-related functions from your original app

import { getFirebaseDatabase } from '../config/firebase.js';
import { getAppState, setStateValue, getCurrentUser } from '../config/app-state.js';
import { DRINK_PRESETS } from '../config/constants.js';
import { showNotification } from '../ui/notifications.js';
import { escapeHtml } from './all-functions.js';
import { ref, set, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
// Chart.js is loaded globally via CDN in index.html
const Chart = window.Chart;
const confetti = window.confetti;

// Chart instance
let drinkChart = null;

// ========================================
// LOG DRINK
// ========================================
export async function logDrink() {
    try {
        const type = document.getElementById('drinkType').value;
        const amount = parseInt(document.getElementById('drinkAmount').value) || 0;
        const alcoholPercent = parseFloat(document.getElementById('alcoholPercent').value) || 0;
        
        if (amount <= 0) {
            showNotification('❌ Please enter a valid amount', 'error');
            return;
        }
        
        const drink = {
            id: Date.now(),
            type: type,
            amount: amount,
            alcoholPercent: alcoholPercent,
            pureAlcohol: (amount * alcoholPercent / 100).toFixed(1),
            time: new Date(),
            emoji: DRINK_PRESETS[type].emoji
        };
        
        // Add to history
        let drinkHistory = getAppState().drinkHistory || [];
        drinkHistory.unshift(drink);
        setStateValue('drinkHistory', drinkHistory);
        
        // Save to localStorage
        saveDrinkHistory();
        
        // Update UI
        updateDrinkStats();
        updateDrinkHistory();
        updateDrinkChart();
        updateEmergencySummary();
        
        // Send to Firebase if connected
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        if (database && currentUser) {
            try {
                await set(ref(database, 'users/' + currentUser.uid + '/drinks/' + drink.id), {
                    ...drink,
                    time: drink.time.toISOString()
                });
            } catch (firebaseError) {
                console.warn('Firebase save failed (non-critical):', firebaseError);
                // Continue - localStorage save was successful
            }
        }
        
        // Track achievements
        if (typeof onDrinkLogged === 'function') {
            // If achievements module is loaded
            onDrinkLogged(type, drinkHistory);
        }
        
        // Confetti for water!
        if (type === 'water') {
            // Use global confetti if available (from CDN)
            if (typeof window.confetti === 'function') {
                window.confetti({
                    particleCount: 50,
                    spread: 60,
                    colors: ['#00d4ff', '#0099ff', '#0066ff'],
                    origin: { y: 0.6 }
                });
            }
            showNotification('💧 Great job staying hydrated!', 'success');
        } else {
            showNotification(`${drink.emoji} Drink logged!`);
        }
        
        // Reset form to defaults
        document.getElementById('drinkAmount').value = DRINK_PRESETS[type].amount;
        document.getElementById('alcoholPercent').value = DRINK_PRESETS[type].alcohol;
    } catch (error) {
        console.error('Error logging drink:', error);
        showNotification('❌ Failed to log drink', 'error');
    }
}

// ========================================
// UPDATE DRINK STATS
// ========================================
export function updateDrinkStats() {
    try {
        const drinkHistory = getAppState().drinkHistory || [];
        const now = Date.now();
        const oneHourAgo = now - 3600000;
        
        // Calculate totals
        const totalDrinks = drinkHistory.filter(d => d.type !== 'water').length;
        const totalWater = drinkHistory.filter(d => d.type === 'water').length;
        const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol || 0), 0);
        const recentDrinks = drinkHistory.filter(d => new Date(d.time).getTime() > oneHourAgo && d.type !== 'water').length;
        
        // Update display
        const totalDrinksEl = document.getElementById('totalDrinks');
        if (totalDrinksEl) totalDrinksEl.textContent = totalDrinks;
        
        const totalWaterEl = document.getElementById('totalWater');
        if (totalWaterEl) totalWaterEl.textContent = totalWater;
        
        const totalAlcoholEl = document.getElementById('totalAlcohol');
        if (totalAlcoholEl) totalAlcoholEl.textContent = totalAlcohol.toFixed(0) + 'ml';
        
        const drinkRateEl = document.getElementById('drinkRate');
        if (drinkRateEl) drinkRateEl.textContent = recentDrinks + '/hr';
    } catch (error) {
        console.error('Error updating drink stats:', error);
    }
}

// ========================================
// UPDATE DRINK HISTORY UI
// ========================================
export function updateDrinkHistory() {
    try {
        const historyContainer = document.getElementById('drinkHistory');
        if (!historyContainer) return;
        
        const drinkHistory = getAppState().drinkHistory || [];
        
        if (drinkHistory.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; opacity: 0.7;">No drinks logged yet</p>';
            return;
        }
        
        historyContainer.innerHTML = drinkHistory.slice(0, 20).map(drink => `
            <div class="buddy-card" style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2em;">${drink.emoji}</div>
                        <div>
                            <div style="font-weight: bold;">${drink.type.charAt(0).toUpperCase() + drink.type.slice(1)}</div>
                            <div style="opacity: 0.7; font-size: 0.9em;">
                                ${drink.amount}ml • ${drink.alcoholPercent}% • ${drink.pureAlcohol}ml pure
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.9em;">${formatDrinkTime(drink.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${drink.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error updating drink history:', error);
    }
}

// ========================================
// UPDATE DRINK CHART
// ========================================
export function updateDrinkChart() {
    try {
        const ctx = document.getElementById('drinkChart');
        const chartVisible = getAppState().chartVisible;
        if (!ctx || !chartVisible) return;
        
        const drinkHistory = getAppState().drinkHistory || [];
        
        // Count drinks by type
        const drinkCounts = {};
        drinkHistory.forEach(drink => {
            if (!drinkCounts[drink.type]) {
                drinkCounts[drink.type] = 0;
            }
            drinkCounts[drink.type]++;
        });
        
        if (Object.keys(drinkCounts).length === 0) {
            // No data yet
            if (drinkChart) {
                drinkChart.destroy();
                drinkChart = null;
            }
            return;
        }
        
        const labels = Object.keys(drinkCounts);
        const data = Object.values(drinkCounts);
        const emojis = labels.map(type => DRINK_PRESETS[type]?.emoji || '🍹');
        
        if (drinkChart) {
            // Update existing chart
            drinkChart.data.labels = labels.map((label, i) => `${emojis[i]} ${label}`);
            drinkChart.data.datasets[0].data = data;
            drinkChart.update();
        } else {
            // Create new chart
            drinkChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels.map((label, i) => `${emojis[i]} ${label}`),
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            '#00ff88',
                            '#00d4ff',
                            '#ff00ff',
                            '#ffcc00',
                            '#ff4444',
                            '#0099ff',
                            '#00ccff',
                            '#ff0088'
                        ],
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#fff',
                                padding: 10,
                                font: {
                                    size: window.innerWidth < 768 ? 10 : 12
                                }
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error updating drink chart:', error);
    }
}

// ========================================
// EMERGENCY SUMMARY
// ========================================
export function updateEmergencySummary() {
    const summary = document.getElementById('emergencySummary');
    if (!summary) return;
    
    const drinkHistory = getAppState().drinkHistory || [];
    const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol), 0);
    const timeSpan = drinkHistory.length > 0 ? 
        ((Date.now() - drinkHistory[drinkHistory.length - 1].time) / 3600000).toFixed(1) : 0;
    
    const drinkTypes = {};
    drinkHistory.forEach(d => {
        if (!drinkTypes[d.type]) drinkTypes[d.type] = 0;
        drinkTypes[d.type]++;
    });
    
    const medicalInfo = localStorage.getItem('medicalInfo') || 'None provided';
    const safetyNotes = localStorage.getItem('safetyNotes') || 'None provided';
    
    summary.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> ${timeSpan} hours</p>
            <p><strong>Total Pure Alcohol:</strong> ${totalAlcohol.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(drinkTypes).map(([type, count]) => 
                    `<li>${DRINK_PRESETS[type].emoji} ${type}: ${count}</li>`
                ).join('')}
            </ul>
            <p><strong>Last Drink:</strong> ${drinkHistory.length > 0 ? 
                formatDrinkTime(drinkHistory[0].time) : 'None'}</p>
            <p><strong>Estimated BAC:</strong> ${estimateBAC().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${escapeHtml(medicalInfo)}</p>
            <p><strong>Safety Notes:</strong> ${escapeHtml(safetyNotes)}</p>
        </div>
    `;
}

// ========================================
// REMOVE DRINK
// ========================================
export function removeDrink(drinkId) {
    let drinkHistory = getAppState().drinkHistory || [];
    drinkHistory = drinkHistory.filter(d => d.id !== drinkId);
    setStateValue('drinkHistory', drinkHistory);
    
    saveDrinkHistory();
    updateDrinkStats();
    updateDrinkHistory();
    updateDrinkChart();
    updateEmergencySummary();
    showNotification('🗑️ Drink removed');
}

// ========================================
// TOGGLE CHART
// ========================================
export function toggleChart() {
    let chartVisible = getAppState().chartVisible;
    chartVisible = !chartVisible;
    setStateValue('chartVisible', chartVisible);
    
    const wrapper = document.getElementById('chartWrapper');
    const toggleText = document.getElementById('chartToggleText');
    
    if (chartVisible) {
        wrapper.classList.remove('collapsed');
        toggleText.textContent = 'Hide Chart';
    } else {
        wrapper.classList.add('collapsed');
        toggleText.textContent = 'Show Chart';
    }
}

// ========================================
// EMERGENCY REPORT
// ========================================
export function showEmergencyReport() {
    try {
        const drinkHistory = getAppState().drinkHistory || [];
        const userData = getAppState().userData;
        const currentUser = getCurrentUser();
        
        const report = {
            timestamp: new Date().toISOString(),
            estimatedBAC: estimateBAC().toFixed(3),
            drinkHistory: drinkHistory,
            totalAlcohol: drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol || 0), 0),
            userData: {
                name: userData.username || currentUser?.email || 'Unknown',
                address: localStorage.getItem('homeAddress') || 'Not provided',
                emergencyContact: localStorage.getItem('emergencyContact') || 'Not provided',
                medicalInfo: localStorage.getItem('medicalInfo') || 'None',
                safetyNotes: localStorage.getItem('safetyNotes') || 'None'
            }
        };
        
        const reportText = `EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${report.userData.name}
Address: ${report.userData.address}
Emergency Contact: ${report.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${report.userData.medicalInfo}

SAFETY NOTES
------------
${report.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY
---------------------------
Estimated BAC: ${report.estimatedBAC}‰
Total Pure Alcohol: ${report.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${drinkHistory.filter(d => d.type !== 'water').length}
Water Consumed: ${drinkHistory.filter(d => d.type === 'water').length} glasses

DETAILED DRINK LOG
------------------
${drinkHistory.map(d => 
    `${formatDrinkTime(d.time)}: ${d.emoji} ${d.type} - ${d.amount}ml @ ${d.alcoholPercent}%`
).join('\n')}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`;
        
        // Create modal with report
        const modalContent = `
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${escapeHtml(reportText)}</pre>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="copyEmergencyReport()">
                    <i class="fas fa-copy"></i> Copy Report
                </button>
                <button class="btn btn-primary" onclick="downloadEmergencyReport()">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-danger" onclick="shareEmergencyReport()">
                    <i class="fas fa-share"></i> Share
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            </div>
        `;
        
        // Store report in window for other functions
        window.currentEmergencyReport = reportText;
        
        document.getElementById('modalBody').innerHTML = modalContent;
        document.getElementById('modal').classList.add('show');
    } catch (error) {
        console.error('Error generating emergency report:', error);
        showNotification('❌ Error generating report', 'error');
    }
}

export function copyEmergencyReport() {
    if (window.currentEmergencyReport) {
        navigator.clipboard.writeText(window.currentEmergencyReport)
            .then(() => showNotification('📋 Report copied to clipboard!', 'success'))
            .catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = window.currentEmergencyReport;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('📋 Report copied!', 'success');
            });
    }
}

export function downloadEmergencyReport() {
    try {
        const blob = new Blob([window.currentEmergencyReport], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `emergency_report_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showNotification('📥 Report downloaded!', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showNotification('❌ Download failed - use copy instead', 'error');
    }
}

export function shareEmergencyReport() {
    if (navigator.share && window.currentEmergencyReport) {
        navigator.share({
            title: 'Emergency Medical Report',
            text: window.currentEmergencyReport
        })
        .then(() => showNotification('📤 Report shared!', 'success'))
        .catch(() => showNotification('❌ Sharing cancelled'));
    } else {
        // Fallback - copy to clipboard
        copyEmergencyReport();
        showNotification('📋 Report copied - share manually');
    }
}

// ========================================
// CLEAR DRINK HISTORY
// ========================================
export function clearDrinkHistory() {
    if (confirm('Clear all drink history? This cannot be undone!')) {
        setStateValue('drinkHistory', []);
        saveDrinkHistory();
        updateDrinkStats();
        updateDrinkHistory();
        updateDrinkChart();
        updateEmergencySummary();
        
        // Clear from Firebase
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        if (database && currentUser) {
            remove(ref(database, 'users/' + currentUser.uid + '/drinks'));
        }
        
        showNotification('🗑️ Drink history cleared');
    }
}

// ========================================
// PERSISTENCE
// ========================================
export function saveDrinkHistory() {
    const drinkHistory = getAppState().drinkHistory || [];
    localStorage.setItem('drinkHistory', JSON.stringify(drinkHistory));
}

export function loadDrinkHistory() {
    const saved = localStorage.getItem('drinkHistory');
    if (saved) {
        try {
            const drinkHistory = JSON.parse(saved);
            // Convert time strings back to Date objects
            drinkHistory.forEach(d => {
                d.time = new Date(d.time);
            });
            setStateValue('drinkHistory', drinkHistory);
        } catch (error) {
            console.error('Failed to load drink history:', error);
        }
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatDrinkTime(time) {
    const now = new Date();
    const drinkTime = new Date(time);
    const diffMinutes = Math.floor((now - drinkTime) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return drinkTime.toLocaleDateString();
}

function estimateBAC() {
    // Widmark formula estimation (simplified)
    const weight = 70; // kg (average)
    const gender = 0.68; // male average (0.55 for female)
    const drinkHistory = getAppState().drinkHistory || [];
    const totalAlcohol = drinkHistory.reduce((sum, d) => sum + parseFloat(d.pureAlcohol), 0);
    const hoursSinceFirst = drinkHistory.length > 0 ? 
        ((Date.now() - drinkHistory[drinkHistory.length - 1].time) / 3600000) : 0;
    
    // BAC = (alcohol in grams / (weight * gender factor)) - (0.015 * hours)
    const alcoholGrams = totalAlcohol * 0.789; // ml to grams
    const bac = Math.max(0, (alcoholGrams / (weight * 1000 * gender)) * 100 - (0.015 * hoursSinceFirst));
    
    return bac;
}