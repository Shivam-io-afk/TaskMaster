import React from 'react';
import { RiseLoader } from 'react-spinners';
import { useGlobalLoader } from '../context/LoaderContext';
import '../styles/loader.css';

/**
 * Enhanced Loader Component
 * 
 * This loader shows comprehensive loading progress including:
 * - Initial page load
 * - Script loading (Three.js, Vanta.js)
 * - Component mounting
 * - Image loading
 * - Data preparation
 * 
 * Usage:
 * The loader is automatically managed by the LoaderProvider context.
 * Components can mark themselves as loaded using the markDataLoaded function.
 */
const Loader = ({ loading = true, size = 15, color = "#000" }) => {
  const { loadingStates } = useGlobalLoader();
  
  if (!loading) return null;

  // Calculate loading progress
  const totalStates = Object.keys(loadingStates).length;
  const completedStates = Object.values(loadingStates).filter(state => state === true).length;
  // Calculate progress more gradually to ensure loader is visible
  const progress = Math.min(100, Math.round((completedStates / totalStates) * 100));

  // Get loading message based on current state
  const getLoadingMessage = () => {
    if (!loadingStates.initialLoad) return "Initializing application...";
    if (!loadingStates.componentsMounted) return "Setting up components...";
    if (!loadingStates.dataLoaded) return "Preparing data...";
    return "Almost ready...";
  };

  return (
    <div className="loader-overlay">
        <div className="loader-container">
          <RiseLoader
            className='loader'
            color={color}
            size={size}
            loading={loading}
            aria-label="Loading Spinner"
          />

        <div className="loader-text">
          <p className="loader-subtitle">{getLoadingMessage()}</p>
          <div className="loader-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;