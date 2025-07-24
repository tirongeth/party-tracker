// ========================================
// ACHIEVEMENTS MODULE
// ========================================
// Industrial-grade achievement system with progress tracking

import { getFirebaseDatabase } from '../config/firebase.js';
import { getAppState, setStateValue, getCurrentUser } from '../config/app-state.js';
import { showNotification } from '../ui/notifications.js';
import { ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Achievement definitions with progress tracking
export const achievementDefinitions = {
    firstTimer: {
        name: "First Timer",
        icon: "🎉",
        description: "Joined your first party!",
        requirement: 1,
        progress: 0,
        unlocked: false,
        category: "beginner"
    },
    responsible: {
        name: "Responsible",
        icon: "😇",
        description: "Stayed under 0.05 BAC all night",
        requirement: 1,
        progress: 0,
        unlocked: false,
        category: "safety"
    },
    gameMaster: {
        name: "Game Master",
        icon: "🏆",
        description: "Win 5 party games",
        requirement: 5,
        progress: 0,
        unlocked: false,
        category: "games"
    },
    partyAnimal: {
        name: "Party Animal",
        icon: "📍",
        description: "Check in at 10 parties",
        requirement: 10,
        progress: 0,
        unlocked: false,
        category: "social"
    },
    guardianAngel: {
        name: "Guardian Angel",
        icon: "🦸",
        description: "Help 3 friends get home safe",
        requirement: 3,
        progress: 0,
        unlocked: false,
        category: "safety"
    },
    hydroHomie: {
        name: "Hydro Homie",
        icon: "💧",
        description: "Stay hydrated for 3 hours",
        requirement: 12,
        progress: 0,
        unlocked: false,
        category: "health"
    },
    danceMachine: {
        name: "Dance Machine",
        icon: "🕺",
        description: "Log 50 songs danced to",
        requirement: 50,
        progress: 0,
        unlocked: false,
        category: "fun"
    },
    sunriseWarrior: {
        name: "Sunrise Warrior",
        icon: "🌅",
        description: "Party until sunrise (6+ hours)",
        requirement: 1,
        progress: 0,
        unlocked: false,
        category: "endurance"
    },
    socialButterfly: {
        name: "Social Butterfly",
        icon: "🦋",
        description: "Add 20 friends",
        requirement: 20,
        progress: 0,
        unlocked: false,
        category: "social"
    },
    safetyFirst: {
        name: "Safety First",
        icon: "🛡️",
        description: "Use emergency services 0 times in 10 parties",
        requirement: 10,
        progress: 0,
        unlocked: false,
        category: "safety"
    },
    mixologist: {
        name: "Mixologist",
        icon: "🍸",
        description: "Try 15 different drink types",
        requirement: 15,
        progress: 0,
        unlocked: false,
        category: "drinks"
    },
    designated: {
        name: "Designated Hero",
        icon: "🚗",
        description: "Be the designated driver 5 times",
        requirement: 5,
        progress: 0,
        unlocked: false,
        category: "safety"
    }
};

// User achievements state
let userAchievements = {};

// ========================================
// ACHIEVEMENT LOADING AND SAVING
// ========================================
export function loadAchievements() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const database = getFirebaseDatabase();
    const achievementsRef = ref(database, `users/${currentUser.uid}/achievements`);
    
    onValue(achievementsRef, (snapshot) => {
        const data = snapshot.val() || {};
        
        // Initialize achievements with saved data
        Object.keys(achievementDefinitions).forEach(key => {
            userAchievements[key] = {
                ...achievementDefinitions[key],
                ...data[key]
            };
        });
        
        // Update state
        setStateValue('userAchievements', userAchievements);
        
        // Update UI
        updateAchievementsUI();
    });
}

export function saveAchievement(achievementKey) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const database = getFirebaseDatabase();
    const achievement = userAchievements[achievementKey];
    if (!achievement) return;
    
    set(ref(database, `users/${currentUser.uid}/achievements/${achievementKey}`), {
        progress: achievement.progress,
        unlocked: achievement.unlocked,
        unlockedAt: achievement.unlockedAt || null
    });
}

