# How to Update Your GitHub Repository to v2

This guide will show you how to update your existing GitHub repository with the new `v2` files, which add Firebase real-time sharing.

## Method 1: GitHub Website (Easy)

This is the simplest method for updating your project.

### Step 1: Prepare Your Files

1.  **Unzip the `location-tracker-pwa-v2.zip`** file on your computer.
2.  **Configure Firebase**: Open the `firebase-config.js` file and paste your Firebase project credentials. (See `FIREBASE_SETUP.md` for instructions).
3.  You should now have a folder with all the `v2` files ready.

### Step 2: Upload Files to GitHub

1.  **Go to your GitHub repository**.

2.  **Delete the old files**:
    -   Click on each of the old files (`location-tracker.html`, `manifest.json`, etc.).
    -   Click the **trash can icon** (Delete file) on the top right.
    -   Click **"Commit changes"**.
    -   Repeat for all old files.

3.  **Upload the new `v2` files**:
    -   In your repository, click the **"Add file"** button and select **"Upload files"**.
    -   **Drag and drop all the new `v2` files** from your computer into the upload area. This includes:
        -   `index.html`
        -   `app.js`
        -   `firebase-config.js` (with your credentials)
        -   `manifest.json`
        -   `service-worker.js`
        -   `icon-192.png`
        -   `icon-512.png`
        -   `README.md`
        -   `FIREBASE_SETUP.md`
        -   `GITHUB_UPDATE_V2.md`

4.  **Commit the changes**:
    -   Add a commit message like `feat: Upgrade to v2 with Firebase real-time sharing`.
    -   Click **"Commit changes"**.

### Step 3: Verify Deployment

1.  Go to your GitHub Pages URL: `https://yourusername.github.io/repo-name/`.
2.  The new `v2` app should load automatically (since we are using `index.html`).
3.  You should see a "Connecting to server..." message, which will change to "Real-time sync enabled" once connected to your Firebase database.

## Method 2: Git Command Line (Advanced)

If you have Git installed on your computer, this method is faster.

### Step 1: Prepare Your Files

1.  **Clone your repository** to your computer if you haven't already:
    ```bash
    git clone https://github.com/yourusername/repo-name.git
    cd repo-name
    ```

2.  **Delete the old files** from the folder (but keep the `.git` directory).

3.  **Copy all the new `v2` files** into your repository folder.
    -   Make sure you have configured `firebase-config.js`!

### Step 2: Commit and Push Changes

1.  **Stage the changes** (this will add new files and remove old ones):
    ```bash
    git add .
    ```

2.  **Commit the changes** with a descriptive message:
    ```bash
    git commit -m "feat: Upgrade to v2 with Firebase real-time sharing"
    ```

3.  **Push the changes** to GitHub:
    ```bash
    git push origin main
    ```

### Step 3: Verify Deployment

-   Go to your GitHub Pages URL: `https://yourusername.github.io/repo-name/`.
-   The new `v2` app should be live within a minute or two.

---

**Congratulations! Your app is now updated to `v2` with real-time, multi-device location sharing!** 🚀**
