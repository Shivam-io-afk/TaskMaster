import { useEffect, useCallback } from 'react';
import { setCookie, getCookie, deleteCookie, refreshAuthCookie } from '../utils/cookieUtils';
import { logoutUser } from '../firebase/auth';

/**
 * Hook to manage authentication timeout
 * @param {number} timeoutMinutes - Minutes until automatic logout
 * @returns {Object} - Functions to manage auth timeout
 */
const useAuthTimeout = (timeoutMinutes = 10) => {
  const AUTH_COOKIE_NAME = 'auth_session';
  
  // Initialize the authentication cookie
  const initAuthCookie = useCallback(() => {
    setCookie(AUTH_COOKIE_NAME, 'authenticated', timeoutMinutes);
  }, [timeoutMinutes]);
  
  // Refresh the authentication cookie
  const refreshTimeout = useCallback(() => {
    refreshAuthCookie(AUTH_COOKIE_NAME, timeoutMinutes);
  }, [timeoutMinutes]);
  
  // Clear the authentication cookie
  const clearTimeout = useCallback(() => {
    deleteCookie(AUTH_COOKIE_NAME);
  }, []);
  
  // Check if the authentication cookie exists
  const isAuthenticated = useCallback(() => {
    return !!getCookie(AUTH_COOKIE_NAME);
  }, []);
  
  // Set up event listeners to refresh the cookie on user activity
  useEffect(() => {
    const setupActivityListeners = () => {
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      
      const handleUserActivity = () => {
        if (isAuthenticated()) {
          refreshTimeout();
        }
      };
      
      // Add event listeners
      activityEvents.forEach(event => {
        document.addEventListener(event, handleUserActivity);
      });
      
      // Remove event listeners on cleanup
      return () => {
        activityEvents.forEach(event => {
          document.removeEventListener(event, handleUserActivity);
        });
      };
    };
    
    return setupActivityListeners();
  }, [refreshTimeout, isAuthenticated]);
  
  // Set up interval to check if the cookie has expired
  useEffect(() => {
    const checkAuthStatus = () => {
      if (!isAuthenticated()) {
        // Cookie has expired, log the user out
        logoutUser();
      }
    };
    
    // Check every minute
    const intervalId = setInterval(checkAuthStatus, 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated]);
  
  return {
    initAuthCookie,
    refreshTimeout,
    clearTimeout,
    isAuthenticated
  };
};

export default useAuthTimeout;