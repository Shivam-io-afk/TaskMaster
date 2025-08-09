import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { setCookie, deleteCookie } from '../utils/cookieUtils';

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Firebase auth promise
 */
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile information
 * @param {Object} user - Firebase user object
 * @param {Object} data - Profile data to update
 * @returns {Promise} - Firebase auth promise
 */
export const updateUserProfile = async (user, data) => {
  try {
    await updateProfile(user, data);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Firebase auth promise
 */
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with Google
 * @returns {Promise} - Firebase auth promise
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Send password reset email with customized settings
 * @param {string} email - User's email
 * @param {Object} options - Optional settings for password reset
 * @returns {Promise} - Firebase auth promise
 */
export const resetPassword = async (email, options = {}) => {
  try {
    // Create actionCodeSettings for customizing the password reset experience
    const actionCodeSettings = {
      // URL you want to redirect back to after password reset
      // Redirect to the dedicated password reset page
      url: options.redirectUrl || `${window.location.origin}/reset-password`,
      // Handle the password reset in the app if possible
      handleCodeInApp: options.handleCodeInApp || true
    };
    
    // Add iOS settings if provided
    if (options.iOS) {
      actionCodeSettings.iOS = options.iOS;
    }
    
    // Add Android settings if provided
    if (options.android) {
      actionCodeSettings.android = options.android;
    }
    
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise} - Firebase auth promise
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    // Delete the auth cookie when user logs out
    deleteCookie('auth_session');
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the current authenticated user
 * @returns {Object|null} - Firebase user object or null if not authenticated
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};