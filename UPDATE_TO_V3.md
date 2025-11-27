# Updating to v3 from v2

This guide explains how to update your existing deployment from v2 to v3.

## What's Changed in v3

### New Features

1. **User Types** - Base (password) vs User (name only)
2. **Distance Calculation** - Click users to see route-based distance
3. **Enhanced UI** - User type selector, distance display panel
4. **Pre-configured Firebase** - Your credentials are already set

### Changed Files

- `index.html` - Added user type selector and distance display
- `app.js` - Added authentication and distance calculation
- `styles.css` - New styles for v3 features
- `firebase-config.js` - Updated with your credentials
- `README.md` - Updated documentation

### Unchanged Files

- `manifest.json` - Same PWA manifest
- `service-worker.js` - Same offline support
- `icon-192.png` - Same app icon
- `icon-512.png` - Same app icon

## Update Methods

### Method 1: GitHub Website (Easy)

**Step 1: Backup (Optional)**

If you want to keep v2, create a new branch first:
1. Go to your repository
2. Click "main" branch dropdown
3. Type "v2-backup" and create new branch
4. Switch back to "main" branch

**Step 2: Delete Old Files**

Delete these files from your repository:
- `index.html`
- `app.js`
- `styles.css` (if it exists separately)
- `firebase-config.js`
- `README.md`

**Step 3: Upload New v3 Files**

1. Click "Add file" → "Upload files"
2. Drag all files from the `v3` folder:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `firebase-config.js`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`
   - `README.md`
   - `UPDATE_TO_V3.md`
3. Commit message: `feat: Upgrade to v3 with user types and distance calculation`
4. Click "Commit changes"

**Step 4: Verify Deployment**

1. Wait 1-2 minutes for GitHub Pages to update
2. Open your URL: `https://yourusername.github.io/repo-name/`
3. You should see the v3 badge in the header
4. Test the user type selector (Base/User buttons)

### Method 2: Git Command Line (Advanced)

**Step 1: Navigate to Repository**

```bash
cd /path/to/your/repo
```

**Step 2: Backup Current Version (Optional)**

```bash
git checkout -b v2-backup
git push origin v2-backup
git checkout main
```

**Step 3: Replace Files**

```bash
# Remove old files (keep .git directory)
rm -rf *.html *.js *.css *.json *.png *.md

# Copy new v3 files
cp /path/to/v3/* .

# Or if you have the zip file
unzip location-tracker-pwa-v3.zip
```

**Step 4: Commit and Push**

```bash
git add .
git commit -m "feat: Upgrade to v3 with user types and distance calculation"
git push origin main
```

**Step 5: Verify Deployment**

```bash
# Wait a minute, then test
curl -I https://yourusername.github.io/repo-name/
```

Open in browser to verify.

## Testing v3 Features

### Test User Types

**Test as User:**
1. Make sure "User" is selected (blue highlight)
2. Enter your name: "Test User"
3. Click "Start Sharing"
4. Should see your marker on map

**Test as Base:**
1. Click "Base" button (should turn blue)
2. Enter password: `NSWTDC!!!`
3. Click "Start Sharing"
4. Should see orange marker with star

### Test Distance Calculation

**Setup:**
1. Open app in two different browsers (or devices)
2. One as "User A", one as "User B"
3. Both start sharing location

**Test:**
1. On User A's screen, click User B's marker
2. Should see distance panel in top-right
3. Distance should show in km or meters
4. Type should say "Via road"

**Alternative Test:**
1. Click user card in sidebar instead of marker
2. Should also show distance panel

### Test Firebase Sync

**Verify:**
1. Open Firebase Console
2. Go to Realtime Database
3. Should see `users` node with active users
4. Each user should have:
   - `name`
   - `lat`, `lng`
   - `accuracy`
   - `timestamp`
   - `userType` (base or user)
   - `color`

## Troubleshooting

### v3 badge not showing

**Problem:** Still shows v2 or no badge

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check GitHub that new files are uploaded
4. Wait 2-3 minutes for GitHub Pages

### User type selector not working

**Problem:** Can't switch between Base and User

**Solution:**
1. Check browser console for errors (F12)
2. Verify `app.js` uploaded correctly
3. Make sure using latest `index.html`

### Distance not calculating

**Problem:** Shows "Calculating..." forever

**Solution:**
1. Check internet connection (OSRM needs internet)
2. Try clicking a different user
3. Check browser console for CORS errors
4. Fallback to straight-line distance should work

### Base password not working

**Problem:** "Incorrect password" error

**Solution:**
1. Type exactly: `NSWTDC!!!` (case-sensitive)
2. No spaces before or after
3. Check keyboard language/layout
4. Try copy-paste from README

### Firebase not connecting

**Problem:** Shows "offline mode" or error

**Solution:**
1. Check `firebase-config.js` has correct credentials
2. Verify Firebase Realtime Database is enabled
3. Check Firebase security rules allow read/write
4. Look at browser console for Firebase errors

## Rollback to v2

If you need to go back to v2:

**If you created backup branch:**
```bash
git checkout v2-backup
git checkout -b main-new
git branch -D main
git branch -m main
git push origin main --force
```

**If you didn't create backup:**
1. Re-download v2 files
2. Upload them to repository
3. Or use Git history:
```bash
git log  # Find v2 commit hash
git checkout <commit-hash> .
git commit -m "Rollback to v2"
git push origin main
```

## Migration Checklist

- [ ] Backup v2 (optional)
- [ ] Delete old files from repository
- [ ] Upload all v3 files
- [ ] Commit changes
- [ ] Wait for GitHub Pages deployment
- [ ] Test URL in browser
- [ ] Verify v3 badge shows
- [ ] Test User type selection
- [ ] Test Base password login
- [ ] Test distance calculation
- [ ] Test Firebase sync
- [ ] Share URL with team

## Post-Update

### Inform Your Team

Send this message to your users:

```
📍 Location Tracker Updated to v3!

New Features:
- Base account for monitoring (password: NSWTDC!!!)
- Distance calculation - click users to see distance
- Improved UI with user type selector

Same URL: https://yourusername.github.io/repo-name/

For regular users: Just enter your name as before
For Base/Monitor: Click "Base" button and enter password

Clear your browser cache if you see issues!
```

### Update Bookmarks

If you had bookmarks or shortcuts:
- URL stays the same
- But clear cache on first visit
- Re-install PWA if needed (will auto-update)

### Monitor Firebase Usage

Check Firebase Console:
- **Realtime Database** → Usage tab
- Free tier: 100 simultaneous connections
- 1GB data transfer per month
- Should be plenty for typical use

## Need Help?

1. Check `README.md` for detailed documentation
2. Look at browser console (F12) for errors
3. Verify Firebase Console shows data
4. Test with different browsers/devices

---

**Enjoy v3 with user types and distance calculation!** 🎯
