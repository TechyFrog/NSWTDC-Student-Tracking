# Live Location Tracker v3 - PWA

A Progressive Web App for **real-time GPS location sharing** with user types, authentication, and distance calculation.

## What's New in v3

### 🎯 User Types & Authentication

**Two User Types:**

1. **Base** - Main monitoring account
   - Password protected: `NSWTDC!!!`
   - Special marker with star badge (⭐)
   - Orange/red color scheme
   - Can monitor all users
   - All users can see Base location

2. **User** - Regular users
   - No password required
   - Just enter your name
   - Colorful markers
   - Can see all users including Base

### 📏 Distance Calculation

- **Click any user marker** on the map to see distance
- **Click any user card** in the sidebar to see distance
- **Route-based distance** via roads and passable terrain
- Uses OpenStreetMap Routing Machine (OSRM)
- Fallback to straight-line distance if routing fails
- Real-time distance display panel

### 🔥 Firebase Integration

- **Pre-configured** with your Firebase credentials
- Real-time synchronization across all devices
- Automatic cleanup on disconnect
- No setup required - just deploy!

## Quick Start

### 1. Deploy to GitHub Pages

Since Firebase is already configured, you just need to upload the files:

**Method 1: GitHub Website**
1. Go to your repository
2. Delete old files (if updating from v2)
3. Upload all v3 files
4. Commit changes
5. Access via: `https://yourusername.github.io/repo-name/`

**Method 2: Git Command Line**
```bash
cd your-repo
rm -rf *  # Remove old files (keep .git)
cp /path/to/v3/* .
git add .
git commit -m "feat: Upgrade to v3 with user types and distance calculation"
git push origin main
```

### 2. Usage

**As a Regular User:**
1. Open the app URL
2. Make sure "User" is selected (default)
3. Enter your name
4. Click "Start Sharing"
5. Allow location access

**As Base (Monitor):**
1. Open the app URL
2. Click "Base" button
3. Enter password: `NSWTDC!!!`
4. Click "Start Sharing"
5. Allow location access

**View Distance:**
1. Click any user marker on the map
2. Or click any user card in the sidebar
3. Distance panel appears in top-right corner
4. Shows distance via road/terrain

## Features

### Core Features

✅ **Real-time Multi-Device Sharing** - See all users across different phones  
✅ **User Types** - Base (password) vs User (name only)  
✅ **Distance Calculation** - Click users to see route-based distance  
✅ **High Accuracy GPS** - Enhanced geolocation settings  
✅ **Accuracy Visualization** - Radius circles around each user  
✅ **Progressive Web App** - Install on phone like native app  
✅ **Wake Lock** - Prevents screen from sleeping  
✅ **Offline Support** - Service worker caching  
✅ **Auto-Sync** - Firebase real-time database  

### User Interface

- **User Type Selector** - Toggle between Base and User
- **Password Protection** - Base account requires password
- **Distance Display** - Floating panel with route distance
- **User List** - Sorted (Base first, then alphabetical)
- **Visual Badges** - Star badge for Base users
- **Color Coding** - Orange for Base, colorful for Users
- **Accuracy Info** - Real-time GPS accuracy display
- **Status Indicators** - Active, Inactive, Acquiring GPS

## Files Included

| File | Description |
|------|-------------|
| `index.html` | Main app file with user type UI |
| `app.js` | Application logic with auth & distance |
| `styles.css` | Enhanced styles for v3 features |
| `firebase-config.js` | Pre-configured Firebase credentials |
| `manifest.json` | PWA manifest |
| `service-worker.js` | Service worker for offline support |
| `icon-192.png` | App icon (192x192) |
| `icon-512.png` | App icon (512x512) |
| `README.md` | This file |

## How It Works

### User Authentication

```javascript
// Base user
Password: "NSWTDC!!!"
Display Name: "BASE"
Marker Color: Orange (#f59e0b)
Badge: Star (⭐)

// Regular user
Password: None
Display Name: User-entered name
Marker Color: Random from palette
Badge: None
```

### Distance Calculation

