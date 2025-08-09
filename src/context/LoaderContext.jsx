import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';

const LoaderContext = createContext();

export const useGlobalLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useGlobalLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  // Modified loading states - removed dependencies on scripts and images
  const [loadingStates, setLoadingStates] = useState({
    initialLoad: true,
    componentsMounted: false,
    dataLoaded: false
  });

  const [isLoading, setIsLoading] = useState(true);
  
  // State to track if essential content is ready to show
  const [essentialContentReady, setEssentialContentReady] = useState(false);

  // Check if all loading states are complete
  const checkAllLoaded = useCallback(() => {
    // Check if essential content is ready or if all states are loaded
    const allLoaded = Object.values(loadingStates).every(state => state === true);
    const shouldShowContent = essentialContentReady && allLoaded; // Changed from OR to AND to ensure all states are loaded
    
    // Hide loader when essential content is ready AND everything is loaded
    setIsLoading(!shouldShowContent);
  }, [loadingStates, essentialContentReady]);

  // Safety timeout to ensure loader eventually completes - increased to 2000ms
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      // Force all loading states to complete after a maximum time
      setLoadingStates({
        initialLoad: true,
        componentsMounted: true,
        dataLoaded: true
      });
    }, 2000); // 2000ms maximum loading time
    
    return () => clearTimeout(safetyTimeout);
  }, []);

  // Update loading states
  const updateLoadingState = useCallback((key, value) => {
    setLoadingStates(prev => {
      const newStates = { ...prev, [key]: value };
      return newStates;
    });
  }, []);

  // Set essential content ready after a reasonable loading time
  useEffect(() => {
    // Show content after a reasonable delay (1000ms) to ensure scripts have time to load
    const timeout = setTimeout(() => {
      setEssentialContentReady(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // We're not tracking image loading anymore as we want to show content without waiting for images
  // Images will load in the background while content is already visible

  // Track component mounting - increased time to 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateLoadingState('componentsMounted', true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [updateLoadingState]);

  // Track initial load - increased time to 800ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateLoadingState('initialLoad', true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [updateLoadingState]);

  // Check if all loading is complete
  useEffect(() => {
    checkAllLoaded();
  }, [loadingStates, checkAllLoaded]);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withGlobalLoader = useCallback(async (operation) => {
    try {
      showLoader();
      const result = await operation();
      return result;
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  const markDataLoaded = useCallback(() => {
    updateLoadingState('dataLoaded', true);
  }, [updateLoadingState]);

  // Function to manually set essential content ready
  const setContentReady = useCallback(() => {
    setEssentialContentReady(true);
  }, []);

  return (
    <LoaderContext.Provider value={{ 
      isLoading, 
      showLoader, 
      hideLoader, 
      withGlobalLoader,
      markDataLoaded,
      loadingStates,
      setContentReady,
      essentialContentReady
    }}>
      {children}
      <Loader loading={isLoading} />
    </LoaderContext.Provider>
  );
};