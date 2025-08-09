import React from 'react';
import { showAlert } from '../../utils/errorUtils';

const AlertExample = () => {
  // Examples of how to use the showAlert function
  const showErrorAlert = () => {
    showAlert('This is an error message!', 'error');
  };

  const showSuccessAlert = () => {
    showAlert('Success! Your action was completed.', 'success');
  };

  const showInfoAlert = () => {
    showAlert('Info: This is an important update.', 'info');
  };

  const showWarningAlert = () => {
    showAlert('Warning! Check your input again.', 'warning');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Alert Examples</h2>
      <p>Click the buttons below to see different types of alerts:</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={showErrorAlert}
          style={{ padding: '8px 16px', background: '#f1746b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Error
        </button>
        
        <button 
          onClick={showSuccessAlert}
          style={{ padding: '8px 16px', background: '#77de7b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Success
        </button>
        
        <button 
          onClick={showInfoAlert}
          style={{ padding: '8px 16px', background: '#7cbdf2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Info
        </button>
        
        <button 
          onClick={showWarningAlert}
          style={{ padding: '8px 16px', background: '#f1c17a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Warning
        </button>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>How to Use in Your Code:</h3>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflowX: 'auto' }}>
          {`// Import the showAlert function
import { showAlert } from '../../utils/errorUtils';

// Then use it to display alerts
showAlert('Your message here', 'error'); // Types: error, success, info, warning`}
        </pre>
      </div>
    </div>
  );
};

export default AlertExample;