1. **User clicks another user** on map or sidebar
2. **App gets coordinates** of both users
3. **OSRM API calculates** route via roads
4. **Distance displayed** in floating panel
5. **Updates automatically** as users move

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
      "userType": "user",
      "color": "#667eea"
    },
    "user_789012": {
      "name": "BASE",
      "lat": 14.6000,
      "lng": 120.9850,
      "accuracy": 8.2,
      "timestamp": 1701234567890,
      "userType": "base",
      "color": "#f59e0b"
    }
  }
}
```

## Usage Scenarios

### Scenario 1: Training Exercise

**Base (Instructor):**
- Logs in with password
- Monitors all trainees
- Clicks trainees to see distance
- Tracks real-time positions

**Users (Trainees):**
- Enter their names
- Start sharing location
- Can see Base and other trainees
- Can check distance to Base

### Scenario 2: Field Operations

**Base (Command Center):**
- Central monitoring point
- Sees all field operatives
- Calculates distances for coordination

**Users (Field Operatives):**
- Share location with command
- See other team members
- Check distance to objectives

### Scenario 3: Group Navigation

**Base (Group Leader):**
- Leads the group
- Monitors stragglers
- Ensures no one gets lost

**Users (Group Members):**
- Follow Base location
- Check distance to leader
- See other members

## Tips for Best Use

### For Base Users

📍 **Keep password secure** - Only authorized personnel should have it  
📍 **Monitor regularly** - Check user list for all active users  
📍 **Use distance feature** - Click users to assess spread  
📍 **Stay connected** - Keep GPS on for continuous monitoring  

### For Regular Users

📍 **Use clear names** - Use real names or call signs  
📍 **Check accuracy** - Wait for GPS lock (±10-50m is good)  
📍 **Save battery** - Stop sharing when not needed  
📍 **Install as PWA** - Better GPS access and offline support  

### For Everyone

📍 **Use outdoors** - GPS works best with clear sky view  
📍 **Enable high accuracy** - Phone settings → Location → High accuracy  
📍 **Keep screen on** - App uses wake lock automatically  
📍 **Check distance** - Click users to see route distance  

## Accuracy Expectations

| Device | Location | Expected Accuracy |
|--------|----------|-------------------|
| Phone | Outdoors | ±5-15m (Excellent) |
| Phone | Urban | ±10-50m (Good) |
| Phone | Indoors | ±20-100m (Fair) |
| Laptop | Any | ±100-500m (Poor - no GPS) |

## Distance Calculation

### OSRM Routing

- **Free API** - No API key required
- **Route-based** - Follows roads and paths
- **Fast** - Usually < 1 second response
- **Fallback** - Straight-line if routing fails

### Distance Display

```
┌─────────────────────────┐
│ Distance to John Doe    │
│ 🏠 2.45 km              │
│ Via road                │
└─────────────────────────┘
```

## Security Notes

### Base Password

- **Hardcoded**: `NSWTDC!!!`
- **Client-side only** - No server validation
- **Change if needed** - Edit `BASE_PASSWORD` in `app.js`
- **Not encrypted** - Anyone can view source code

### Firebase Security

- **Public read/write** - Anyone can access database
- **No authentication** - Trust-based system
- **For internal use** - Not for sensitive operations
- **Can be secured** - Add Firebase Auth if needed

## Troubleshooting

### "Incorrect password for Base account"

- Make sure you're typing: `NSWTDC!!!` (case-sensitive)
- Check for extra spaces
- Try copy-paste from this README

### Distance not showing

- Make sure you're sharing your location first
- Click another user (not yourself)
- Check internet connection (OSRM needs internet)
- If it says "Calculating..." for long time, it will fallback to straight-line

### Base user not showing star badge

- Clear browser cache
- Hard refresh the page
- Check that `userType` is set to "base" in Firebase

### Can't see other users

- Verify Firebase status shows "Real-time sync enabled"
- Check that everyone is using the same URL
- Look at Firebase Console → Realtime Database to see data
- Make sure Firebase security rules allow read/write

## Version Comparison

| Feature | v1 | v2 | v3 |
|---------|----|----|-----|
| Multi-device sharing | ❌ | ✅ | ✅ |
| Firebase backend | ❌ | ✅ | ✅ |
| User types | ❌ | ❌ | ✅ |
| Password protection | ❌ | ❌ | ✅ |
| Distance calculation | ❌ | ❌ | ✅ |
| Route-based distance | ❌ | ❌ | ✅ |
| Base monitoring | ❌ | ❌ | ✅ |

## Technical Details

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Maps**: Leaflet.js + OpenStreetMap
- **Backend**: Firebase Realtime Database
- **Routing**: OSRM API
- **PWA**: Service Worker + Manifest
- **Auth**: Client-side password check

### API Usage

**OSRM Routing API:**
```
GET https://router.project-osrm.org/route/v1/driving/{lon1},{lat1};{lon2},{lat2}
```

**Firebase Realtime Database:**
```javascript
firebase.database().ref('users/' + userId).set(userData);
firebase.database().ref('users').on('child_added', callback);
```

### Performance

- **Update frequency**: 1.5 seconds
- **GPS timeout**: 15 seconds
- **Distance calculation**: < 1 second
- **Firebase sync**: Real-time (< 100ms)
- **Stale user cleanup**: 5 minutes

## Future Enhancements

- [ ] Geofencing and alerts
- [ ] Location history/trails
- [ ] Multiple Base accounts
- [ ] Custom passwords per deployment
- [ ] Export location data
- [ ] Offline distance calculation
- [ ] Battery optimization modes
- [ ] Custom map styles

## Support

For issues or questions:
1. Check this README first
2. Verify Firebase Console shows data
3. Check browser console for errors
4. Test with different browsers

## License

Free to use and modify for personal or organizational use.

---

**Live Location Tracker v3** - Built for NSWTDC Training Operations 🎯
