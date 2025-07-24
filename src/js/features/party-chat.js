// Party Chat Module - Real-time chat for parties
import { database, auth } from '../config/firebase.js';
import { firebaseRef, firebasePush, firebaseOnValue, firebaseServerTimestamp } from '../config/firebase.js';
import { getCurrentPartyId } from './parties.js';
import { escapeHtml } from './all-functions.js';

let chatListener = null;
let chatMessages = [];

// Send party message
export async function sendPartyMessage(message) {
    const user = auth.currentUser;
    const partyId = getCurrentPartyId();
    
    if (!user || !partyId || !message.trim()) return;
    
    const chatRef = firebaseRef(database, `parties/${partyId}/chat`);
    await firebasePush(chatRef, {
        userId: user.uid,
        userName: user.displayName || user.email.split('@')[0],
        message: message.trim(),
        timestamp: firebaseServerTimestamp(),
        type: 'text'
    });
}

// Send party emoji reaction
export async function sendPartyReaction(emoji) {
    const user = auth.currentUser;
    const partyId = getCurrentPartyId();
    
    if (!user || !partyId) return;
    
    const chatRef = firebaseRef(database, `parties/${partyId}/chat`);
    await firebasePush(chatRef, {
        userId: user.uid,
        userName: user.displayName || user.email.split('@')[0],
        message: emoji,
        timestamp: firebaseServerTimestamp(),
        type: 'reaction'
    });
}

// Listen to party chat
export function listenToPartyChat(partyId) {
    // Clean up old listener
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
    
    if (!partyId) return;
    
    const chatRef = firebaseRef(database, `parties/${partyId}/chat`);
    chatListener = firebaseOnValue(chatRef, (snapshot) => {
        const messages = [];
        
        snapshot.forEach((childSnapshot) => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Sort by timestamp and keep last 100 messages
        chatMessages = messages
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
            .slice(-100);
        
        updateChatUI();
    });
}

// Update chat UI
function updateChatUI() {
    const chatContainer = document.getElementById('partyChatMessages');
    if (!chatContainer) return;
    
    const currentUser = auth.currentUser;
    
    chatContainer.innerHTML = chatMessages.map(msg => {
        const isOwn = msg.userId === currentUser?.uid;
        const messageClass = isOwn ? 'chat-message-own' : 'chat-message';
        
        if (msg.type === 'reaction') {
            return `
                <div class="chat-reaction">
                    <span class="reaction-author">${msg.userName}</span>
                    <span class="reaction-emoji">${msg.message}</span>
                </div>
            `;
        }
        
        if (msg.type === 'safety-alert') {
            return `
                <div class="chat-safety-alert">
                    <div class="safety-alert-content">
                        ${msg.message}
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="${messageClass}">
                <div class="chat-author">${isOwn ? 'You' : msg.userName}</div>
                <div class="chat-content">${escapeHtml(msg.message)}</div>
                <div class="chat-time">${formatTime(msg.timestamp)}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Format timestamp
function formatTime(timestamp) {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Otherwise show date and time
    return date.toLocaleString([], { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Quick reactions
export const PARTY_REACTIONS = ['🎉', '🍻', '🔥', '😂', '💯', '🚀', '❤️', '🤔'];

// Clean up chat listener
export function cleanupChat() {
    if (chatListener) {
        chatListener();
        chatListener = null;
    }
    chatMessages = [];
}