// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0-9tFoORiYWJT7arJ942-Ah7X76xel94",
  authDomain: "nswtdc-trackingdatabase.firebaseapp.com",
  projectId: "nswtdc-trackingdatabase",
  storageBucket: "nswtdc-trackingdatabase.firebasestorage.app",
  messagingSenderId: "64365718618",
  appId: "1:64365718618:web:1563ce9b2bd9f1528cfc63",
  measurementId: "G-RY4HY7ENTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
