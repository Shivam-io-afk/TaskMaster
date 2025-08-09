import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SideBar from './components/sidebar';
import LoginPage from './components/LoginPage.js';
import PasswordResetHandler from './components/PasswordResetHandler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      {({ currentUser, isAuthenticated }) => (
        <Routes>
          {/* Public route for password reset that doesn't require authentication */}
          <Route path="/reset-password" element={<PasswordResetHandler />} />
          
          {/* All other routes */}
          <Route path="*" element={
            isAuthenticated ? (
              <LoaderProvider>
                <div className='main'>
                  <SideBar />
                  <App />
                </div>
              </LoaderProvider>
            ) : (
              <LoginPage />
            )
          } />
        </Routes>
      )}
    </AuthProvider>
  </Router>
);


const KeyControlPreven = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); 
    }
  });
};

KeyControlPreven();