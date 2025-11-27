// Live Location Tracker v3 - Main Application
// With User Types, Authentication, and Distance Calculation

// Constants
const BASE_PASSWORD = "NSWTDC!!!";
const USER_TYPE_BASE = "base";
const USER_TYPE_USER = "user";

// Initialize Firebase
let database = null;
let firebaseInitialized = false;

try {
    if (window.firebaseConfig) {
        firebase.initializeApp(window.firebaseConfig);
        database = firebase.database();
        firebaseInitialized = true;
        updateFirebaseStatus('connected', 'Connected to real-time server');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
    updateFirebaseStatus('error', 'Firebase setup error: ' + error.message);
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => console.log('ServiceWorker registered:', registration))
            .catch(error => console.log('ServiceWorker registration failed:', error));
    });
}

// PWA Install Prompt
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBanner.classList.add('show');
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
        installBanner.classList.remove('show');
    }
});

window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    installBanner.classList.remove('show');
});

// Initialize map
const map = L.map('map').setView([14.5995, 120.9842], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// State management
const state = {
    users: new Map(),
    markers: new Map(),
    accuracyCircles: new Map(),
    myId: null,
    myType: USER_TYPE_USER,
    watchId: null,
    isSharing: false,
    currentAccuracy: null,
    selectedUserId: null
};

// Color palette for user markers
const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];
const baseColor = '#f59e0b';
let colorIndex = 0;

// DOM elements
const userNameInput = document.getElementById('userName');
const basePasswordInput = document.getElementById('basePassword');
const baseTypeBtn = document.getElementById('baseTypeBtn');
const userTypeBtn = document.getElementById('userTypeBtn');
const shareBtn = document.getElementById('shareBtn');
const stopBtn = document.getElementById('stopBtn');
const statusEl = document.getElementById('status');
const userListEl = document.getElementById('userList');
const userCountEl = document.getElementById('userCount');
const accuracyInfoEl = document.getElementById('accuracyInfo');
const accuracyTextEl = document.getElementById('accuracyText');
const distanceDisplay = document.getElementById('distanceDisplay');
const distanceTitle = document.getElementById('distanceTitle');
const distanceValue = document.getElementById('distanceValue');
const distanceType = document.getElementById('distanceType');
const closeDistanceBtn = document.getElementById('closeDistance');
const permissionModal = document.getElementById('permissionModal');
const httpsModal = document.getElementById('httpsModal');
const closeModalBtn = document.getElementById('closeModal');
const closeHttpsModalBtn = document.getElementById('closeHttpsModal');

// User type selection
baseTypeBtn.addEventListener('click', () => {
    state.myType = USER_TYPE_BASE;
    baseTypeBtn.classList.add('active');
    userTypeBtn.classList.remove('active');
    userNameInput.style.display = 'none';
    basePasswordInput.style.display = 'block';
    basePasswordInput.placeholder = 'Enter Base password';
});

userTypeBtn.addEventListener('click', () => {
    state.myType = USER_TYPE_USER;
    userTypeBtn.classList.add('active');
    baseTypeBtn.classList.remove('active');
    basePasswordInput.style.display = 'none';
    userNameInput.style.display = 'block';
});

// Close distance display
closeDistanceBtn.addEventListener('click', () => {
    distanceDisplay.style.display = 'none';
    state.selectedUserId = null;
});

// Update Firebase status UI
function updateFirebaseStatus(status, message) {
    const statusEl = document.getElementById('firebaseStatus');
    const textEl = document.getElementById('firebaseStatusText');
    
    statusEl.className = 'firebase-status ' + status;
    textEl.textContent = message;
    
    if (status === 'connected') {
        statusEl.innerHTML = '<strong>✅ Real-time sync enabled</strong><span id="firebaseStatusText">' + message + '</span>';
    } else if (status === 'error') {
        statusEl.innerHTML = '<strong>⚠️ Offline mode</strong><span id="firebaseStatusText">' + message + '</span>';
    }
}

// Check if geolocation is available and secure context
function checkGeolocationSupport() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return false;
    }

    if (!window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        httpsModal.classList.add('show');
        return false;
    }

    return true;
}

// Generate unique ID
function generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get user initials
function getInitials(name) {
    if (name === 'BASE') return 'B';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substr(0, 2);
}

// Format time ago
function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

// Format accuracy
function formatAccuracy(accuracy) {
    if (accuracy < 10) return `±${accuracy.toFixed(1)}m (Excellent)`;
    if (accuracy < 50) return `±${accuracy.toFixed(0)}m (Good)`;
    if (accuracy < 100) return `±${accuracy.toFixed(0)}m (Fair)`;
    return `±${accuracy.toFixed(0)}m (Poor)`;
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// Format distance
function formatDistance(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)} meters`;
    } else if (km < 10) {
        return `${km.toFixed(2)} km`;
    } else {
        return `${Math.round(km)} km`;
    }
}

// Get route distance using OSRM (OpenStreetMap Routing Machine)
async function getRouteDistance(lat1, lon1, lat2, lon2) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distanceMeters = data.routes[0].distance;
            return distanceMeters / 1000; // Convert to km
        }
    } catch (error) {
        console.error('Route calculation error:', error);
    }
    
    // Fallback to straight-line distance
    return calculateDistance(lat1, lon1, lat2, lon2);
}

// Show distance to user
async function showDistanceToUser(userId) {
    const myData = state.users.get(state.myId);
    const targetData = state.users.get(userId);
    
    if (!myData || !targetData) return;
    
    state.selectedUserId = userId;
    distanceDisplay.style.display = 'block';
    distanceTitle.textContent = `Distance to ${targetData.name}`;
    distanceValue.textContent = 'Calculating...';
    distanceType.textContent = 'Via road';
    
    // Calculate route distance
    const distance = await getRouteDistance(
        myData.lat, myData.lng,
        targetData.lat, targetData.lng
    );
    
    if (state.selectedUserId === userId) {
        distanceValue.textContent = formatDistance(distance);
    }
}

// Create custom marker icon
function createMarkerIcon(color, initials, isBase = false) {
    const badge = isBase ? '<div style="position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; background: #ef4444; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px;">★</div>' : '';
    
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 40px;
                height: 40px;
                background: ${color};
                border: 3px solid white;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            ">
                <span style="
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                    transform: rotate(45deg);
                ">${initials}</span>
                ${badge}
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

// Update user marker and accuracy circle
function updateUserMarker(userId, userData) {
    const { name, lat, lng, timestamp, accuracy, userType } = userData;
    const initials = getInitials(name);
    const isBase = userType === USER_TYPE_BASE;
    
    if (state.markers.has(userId)) {
        // Update existing marker
        const marker = state.markers.get(userId);
        marker.setLatLng([lat, lng]);
        marker.setPopupContent(`
            <div class="popup-content">
                <h3>${name}${isBase ? ' ⭐' : ''}</h3>
                <p>📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
                <p>🎯 ${formatAccuracy(accuracy)}</p>
                <p>🕐 ${new Date(timestamp).toLocaleTimeString()}</p>
            </div>
        `);

        // Update accuracy circle
        if (state.accuracyCircles.has(userId)) {
            const circle = state.accuracyCircles.get(userId);
            circle.setLatLng([lat, lng]);
            circle.setRadius(accuracy);
        }
    } else {
        // Create new marker
        const color = isBase ? baseColor : (userData.color || colors[colorIndex % colors.length]);
        if (!userData.color && !isBase) {
            colorIndex++;
            userData.color = color;
        }
        
        const marker = L.marker([lat, lng], {
            icon: createMarkerIcon(color, initials, isBase)
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="popup-content">
                <h3>${name}${isBase ? ' ⭐' : ''}</h3>
                <p>📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
                <p>🎯 ${formatAccuracy(accuracy)}</p>
                <p>🕐 ${new Date(timestamp).toLocaleTimeString()}</p>
            </div>
        `);
        
        // Add click handler for distance calculation
        marker.on('click', () => {
            if (state.myId && userId !== state.myId) {
                showDistanceToUser(userId);
            }
        });
        
        // Create accuracy circle
        const circle = L.circle([lat, lng], {
            radius: accuracy,
            className: 'accuracy-circle',
            color: color,
            fillColor: color,
            fillOpacity: 0.1,
            weight: 2,
            opacity: 0.5
        }).addTo(map);
        
        state.markers.set(userId, marker);
        state.accuracyCircles.set(userId, circle);
    }
}

