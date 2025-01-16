import '../styles/main.css'
import MainImg from '../images/profile.png'
import { FaAngleDown } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaLayerGroup } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa6';


function SideBar() {
    const imgs = [
        {usrImg:'../images/hanuman.png'},
        {usrImg:'../images/lakshmana.png'},
        {usrImg:'../images/profile.png'},
    ]

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
                    <img src={MainImg}/>
                    <span>
                        <p>Mr Profile <FaAngleDown className='icn'/></p>
                        <p>xyz@gmail.com</p>
                    </span>
                </div>
            </div>
            <div className='container_thrd'>
                <h3>Menu</h3>
                <div className='options'>
                    <li>&nbsp;&nbsp;<FaWindows/>&nbsp;&nbsp;&nbsp;&nbsp;<span>Overview</span></li>
                    <li>&nbsp;&nbsp;<FaListUl/>&nbsp;&nbsp;&nbsp;&nbsp;<span>Task List</span></li>
                    <li className='active'>&nbsp;&nbsp;<FaNetworkWired/>&nbsp;&nbsp;&nbsp;&nbsp;<span>Project Overview</span></li>
                    <li>&nbsp;&nbsp;<FaLayerGroup/>&nbsp;&nbsp;&nbsp;&nbsp;<span>Categories</span></li>
                    <li>&nbsp;&nbsp;<FaGear/>&nbsp;&nbsp;&nbsp;&nbsp;<span>Settings</span></li>
                </div>
            </div>
            <div className='container_frth'>
                
            </div>
        </div> 
    )
}

export default SideBar;





