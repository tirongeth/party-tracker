// ========================================
// APPLICATION CONSTANTS
// ========================================
// All the constant values used in the app
// Having them in one place makes them easy to change

// Drink presets - standard serving sizes
export const DRINK_PRESETS = {
    beer: { 
        amount: 330,      // milliliters
        alcohol: 5,       // percentage
        emoji: '🍺' 
    },
    wine: { 
        amount: 150,
        alcohol: 12,
        emoji: '🍷' 
    },
    shot: { 
        amount: 40,
        alcohol: 40,
        emoji: '🥃' 
    },
    cocktail: { 
        amount: 200,
        alcohol: 15,
        emoji: '🍸' 
    },
    mixed: { 
        amount: 250,
        alcohol: 10,
        emoji: '🥤' 
    },
    champagne: { 
        amount: 150,
        alcohol: 12,
        emoji: '🥂' 
    },
    water: { 
        amount: 250,
        alcohol: 0,
        emoji: '💧' 
    },
    other: { 
        amount: 200,
        alcohol: 5,
        emoji: '🍹' 
    }
};

// BAC (Blood Alcohol Content) levels and their meanings
export const BAC_STATUS = {
    SOBER: {
        max: 0.02,
        class: 'bac-safe',
        text: 'Sober',
        emoji: '😊'
    },
    BUZZED: {
        max: 0.05,
        class: 'bac-caution',
        text: 'Buzzed',
        emoji: '😎'
    },
    IMPAIRED: {
        max: 0.08,
        class: 'bac-danger',
        text: 'No Driving!',
        emoji: '🚫'
    },
    DRUNK: {
        max: Infinity,
        class: 'bac-critical',
        text: 'Too Much!',
        emoji: '🤢'
    }
};

// Helper function to get BAC status
export function getBACStatus(bac) {
    if (bac < BAC_STATUS.SOBER.max) return BAC_STATUS.SOBER;
    if (bac < BAC_STATUS.BUZZED.max) return BAC_STATUS.BUZZED;
    if (bac < BAC_STATUS.IMPAIRED.max) return BAC_STATUS.IMPAIRED;
    return BAC_STATUS.DRUNK;
}

// Developer/Admin UIDs - Add your UID here
export const DEVELOPER_UIDS = [
    // Add your Firebase UID here after checking it in the console
    // You can find it in Firebase Console > Authentication > Users
    // Example: 'abc123def456'
    'k1OvkYapqbZUAf9RbvfmnhgWcY23'  // rongtimon@gmail.com
];

// Developer permissions
export const DEV_PERMISSIONS = {
    DELETE_ANY_PARTY: true,
    KICK_ANY_MEMBER: true,
    JOIN_LOCKED_PARTIES: true,
    BYPASS_BANS: true,
    VIEW_ALL_PARTIES: true,
    MODERATE_CHAT: true
};

// Check if user is developer
export function isDeveloper(uid) {
    return DEVELOPER_UIDS.includes(uid);
}