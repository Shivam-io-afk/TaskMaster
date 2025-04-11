import '../styles/sideBar.css';
import MainImg from '../images/profile.png';
import HanuJi from '../images/profile.png';
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaLayerGroup } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { FaListUl, FaSun, FaMoon } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa6';
import { FaTags } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/activeNav.css';
import { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';



function SideBar() {


    const [showLists, setshowLists] = useState(1);
    const [showListsUsers, setshowListsUsers] = useState(0);



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
            <div className={showListsUsers === 1 ? 'container_scnd rem' : 'container_scnd'} >
                <div className='box'>
                    <img src={MainImg} alt='' />
                    <span>
                        <p>Mr Profile
                            {
                                showListsUsers === 1 ? <FaAngleUp className='icns' style={{ marginLeft: "10px" }} onClick={() => setshowListsUsers(0)} /> :
                                <FaAngleDown className='icns' style={{ marginLeft: "10px" }} onClick={() => setshowListsUsers(1)} />
                            }
                        </p>
                        <p>xyz@gmail.com</p>
                    </span>
                </div>


                {
                    showListsUsers === 1 ?
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

                            <div className='box'>
                                <FaPlus/>
                                <span>
                                    <p>Add More</p>
                                </span>
                            </div>

                        </div>
                        :
                        null
                }



            </div>
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
                            <span>More</span>
                        </li>
                    </NavLink>
                    <li><FaGear className='incs' /><span>Settings</span></li>
                </div>
            </div>



            <div className='container_frth'>
                <h3>Tags {showLists === 1 ? <FaAngleUp className='icns' onClick={() => setshowLists(0)} /> : 
                        <FaAngleDown className='icns' onClick={() => setshowLists(1)} />
                    }
                </h3>
                {
                    showLists === 1 ?
                        <div className='options'>
                            <li><FaTags className='incs' /> Personal</li>
                            <li><FaTags className='incs' /> Design</li>
                            <li><FaTags className='incs' /> Development</li>
                            <li><FaTags className='incs' /> Research</li>
                            <li><FaTags className='incs' /> Research</li>
                            <li><FaTags className='incs' /> Research</li>
                            <li><FaTags className='incs' /> Research</li>
                        </div>
                        :
                        null
                }
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





