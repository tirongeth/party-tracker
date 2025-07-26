// ========================================
// CACHE UTILITY MODULE
// ========================================
// Simple in-memory cache with TTL support

class SimpleCache {
    constructor() {
        this.cache = new Map();
        this.timers = new Map();
    }

    // Set a value with optional TTL (in milliseconds)
    set(key, value, ttl = null) {
        // Clear existing timer if any
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }

        // Store the value
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });

        // Set expiration timer if TTL provided
        if (ttl && ttl > 0) {
            const timer = setTimeout(() => {
                this.delete(key);
            }, ttl);
            this.timers.set(key, timer);
        }
    }

    // Get a value from cache
    get(key) {
        const item = this.cache.get(key);
        return item ? item.value : null;
    }

    // Check if key exists and is not expired
    has(key) {
        return this.cache.has(key);
    }

    // Delete a key
    delete(key) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }
        return this.cache.delete(key);
    }

    // Clear entire cache
    clear() {
        // Clear all timers
        for (const timer of this.timers.values()) {
            clearTimeout(timer);
        }
        this.timers.clear();
        this.cache.clear();
    }

    // Get cache size
    size() {
        return this.cache.size;
    }

    // Get age of cached item in milliseconds
    getAge(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        return Date.now() - item.timestamp;
    }
}

// Create cache instances for different purposes
export const partyCache = new SimpleCache();
export const leaderboardCache = new SimpleCache();
export const deviceReadingsCache = new SimpleCache();

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
    PARTY_DATA: 30000,       // 30 seconds
    LEADERBOARD: 10000,      // 10 seconds  
    DEVICE_READINGS: 5000,   // 5 seconds
    FRIENDS_PARTIES: 60000,  // 1 minute
    PUBLIC_PARTIES: 120000   // 2 minutes
};

// Helper function to create a cache key
export function createCacheKey(...parts) {
    return parts.filter(Boolean).join(':');
}

// Batch cache operations
export class BatchCache extends SimpleCache {
    // Set multiple values at once
    setMany(entries, ttl = null) {
        for (const [key, value] of entries) {
            this.set(key, value, ttl);
        }
    }

    // Get multiple values at once
    getMany(keys) {
        const results = new Map();
        for (const key of keys) {
            const value = this.get(key);
            if (value !== null) {
                results.set(key, value);
            }
        }
        return results;
    }

    // Delete keys matching a pattern
    deletePattern(pattern) {
        const keysToDelete = [];
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                keysToDelete.push(key);
            }
        }
        for (const key of keysToDelete) {
            this.delete(key);
        }
        return keysToDelete.length;
    }
}

// Export a batch cache instance for device readings
export const batchReadingsCache = new BatchCache();