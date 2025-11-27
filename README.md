# Live Location Tracker v2 - PWA

A Progressive Web App for **real-time GPS location sharing with multiple users across different devices**.

## What's New in v2

**Real-time Multi-Device Sharing** - Now you and your friends can see each other's locations in real-time, even on different phones! This is powered by Firebase Realtime Database.

### v2 Features

✅ **Multi-Device Sharing** - See friends on different phones in real-time  
✅ **Firebase Backend** - Free real-time database (up to 100 simultaneous users)  
✅ **Auto-Sync** - Locations update automatically across all devices  
✅ **Offline Fallback** - Still works without Firebase (local mode)  
✅ **Progressive Web App** - Install on your phone like a native app  
✅ **High Accuracy GPS** - Enhanced geolocation settings for precise tracking  
✅ **Accuracy Visualization** - Shows accuracy radius circles around each user  
✅ **Wake Lock** - Prevents screen from sleeping during tracking  
✅ **Mobile Optimized** - Responsive design for all devices  

## Quick Start

### 1. Set Up Firebase (Required for Multi-Device Sharing)

Follow the detailed instructions in **`FIREBASE_SETUP.md`** to:
- Create a free Firebase project
- Get your Firebase credentials
- Configure the `firebase-config.js` file

**This takes about 5 minutes!**

### 2. Deploy to GitHub Pages

Follow the instructions in **`GITHUB_UPDATE_V2.md`** to:
- Upload the files to your GitHub repository
- Enable GitHub Pages
- Get your public URL

### 3. Share and Track

- Open your GitHub Pages URL on your phone
- Enter your name and click "Start Sharing"
- Share the URL with friends
- See everyone's location in real-time!

## Files Included

| File | Description |
|------|-------------|
| `index.html` | Main app file (renamed from location-tracker.html) |
| `app.js` | Application logic with Firebase integration |
| `firebase-config.js` | Firebase configuration (you need to edit this!) |
| `manifest.json` | PWA manifest for installation |
| `service-worker.js` | Service worker for offline support |
| `icon-192.png` | App icon (192x192) |
| `icon-512.png` | App icon (512x512) |
| `README.md` | This file |
| `FIREBASE_SETUP.md` | Step-by-step Firebase setup guide |
| `GITHUB_UPDATE_V2.md` | Instructions for updating GitHub repository |

## How It Works

### Without Firebase (v1 Behavior)
- Locations stored in browser's localStorage
- Only works on the same device/browser
- Good for testing, not for sharing with friends

### With Firebase (v2 New Feature)
- Locations stored in Firebase Realtime Database
- Works across different devices globally
- Real-time updates (like Telegram/WhatsApp live location)
- Automatic cleanup when users disconnect

## Usage Instructions

### First Time Setup

1. **Configure Firebase** (see `FIREBASE_SETUP.md`)
2. **Deploy to GitHub Pages** (see `GITHUB_UPDATE_V2.md`)
3. **Open the app** on your phone
4. **Install as PWA** (tap the install banner)

### Daily Use

1. **Open the app** (from home screen if installed)
2. **Enter your name** in the input field
3. **Click "Start Sharing"** button
4. **Allow location access** when prompted
5. **Wait for GPS lock** (30-60 seconds for best accuracy)
6. **Share the URL** with friends
7. **See everyone's location** on the map in real-time

## Tips for Best Accuracy

📍 **Use outdoors** - GPS works best with clear sky view  
📍 **Wait for GPS lock** - Initial accuracy may be poor, wait 30-60 seconds  
📍 **Enable high accuracy mode** - In phone settings → Location → High accuracy  
📍 **Install as PWA** - Installed apps get better GPS access than browsers  
📍 **Keep screen on** - The app uses wake lock to prevent sleep  

## Accuracy Ratings

| Accuracy | Quality | Typical Scenario |
|----------|---------|------------------|
| ±0-10m | Excellent | GPS lock achieved, outdoors |
| ±10-50m | Good | Typical GPS accuracy |
| ±50-100m | Fair | Partial GPS lock, urban areas |
| ±100m+ | Poor | Using WiFi/cell towers, indoors |

