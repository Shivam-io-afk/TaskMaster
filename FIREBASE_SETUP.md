# Firebase Authentication Setup Guide

## Overview
This guide will help you set up Firebase Authentication for your TaskMaster React application. Firebase Authentication provides backend services and ready-made UI libraries to authenticate users in your app.

## Project Information
- Project ID: `taskmaster-3beb4`
- Project Number: `779441961434`
- Default configuration has been set up with the actual Firebase credentials

## Prerequisites
- A Google account
- Node.js and npm installed (which you already have since you're running this React app)

## Steps to Set Up Firebase

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "TaskMaster")
4. Choose whether to enable Google Analytics (recommended)
5. Accept the terms and click "Create project"

### 2. Register Your Web App with Firebase
1. In the Firebase console, click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" section and click on the web icon (</>) to add a web app
3. Register your app with a nickname (e.g., "TaskMaster Web")
4. Optionally enable Firebase Hosting
5. Click "Register app"
6. You'll be shown your Firebase configuration object - you'll need these values for the next step

### 3. Firebase Configuration Status
The Firebase configuration has already been set up with the actual credentials in both:

1. The `.env.local` file in the root of your project
2. The `src/firebase/config.js` file as fallback values

The configuration includes all necessary Firebase values:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyCYak3dh1FuE5ICr-7_nmNSAauzukM1t4s
REACT_APP_FIREBASE_AUTH_DOMAIN=taskmaster-3beb4.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=taskmaster-3beb4
REACT_APP_FIREBASE_STORAGE_BUCKET=taskmaster-3beb4.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=779441961434
REACT_APP_FIREBASE_APP_ID=1:779441961434:web:37acdb0eeb3c8b1d3968e3
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ZSP919JBP2
```

If you need to use a different Firebase project, you can modify these values.

### 4. Enable Authentication Methods in Firebase Console
1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click on the "Sign-in method" tab
3. Enable the authentication methods you want to use:
   - Email/Password (required for basic login)
   - Google (required for Google sign-in)
   - Any other providers you might want to add later

### 5. Test Your Authentication
1. Start your React application with `npm start`
2. Try to sign up with email and password
3. Try to log in with the created account
4. Try to log in with Google
5. Test the password reset functionality

## Troubleshooting

### Common Issues

1. **Firebase initialization error**: Make sure your `.env.local` file contains all the required Firebase configuration values.

2. **Google sign-in popup blocked**: If the Google sign-in popup is blocked, make sure to allow popups for your site in your browser settings.

3. **CORS errors**: If you're getting CORS errors, make sure your Firebase project's authentication settings have the correct domains listed in the authorized domains section.

4. **"auth/operation-not-allowed" error**: This means you haven't enabled the specific authentication method in the Firebase console. Go to Authentication > Sign-in method and enable the required providers.

## Security Best Practices

1. **Never commit your `.env.local` file to version control**. It contains sensitive API keys.

2. Consider implementing additional security measures like:
   - Email verification
   - Multi-factor authentication
   - Session timeout
   - IP address restrictions

3. Regularly review the authentication logs in the Firebase console to monitor for suspicious activity.

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)