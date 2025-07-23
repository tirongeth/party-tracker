// ========================================
// ERROR HANDLING MODULE
// ========================================
// Centralized error handling for better user experience

// Error types
export const ErrorTypes = {
    NETWORK: 'network',
    AUTH: 'auth',
    DATABASE: 'database',
    VALIDATION: 'validation',
    PERMISSION: 'permission',
    UNKNOWN: 'unknown'
};

// User-friendly error messages
const errorMessages = {
    // Network errors
    'network/offline': 'You appear to be offline. Please check your internet connection.',
    'network/timeout': 'The request took too long. Please try again.',
    'network/server-error': 'Server is having issues. Please try again later.',
    
    // Auth errors
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-credential': 'Invalid login credentials. Please try again.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    
    // Database errors
    'database/permission-denied': 'You don\'t have permission to perform this action.',
    'database/disconnected': 'Lost connection to database. Reconnecting...',
    'database/write-failed': 'Failed to save data. Please try again.',
    
    // Default
    'unknown': 'Something went wrong. Please try again.'
};

// Global error handler
export function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Determine error type
    const errorType = getErrorType(error);
    const errorCode = getErrorCode(error);
    const message = getUserFriendlyMessage(errorCode, error);
    
    // Log to console for debugging
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.group(`🚨 Error: ${context}`);
        console.error('Type:', errorType);
        console.error('Code:', errorCode);
        console.error('Message:', message);
        console.error('Original:', error);
        console.groupEnd();
    }
    
    // Show notification to user
    showErrorNotification(message, errorType);
    
    // Return error info
    return {
        type: errorType,
        code: errorCode,
        message: message,
        originalError: error
    };
}

// Determine error type from error object
function getErrorType(error) {
    if (!error) return ErrorTypes.UNKNOWN;
    
    // Network errors
    if (error.code === 'network-request-failed' || 
        error.message?.includes('network') ||
        error.message?.includes('fetch')) {
        return ErrorTypes.NETWORK;
    }
    
    // Auth errors
    if (error.code?.startsWith('auth/')) {
        return ErrorTypes.AUTH;
    }
    
    // Database errors
    if (error.code?.startsWith('database/') || 
        error.code === 'permission-denied') {
        return ErrorTypes.DATABASE;
    }
    
    // Validation errors
    if (error.name === 'ValidationError') {
        return ErrorTypes.VALIDATION;
    }
    
    return ErrorTypes.UNKNOWN;
}

// Extract error code
function getErrorCode(error) {
    if (error?.code) return error.code;
    if (error?.message?.includes('network')) return 'network/offline';
    if (error?.message?.includes('permission')) return 'database/permission-denied';
    return 'unknown';
}

// Get user-friendly message
function getUserFriendlyMessage(errorCode, error) {
    // Check if we have a specific message
    if (errorMessages[errorCode]) {
        return errorMessages[errorCode];
    }
    
    // Try to extract from Firebase error
    if (error?.message && typeof error.message === 'string') {
        // Clean up Firebase error messages
        const cleaned = error.message
            .replace(/Firebase: /g, '')
            .replace(/Error \(auth\/[^)]+\): /g, '')
            .replace(/\.$/, '');
        
        // If it's still technical, use a generic message
        if (cleaned.includes('(') || cleaned.includes(')') || cleaned.length > 100) {
            return errorMessages['unknown'];
        }
        
        return cleaned;
    }
    
    return errorMessages['unknown'];
}

// Show error notification
function showErrorNotification(message, type) {
    // Use existing notification system if available
    if (window.showNotification) {
        window.showNotification(message, 'error');
    } else {
        // Fallback to alert
        alert(`Error: ${message}`);
    }
}

// Retry helper for network errors
export async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            
            // Don't retry auth errors
            if (getErrorType(error) === ErrorTypes.AUTH) {
                throw error;
            }
            
            // Wait before retrying
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
        }
    }
    
    throw lastError;
}

// Network status monitoring
let isOnline = navigator.onLine;

window.addEventListener('online', () => {
    isOnline = true;
    if (window.showNotification) {
        window.showNotification('Back online!', 'success');
    }
});

window.addEventListener('offline', () => {
    isOnline = false;
    if (window.showNotification) {
        window.showNotification('You are offline. Some features may not work.', 'warning');
    }
});

export function checkNetworkStatus() {
    return isOnline;
}

// Error boundary for async operations
export async function safeAsync(operation, context = 'operation') {
    try {
        return await operation();
    } catch (error) {
        handleError(error, context);
        return null;
    }
}

// Input validation helper
export function validateInput(value, type, fieldName) {
    const errors = [];
    
    switch (type) {
        case 'email':
            if (!value) {
                errors.push(`${fieldName} is required`);
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.push(`Please enter a valid email address`);
            }
            break;
            
        case 'password':
            if (!value) {
                errors.push(`${fieldName} is required`);
            } else if (value.length < 6) {
                errors.push(`Password must be at least 6 characters`);
            }
            break;
            
        case 'username':
            if (!value) {
                errors.push(`${fieldName} is required`);
            } else if (value.length < 3) {
                errors.push(`Username must be at least 3 characters`);
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                errors.push(`Username can only contain letters, numbers, and underscores`);
            }
            break;
            
        case 'deviceId':
            if (!value) {
                errors.push(`${fieldName} is required`);
            } else if (!value.match(/^HSG_[a-zA-Z0-9]+$/)) {
                errors.push(`Device ID must start with HSG_ followed by letters/numbers`);
            }
            break;
    }
    
    return errors;
}