// ========================================
// ACHIEVEMENT PROGRESS TRACKING
// ========================================
export function updateAchievementProgress(achievementKey, increment = 1) {
    if (!userAchievements[achievementKey]) return;
    
    const achievement = userAchievements[achievementKey];
    
    // Don't update if already unlocked
    if (achievement.unlocked) return;
    
    // Update progress
    achievement.progress = Math.min(achievement.progress + increment, achievement.requirement);
    
    // Check if achievement is now unlocked
    if (achievement.progress >= achievement.requirement) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        
        // Show unlock notification
        showAchievementUnlocked(achievement);
        
        // Update stats
        updateAchievementStats();
    }
    
    // Save to Firebase
    saveAchievement(achievementKey);
    
    // Update UI
    updateAchievementsUI();
}

// ========================================
// ACHIEVEMENT UI
// ========================================
export function updateAchievementsUI() {
    const container = document.querySelector('.achievements-grid');
    if (!container) return;
    
    // Clear existing achievements
    container.innerHTML = '';
    
    // Sort achievements by category and unlocked status
    const sortedAchievements = Object.entries(userAchievements)
        .sort(([, a], [, b]) => {
            if (a.unlocked && !b.unlocked) return -1;
            if (!a.unlocked && b.unlocked) return 1;
            return a.category.localeCompare(b.category);
        });
    
    // Create achievement elements
    sortedAchievements.forEach(([key, achievement]) => {
        const achievementEl = document.createElement('div');
        achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
        achievementEl.setAttribute('data-achievement', key);
        
        // Calculate progress percentage
        const progressPercent = (achievement.progress / achievement.requirement) * 100;
        
        achievementEl.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${!achievement.unlocked ? `
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="progress-text">${achievement.progress}/${achievement.requirement}</div>
                </div>
            ` : `
                <div class="achievement-unlocked-date">
                    Unlocked ${new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
            `}
        `;
        
        container.appendChild(achievementEl);
    });
    
    // Update achievement stats
    updateAchievementStats();
}

function updateAchievementStats() {
    const totalAchievements = Object.keys(userAchievements).length;
    const unlockedAchievements = Object.values(userAchievements).filter(a => a.unlocked).length;
    
    // Update any stats displays
    const statsElements = document.querySelectorAll('[data-achievement-stats]');
    statsElements.forEach(el => {
        el.textContent = `${unlockedAchievements}/${totalAchievements}`;
    });
}

// ========================================
// ACHIEVEMENT UNLOCK NOTIFICATION
// ========================================
function showAchievementUnlocked(achievement) {
    // Play confetti animation
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    
    // Show notification with custom styling
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${achievement.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${achievement.name}</div>
                <div class="achievement-popup-description">${achievement.description}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ========================================
// ACHIEVEMENT CHECKING
// ========================================
export function checkAchievements() {
    const appState = getAppState();
    const partyData = appState.partyData || {};
    const friendsData = appState.friendsData || {};
    const partyStartTime = appState.partyStartTime;
    
    // Convert partyData object to array for easier processing
    const friends = Object.values(partyData);
    
    // Responsible - stayed safe all night
    if (friends.every(f => f.bac < 0.05) && Date.now() - partyStartTime > 3600000) {
        updateAchievementProgress('responsible');
    }
    
    // Sunrise Warrior - party for 6+ hours
    if (Date.now() - partyStartTime > 21600000) {
        updateAchievementProgress('sunriseWarrior');
    }
    
    // Social Butterfly - check friend count
    if (Object.keys(friendsData).length >= 20) {
        updateAchievementProgress('socialButterfly', Object.keys(friendsData).length);
    }
}

// ========================================
// ACHIEVEMENT TRIGGERS
// ========================================
// These functions are called from other modules when relevant events occur

export function onDrinkLogged(drinkType, drinkHistory) {
    // Track unique drink types for Mixologist achievement
    const uniqueDrinkTypes = new Set(drinkHistory.map(d => d.type));
    const currentProgress = userAchievements.mixologist?.progress || 0;
    if (uniqueDrinkTypes.size > currentProgress) {
        updateAchievementProgress('mixologist', uniqueDrinkTypes.size - currentProgress);
    }
    
    // Track hydration for Hydro Homie
    if (drinkType === 'water') {
        updateAchievementProgress('hydroHomie');
    }
}

export function onGameWon() {
    updateAchievementProgress('gameMaster');
}

export function onLocationCheckedIn() {
    updateAchievementProgress('partyAnimal');
}

export function onBuddyHelped() {
    updateAchievementProgress('guardianAngel');
}

export function onFirstLogin() {
    updateAchievementProgress('firstTimer');
}

export function onDesignatedDriver() {
    updateAchievementProgress('designated');
}

// Export updateAchievements for backwards compatibility
export { updateAchievementsUI as updateAchievements };