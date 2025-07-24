// This file ensures party functions are exposed globally and not removed by build optimization

// Export functions that will be set later
export const partyFunctions = {
    createNewParty: null,
    joinPartyByCode: null,
    leaveCurrentParty: null,
    sendPartyChat: null,
    refreshPublicParties: null
};

// Initialize with placeholder functions
partyFunctions.createNewParty = function() { 
    console.log('Party system initializing...'); 
};
partyFunctions.joinPartyByCode = function() { 
    console.log('Party system initializing...'); 
};
partyFunctions.leaveCurrentParty = function() { 
    console.log('Party system initializing...'); 
};
partyFunctions.sendPartyChat = function() { 
    console.log('Party system initializing...'); 
};
partyFunctions.refreshPublicParties = function() { 
    console.log('Party system initializing...'); 
};

// Force exposure on window and globalThis
export function exposePartyFunctions() {
    // Use Object.defineProperty to prevent removal by optimizers
    Object.defineProperty(window, 'createNewParty', {
        value: partyFunctions.createNewParty,
        writable: true,
        configurable: true
    });
    
    Object.defineProperty(window, 'joinPartyByCode', {
        value: partyFunctions.joinPartyByCode,
        writable: true,
        configurable: true
    });
    
    Object.defineProperty(window, 'leaveCurrentParty', {
        value: partyFunctions.leaveCurrentParty,
        writable: true,
        configurable: true
    });
    
    Object.defineProperty(window, 'sendPartyChat', {
        value: partyFunctions.sendPartyChat,
        writable: true,
        configurable: true
    });
    
    Object.defineProperty(window, 'refreshPublicParties', {
        value: partyFunctions.refreshPublicParties,
        writable: true,
        configurable: true
    });
    
    // Also set on globalThis
    globalThis.createNewParty = partyFunctions.createNewParty;
    globalThis.joinPartyByCode = partyFunctions.joinPartyByCode;
    globalThis.leaveCurrentParty = partyFunctions.leaveCurrentParty;
    globalThis.sendPartyChat = partyFunctions.sendPartyChat;
    globalThis.refreshPublicParties = partyFunctions.refreshPublicParties;
}

// Update party functions
export function updatePartyFunctions(functions) {
    partyFunctions.createNewParty = functions.createNewParty;
    partyFunctions.joinPartyByCode = functions.joinPartyByCode;
    partyFunctions.leaveCurrentParty = functions.leaveCurrentParty;
    partyFunctions.sendPartyChat = functions.sendPartyChat || partyFunctions.sendPartyChat;
    partyFunctions.refreshPublicParties = functions.refreshPublicParties || partyFunctions.refreshPublicParties;
    
    // Re-expose after update
    exposePartyFunctions();
}

// Immediately expose on import
exposePartyFunctions();