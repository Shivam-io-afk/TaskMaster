import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCookie } from '../utils/cookieUtils';
import { logoutUser } from '../firebase/auth';
import { showAlert } from '../utils/errorUtils';

const SessionTimeout = () => {
  const { currentUser } = useAuth();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [warningShown, setWarningShown] = useState(false);
  const timeoutMinutes = 10; // 10 minutes timeout
  const warningMinutes = 1; // Show warning 1 minute before timeout
  
  // Reset activity timer on user interactions
  useEffect(() => {
    if (!currentUser) return;
    
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const updateActivity = () => {
      setLastActivity(Date.now());
      setWarningShown(false);
    };
    
    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, updateActivity);
    });
    
    // Remove event listeners on cleanup
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [currentUser]);
  
  // Check for session timeout
  useEffect(() => {
    if (!currentUser) return;
    
    const intervalId = setInterval(() => {
      const authCookie = getCookie('auth_session');
      
      // If cookie is gone, logout immediately
      if (!authCookie) {
        logoutUser();
        return;
      }
      
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      const timeoutMs = timeoutMinutes * 60 * 1000;
      const warningMs = (timeoutMinutes - warningMinutes) * 60 * 1000;
      
      // Show warning when approaching timeout
      if (timeSinceLastActivity > warningMs && !warningShown) {
        showAlert(`Your session will expire in ${warningMinutes} minute${warningMinutes !== 1 ? 's' : ''}. Activity will keep you logged in.`, 'warning');
        setWarningShown(true);
      }
      
      // Logout when timeout is reached
      if (timeSinceLastActivity > timeoutMs) {
        showAlert('Your session has expired due to inactivity.', 'info');
        logoutUser();
      }
    }, 30000); // Check every 30 seconds
    
    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser, lastActivity, warningShown]);
  
  // This component doesn't render anything
  return null;
};

export default SessionTimeout;