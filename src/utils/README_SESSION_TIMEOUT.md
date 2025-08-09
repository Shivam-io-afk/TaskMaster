# Session Timeout Feature

## Overview

This feature implements an automatic session timeout that logs users out after 10 minutes of inactivity. It uses cookies to track the user's session and provides a warning before the session expires.

## Implementation Details

### Components

1. **cookieUtils.js**
   - Provides utility functions for managing cookies using the js-cookie library
   - Functions: setCookie, getCookie, deleteCookie, refreshAuthCookie

2. **useAuthTimeout.js**
   - Custom React hook that manages the authentication timeout
   - Sets up event listeners to refresh the timeout on user activity
   - Checks for cookie expiration and logs out the user when needed

3. **SessionTimeout.js**
   - React component that monitors user activity
   - Shows a warning 1 minute before the session expires
   - Automatically logs out the user after 10 minutes of inactivity

### Integration

- **AuthContext.js**: Initializes the authentication cookie when a user logs in and clears it when they log out
- **auth.js**: Ensures cookies are properly managed during login and logout operations
- **App.js**: Includes the SessionTimeout component to monitor user activity

## How It Works

1. When a user logs in, an authentication cookie is set with a 10-minute expiration
2. User activity (mouse movements, clicks, keystrokes, scrolling) refreshes the cookie
3. After 9 minutes of inactivity, a warning is displayed
4. After 10 minutes of inactivity, the user is automatically logged out

## Configuration

The timeout duration can be adjusted by modifying the `timeoutMinutes` parameter in the `useAuthTimeout` hook (default: 10 minutes).

## Dependencies

- js-cookie: For cross-browser compatible cookie management