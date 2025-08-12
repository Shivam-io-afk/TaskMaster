import React, { useState, useEffect, useRef } from 'react';
import { useGlobalLoader } from '../context/LoaderContext';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/settings.css';
import { FaUser, FaBell, FaLock, FaPalette, FaLanguage, FaDatabase, FaCloudUploadAlt, FaInfoCircle, FaCheck, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaGear, FaMoon, FaSun } from 'react-icons/fa6';
import MainImg from '../images/profile.png';
// Import avatar images
import Boy1 from '../images/avatars/boy-1.png';
import Boy from '../images/avatars/boy.png';
import Girl1 from '../images/avatars/girl-1.png';
import Girl from '../images/avatars/girl.png';
import Man1 from '../images/avatars/man-1.png';
import Man2 from '../images/avatars/man-2.png';
import Man3 from '../images/avatars/man-3.png';
import Man4 from '../images/avatars/man-4.png';
import Man from '../images/avatars/man.png';

function Settings() {
    const { markDataLoaded, setContentReady } = useGlobalLoader();
    const { currentUser, userAvatar, setUserAvatar } = useAuth();
    const navigate = useNavigate();
    const [activeTheme, setActiveTheme] = useState('light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [language, setLanguage] = useState('english');
    const [primaryColor, setPrimaryColor] = useState('#f8980a');
    const [autoSave, setAutoSave] = useState(true);
    const [dataBackup, setDataBackup] = useState(false);
    const [userName, setUserName] = useState(currentUser?.displayName || 'Mr Profile');
    const [userEmail, setUserEmail] = useState(currentUser?.email || 'xyz@gmail.com');
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [autosaveActive, setAutosaveActive] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(userAvatar);
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    
    // Avatar options
    const avatarOptions = [
        { src: Boy1, alt: 'Boy 1' },
        { src: Boy, alt: 'Boy' },
        { src: Girl1, alt: 'Girl 1' },
        { src: Girl, alt: 'Girl' },
        { src: Man1, alt: 'Man 1' },
        { src: Man2, alt: 'Man 2' },
        { src: Man3, alt: 'Man 3' },
        { src: Man4, alt: 'Man 4' },
        { src: Man, alt: 'Man' },
        { src: MainImg, alt: 'Default' }
    ];
    
    // Store initial values to detect changes
    const initialValues = useRef({
        userName: currentUser?.displayName || 'Mr Profile',
        userEmail: currentUser?.email || 'xyz@gmail.com',
        activeTheme: 'light',
        notificationsEnabled: true,
        emailNotifications: true,
        soundEnabled: true,
        language: 'english',
        primaryColor: '#f8980a',
        autoSave: true,
        dataBackup: false,
        selectedAvatar: MainImg
    });
    
    // Handle logout
    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            setLoggingOut(false);
        }
    };

    // Mark component as loaded immediately
    useEffect(() => {
        // Mark data as loaded immediately instead of waiting
        markDataLoaded();
        setContentReady();
    }, [markDataLoaded, setContentReady]);
    
    // Reference to store the autosave timer
    const autosaveTimerRef = useRef(null);
    
    // Check for changes in any setting
    useEffect(() => {
        const currentValues = {
            userName,
            userEmail,
            activeTheme,
            notificationsEnabled,
            emailNotifications,
            soundEnabled,
            language,
            primaryColor,
            autoSave,
            dataBackup,
            selectedAvatar
        };
        
        // Compare current values with initial values
        const changed = Object.keys(currentValues).some(
            key => currentValues[key] !== initialValues.current[key]
        );
        
        setHasChanges(changed);
        
        // Clear any existing timer
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current);
            autosaveTimerRef.current = null;
        }
        
        // Set up autosave timer if changes are detected
        if (changed) {
            setAutosaveActive(true);
            autosaveTimerRef.current = setTimeout(() => {
                // Create a function that captures the current values
                const autoSaveFunction = () => {
                    // Update initial values to current values
                    initialValues.current = { ...currentValues };
                    
                    setProfileUpdated(true);
                    setHasChanges(false);
                    setAutosaveActive(false);
                    setTimeout(() => setProfileUpdated(false), 3000);
                    console.log('Settings autosaved after 2 minutes of inactivity');
                };
                
                autoSaveFunction();
            }, 2 * 60 * 1000); // 2 minutes in milliseconds
        } else {
            setAutosaveActive(false);
        }
        
        // Clear the timer when component unmounts
        return () => {
            if (autosaveTimerRef.current) {
                clearTimeout(autosaveTimerRef.current);
                autosaveTimerRef.current = null;
            }
        };
    }, [
        userName, userEmail, activeTheme, notificationsEnabled,
        emailNotifications, soundEnabled, language, primaryColor,
        autoSave, dataBackup, selectedAvatar
    ]);
    
    // Function to save all changes
    const saveChanges = () => {
        // Update initial values to current values
        initialValues.current = {
            userName,
            userEmail,
            activeTheme,
            notificationsEnabled,
            emailNotifications,
            soundEnabled,
            language,
            primaryColor,
            autoSave,
            dataBackup,
            selectedAvatar
        };
        
        // Clear any existing autosave timer when manually saving
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current);
            autosaveTimerRef.current = null;
        }
        
        setAutosaveActive(false);
        setProfileUpdated(true);
        setHasChanges(false);
        setTimeout(() => setProfileUpdated(false), 3000);
    };
    
    // Toggle avatar selector
    const toggleAvatarSelector = () => {
        setShowAvatarSelector(!showAvatarSelector);
    };
    
    // Handle avatar selection
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        setUserAvatar(avatar); // Update avatar in AuthContext
        setShowAvatarSelector(false);
    };

    // Color options for theme customization
    const colorOptions = [
        { color: '#f8980a', name: 'Orange' },
        { color: '#4CAF50', name: 'Green' },
        { color: '#2196F3', name: 'Blue' },
        { color: '#9C27B0', name: 'Purple' },
        { color: '#E91E63', name: 'Pink' }
    ];

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <div className="settings-header-actions">
                    {hasChanges && (
                        <div className="unsaved-changes">
                            <FaExclamationCircle size={16} />
                            <span>Unsaved changes</span>
                        </div>
                    )}
                    <FaGear size={24} color="#f8980a" />
                </div>
            </div>

            {/* Profile Section */}
            <div className="settings-section">
                <h2>Profile</h2>
                <div className="profile-info">
                    <img src={selectedAvatar} alt="Profile" className="profile-avatar" />
                    <div className="profile-details">
                        <h3>{userName}</h3>
                        <p>{userEmail}</p>
                        <div className="profile-actions">
                            {/* <button className="settings-button">Edit Profile</button> */}
                            <button className="settings-button secondary" onClick={toggleAvatarSelector}>
                                {showAvatarSelector ? 'Close' : 'Change Avatar'}
                            </button>
                        </div>
                    </div>
                </div>
                
                {showAvatarSelector && (
                    <div className="avatar-images">
                        {avatarOptions.map((avatar, index) => (
                            <div 
                                key={index} 
                                className={`avatar-option ${selectedAvatar === avatar.src ? 'selected' : ''}`}
                                onClick={() => handleAvatarSelect(avatar.src)}
                            >
                                <img src={avatar.src} alt={avatar.alt} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="settings-option">
                    <div className="option-label">
                        <FaUser className="icon" />
                        <div>
                            <h3>Username</h3>
                            {/* <p>Change your display name</p> */}
                        </div>
                    </div>
                    <input 
                        disabled
                        type="text" 
                        className="settings-input" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        style={{backgroundColor : "rgba(0,0,0,0.1", cursor: "not-allowed"}}
                    />
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaUser className="icon" />
                        <div>
                            <h3>Email</h3>
                            {/* <p>Update your email address</p> */}
                        </div>
                    </div>
                    <input 
                        disabled
                        type="email" 
                        className="settings-input" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        style={{backgroundColor : "rgba(0,0,0,0.1", cursor: "not-allowed"}}
                    />
                </div>


                  {/* <div className='avatar-images'> </div> */}
            </div>

            {/* Appearance Section */}
            <div className="settings-section">
                <h2>Appearance</h2>
                <div className="settings-option">
                    <div className="option-label">
                        <FaPalette className="icon" />
                        <div>
                            <h3>Theme</h3>
                            <p>Choose your preferred theme</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            className={`settings-button ${activeTheme === 'light' ? '' : 'secondary'}`}
                            onClick={() => setActiveTheme('light')}>
                            <FaSun style={{ marginRight: '5px' }} /> Light
                        </button>
                        <button 
                            className={`settings-button ${activeTheme === 'dark' ? '' : 'secondary'}`}
                            onClick={() => setActiveTheme('dark')}>
                            <FaMoon style={{ marginRight: '5px' }} /> Dark
                        </button>
                    </div>
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaLanguage className="icon" />
                        <div>
                            <h3>Language</h3>
                            <p>Select your preferred language</p>
                        </div>
                    </div>
                    <select 
                        className="settings-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="hindi">Hindi</option>
                    </select>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="settings-section">
                <h2>Notifications</h2>
                <div className="settings-option">
                    <div className="option-label">
                        <FaBell className="icon" />
                        <div>
                            <h3>Enable Notifications</h3>
                            <p>Receive notifications for tasks and updates</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}/>
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaBell className="icon" />
                        <div>
                            <h3>Email Notifications</h3>
                            <p>Receive email notifications</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            disabled={!notificationsEnabled}/>
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaBell className="icon" />
                        <div>
                            <h3>Sound Effects</h3>
                            <p>Enable sound for notifications</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={soundEnabled}
                            onChange={() => setSoundEnabled(!soundEnabled)}
                            disabled={!notificationsEnabled}/>
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {/* Data & Privacy Section */}
            <div className="settings-section">
                <h2>Data & Privacy</h2>

                {/* <div className="settings-option">
                    <div className="option-label">
                        <FaLock className="icon" />
                        <div>
                            <h3>Change Password</h3>
                            <p>Update your account password</p>
                        </div>
                    </div>
                    <button className="settings-button">Change Password</button>
                </div> */}
                
                <div className="settings-option">
                    <div className="option-label">
                        <FaDatabase className="icon" />
                        <div>
                            <h3>Auto-Save</h3>
                            <p>Automatically save your changes</p>
                        </div>
                    </div>
                    <label className="toggle-switch disable-switch">
                        <input 
                            type="checkbox" 
                            checked={autoSave}
                            onChange={() => setAutoSave(!autoSave)}
                            disabled
                            style={{cursor: 'not-allowed'}}
                            />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaCloudUploadAlt className="icon" />
                        <div>
                            <h3>Data Backup</h3>
                            <p>Backup your data to cloud storage</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={dataBackup}
                            onChange={() => setDataBackup(!dataBackup)}/>
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {/* About Section */}
            <div className="settings-section">
                <h2>About</h2>
                <div className="settings-option">
                    <div className="option-label">
                        <FaInfoCircle className="icon" />
                        <div>
                            <h3>Version</h3>
                            <p>TaskMate v1.0.0</p>
                        </div>
                    </div>
                </div>
                <div className="settings-option">
                    <div className="option-label">
                        <FaInfoCircle className="icon" />
                        <div>
                            <h3>Help & Support</h3>
                            <p>Get help with TaskMate</p>
                        </div>
                    </div>
                    <button className="settings-button">Contact Support</button>
                </div>
            </div>
            
            {/* Account Section */}
            <div className="settings-section">
                <h2>Account</h2>
                <div className="settings-option">
                    <div className="option-label">
                        <FaSignOutAlt className="icon" style={{ color: '#f44336' }} />
                        <div>
                            <h3>Logout</h3>
                            <p>Sign out of your account</p>
                        </div>
                    </div>
                    <button 
                        className="settings-button" 
                        style={{ backgroundColor: '#f44336', color: 'white' }}
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </div>
            
            {/* Global Save Button */}
            <div className="settings-section global-save-section">
                <div className="settings-option profile-save">
                    <button 
                        className={`settings-button save-profile-btn ${!hasChanges ? 'disabled' : ''}`}
                        onClick={saveChanges}
                        disabled={!hasChanges}
                    >
                        <FaCheck style={{ marginRight: '5px' }} /> Save All Changes
                    </button>
                    {profileUpdated && <span className="profile-updated-message">Settings updated successfully!</span>}
                    {autosaveActive && <span className="autosave-active-message">autosaved in 2 minutes </span>}
                </div>
            </div>
        </div>
    );
}

export default Settings;