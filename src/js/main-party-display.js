// Separate module for party display to avoid scoping issues
import { getCurrentUser } from './config/app-state.js';
import { isDeveloper } from './config/constants.js';

export function safeUpdatePartyDisplay(Parties) {
    try {
        // Early exit if Parties module not ready
        if (!Parties) {
            console.warn('Parties module not ready');
            return;
        }

        const party = Parties.currentParty;
        const userParties = Parties.userParties || [];
        const currentSection = document.getElementById('currentPartySection');
        const dashboardInfo = document.getElementById('dashboardPartyInfo');
        
        // Get current user safely
        let currentUser = null;
        let isCreator = false;
        let isDev = false;
        
        try {
            currentUser = getCurrentUser();
            if (currentUser) {
                isCreator = party && party.creatorId === currentUser.uid;
                isDev = isDeveloper(currentUser.uid);
            }
        } catch (e) {
            console.warn('Could not get current user:', e);
        }
        
        // Handle party switcher
        updatePartySwitcher(userParties, party);
        
        if (party) {
            showPartyUI(party, currentSection, dashboardInfo, currentUser, isCreator, isDev, Parties);
        } else {
            hidePartyUI(currentSection, dashboardInfo);
        }
        
    } catch (error) {
        console.error('Error in safeUpdatePartyDisplay:', error);
    }
}

function updatePartySwitcher(userParties, currentParty) {
    const existingSwitcher = document.getElementById('partySwitcher');
    
    if (userParties.length > 1) {
        if (existingSwitcher) {
            existingSwitcher.remove();
        }
        createPartySwitcher(userParties, currentParty);
    } else if (existingSwitcher) {
        existingSwitcher.remove();
    }
}

