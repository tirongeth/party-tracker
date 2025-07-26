// ========================================
// PHOTO FEED MODULE
// ========================================
// Handles photo uploads, feed display, and social interactions

import { getFirebaseDatabase, getFirebaseStorage } from '../config/firebase.js';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { ref, set, get, push, onValue, off, remove, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getCurrentUser, getStateValue, setStateValue } from '../config/app-state.js';
import { showNotification } from '../ui/notifications.js';
import { handleError, safeAsync } from '../utils/error-handler.js';

// Photo feed state
let photoFeedListener = null;
let currentFilter = 'all';

// ========================================
// INITIALIZE PHOTOS MODULE
// ========================================
export function initializePhotos() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Start listening to photo feed
    listenToPhotoFeed();
    
    // Initialize upload handler for ESP32 devices
    initializeUploadHandler();
}

// ========================================
// PHOTO UPLOAD HANDLER (FOR ESP32)
// ========================================
export async function handlePhotoUpload(photoData) {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');
        
        // Show upload status
        const uploadStatus = document.getElementById('uploadStatus');
        if (uploadStatus) uploadStatus.style.display = 'block';
        
        // Get current device data
        const deviceData = getStateValue('deviceData') || {};
        const deviceId = photoData.deviceId;
        
        // Validate device ownership
        if (!deviceData[deviceId]) {
            throw new Error('Device not paired with this account');
        }
        
        // Convert base64 to blob
        const photoBlob = base64ToBlob(photoData.imageBase64, 'image/jpeg');
        
        // Apply retro filter
        const retroBlob = await applyRetroFilter(photoBlob);
        
        // Upload to Firebase Storage
        const storage = getFirebaseStorage();
        const timestamp = Date.now();
        const fileName = `photos/${user.uid}/${timestamp}_${deviceId}.jpg`;
        const photoStorageRef = storageRef(storage, fileName);
        
        const snapshot = await uploadBytes(photoStorageRef, retroBlob);
        const photoUrl = await getDownloadURL(snapshot.ref);
        
        // Save photo metadata to database
        const database = getFirebaseDatabase();
        const photoRef = push(ref(database, 'photos'));
        
        await set(photoRef, {
            userId: user.uid,
            userName: user.displayName || 'Anonymous',
            deviceId: deviceId,
            photoUrl: photoUrl,
            thumbnailUrl: photoUrl, // In production, generate actual thumbnail
            bac: photoData.bac || null, // Optional BAC reading
            timestamp: serverTimestamp(),
            likes: {},
            comments: {},
            partyId: getStateValue('currentPartyId') || null,
            location: photoData.location || null,
            retro: true
        });
        
        // Hide upload status
        if (uploadStatus) uploadStatus.style.display = 'none';
        
        showNotification('📸 Photo uploaded successfully!', 'success');
        
        // Trigger achievement check
        if (window.checkAchievements) {
            window.checkAchievements('photo_upload');
        }
        
        return { success: true, photoId: photoRef.key };
        
    } catch (error) {
        const uploadStatus = document.getElementById('uploadStatus');
        if (uploadStatus) uploadStatus.style.display = 'none';
        
        const errorInfo = handleError(error, 'Photo Upload');
        showNotification(errorInfo.message, 'error');
        return { success: false, error: errorInfo.message };
    }
}

// ========================================
// RETRO FILTER APPLICATION
// ========================================
async function applyRetroFilter(blob) {
    return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw original image
            ctx.drawImage(img, 0, 0);
            
            // Apply retro filter
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                // Sepia tone effect
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
            }
            
            // Add slight vignette
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY);
            
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                    const vignette = Math.max(0, 1 - (distance / radius) * 0.7);
                    const index = (y * canvas.width + x) * 4;
                    
                    data[index] *= vignette;
                    data[index + 1] *= vignette;
                    data[index + 2] *= vignette;
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            
            // Convert to blob
            canvas.toBlob((retroBlob) => {
                resolve(retroBlob);
            }, 'image/jpeg', 0.9);
        };
        
        img.src = URL.createObjectURL(blob);
    });
}

// ========================================
// PHOTO FEED DISPLAY
// ========================================
function listenToPhotoFeed() {
    const database = getFirebaseDatabase();
    const user = getCurrentUser();
    
    // Clean up existing listener
    if (photoFeedListener) {
        off(ref(database, 'photos'), photoFeedListener);
    }
    
    // Listen to all photos (we'll filter client-side for privacy)
    photoFeedListener = onValue(ref(database, 'photos'), async (snapshot) => {
        const photos = snapshot.val() || {};
        const friendsList = getStateValue('friendsList') || [];
        const currentPartyId = getStateValue('currentPartyId');
        
        // Filter photos based on privacy (friends only + self)
        const visiblePhotos = [];
        const friendIds = friendsList.map(f => f.id);
        friendIds.push(user.uid); // Include own photos
        
        for (const [photoId, photo] of Object.entries(photos)) {
            // Check if photo is from a friend or self
            if (friendIds.includes(photo.userId)) {
                // Apply additional filters
                if (currentFilter === 'all' ||
                    (currentFilter === 'recent' && isRecent(photo.timestamp)) ||
                    (currentFilter === 'party' && photo.partyId === currentPartyId) ||
                    (currentFilter === 'high-bac' && photo.bac !== null && photo.bac >= 0.08)) {
                    
                    visiblePhotos.push({ id: photoId, ...photo });
                }
            }
        }
        
        // Sort by timestamp (newest first)
        visiblePhotos.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        
        // Update UI
        displayPhotoFeed(visiblePhotos);
    });
}

