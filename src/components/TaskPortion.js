import React, { useEffect, useMemo } from 'react';
import '../App.css';
import { FaRegCircleRight, FaStar, FaListCheck, FaSpinner, FaCheck, FaClock } from 'react-icons/fa6';

const TaskPortion = ({ block, searchText, project, onBlockChange }) => {
    console.log(block);
    
   const tasksData = useMemo(() => [
        { priority: 1, title: "Create A visual Style Guide", time: '9:00 - 9:30' },
        { priority: 0, title: "Create ABC Style Guide", time: '10:00 - 12:30' },
        { priority: 0, title: "Create A DRF Style Guide", time: '9:00 - 13:30' },
        { priority: 1, title: "Create POI Style Guide", time: '11:00 - 11:30' },
        { priority: 1, title: "Under Taker", time: '11:00 - 11:30' },
        { priority: 0, title: "Bab", time: '11:00 - 11:30' },

    ], []);

    const BGcolor = ['bg_1', 'bg_2', 'bg_3', 'bg_4'];

    // Filter tasks based on search text
    const filteredTasks = useMemo(() => {
        if (!searchText) return tasksData;
        return tasksData.filter(task => 
            task.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [tasksData, searchText]);

    // Log project data when it changes
    useEffect(() => {
        if (project) {
            console.log('Current project:', project);
        }
    }, [project]);

    const handleBlockClick = (newBlock) => {
        if (onBlockChange) {
            onBlockChange(newBlock);
        }
    };

    return (
        <div className="taskcontainer">
            <div className="main_tskcnt">
                {/* Todo Section */}
                <div className="cnt w_fr">
                    <div className={block === 1 ? 'indicator higlighter' : 'indicator'} 
                         onClick={() => handleBlockClick(1)}>
                        Todo 
                        <div>
                            <FaListCheck className='icns'/>
                            <span>{filteredTasks.length}</span>
                        </div>
                    </div>

                    <div className="slider_bx">
                        {filteredTasks.map((val, keys) => (
                            <div key={keys} className={`T_blocks ${BGcolor[keys % BGcolor.length]}`}>
                                <div>
                                    <span> 
                                        {val.priority === 1 ? 
                                            <FaStar style={{ color: "orange" }} /> : 
                                            <FaStar style={{ color: "white" }} />} 
                                        &nbsp; Today
                                    </span>
                                    <FaRegCircleRight className='icns' />
                                </div>
                                <span className='titlee'>{val.title}</span>
                                <div>
                                    <span className='time'>{val.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* In Progress Section */}
                <div className="cnt w_sc">
                    <div className={block === 2 ? 'indicator higlighter' : 'indicator'}
                         onClick={() => handleBlockClick(2)}>
                        In Progress 
                        <div>
                            <FaSpinner className='icns'/>
                            <span>12</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_3'></div>
                        <div className='T_blocks bg_1'></div>
                        <div className='T_blocks bg_3'></div>
                    </div>
                </div>

                {/* Completed Section */}
                <div className="cnt w_thr">
                    <div className={block === 3 ? 'indicator higlighter' : 'indicator'}
                         onClick={() => handleBlockClick(3)}>
                        Completed 
                        <div>
                            <FaCheck className='icns'/>
                            <span>12</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                    </div>
                </div>

                {/* Overdue Section */}
                <div className="cnt w_frt">
                    <div className={block === 4 ? 'indicator higlighter' : 'indicator'}
                         onClick={() => handleBlockClick(4)}>
                        Overdue 
                        <div>
                            <FaClock className='icns'/>
                            <span>12</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                        <div className='T_blocks bg_4'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPortion;