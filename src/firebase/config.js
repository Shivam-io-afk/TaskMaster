// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCYak3dh1FuE5ICr-7_nmNSAauzukM1t4s",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "taskmaster-3beb4.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "taskmaster-3beb4",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "taskmaster-3beb4.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "779441961434",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:779441961434:web:37acdb0eeb3c8b1d3968e3",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-ZSP919JBP2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider (optional settings)
googleProvider.setCustomParameters({
  prompt: 'select_account' // Forces account selection even when one account is available
});

export { auth, googleProvider, analytics };