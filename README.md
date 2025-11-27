# Live Location Tracker - PWA

A Progressive Web App for real-time GPS location sharing with multiple users.

## Features

✅ **Progressive Web App** - Install on your phone like a native app  
✅ **High Accuracy GPS** - Enhanced geolocation settings for precise tracking  
✅ **Real-time Updates** - See everyone's location update every 1.5 seconds  
✅ **Accuracy Visualization** - Shows accuracy radius circles around each user  
✅ **Offline Support** - Works even without internet connection  
✅ **Wake Lock** - Prevents screen from sleeping during tracking  
✅ **Mobile Optimized** - Responsive design for all devices  

## Installation

### Option 1: Install as PWA (Recommended for Mobile)

1. **Host the files on a web server with HTTPS**
   - Upload all files to your web hosting
   - Or use a service like GitHub Pages, Netlify, or Vercel

2. **Open in mobile browser**
   - Navigate to your hosted URL
   - You'll see an "Install App" banner

3. **Install to home screen**
   - **Chrome/Brave**: Tap the banner or Menu → "Add to Home screen"
   - **Safari**: Tap Share button → "Add to Home screen"
   - **Firefox**: Tap Menu → "Install"

4. **Open the installed app**
   - Find the app icon on your home screen
   - Open it like any other app
   - Grant location permissions when prompted

### Option 2: Quick Test (Local Server)

For testing on your computer:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then open: `http://localhost:8000/location-tracker.html`

### Option 3: Deploy to GitHub Pages (Free HTTPS)

1. Create a new GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Enable GitHub Pages from main branch
5. Access via: `https://yourusername.github.io/repo-name/location-tracker.html`

## Files Included

- `location-tracker.html` - Main app file
- `manifest.json` - PWA manifest for installation
- `service-worker.js` - Service worker for offline support
- `icon-192.png` - App icon (192x192)
- `icon-512.png` - App icon (512x512)
- `README.md` - This file

## How to Use

1. **Enter your name** in the input field
2. **Click "Start Sharing"** button
3. **Allow location access** when prompted
4. **Wait for GPS lock** (30-60 seconds for best accuracy)
5. **Share the URL** with others so they can join
6. **See everyone's location** on the map in real-time

## Tips for Best Accuracy

📍 **Use outdoors** - GPS works best with clear sky view  
📍 **Wait for GPS lock** - Initial accuracy may be poor, wait 30-60 seconds  
📍 **Enable high accuracy mode** - In phone settings → Location → High accuracy  
📍 **Install as PWA** - Installed apps get better GPS access than browsers  
📍 **Keep screen on** - The app uses wake lock to prevent sleep  

## Accuracy Ratings

- **±0-10m** = Excellent (GPS lock achieved)
- **±10-50m** = Good (Typical GPS accuracy)
- **±50-100m** = Fair (Partial GPS lock)
- **±100m+** = Poor (Using WiFi/cell towers)

## Browser Compatibility

- ✅ Chrome/Brave (Android, Desktop)
- ✅ Safari (iOS, macOS)
- ✅ Firefox (Android, Desktop)
- ✅ Edge (Android, Desktop)

## Privacy & Security

- All location data is stored locally in browser's localStorage
- No data is sent to external servers
- Data is automatically cleared after 5 minutes of inactivity
- Works completely offline after initial load

## Troubleshooting

### "Unable to get your location" error

1. Check browser permissions: Settings → Site settings → Location → Allow
2. Enable GPS in phone settings: Settings → Location → On
3. Make sure you're using HTTPS or localhost
4. Try outdoors with clear sky view

### Poor accuracy on laptop

- Laptops don't have GPS chips
- They use WiFi/IP geolocation which is less accurate (100-500m)
- Use an external GPS dongle for better accuracy
- Or use your phone instead

### App won't install

- Make sure you're accessing via HTTPS (not HTTP)
- Some browsers require user interaction before showing install prompt
- Try manually: Browser menu → "Add to Home screen" or "Install app"

## Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Maps**: Leaflet.js with OpenStreetMap tiles
- **Storage**: localStorage for peer-to-peer sharing
- **Geolocation**: Browser Geolocation API with `enableHighAccuracy: true`
- **PWA**: Service Worker + Web App Manifest
- **Update Frequency**: 1.5 seconds

## Limitations

- Location sharing only works between users on the same device or network (localStorage-based)
- For true multi-device sharing, you'd need a backend server with WebSockets
- Maximum 5 minutes of inactivity before user is removed
- Requires HTTPS for PWA features (except localhost)

## Future Enhancements

- Backend server for true multi-device sharing
- WebSocket for real-time updates
- User authentication
- Location history/trails
- Geofencing and notifications
- Battery optimization

## License

Free to use and modify for personal or commercial projects.

---

**Enjoy tracking! 📍**
