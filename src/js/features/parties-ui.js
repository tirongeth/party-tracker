// UI wrapper functions for party HTML onclick handlers
import { createParty, getPartyByCode, joinParty, leaveParty, sendPartyMessage, getNearbyParties } from './parties.js';
import { showNotification } from '../ui/notifications.js';

export async function createNewParty() {
    const nameInput = document.getElementById('partyName');
    const privacySelect = document.getElementById('partyPrivacy');
    const durationSelect = document.getElementById('partyDuration');
    const addressInput = document.getElementById('partyAddress');
    
    if (!nameInput || !nameInput.value.trim()) {
        showNotification('Enter a party name', 'error');
        return;
    }
    
    const options = {
        privacy: privacySelect ? privacySelect.value : 'private',
        duration: durationSelect ? durationSelect.value : 'ongoing',
        address: addressInput ? addressInput.value : ''
    };
    
    try {
        const result = await createParty(nameInput.value.trim(), options);
        if (result.success) {
            showNotification(`Party created! Code: ${result.code}`, 'success');
            nameInput.value = '';
            if (addressInput) addressInput.value = '';
            if (window.updatePartyDisplay) window.updatePartyDisplay();
        } else {
            showNotification(result.error || 'Failed to create party', 'error');
        }
    } catch (error) {
        showNotification('Failed to create party', 'error');
    }
}

export async function joinPartyByCode() {
    const codeInput = document.getElementById('joinPartyCode');
    if (!codeInput || !codeInput.value.trim()) {
        showNotification('Enter a party code', 'error');
        return;
    }
    
    const code = codeInput.value.trim();
    
    try {
        showNotification('Checking party...', 'info');
        const party = await getPartyByCode(code);
        
        if (!party) {
            showNotification('Invalid party code', 'error');
            return;
        }
        
        const memberCount = Object.keys(party.members || {}).length;
        const confirmMsg = `Join "${party.name}"?\n` +
            `👥 ${memberCount} members\n` +
            `🔒 Privacy: ${party.privacy || 'Unknown'}\n` +
            `📍 ${party.address || 'No location set'}\n` +
            `⏱️ ${party.duration === '24h' ? '24 hour party' : 'Ongoing party'}`;
        
        if (!confirm(confirmMsg)) {
            return;
        }
        
        const result = await joinParty(code);
        if (result.success) {
            if (result.pending) {
                showNotification('Join request sent! Waiting for approval.', 'info');
            } else if (result.alreadyMember) {
                showNotification('Rejoined party!', 'success');
            } else {
                showNotification('Joined party!', 'success');
            }
            codeInput.value = '';
            if (window.updatePartyDisplay) window.updatePartyDisplay();
        } else {
            showNotification(result.error || 'Failed to join party', 'error');
        }
    } catch (error) {
        showNotification('Failed to join party', 'error');
    }
}

export async function leaveCurrentParty() {
    if (confirm('Leave this party?')) {
        try {
            const result = await leaveParty();
            if (result.success) {
                showNotification('Left party', 'info');
                if (window.updatePartyDisplay) window.updatePartyDisplay();
            }
        } catch (error) {
            showNotification('Failed to leave party', 'error');
        }
    }
}

export async function sendPartyChat() {
    const input = document.getElementById('partyChatInput');
    if (!input || !input.value.trim()) return;
    
    try {
        const result = await sendPartyMessage(input.value);
        if (result.success) {
            input.value = '';
        }
    } catch (error) {
        showNotification('Failed to send message', 'error');
    }
}

export async function refreshPublicParties() {
    const listEl = document.getElementById('publicPartiesList');
    if (!listEl) return;
    
    listEl.innerHTML = '<p style="opacity: 0.7;">Loading parties...</p>';
    
    try {
        const publicParties = await getNearbyParties();
        
        if (publicParties.length === 0) {
            listEl.innerHTML = '<p style="opacity: 0.7;">No public parties found. Create one!</p>';
            return;
        }
        
        // Check if current user is developer
        const currentUser = window.firebase?.auth?.currentUser;
        const isDev = currentUser && window.isDeveloper && window.isDeveloper(currentUser.uid);
        
        listEl.innerHTML = publicParties.map(party => `
            <div class="friend-item" style="margin-bottom: 15px;">
                <div class="friend-info">
                    <div class="friend-avatar-small">🎉</div>
                    <div class="friend-details">
                        <h4>${party.name}</h4>
                        <p style="opacity: 0.7;">
                            👥 ${party.memberCount} members
                            ${party.address ? `• 📍 ${party.address}` : ''}
                            ${party.duration === '24h' ? '• ⏰ 24h party' : ''}
                        </p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="joinPublicParty('${party.code}')">
                        Join
                    </button>
                    ${isDev ? `
                        <button class="btn btn-danger" onclick="deletePartyAsDev('${party.id}')" title="Developer: Delete this party">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        listEl.innerHTML = '<p style="opacity: 0.7;">Failed to load parties</p>';
    }
}

export async function joinPublicParty(code) {
    try {
        const result = await joinParty(code, true);
        if (result.success) {
            showNotification('Joined public party!', 'success');
            if (window.updatePartyDisplay) window.updatePartyDisplay();
        } else {
            showNotification(result.error || 'Failed to join party', 'error');
        }
    } catch (error) {
        showNotification('Failed to join party', 'error');
    }
}