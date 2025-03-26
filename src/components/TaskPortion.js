import React, { useEffect, useMemo } from 'react';
import '../App.css';
import { FaRegCircleRight, FaStar, FaListCheck, FaSpinner, FaCheck, FaClock } from 'react-icons/fa6';

const TaskPortion = ({ block, searchText, project, onBlockChange }) => {

    // Sample tasks data for all sections
    const allTasksData = useMemo(() => ({
        todo: [
            { priority: 1, current: 'Today', title: "Create A visual Style Guide", time: '9:00 - 9:30' },
            { priority: 0, current: 'Today', title: "Create ABC Style Guide", time: '10:00 - 12:30' },
            { priority: 0, current: 'Tommorrow', title: "Create A DRF Style Guide", time: '9:00 - 13:30' },
            { priority: 1, current: 'Today', title: "Create POI Style Guide", time: '11:00 - 11:30' },
        ],
        inProgress: [
            { priority: 1, current: 'Today', title: "Implement Authentication", time: '10:00 - 11:00' },
            { priority: 0, current: 'Today', title: "Design Database Schema", time: '11:30 - 12:30' },
            { priority: 1, current: 'Tommorrow', title: "Create API Endpoints", time: '13:00 - 14:30' },
        ],
        completed: [
            { priority: 0, current: 'Today', title: "Setup Project Environment", time: '-' },
            { priority: 1, current: 'Yesterday', title: "Create Wireframes", time: '-' },
        ],
        overdue: [
            { priority: 1, current: 'Yesterday', title: "Fix Critical Bugs", time: '-' },
            { priority: 0, current: 'Last week', title: "Update Documentation", time: '-' },
        ]
    }), []);

    const BGcolor = ['bg_1', 'bg_2', 'bg_3', 'bg_4']; // for background color

    // Filter tasks based on search text for all sections
    const filteredTasks = useMemo(() => {
        const filterSection = (tasks) => {
            if (!searchText) return tasks;
            return tasks.filter(task =>
                task.title.toLowerCase().includes(searchText.toLowerCase())
            );
        };

        return {
            todo: filterSection(allTasksData.todo),
            inProgress: filterSection(allTasksData.inProgress),
            completed: filterSection(allTasksData.completed),
            overdue: filterSection(allTasksData.overdue)
        };
        
    }, [allTasksData, searchText]);

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

    // Task Box 
    const renderTaskItems = (tasks) => {
        return tasks.map((val, keys) => (
            <div key={keys} className={`T_blocks ${BGcolor[keys % BGcolor.length]}`}>
                <div>
                    <span>
                        {val.priority === 1 ?
                            <FaStar style={{ color: "orange" }} /> :
                            <FaStar style={{ color: "white" }} />}
                        &nbsp; {val.current}
                    </span>
                    <FaRegCircleRight className='icns' />
                </div>
                <span className='titlee'>{val.title}</span>
                <div>
                    <span className='time'>{val.time}</span>
                </div>
            </div>
        ));
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
                            <FaListCheck className='icns' />
                            <span>{filteredTasks.todo.length}</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        {renderTaskItems(filteredTasks.todo)}
                    </div>
                </div>

                {/* In Progress Section */}
                <div className="cnt w_sc">
                    <div className={block === 2 ? 'indicator higlighter' : 'indicator'}
                        onClick={() => handleBlockClick(2)}>
                        In Progress
                        <div>
                            <FaSpinner className='icns' />
                            <span>{filteredTasks.inProgress.length}</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        {renderTaskItems(filteredTasks.inProgress)}
                    </div>
                </div>


                {/* Completed Section */}
                <div className="cnt w_thr">
                    <div className={block === 3 ? 'indicator higlighter' : 'indicator'}
                        onClick={() => handleBlockClick(3)}>
                        Completed
                        <div>
                            <FaCheck className='icns' />
                            <span>{filteredTasks.completed.length}</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        {renderTaskItems(filteredTasks.completed)}
                    </div>
                </div>


                {/* Overdue Section */}
                <div className="cnt w_frt">
                    <div className={block === 4 ? 'indicator higlighter' : 'indicator'}
                        onClick={() => handleBlockClick(4)}>
                        Overdue
                        <div>
                            <FaClock className='icns' />
                            <span>{filteredTasks.overdue.length}</span>
                        </div>
                    </div>
                    <div className="slider_bx">
                        {renderTaskItems(filteredTasks.overdue)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPortion;