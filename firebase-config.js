// Firebase Configuration
// IMPORTANT: Replace these values with your own Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app

const firebaseConfig = {
  apiKey: "AIzaSyABC...",
  authDomain: "live-location-tracker.firebaseapp.com",
  databaseURL: "https://live-location-tracker-default-rtdb.firebaseio.com",
  projectId: "live-location-tracker",
  storageBucket: "live-location-tracker.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Export for use in main app
window.firebaseConfig = firebaseConfig;
