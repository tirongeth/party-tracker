// ========================================
// APPLICATION STATE MANAGEMENT
// ========================================
// Instead of using global variables everywhere,
// we'll keep all app data in one organized place

// The main state object - this replaces all those global variables
const appState = {
    // User info
    currentUser: null,
    userData: {},
    
    // Party data
    partyData: {},
    partyStartTime: Date.now(),
    
    // Device data
    deviceData: {},
    
    // Friends data
    friendsData: {},
    friendRequests: [],
    
    // Game data
    currentGame: null,
    gameScores: { team1: 0, team2: 0 },
    
    // Achievements
    achievements: {
        firstTimer: true,
        responsible: false,
        gameMaster: false,
        partyAnimal: false,
        guardianAngel: false,
        hydroHomie: false,
        danceMachine: false,
        sunriseWarrior: false
    },
    
    // User achievements with progress tracking
    userAchievements: {},
    
    // History tracking
    locationHistory: [],
    drinkHistory: [],
    
    // UI state
    chartVisible: true,
    isSignUp: false,
    isInitialized: false
};

// Get the entire app state
export function getAppState() {
    return appState;
}

// Get a specific part of the state
export function getStateValue(key) {
    return appState[key];
}

// Update a specific part of the state
export function setStateValue(key, value) {
    appState[key] = value;
}

// Update user data
export function setCurrentUser(user) {
    appState.currentUser = user;
}

// Get current user
export function getCurrentUser() {
    return appState.currentUser;
}

// Add a drink to history
export function addDrinkToHistory(drink) {
    appState.drinkHistory.unshift(drink);
}

// Clear all state (for logout)
export function clearAppState() {
    appState.currentUser = null;
    appState.userData = {};
    appState.partyData = {};
    appState.deviceData = {};
    appState.friendsData = {};
    appState.friendRequests = [];
    appState.currentGame = null;
    appState.gameScores = { team1: 0, team2: 0 };
    // Keep achievements and history
}