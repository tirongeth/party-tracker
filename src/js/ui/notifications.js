// ========================================
// NOTIFICATION SYSTEM
// ========================================
// Handles all notification displays in the app

export function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.onclick = () => notif.remove();
    document.body.appendChild(notif);
    
    setTimeout(() => {
        if (notif.parentNode) {
            notif.remove();
        }
    }, 4000);
}

// Also make it globally available for HTML onclick handlers
window.showNotification = showNotification;