## Browser Compatibility

| Browser | Android | iOS | Desktop |
|---------|---------|-----|---------|
| Chrome | ✅ | ❌ | ✅ |
| Brave | ✅ | ❌ | ✅ |
| Safari | ❌ | ✅ | ✅ |
| Firefox | ✅ | ❌ | ✅ |
| Edge | ✅ | ❌ | ✅ |

## Privacy & Security

- Location data is stored in your Firebase database (you control it)
- No third-party tracking or analytics
- Data is automatically cleared after 5 minutes of inactivity
- Firebase security rules can be customized for private groups
- Works completely offline after initial load (without Firebase)

## Troubleshooting

### "Unable to get your location" error

1. Check browser permissions: Settings → Site settings → Location → Allow
2. Enable GPS in phone settings: Settings → Location → On
3. Make sure you're using HTTPS or localhost
4. Try outdoors with clear sky view

### "Please configure Firebase" message

1. You need to set up Firebase first (see `FIREBASE_SETUP.md`)
2. Edit `firebase-config.js` with your Firebase credentials
3. The app will work in offline mode without Firebase, but won't share across devices

### Poor accuracy on laptop

- Laptops don't have GPS chips
- They use WiFi/IP geolocation which is less accurate (100-500m)
- Use an external GPS dongle for better accuracy
- Or use your phone instead

### App won't install

- Make sure you're accessing via HTTPS (not HTTP)
- Some browsers require user interaction before showing install prompt
- Try manually: Browser menu → "Add to Home screen" or "Install app"

### Can't see friends' locations

1. Make sure Firebase is configured correctly
2. Check that you're both using the same URL
3. Verify Firebase status shows "Real-time sync enabled"
4. Check Firebase Console → Realtime Database to see if data is being written

## Technical Details

### Technology Stack

- **Framework**: Vanilla JavaScript (no dependencies)
- **Maps**: Leaflet.js with OpenStreetMap tiles
- **Backend**: Firebase Realtime Database
- **Storage**: localStorage (fallback) + Firebase
- **Geolocation**: Browser Geolocation API with `enableHighAccuracy: true`
- **PWA**: Service Worker + Web App Manifest
- **Update Frequency**: Real-time (Firebase listeners) + 2s UI refresh

### Firebase Database Structure

```json
{
  "users": {
    "user_123456": {
      "name": "John Doe",
      "lat": 14.5995,
      "lng": 120.9842,
      "accuracy": 12.5,
      "timestamp": 1701234567890,
      "color": "#667eea"
    }
  }
}
```

### Security Rules (Default)

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

For private groups, you can add authentication and restrict access.

## Comparison: v1 vs v2

| Feature | v1 (localStorage) | v2 (Firebase) |
|---------|-------------------|---------------|
| Multi-device sharing | ❌ | ✅ |
| Real-time updates | ❌ | ✅ |
| Works offline | ✅ | ✅ (fallback) |
| Setup required | None | Firebase (5 min) |
| Cost | Free | Free (up to 100 users) |
| Best for | Testing | Real use with friends |

## Limitations

- Firebase free tier: 100 simultaneous connections, 1GB data transfer/month
- Requires HTTPS for PWA features (except localhost)
- Laptop GPS accuracy is poor (no GPS chip)
- Battery drain on continuous GPS tracking

## Future Enhancements

- User authentication (private groups)
- Location history/trails
- Geofencing and notifications
- Battery optimization modes
- Custom map styles
- Export location history

## Support

- **Firebase Setup**: See `FIREBASE_SETUP.md`
- **GitHub Deployment**: See `GITHUB_UPDATE_V2.md`
- **General Issues**: Check the Troubleshooting section above

## License

Free to use and modify for personal or commercial projects.

---

**Enjoy tracking with your friends! 📍🚀**
