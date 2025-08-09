import React from 'react';
import { createRoot } from 'react-dom/client';
import ShowAlert from '../components/ErrIndic';

/**
 * A utility function to display alerts using the ErrIndic component
 * @param {string} message - The message to display in the alert
 * @param {string} type - The type of alert: "error", "success", "info", or "warning"
 */
export const showAlert = (message, type = "error") => {
  // Create a div element to render the alert
  const alertContainer = document.createElement('div');
  
  // Add a class to the container for positioning context
  alertContainer.className = 'alert-container';
  
  // Append to body
  document.body.appendChild(alertContainer);
  
  const root = createRoot(alertContainer);
  
  // Render the ShowAlert component
  root.render(<ShowAlert type={type} message={message} />);
  
  // Remove the container after the alert animation completes (4 seconds)
  setTimeout(() => {
    root.unmount();
    document.body.removeChild(alertContainer);
  }, 4000);
};

export default showAlert;