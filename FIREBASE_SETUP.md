# Firebase Setup Guide for Live Location Tracker v2

This guide will walk you through setting up a free Firebase project to enable real-time location sharing across multiple devices.

## Step 1: Create a Firebase Project

1.  **Go to the Firebase Console**:
    -   Open your browser and navigate to [https://console.firebase.google.com](https://console.firebase.google.com).
    -   Sign in with your Google account.

2.  **Add a New Project**:
    -   Click on **"Add project"**.
    -   Give your project a name (e.g., `live-location-tracker`).
    -   Click **"Continue"**.
    -   You can disable Google Analytics for this project if you want. It's not needed.
    -   Click **"Create project"** and wait for it to be created.

## Step 2: Add a Web App to Your Project

1.  **From your project's dashboard**, click the **Web icon** (`</>`) to add a web app.

2.  **Register the App**:
    -   Give your app a nickname (e.g., `Location Tracker PWA`).
    -   **Do not** check the box for "Firebase Hosting".
    -   Click **"Register app"**.

3.  **Get Your Firebase Config**:
    -   Firebase will show you your configuration credentials. It will look like this:

        ```javascript
        const firebaseConfig = {
          apiKey: "AIzaSy...",
          authDomain: "your-project-id.firebaseapp.com",
          databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
          projectId: "your-project-id",
          storageBucket: "your-project-id.appspot.com",
          messagingSenderId: "1234567890",
          appId: "1:12345..."
        };
        ```

    -   **Copy this entire object.** You will need it for the `firebase-config.js` file.

## Step 3: Set Up Realtime Database

1.  **Go to the Database Section**:
    -   In the left-hand menu, go to **Build > Realtime Database**.

2.  **Create a Database**:
    -   Click the **"Create Database"** button.
    -   Choose a location for your database (any location is fine).
    -   Click **"Next"**.

3.  **Set Security Rules (IMPORTANT!)**:
    -   Select **"Start in test mode"**. This allows anyone to read and write to your database for the next 30 days.
    -   Click **"Enable"**.

4.  **Modify Security Rules for Production**:
    -   After the database is created, go to the **"Rules"** tab.
    -   The default test rules expire in 30 days. For a permanent solution that still allows public access, change the rules to:

        ```json
        {
          "rules": {
            ".read": "true",
            ".write": "true"
          }
        }
        ```

    -   Click **"Publish"**.

    > **Security Note**: These rules allow anyone to read/write to your database. For a public app like this, it's acceptable. For a private app, you would need to set up authentication.

## Step 4: Update Your `firebase-config.js` File

1.  Open the `firebase-config.js` file from the `v2` package.

2.  **Replace the placeholder values** with the configuration object you copied in Step 2.

    -   **BEFORE**:
        ```javascript
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY_HERE",
          // ... more placeholders
        };
        ```

    -   **AFTER** (example):
        ```javascript
        const firebaseConfig = {
          apiKey: "AIzaSyABC...",
          authDomain: "live-location-tracker.firebaseapp.com",
          databaseURL: "https://live-location-tracker-default-rtdb.firebaseio.com",
          projectId: "live-location-tracker",
          storageBucket: "live-location-tracker.appspot.com",
          messagingSenderId: "1234567890",
          appId: "1:1234567890:web:abcdef123456"
        };
        ```

3.  Save the `firebase-config.js` file.

## You're Done!

Your Firebase backend is now ready. Once you upload the updated files (including your new `firebase-config.js`) to GitHub Pages, the app will automatically connect to your Firebase database and enable real-time sharing between you and your friends.
