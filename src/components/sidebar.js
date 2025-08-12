import '../styles/sideBar.css';
import { FaAngleDown, FaAngleUp, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaLayerGroup } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa6';
import { FaTags } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/activeNav.css';
import { useState, useRef, useEffect } from 'react';
import { useGlobalLoader } from '../context/LoaderContext';
import { useAuth } from '../context/AuthContext';

function SideBar() {
    const [showLists, setshowLists] = useState(1);
    const [showListsUsers, setshowListsUsers] = useState(0);
    const [tags, setTags] = useState([
        'Personal',
        'Design',
        'Development',
        'Research'
    ]);
    const [editingTag, setEditingTag] = useState(null);
    const [newTagName, setNewTagName] = useState('');
    const [isAddingTag, setIsAddingTag] = useState(false);
    
    // Get loader functions
    const { markDataLoaded, setContentReady } = useGlobalLoader();
    
    // Get current user from auth context
    const { currentUser, userAvatar } = useAuth();
    
    //ref for the profile dropdown container
    const profileDropdownRef = useRef(null);

    // Mark sidebar as loaded when component mounts
    useEffect(() => {
        // Mark data as loaded after a short delay to ensure loader is visible
        const timeout = setTimeout(() => {
            markDataLoaded();
            setContentReady();
        }, 1000);
        
        return () => clearTimeout(timeout);
    }, [markDataLoaded, setContentReady]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setshowListsUsers(0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddTag = () => {
        if (newTagName.trim() && !tags.includes(newTagName)) {
            setTags([...tags, newTagName]);
        }
        setNewTagName('');
        setIsAddingTag(false);
    };

    const handleEditTag = (index) => {
        if (newTagName.trim() && !tags.includes(newTagName)) {
            const updatedTags = [...tags];
            updatedTags[index] = newTagName;
            setTags(updatedTags);
        }
        setEditingTag(null);
        setNewTagName('');
    };

    const handleDeleteTag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    return (
        <div className="mainContainer">
            <div className='container_fr'>
                <h1><span style={{ color: "#f8980a", fontWeight: "600" }}>Task</span><b>mate</b></h1>
                <div>
                    <span>Focus</span>
                    <span>Prioritize</span>
                    <span>Execute</span>
                </div>
            </div>
            
            {/* Added ref to the profile dropdown container */}
            <div
                className={showListsUsers === 1 ? 'container_scnd rem' : 'container_scnd'}
                ref={profileDropdownRef}
                onClick={(e) => {
                    // Prevent toggle if clicking the arrow icons
                    if (
                        e.target.classList.contains('icns') ||
                        e.target.closest('.icns')
                    ) return;
                    setshowListsUsers(showListsUsers === 1 ? 0 : 1);
                }}>
                <div className='box'>
                    <img src={userAvatar} alt='' />
                    <span>
                        <p>{currentUser?.displayName || 'User Profile'}
                            {
                                showListsUsers === 1 ?
                                    <FaAngleUp
                                        className='icns'
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => setshowListsUsers(0)}
                                    /> :
                                    <FaAngleDown
                                        className='icns'
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => setshowListsUsers(1)}
                                        tabIndex="0" // Make it focusable
                                    />
                            }
                        </p>
                        <p>{currentUser?.email || 'Not signed in'}</p>
                    </span>
                </div>

                {showListsUsers === 1 && (
                    <div className='userLists'>
                        <div className='box'>
                            <img src={userAvatar} alt='' />
                            <span>
                                <p>{currentUser?.displayName || 'User Profile'}</p>
                                <p>{currentUser?.email || 'Not signed in'}</p>
                            </span>
                        </div>

                        <div className='box last_li' onClick={() => setshowListsUsers(0)}>
                            <FaGear className='icns'/>
                            <span>
                                <p>Account Settings</p>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Rest of your component remains the same */}
            <div className='container_thrd'>
                <h3>Menu</h3>
                <div className='options'>
                    <NavLink to={'/'}>
                        <li className=''>
                            <FaWindows className='incs' />
                            <span>Overview</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/Personal'}> 
                    {/* private */}
                        <li>
                            <FaListUl className='incs' />
                            <span>Personal List</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/Projects'}>
                        <li>
                            <FaNetworkWired className='incs' />
                            <span>Project Overview</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/More'}>
                        <li>
                            <FaLayerGroup className='incs' />
                            <span>Mate AI</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/Settings'}>
                        <li>
                            <FaGear className='incs' />
                            <span>Settings</span>
                        </li>
                    </NavLink>
                </div>
            </div>

            <div className='container_frth'>
                <h3
                    onClick={e => {
                        // Prevent toggle if clicking the arrow icons
                        if (
                            e.target.classList.contains('icns') ||
                            e.target.closest('.icns')
                        ) return;
                        setshowLists(showLists === 1 ? 0 : 1);
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    Tags {showLists === 1 ? 
                        <FaAngleUp className='icns' onClick={() => setshowLists(0)} /> : 
                        <FaAngleDown className='icns' onClick={() => setshowLists(1)} />
                    }
                </h3>
                {showLists === 1 && (
                    <div className='options'>
                        {tags.map((tag, index) => (
                            <li key={index}>
                                <FaTags className='incs' />
                                {editingTag === index ? (
                                    <input
                                        type="text"
                                        value={newTagName}
                                        onChange={(e) => setNewTagName(e.target.value)}
                                        onBlur={() => handleEditTag(index)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleEditTag(index)}
                                        autoFocus
                                        className="tag-input"
                                    />
                                ) : (
                                    <div className="tag-content">
                                        <span>{tag}</span>
                                        <div className="tag-actions">
                                            <FaEdit 
                                                className="edit-icon" 
                                                onClick={() => {
                                                    setNewTagName(tag);
                                                    setEditingTag(index);
                                                }} 
                                            />
                                            <FaTrash 
                                                className="delete-icon" 
                                                onClick={() => handleDeleteTag(index)} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                        {isAddingTag ? (
                            <li>
                                <FaTags className='incs' />
                                <input
                                    type="text"
                                    placeholder="New tag name"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onBlur={handleAddTag}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag}
                                    autoFocus
                                    className="tag-input"
                                />
                            </li>
                        ) : (
                            <li 
                                className="add-tag" 
                                onClick={() => {
                                    setIsAddingTag(true);
                                    setNewTagName('');
                                }}
                            >
                                <FaPlus className='incs' />
                                <span>Add Tag</span>
                            </li>
                        )}
                    </div>
                )}
            </div>

            {/*  this featur for future version  */}

            {/* <div className='buttons_cntr'>
                <li><FaSun className='icns' />Light</li>
                <li><FaMoon className='icns' />Dark</li>
                <li className='active'></li>
            </div> */}
        </div>
    )
}

export default SideBar;