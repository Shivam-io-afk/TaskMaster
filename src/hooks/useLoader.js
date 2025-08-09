import { useState, useCallback, useEffect } from 'react';
import { useGlobalLoader } from '../context/LoaderContext';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { markDataLoaded, setContentReady } = useGlobalLoader();

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoader = useCallback(async (operation) => {
    try {
      startLoading();
      const result = await operation();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  // Mark data as loaded when component finishes loading
  const markComponentLoaded = useCallback(() => {
    markDataLoaded();
    setContentReady(); // Also mark essential content as ready
  }, [markDataLoaded, setContentReady]);

  // Mark content as ready immediately and data as loaded when component unmounts
  useEffect(() => {
    // Mark content as ready immediately when component mounts
    setContentReady();
    
    return () => {
      markComponentLoaded();
    };
  }, [markComponentLoaded, setContentReady]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoader,
    markComponentLoaded
  };
};

export default useLoader;