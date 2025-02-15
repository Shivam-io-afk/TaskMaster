import '../styles/sideBar.css'
import MainImg from '../images/profile.png'
import HanuJi from '../images/hanuman.png'
import { FaAngleDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaLayerGroup } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa6';
import { FaTasks } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';


function SideBar() {
    // const imgs = [
    //     { usrImg: '../images/hanuman.png' },
    //     { usrImg: '../images/lakshmana.png' },
    //     { usrImg: '../images/profile.png' },
    // ]

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
            <div className='container_scnd'>
                <div className='box'>
                    <img src={MainImg} alt='' />
                    <span>
                        <p>Mr Profile
                            {/* <FaAngleDown className='icn' /> */}
                        </p>
                        <p>xyz@gmail.com</p>
                    </span>
                </div>
                <div className='userLists'>
                    <div className='box'>
                        <img src={HanuJi} alt='' />
                        <span>
                            <p>Mr Profile</p>
                            <p>xyz@gmail.com</p>
                        </span>
                    </div>
                    <div className='box'>
                        <img src={HanuJi} alt='' />
                        <span>
                            <p>Mr Profile</p>
                            <p>xyz@gmail.com</p>
                        </span>
                    </div>
                    <div className='box'>
                        <img src={HanuJi} alt='' />
                        <span>
                            <p>Mr Profile</p>
                            <p>xyz@gmail.com</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className='container_thrd'>
                <h3>Menu</h3>
                <div className='options'>
                    <NavLink to={'/Overview'}><li><FaWindows className='incs' /><span>Overview</span></li></NavLink>
                    <NavLink to={'/Tasklist'}><li><FaListUl className='incs' /><span>Task List</span></li></NavLink>
                    <NavLink to={'./ProjectOverview'}><li className='active'><FaNetworkWired className='incs' /><span>Project Overview</span></li></NavLink>
                    <NavLink to={'./Categories'}><li><FaLayerGroup className='incs' /><span>Categories</span></li></NavLink>
                    <NavLink to={'./Setting'}><li><FaGear className='incs' /><span>Settings</span></li></NavLink>
                </div>
            </div>
            <div className='container_frth'>
                <h3>List <FaAngleDown className='icns' /></h3>
                <div className='options'>
                    <li><FaTasks className='incs' /> Personal</li>
                    <li><FaTasks className='incs' /> Design</li>
                    <li><FaTasks className='incs' /> Development</li>
                    <li><FaTasks className='incs' /> Research</li>
                </div>
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