// ========================================
// DISPLAY PHOTO FEED UI
// ========================================
function displayPhotoFeed(photos) {
    const photoFeed = document.getElementById('photoFeed');
    if (!photoFeed) return;
    
    if (photos.length === 0) {
        photoFeed.innerHTML = `
            <div class="photo-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 4em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No photos to show. ${currentFilter !== 'all' ? 'Try changing the filter!' : 'Connect your BoozeLens to start!'}</p>
            </div>
        `;
        return;
    }
    
    photoFeed.innerHTML = photos.map(photo => {
        const timeAgo = getTimeAgo(photo.timestamp);
        const likeCount = Object.keys(photo.likes || {}).length;
        const commentCount = Object.keys(photo.comments || {}).length;
        const userLiked = photo.likes && photo.likes[getCurrentUser().uid];
        
        return `
            <div class="photo-card" data-photo-id="${photo.id}">
                <div class="photo-header">
                    <div class="photo-user">
                        <div class="user-avatar">${getInitials(photo.userName)}</div>
                        <div class="user-info">
                            <h4>${photo.userName}</h4>
                            <p>${timeAgo} ${photo.bac !== null && photo.bac !== undefined ? `• ${photo.bac.toFixed(3)}‰` : ''}</p>
                        </div>
                    </div>
                    ${photo.userId === getCurrentUser().uid ? `
                        <button class="btn-icon" onclick="deletePhoto('${photo.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
                
                <div class="photo-image" onclick="viewPhoto('${photo.id}')">
                    <img src="${photo.photoUrl}" alt="Party photo" loading="lazy">
                    ${photo.bac !== null && photo.bac >= 0.08 ? '<div class="bac-badge">🔥 High BAC</div>' : ''}
                </div>
                
                <div class="photo-actions">
                    <button class="btn-icon ${userLiked ? 'liked' : ''}" onclick="toggleLike('${photo.id}')">
                        <i class="fas fa-heart"></i> ${likeCount > 0 ? likeCount : ''}
                    </button>
                    <button class="btn-icon" onclick="showComments('${photo.id}')">
                        <i class="fas fa-comment"></i> ${commentCount > 0 ? commentCount : ''}
                    </button>
                    <button class="btn-icon" onclick="sharePhoto('${photo.id}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                
                <div class="photo-comments" id="comments-${photo.id}" style="display: none;">
                    <!-- Comments will be loaded here -->
                </div>
            </div>
        `;
    }).join('');
    
    // Add CSS for retro photo styling
    addRetroStyles();
}

// ========================================
// LIKE/UNLIKE PHOTO
// ========================================
export async function toggleLike(photoId) {
    try {
        const user = getCurrentUser();
        const database = getFirebaseDatabase();
        const likeRef = ref(database, `photos/${photoId}/likes/${user.uid}`);
        
        const snapshot = await get(likeRef);
        
        if (snapshot.exists()) {
            // Unlike
            await remove(likeRef);
        } else {
            // Like
            await set(likeRef, {
                timestamp: serverTimestamp(),
                userName: user.displayName || 'Anonymous'
            });
            
            // Check achievement
            if (window.checkAchievements) {
                window.checkAchievements('give_likes');
            }
        }
        
    } catch (error) {
        handleError(error, 'Toggle Like');
    }
}

// ========================================
// ADD COMMENT
// ========================================
export async function addComment(photoId, comment) {
    try {
        const user = getCurrentUser();
        const database = getFirebaseDatabase();
        const commentRef = push(ref(database, `photos/${photoId}/comments`));
        
        await set(commentRef, {
            userId: user.uid,
            userName: user.displayName || 'Anonymous',
            text: comment,
            timestamp: serverTimestamp()
        });
        
        showNotification('💬 Comment added!', 'success');
        
    } catch (error) {
        handleError(error, 'Add Comment');
    }
}

// ========================================
// DELETE PHOTO
// ========================================
export async function deletePhoto(photoId) {
    if (!confirm('Delete this photo? This cannot be undone.')) return;
    
    try {
        const database = getFirebaseDatabase();
        const storage = getFirebaseStorage();
        
        // Get photo data first
        const photoSnapshot = await get(ref(database, `photos/${photoId}`));
        const photoData = photoSnapshot.val();
        
        if (!photoData) throw new Error('Photo not found');
        
        // Delete from storage
        if (photoData.photoUrl) {
            try {
                const photoRef = storageRef(storage, photoData.photoUrl);
                await deleteObject(photoRef);
            } catch (e) {
                console.error('Storage deletion failed:', e);
            }
        }
        
        // Delete from database
        await remove(ref(database, `photos/${photoId}`));
        
        showNotification('📸 Photo deleted', 'info');
        
    } catch (error) {
        handleError(error, 'Delete Photo');
    }
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function base64ToBlob(base64, contentType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: contentType });
}

function isRecent(timestamp) {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    return timestamp > oneDayAgo;
}

function getTimeAgo(timestamp) {
    if (!timestamp) return 'Just now';
    
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ========================================
// RETRO STYLING
// ========================================
function addRetroStyles() {
    if (document.getElementById('retro-photo-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'retro-photo-styles';
    style.innerHTML = `
        .photo-feed {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .photo-card {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.2s;
        }
        
        .photo-card:hover {
            transform: scale(1.02);
            border-color: #00ff88;
        }
        
        .photo-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
        }
        
        .photo-user {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #00ff88;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #1a1a1a;
        }
        
        .user-info h4 {
            margin: 0;
            font-size: 1em;
        }
        
        .user-info p {
            margin: 0;
            font-size: 0.8em;
            opacity: 0.7;
        }
        
        .photo-image {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            aspect-ratio: 1;
        }
        
        .photo-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: contrast(1.1) brightness(0.9);
        }
        
        .bac-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
        }
        
        .photo-actions {
            display: flex;
            gap: 15px;
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn-icon {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            opacity: 0.7;
            transition: all 0.2s;
        }
        
        .btn-icon:hover {
            opacity: 1;
            color: #00ff88;
        }
        
        .btn-icon.liked {
            color: #ff0066;
            opacity: 1;
        }
        
        .photo-comments {
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .photo-controls {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            align-items: center;
        }
        
        .photo-filter {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: inherit;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .upload-status {
            background: rgba(0, 255, 136, 0.1);
            border: 2px solid #00ff88;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        
        .upload-progress {
            color: #00ff88;
            font-weight: bold;
        }
    `;
    
    document.head.appendChild(style);
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
export async function refreshPhotoFeed() {
    listenToPhotoFeed();
    showNotification('📸 Feed refreshed!', 'success');
}

export function filterPhotos() {
    const filter = document.getElementById('photoFilter').value;
    currentFilter = filter;
    listenToPhotoFeed();
}

export async function viewPhoto(photoId) {
    // In a real app, this would open a full-screen viewer
    console.log('View photo:', photoId);
}

export async function showComments(photoId) {
    const commentsDiv = document.getElementById(`comments-${photoId}`);
    if (!commentsDiv) return;
    
    if (commentsDiv.style.display === 'none') {
        // Load and show comments
        const database = getFirebaseDatabase();
        const commentsSnapshot = await get(ref(database, `photos/${photoId}/comments`));
        const comments = commentsSnapshot.val() || {};
        
        const commentsHtml = Object.entries(comments)
            .sort((a, b) => (a[1].timestamp || 0) - (b[1].timestamp || 0))
            .map(([id, comment]) => `
                <div class="comment">
                    <strong>${comment.userName}:</strong> ${comment.text}
                </div>
            `).join('');
        
        commentsDiv.innerHTML = `
            ${commentsHtml}
            <div class="comment-input">
                <input type="text" id="comment-input-${photoId}" placeholder="Add a comment..." 
                    onkeypress="if(event.key==='Enter') addComment('${photoId}', this.value)">
            </div>
        `;
        
        commentsDiv.style.display = 'block';
    } else {
        commentsDiv.style.display = 'none';
    }
}

export async function sharePhoto(photoId) {
    // Copy link to clipboard
    const url = `${window.location.origin}/#photo/${photoId}`;
    await navigator.clipboard.writeText(url);
    showNotification('📋 Link copied!', 'success');
}

// ========================================
// ESP32 UPLOAD ENDPOINT
// ========================================
export function initializeUploadHandler() {
    // This would be called by your server/cloud function
    // when receiving uploads from ESP32 devices
    window.handleBoozeLensUpload = handlePhotoUpload;
}

// ========================================
// CLEANUP
// ========================================
export function cleanupPhotos() {
    if (photoFeedListener) {
        const database = getFirebaseDatabase();
        off(ref(database, 'photos'), photoFeedListener);
        photoFeedListener = null;
    }
}