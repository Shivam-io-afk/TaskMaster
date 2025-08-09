import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { showAlert } from '../utils/errorUtils';
import '../styles/LoginPage.css';

const PasswordResetHandler = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oobCode, setOobCode] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  
  // Extract the action code from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');
    
    if (!code) {
      setError('Invalid password reset link. Please request a new one.');
      setIsVerifying(false);
      return;
    }
    
    setOobCode(code);
    
    // Verify the password reset code
    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setEmail(email);
        setIsVerifying(false);
      })
      .catch((error) => {
        console.error('Error verifying reset code:', error);
        setError('This password reset link is invalid or has expired. Please request a new one.');
        setIsVerifying(false);
      });
  }, [location, auth]);
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      showAlert('Passwords do not match!', 'error');
      return;
    }
    
    if (newPassword.length < 8) {
      showAlert('Password must be at least 8 characters long', 'error');
      return;
    }
    
    setIsResetting(true);
    
    try {
      // Complete the password reset process
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsComplete(true);
      showAlert('Your password has been reset successfully!', 'success');
    } catch (error) {
      console.error('Error resetting password:', error);
      
      if (error.code === 'auth/weak-password') {
        showAlert('Please choose a stronger password', 'error');
      } else if (error.code === 'auth/expired-action-code') {
        showAlert('This password reset link has expired. Please request a new one.', 'error');
      } else if (error.code === 'auth/invalid-action-code') {
        showAlert('This password reset link is invalid. Please request a new one.', 'error');
      } else {
        showAlert(`Failed to reset password: ${error.message}`, 'error');
      }
    } finally {
      setIsResetting(false);
    }
  };
  
  const handleReturnToLogin = () => {
    navigate('/');
  };
  
  if (isVerifying) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Verifying Reset Link</h2>
          <p>Please wait while we verify your password reset link...</p>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Reset Link Error</h2>
          <p className="error-message">{error}</p>
          <button 
            className="primary-button"
            onClick={handleReturnToLogin}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  if (isComplete) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Password Reset Complete</h2>
          <p>Your password has been reset successfully.</p>
          <button 
            className="primary-button"
            onClick={handleReturnToLogin}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="login-container">
      <form onSubmit={handlePasswordReset} className="login-form">
        <h2>Reset Your Password</h2>
        <p className="form-description">Create a new password for <strong>{email}</strong></p>
        
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              minLength="8"
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-requirements">
            <small>
              Password should contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
            </small>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              minLength="8"
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="primary-button"
          disabled={isResetting}
        >
          {isResetting ? 'Resetting Password...' : 'Reset Password'}
        </button>
        
        <div className="form-footer">
          <button 
            type="button" 
            className="text-button"
            onClick={handleReturnToLogin}
          >
            Return to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetHandler;