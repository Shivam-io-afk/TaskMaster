import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { showAlert } from '../utils/errorUtils';
import { 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  signInWithGoogle, 
  resetPassword,
  updateUserProfile
} from '../firebase/auth';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: ''
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculatePasswordStrength = (password) => {
    // Initialize score
    let score = 0;
    let message = '';
    let color = '';
    
    // Empty password
    if (!password) {
      return { score: 0, message: '', color: '' };
    }
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1; 
    if (/[a-z]/.test(password)) score += 1; 
    if (/[0-9]/.test(password)) score += 1; 
    if (/[^A-Za-z0-9]/.test(password)) score += 1; 
    
    // Pass Strength 
    if (score === 0) {
      message = 'Very Weak';
      color = '#ff4d4d'; 
    } else if (score <= 2) {
      message = 'Weak';
      color = '#ffa64d'; 
    } else if (score <= 4) {
      message = 'Medium';
      color = '#e6b800'; 
    } else if (score <= 5) {
      message = 'Strong';
      color = '#4dff4d'; 
    } else {
      message = 'Very Strong';
      color = '#00cc00'; 
    }
    
    return { score, message, color };
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', loginData);
    
    if (!loginData.email || !loginData.password) {
      showAlert('Please enter both email and password', 'error');
      return;
    }
    
    try {
      // Attempt to login with Firebase
      const user = await loginWithEmailAndPassword(loginData.email, loginData.password);
      showAlert('Login successful!', 'success');
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Login error:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        showAlert('User not registered', 'error');
        const createAccount = window.confirm('Would you like to create a new account with this email?');
        if (createAccount) {
          setSignupData(prevState => ({
            ...prevState,
            email: loginData.email
          }));
          setActiveTab('signup');
          showAlert('Please complete the signup form to create your account', 'info');
        }
      } else if (error.code === 'auth/too-many-requests') {
        showAlert('Too many failed login attempts.try again later.', 'error');
      } else {
        showAlert('User not registered', 'error');
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      showAlert('Passwords do not match!', 'error');
      return;
    }
    
    // Validate password strength
    if (passwordStrength.score < 3) {
      showAlert('Please create a stronger password.', 'warning');
      return;
    }
    
    try {
      // Register user with Firebase
      const user = await registerWithEmailAndPassword(signupData.email, signupData.password);
      
      // Update user profile with name
      await updateUserProfile(user, { displayName: signupData.name });
      
      console.log('Signup successful:', user);
      showAlert('Account created successfully!', 'success');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        showAlert('Email is already in use.', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showAlert('User not registered', 'error');
      } else if (error.code === 'auth/weak-password') {
        showAlert('Password is too weak. ', 'warning');
      } else {
        showAlert(`Signup failed: ${error.message}`, 'error');
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      showAlert('Please enter your email address', 'error');
      return;
    }
    
    try {
      // Configure password reset options
      const resetOptions = {
        // Redirect back to the login page after password reset
        redirectUrl: `${window.location.origin}`,
        // Try to handle the password reset in the app if possible
        handleCodeInApp: true
      };
      
      // Send password reset email with Firebase using enhanced options
      await resetPassword(forgotPasswordEmail, resetOptions);
      console.log('Password reset requested for:', forgotPasswordEmail);
      showAlert(`Reset link Sent Please check your email inbox.`, 'info');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        // For security reasons, we still show success message even if email doesn't exist
        showAlert(`If an account exists, reset link has been sent.`, 'info');
        setShowForgotPassword(false);
        setForgotPasswordEmail('');
      } else if (error.code === 'auth/invalid-email') {
        showAlert('Invalid email address format', 'error');
      } else if (error.code === 'auth/missing-continue-uri') {
        showAlert('Configuration error. Please contact support.', 'error');
      } else if (error.code === 'auth/invalid-continue-uri') {
        showAlert('Configuration error. Please contact support.', 'error');
      } else {
        showAlert(`Failed to send reset email: ${error.message}`, 'error');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Set loading state to true
      setIsGoogleLoading(true);
      // Show info message
      showAlert('Google authentication in progress...', 'info');
      console.log('Google login attempted');
      
      // Sign in with Google using Firebase
      const result = await signInWithGoogle();
      console.log('Google login successful:', result);
      
      // Check if this is a new user (metadata.creationTime === metadata.lastSignInTime)
      // This is an approximate way to detect new users
      const isNewUser = result.metadata && 
                        result.metadata.creationTime && 
                        result.metadata.lastSignInTime && 
                        result.metadata.creationTime === result.metadata.lastSignInTime;
      
      if (isNewUser) {
        showAlert('Account created successfully!', 'success');
      } else {
        showAlert('Welcome back!.', 'success');
      }
    } catch (error) {
      console.error('Google login error:', error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        showAlert('Google sign-in cancelled.', 'info');
      } else if (error.code === 'auth/popup-blocked') {
        showAlert('Google sign-in popup blocked. Please allow it.', 'warning');
      } else {
        showAlert(`Google login failed: ${error.message}`, 'error');
      }
    } finally {
      // Set loading state back to false when done
      setIsGoogleLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="login-container">
        <form onSubmit={handleForgotPasswordSubmit} className="login-form">
          <h2>Reset Password</h2>
          <p className="form-description">Enter your email address and we'll send you a link to reset your password.</p>
          <div className="form-group">
            <label htmlFor="forgotPasswordEmail">Email:</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="forgotPasswordEmail"
                name="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          <button type="submit" className="primary-button">Send Reset Link</button>
          <div className="password-reset-info">
            <p><small>After submitting, you will receive an email with a password reset link.</small></p>
            <p><small>Click the link in the email to set a new password.</small></p>
          </div>
          <div className="form-footer">
            <button 
              type="button" 
              className="text-button"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="auth-form-container">
        <div className="auth-tabs">
          <button 
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Create Account
          </button>
        </div>
        
          {/* <div className="auth-description">
            {activeTab === 'login' ? (
              <p>Sign in to your account or create a new one if you don't have an account yet.</p>
            ) : (
              <p>Create a new account to get started with TaskMate.</p>
            )}
          </div> */}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <h2>Welcome Back</h2>
            <div className="social-login">
              <button 
                type="button" 
                className="google-button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <span style={{ marginLeft: '10px' }}>Connecting...</span>
                ) : (
                  <> 
                    <FaGoogle /> Continue with Google
                  </>
                )}
              </button>
            </div>
            <div className="divider">
              <span>or</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="Enter your email"
                />
              </div>  
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="forgot-password">
              <button 
                type="button" 
                className="text-button"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="primary-button">Login</button>
            <div className="form-footer">
              <p>Don't have an account yet?</p>
              <button 
                type="button" 
                className="text-button"
                onClick={() => setActiveTab('signup')}
              >
                Create a new account
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="login-form">
            <h2>Create Account</h2>
            <div className="social-login">
              <button 
                type="button" 
                className="google-button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <span style={{ marginLeft: '10px' }}>Connecting...</span>
                ) : (
                  <>
                    <FaGoogle /> Sign up with Google
                  </>
                )}
              </button>
            </div>
            <div className="divider">
              <span>or</span>
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="signupEmail">Email:</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="signupPassword">Password:</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showSignupPassword ? "text" : "password"}
                  id="signupPassword"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                  placeholder="Create a password"
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  aria-label={showSignupPassword ? "Hide password" : "Show password"}
                >
                  {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {signupData.password && (
                <div className="password-strength-container">
                  <div className="password-strength-bar">
                    <div 
                      className="password-strength-indicator" 
                      style={{
                        width: `${(passwordStrength.score / 6) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    ></div>
                  </div>
                  <div className="password-strength-text" style={{ color: passwordStrength.color }}>
                    {passwordStrength.message}
                  </div>
                  <div className="password-requirements">
                    <small>
                      Password should contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                    </small>
                  </div>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  required
                  placeholder="Confirm your password"
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
            <button type="submit" className="primary-button">Create Account</button>
            <div className="form-footer">
              <p>Already have an account?</p>
              <button 
                type="button" 
                className="text-button"
                onClick={() => setActiveTab('login')}
              >
                Login to your account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
