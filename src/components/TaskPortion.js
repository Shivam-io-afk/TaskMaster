import React from 'react';
import '../App.css';
import { FaRegCircleRight } from 'react-icons/fa6';
import { FaStar, FaListCheck, FaSpinner, FaCheck, FaClock } from 'react-icons/fa6';

const tasks = () => {

    const tasksData = [
        { priority: 1, title: "Create A visual Style Guide", time: '9:00 - 9:30' },
        { priority: 0, title: "Create ABC Style Guide", time: '10:00 - 12:30' },
        { priority: 0, title: "Create A DRF Style Guide", time: '9:00 - 13:30' },
        { priority: 1, title: "Create POI Style Guide", time: '11:00 - 11:30' },
    ]


    const BGcolor = ['bg_1', 'bg_2', 'bg_3', "bg_4", 'bg_1', 'bg_2', 'bg_3', "bg_4", 'bg_1', 'bg_2', 'bg_3', "bg_4", 'bg_1', 'bg_2', 'bg_3', "bg_4"];

    return (
        <div className="taskcontainer">
            <div className="main_tskcnt">
                <div className="cnt w_fr">
                    <div className="indicator">Todo  <div><FaListCheck className='icns'/><span>{tasksData.length}</span></div></div>
                    <div className="slider_bx">

                        {
                            tasksData.map((val, keys) => {
                                return (
                                    <div key={keys} className={`T_blocks ${BGcolor[keys]}`}>
                                        <div>
                                            <span> {val.priority === 1 ? <FaStar style={{ color: "orange" }} /> : <FaStar style={{ color: "white" }} />} Today</span>
                                            <FaRegCircleRight className='icns' />
                                        </div>
                                        <span className='titlee'>{val.title}</span>
                                        <div>
                                            <span className='time'>{val.time}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }




                    </div>
                </div>
                <div className="cnt w_sc">
                    <div className="indicator">In Progress <div><FaListCheck className='icns'/><span>12</span></div></div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_3'></div>
                        <div className='T_blocks bg_1'></div>
                        <div className='T_blocks bg_3'></div>
                    </div>
                </div>
                <div className="cnt w_thr">
                    <div className="indicator">Completed <div><FaListCheck className='icns'/><span>12</span></div></div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                    </div>
                </div>
                <div className="cnt w_frt">
                    <div className="indicator">Overdue <div><FaListCheck className='icns'/><span>12</span></div></div>
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