// Update user list UI
function updateUserList() {
    const users = Array.from(state.users.entries());
    userCountEl.textContent = users.length;

    if (users.length === 0) {
        userListEl.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3>No Active Users</h3>
                <p>Start sharing your location to see others</p>
            </div>
        `;
        return;
    }

    // Sort: Base users first, then by name
    users.sort((a, b) => {
        const [, aData] = a;
        const [, bData] = b;
        if (aData.userType === USER_TYPE_BASE && bData.userType !== USER_TYPE_BASE) return -1;
        if (aData.userType !== USER_TYPE_BASE && bData.userType === USER_TYPE_BASE) return 1;
        return aData.name.localeCompare(bData.name);
    });

    userListEl.innerHTML = users.map(([userId, userData]) => {
        const isBase = userData.userType === USER_TYPE_BASE;
        const isMe = userId === state.myId;
        const cardClass = `user-card ${isBase ? 'base-user' : ''} ${isMe ? 'active' : ''}`;
        const avatarClass = `user-avatar ${isBase ? 'base-avatar' : ''}`;
        const badge = isBase ? '<div class="base-badge">★</div>' : '';
        
        return `
            <div class="${cardClass}" data-user-id="${userId}">
                <div class="${avatarClass}" style="background: ${userData.color || (isBase ? baseColor : colors[0])}">
                    ${getInitials(userData.name)}
                    ${badge}
                </div>
                <div class="user-info">
                    <div class="user-name">${userData.name}${isMe ? ' (You)' : ''}${isBase ? ' ⭐' : ''}</div>
                    <div class="user-time">${timeAgo(userData.timestamp)}</div>
                    <div class="user-accuracy">${formatAccuracy(userData.accuracy)}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to user cards
    document.querySelectorAll('.user-card').forEach(card => {
        card.addEventListener('click', () => {
            const userId = card.dataset.userId;
            const userData = state.users.get(userId);
            if (userData) {
                map.setView([userData.lat, userData.lng], 17);
                state.markers.get(userId).openPopup();
                
                // Show distance if not clicking on self
                if (userId !== state.myId && state.myId) {
                    showDistanceToUser(userId);
                }
            }
        });
    });
}

// Firebase: Save location to database
function saveToFirebase(userData) {
    if (!firebaseInitialized || !database) return;
    
    try {
        const userRef = database.ref('users/' + state.myId);
        userRef.set(userData);
        
        // Set up auto-cleanup on disconnect
        userRef.onDisconnect().remove();
    } catch (error) {
        console.error('Firebase save error:', error);
    }
}

// Firebase: Remove user from database
function removeFromFirebase() {
    if (!firebaseInitialized || !database || !state.myId) return;
    
    try {
        database.ref('users/' + state.myId).remove();
    } catch (error) {
        console.error('Firebase remove error:', error);
    }
}

// Firebase: Listen for all users
function listenToFirebase() {
    if (!firebaseInitialized || !database) return;
    
    const usersRef = database.ref('users');
    
    // Listen for new users
    usersRef.on('child_added', (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();
        
        if (userId !== state.myId) {
            state.users.set(userId, userData);
            updateUserMarker(userId, userData);
            updateUserList();
        }
    });
    
    // Listen for user updates
    usersRef.on('child_changed', (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();
        
        if (userId !== state.myId) {
            state.users.set(userId, userData);
            updateUserMarker(userId, userData);
            updateUserList();
        }
    });
    
    // Listen for user removals
    usersRef.on('child_removed', (snapshot) => {
        const userId = snapshot.key;
        
        if (state.markers.has(userId)) {
            map.removeLayer(state.markers.get(userId));
            state.markers.delete(userId);
        }
        
        if (state.accuracyCircles.has(userId)) {
            map.removeLayer(state.accuracyCircles.get(userId));
            state.accuracyCircles.delete(userId);
        }
        
        state.users.delete(userId);
        updateUserList();
    });
}

// Start sharing location
function startSharing() {
    let name, isValid = false;
    
    if (state.myType === USER_TYPE_BASE) {
        const password = basePasswordInput.value.trim();
        if (password !== BASE_PASSWORD) {
            alert('Incorrect password for Base account!');
            basePasswordInput.focus();
            return;
        }
        name = 'BASE';
        isValid = true;
    } else {
        name = userNameInput.value.trim();
        if (!name) {
            alert('Please enter your name first!');
            userNameInput.focus();
            return;
        }
        isValid = true;
    }

    if (!isValid || !checkGeolocationSupport()) {
        return;
    }

    state.myId = generateId();
    state.isSharing = true;

    // Update UI
    shareBtn.style.display = 'none';
    stopBtn.style.display = 'flex';
    userNameInput.disabled = true;
    basePasswordInput.disabled = true;
    baseTypeBtn.disabled = true;
    userTypeBtn.disabled = true;
    statusEl.className = 'status warning';
    statusEl.innerHTML = '<span class="status-dot"></span> Acquiring GPS...';
    accuracyInfoEl.style.display = 'block';

    // Start listening to Firebase
    if (firebaseInitialized) {
        listenToFirebase();
    }

    // PWA-optimized geolocation options
    const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    // Watch position
    state.watchId = navigator.geolocation.watchPosition(
        (position) => {
            const accuracy = position.coords.accuracy;
            state.currentAccuracy = accuracy;

            const userData = {
                name: name,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: accuracy,
                timestamp: Date.now(),
                userType: state.myType,
                color: state.myType === USER_TYPE_BASE ? baseColor : (state.users.get(state.myId)?.color || colors[colorIndex % colors.length])
            };

            // Update local state
            state.users.set(state.myId, userData);
            updateUserMarker(state.myId, userData);
            updateUserList();

            // Update accuracy info
            accuracyTextEl.textContent = formatAccuracy(accuracy);
            
            // Update status
            if (accuracy < 50) {
                statusEl.className = 'status active';
                statusEl.innerHTML = '<span class="status-dot"></span> Active (High Accuracy)';
            } else {
                statusEl.className = 'status warning';
                statusEl.innerHTML = '<span class="status-dot"></span> Active (Low Accuracy)';
            }

            // Center map on first location
            if (state.users.size === 1) {
                map.setView([userData.lat, userData.lng], 17);
            }

            // Save to Firebase
            saveToFirebase(userData);
        },
        (error) => {
            console.error('Geolocation error:', error);
            
            let errorMessage = 'Unable to get your location. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Location permission denied.';
                    permissionModal.classList.add('show');
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable. Make sure GPS is enabled.';
                    alert(errorMessage);
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out. Please try again.';
                    alert(errorMessage);
                    break;
                default:
                    errorMessage += 'An unknown error occurred.';
                    alert(errorMessage);
            }
            
            stopSharing();
        },
        options
    );

    // Request persistent storage
    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(granted => {
            console.log('Persistent storage:', granted);
        });
    }

    // Request wake lock
    requestWakeLock();
}

