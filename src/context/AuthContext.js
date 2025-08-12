import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthTimeout from '../hooks/useAuthTimeout';
import MainImg from '../images/profile.png';

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
  const [userAvatar, setUserAvatar] = useState(() => {
    // Try to get saved avatar from localStorage
    if (currentUser?.email) {
      const savedAvatar = localStorage.getItem(`avatar_${currentUser.email}`);
      return savedAvatar || MainImg;
    }
    return MainImg;
  });
  const { initAuthCookie, clearTimeout } = useAuthTimeout(10); // 10 minutes timeout

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        // User is signed in, initialize the auth cookie
        initAuthCookie();
        
        // Load saved avatar from localStorage
        const savedAvatar = localStorage.getItem(`avatar_${user.email}`);
        if (savedAvatar) {
          setUserAvatar(savedAvatar);
        } else {
          // If no saved avatar for this user, reset to default
          setUserAvatar(MainImg);
        }
      } else {
        // User is signed out, clear the auth cookie and reset avatar to default
        clearTimeout();
        setUserAvatar(MainImg);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [initAuthCookie, clearTimeout]);
  
  // Custom function to update avatar and save to localStorage
  const updateUserAvatar = (avatarSrc) => {
    setUserAvatar(avatarSrc);
    
    // Save to localStorage if user is logged in
    if (currentUser?.email) {
      localStorage.setItem(`avatar_${currentUser.email}`, avatarSrc);
    }
  };

  // Value object that will be passed to any consuming components
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userAvatar,
    setUserAvatar: updateUserAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (typeof children === 'function' ? children(value) : children)}
    </AuthContext.Provider>
  );
};