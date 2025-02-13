import React from 'react';
import '../App.css';
import { FaRegCircleRight } from 'react-icons/fa6'; 
import { FaStar } from 'react-icons/fa6';

const tasks = () => {
    return (
        <div className="taskcontainer">
            <div className="main_tskcnt">
                <div className="cnt w_fr">
                    <div className="indicator">Todo</div>
                    <div className="slider_bx">

                        
                        <div className='T_blocks bg_1'>
                            <div>
                                <span><FaStar style={{color:"orange"}}/> Today</span>
                                <FaRegCircleRight className='icns'/>
                            </div>
                            <span className='titlee'>Create A visual Style Guide</span>
                            <div>
                                <span>9:00 - 9:30</span>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>




                        <div className='T_blocks bg_2'></div>
                        <div className='T_blocks bg_1'></div>
                    </div>
                </div>
                <div className="cnt w_sc">
                    <div className="indicator">In Progress</div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_3'></div>
                        <div className='T_blocks bg_1'></div>
                        <div className='T_blocks bg_3'></div>
                    </div>
                </div>
                <div className="cnt w_thr">
                    <div className="indicator">Completed</div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                    </div>
                </div>
                <div className="cnt w_frt">
                    <div className="indicator">Overdue</div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default tasks;