// Stop sharing location
function stopSharing() {
    if (state.watchId) {
        navigator.geolocation.clearWatch(state.watchId);
        state.watchId = null;
    }

    // Remove from Firebase
    removeFromFirebase();

    // Remove user from map
    if (state.myId && state.markers.has(state.myId)) {
        map.removeLayer(state.markers.get(state.myId));
        state.markers.delete(state.myId);
    }

    if (state.myId && state.accuracyCircles.has(state.myId)) {
        map.removeLayer(state.accuracyCircles.get(state.myId));
        state.accuracyCircles.delete(state.myId);
    }

    if (state.myId) {
        state.users.delete(state.myId);
    }

    state.myId = null;
    state.isSharing = false;
    state.currentAccuracy = null;

    // Update UI
    shareBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
    userNameInput.disabled = false;
    basePasswordInput.disabled = false;
    baseTypeBtn.disabled = false;
    userTypeBtn.disabled = false;
    statusEl.className = 'status inactive';
    statusEl.innerHTML = '<span class="status-dot"></span> Inactive';
    accuracyInfoEl.style.display = 'none';
    distanceDisplay.style.display = 'none';

    updateUserList();

    // Release wake lock
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
    }
}

// Wake lock to prevent screen sleep
let wakeLock = null;
async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake lock activated');
        } catch (err) {
            console.log('Wake lock error:', err);
        }
    }
}

// Event listeners
shareBtn.addEventListener('click', startSharing);
stopBtn.addEventListener('click', stopSharing);
closeModalBtn.addEventListener('click', () => {
    permissionModal.classList.remove('show');
});
closeHttpsModalBtn.addEventListener('click', () => {
    httpsModal.classList.remove('show');
});

// Periodic UI updates
setInterval(() => {
    if (state.isSharing) {
        updateUserList(); // Update time ago
    }
}, 2000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (state.isSharing) {
        removeFromFirebase();
    }
});

// Auto-cleanup stale users
setInterval(() => {
    const now = Date.now();
    state.users.forEach((userData, userId) => {
        if (userId !== state.myId && now - userData.timestamp > 5 * 60 * 1000) {
            if (state.markers.has(userId)) {
                map.removeLayer(state.markers.get(userId));
                state.markers.delete(userId);
            }
            if (state.accuracyCircles.has(userId)) {
                map.removeLayer(state.accuracyCircles.get(userId));
                state.accuracyCircles.delete(userId);
            }
            state.users.delete(userId);
        }
    });
}, 30000);