function createPartySwitcher(userParties, currentParty) {
    const switcher = document.createElement('div');
    switcher.id = 'partySwitcher';
    switcher.style.cssText = `
        position: fixed; 
        top: 80px; 
        right: 20px; 
        background: rgba(0,0,0,0.95); 
        border: 2px solid #00ff88; 
        border-radius: 10px; 
        padding: 15px; 
        z-index: 1000; 
        max-width: 250px; 
        box-shadow: 0 4px 20px rgba(0,255,136,0.3); 
        max-height: 400px; 
        overflow-y: auto;
    `;
    
    const switcherHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4 style="margin: 0; color: #00ff88;">My Parties (${userParties.length})</h4>
            <button onclick="document.getElementById('partySwitcher').remove()" 
                    style="background: none; border: none; color: #fff; cursor: pointer; font-size: 20px;">×</button>
        </div>
    `;
    
    const partyButtons = userParties.map(party => {
        const memberCount = party.members ? Object.keys(party.members).length : 0;
        const isActive = currentParty && currentParty.id === party.id;
        return `
            <button class="btn ${isActive ? 'btn-primary' : ''}" 
                    style="display: block; width: 100%; margin: 5px 0; text-align: left; padding: 10px;"
                    onclick="switchToParty('${party.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>🎉 ${party.name}</span>
                    <span style="font-size: 0.8em; opacity: 0.7;">${memberCount} 👥</span>
                </div>
                ${isActive ? '<small style="color: #00ff88;">Currently viewing</small>' : ''}
            </button>
        `;
    }).join('');
    
    switcher.innerHTML = switcherHTML + partyButtons;
    document.body.appendChild(switcher);
}

function showPartyUI(party, currentSection, dashboardInfo, currentUser, isCreator, isDev, Parties) {
    // Show sections
    if (currentSection) currentSection.style.display = 'block';
    if (dashboardInfo) dashboardInfo.style.display = 'block';
    
    // Update party info
    updatePartyInfo(party);
    
    // Update members list
    updateMembersList(party, currentUser, isCreator, isDev);
    
    // Update stats
    updatePartyStats(party, Parties);
    
    // Update leave/delete button
    updateLeaveButton(party, currentUser, isCreator);
    
    // Show/hide creator controls
    updateCreatorControls(party, isCreator, isDev);
    
    // Update leaderboard
    if (window.updatePartyLeaderboard) {
        window.updatePartyLeaderboard();
    }
}

function hidePartyUI(currentSection, dashboardInfo) {
    if (currentSection) currentSection.style.display = 'none';
    if (dashboardInfo) dashboardInfo.style.display = 'none';
    
    const creatorControlsSection = document.getElementById('creatorControlsSection');
    if (creatorControlsSection) creatorControlsSection.style.display = 'none';
    
    const pendingSection = document.getElementById('pendingRequestsSection');
    if (pendingSection) pendingSection.style.display = 'none';
}

function updatePartyInfo(party) {
    const nameEls = document.querySelectorAll('#currentPartyName, #dashboardPartyName');
    const codeEls = document.querySelectorAll('#currentPartyCode, #dashboardPartyCode');
    
    nameEls.forEach(el => { 
        if (el) {
            el.innerHTML = party.name + ` <span style="font-size: 0.8em; opacity: 0.7;">by ${party.creatorName || 'Unknown'}</span>`;
        }
    });
    
    codeEls.forEach(el => { 
        if (el) el.textContent = party.code; 
    });
}

function updateMembersList(party, currentUser, isCreator, isDev) {
    const membersList = document.getElementById('partyMembersList');
    if (!membersList || !party.members) return;
    
    let membersHTML = '';
    
    for (const [id, member] of Object.entries(party.members)) {
        const isThisUserCreator = id === party.creatorId;
        const isCurrentUser = currentUser && id === currentUser.uid;
        const showKickButton = (isCreator || isDev) && !isCurrentUser && !isThisUserCreator;
        
        membersHTML += `
            <div class="friend-item">
                <div class="friend-info">
                    <div class="friend-avatar-small">${isThisUserCreator ? '👑' : '👤'}</div>
                    <div class="friend-details">
                        <h4>${member.name} ${isThisUserCreator ? '<span style="color: #00ff88;">(Host)</span>' : ''}</h4>
                        <p style="opacity: 0.7; font-size: 0.9em;">
                            ${member.role === 'creator' ? 'Party Host • ' : ''}
                            Joined ${new Date(member.joinedAt).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                ${showKickButton ? `
                    <button class="btn btn-danger" style="padding: 5px 10px; font-size: 0.9em;" 
                            onclick="kickMemberFromParty('${id}', '${member.name}')">
                        <i class="fas fa-user-times"></i> Kick
                    </button>
                ` : ''}
            </div>
        `;
    }
    
    membersList.innerHTML = membersHTML;
}

function updatePartyStats(party, Parties) {
    const statsEl = document.getElementById('partyStats');
    if (!statsEl) return;
    
    const stats = Parties.getPartyStats();
    if (!stats) return;
    
    statsEl.innerHTML = `
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">👥</div>
            <div style="font-size: 1.5em; font-weight: bold;">${stats.memberCount}</div>
            <div style="opacity: 0.7;">Members</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">⏱️</div>
            <div style="font-size: 1.5em; font-weight: bold;">${stats.duration}</div>
            <div style="opacity: 0.7;">Duration</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">🎆</div>
            <div style="font-size: 1.5em; font-weight: bold;">${stats.code}</div>
            <div style="opacity: 0.7;">Party Code</div>
        </div>
    `;
}

function updateLeaveButton(party, currentUser, isCreator) {
    const leaveBtn = document.getElementById('leavePartyBtn');
    if (!leaveBtn || !currentUser) return;
    
    if (isCreator) {
        leaveBtn.innerHTML = '<i class="fas fa-trash"></i> Delete Party';
        leaveBtn.className = 'btn btn-danger';
    } else {
        leaveBtn.innerHTML = '<i class="fas fa-door-open"></i> Leave Party';
        leaveBtn.className = 'btn btn-danger';
    }
}

function updateCreatorControls(party, isCreator, isDev) {
    if (!isCreator && !isDev) {
        const creatorControlsSection = document.getElementById('creatorControlsSection');
        if (creatorControlsSection) creatorControlsSection.style.display = 'none';
        
        const pendingSection = document.getElementById('pendingRequestsSection');
        if (pendingSection) pendingSection.style.display = 'none';
        return;
    }
    
    // Show creator controls
    const creatorControlsSection = document.getElementById('creatorControlsSection');
    if (creatorControlsSection) {
        creatorControlsSection.style.display = 'block';
        
        // Update lock button
        const lockBtn = document.getElementById('lockPartyBtn');
        if (lockBtn) {
            if (party.locked) {
                lockBtn.innerHTML = '<i class="fas fa-lock-open"></i> Unlock Party';
            } else {
                lockBtn.innerHTML = '<i class="fas fa-lock"></i> Lock Party';
            }
        }
    }
    
    // Show pending requests
    const pendingSection = document.getElementById('pendingRequestsSection');
    const pendingList = document.getElementById('pendingRequestsList');
    
    if (pendingSection && pendingList && party.pendingRequests) {
        const pendingCount = Object.keys(party.pendingRequests).length;
        if (pendingCount > 0) {
            pendingSection.style.display = 'block';
            pendingList.innerHTML = Object.entries(party.pendingRequests).map(([userId, request]) => `
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">👤</div>
                        <div class="friend-details">
                            <h4>${request.name}</h4>
                            <p style="opacity: 0.7;">Requested ${new Date(request.requestedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" onclick="handlePartyRequest('${userId}', true)">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn" onclick="handlePartyRequest('${userId}', false)">
                            <i class="fas fa-times"></i> Decline
                        </button>
                    </div>
                </div>
            `).join('');
        } else if (pendingSection) {
            pendingSection.style.display = 'none';
        }
    } else if (pendingSection) {
        pendingSection.style.display = 'none';
    }
}