import '../styles/sideBar.css';
import MainImg from '../images/profile.png';
import HanuJi from '../images/profile.png';
import { FaAngleDown, FaAngleUp, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaLayerGroup } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { FaListUl, FaSun, FaMoon } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa6';
import { FaTags } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/activeNav.css';
import { useState, useRef, useEffect } from 'react';

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
    
    //ref for the profile dropdown container
    const profileDropdownRef = useRef(null);

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
            setNewTagName('');
            setIsAddingTag(false);
        }
    };

    const handleEditTag = (index) => {
        if (newTagName.trim() && !tags.includes(newTagName)) {
            const updatedTags = [...tags];
            updatedTags[index] = newTagName;
            setTags(updatedTags);
            setEditingTag(null);
            setNewTagName('');
        }
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
            <div className={showListsUsers === 1 ? 'container_scnd rem' : 'container_scnd'} ref={profileDropdownRef}>
                <div className='box'>
                    <img src={MainImg} alt='' />
                    <span>
                        <p>Mr Profile
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
                        <p>xyz@gmail.com</p>
                    </span>
                </div>

                {showListsUsers === 1 && (
                    <div className='userLists'>
                        <div className='box'>
                            <img src={HanuJi} alt='' />
                            <span>
                                <p>Profile - 1</p>
                                <p>xyz@gmail.com</p>
                            </span>
                        </div>
                        <div className='box'>
                            <img src={HanuJi} alt='' />
                            <span>
                                <p>Profile - 2</p>
                                <p>xyz@gmail.com</p>
                            </span>
                        </div>
                        <div className='box'>
                            <img src={HanuJi} alt='' />
                            <span>
                                <p>Profile - 3</p>
                                <p>xyz@gmail.com</p>
                            </span>
                        </div>

                        <div className='box last_li' onClick={() => setshowListsUsers(0)}>
                            <FaPlus className='icns'/>
                            <span>
                                <p>Add More</p>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Rest of your component remains the same */}
            <div className='container_thrd'>
                <h3>Menu</h3>
                <div className='options'>
                    <NavLink to={'/home'}>
                        <li className=''>
                            <FaWindows className='incs' />
                            <span>Overview</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/private'}>
                        <li>
                            <FaListUl className='incs' />
                            <span>Personal List</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/prvtask'}>
                        <li>
                            <FaNetworkWired className='incs' />
                            <span>Project Overview</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/'}>
                        <li>
                            <FaLayerGroup className='incs' />
                            <span>Mate AI</span>
                        </li>
                    </NavLink>
                    <li><FaGear className='incs' /><span>Settings</span></li>
                </div>
            </div>

            <div className='container_frth'>
                <h3>
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

            <div className='buttons_cntr'>
                <li><FaSun className='icns' />Light</li>
                <li><FaMoon className='icns' />Dark</li>
                <li className='active'></li>
            </div>
        </div>
    )
}

export default SideBar;