import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthTimeout from '../hooks/useAuthTimeout';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { initAuthCookie, clearTimeout } = useAuthTimeout(10); // 10 minutes timeout

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        // User is signed in, initialize the auth cookie
        initAuthCookie();
      } else {
        // User is signed out, clear the auth cookie
        clearTimeout();
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [initAuthCookie, clearTimeout]);

  // Value object that will be passed to any consuming components
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (typeof children === 'function' ? children(value) : children)}
    </AuthContext.Provider>
  );
};