import React, { useState, useRef, useEffect } from "react";
import '../styles/privateTask.css';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FaPlus, FaClock, FaTag, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const PrvTask = () => {
    const [resDay, setResDay] = useState({ name: 'Today' });
    const [tasks, setTasks] = useState([
        {
            id: 1,
            task: "Wireframing new product",
            time: "09:00 - 11:00",
            tags: "#Mobal Project",
            date: new Date().toLocaleDateString('en-GB'),
            completed: false,
            isEditing: false
        },
        {
            id: 2,
            task: "Weekly meeting",
            time: "11:00 - 13:00",
            tags: "#Futur Project",
            date: new Date().toLocaleDateString('en-GB'),
            completed: false,
            isEditing: false
        },
    ]);

    const [newTask, setNewTask] = useState("");
    const [newTag, setNewTag] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    const [showTagInput, setShowTagInput] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const endTimeRef = useRef(null);
    const [nextId, setNextId] = useState(3);

    const filterDay = [
        { name: 'Yesterday' },
        { name: 'Today' },
        { name: 'Tomorrow' }
    ];

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (showTimer) {
                setStartTime(getCurrentTime());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [showTimer]);

    const getDateForSelectedDay = (selectedDay) => {
        const today = new Date();
        switch (selectedDay.name) {
            case "Yesterday":
                today.setDate(today.getDate() - 1);
                break;
            case "Tomorrow":
                today.setDate(today.getDate() + 1);
                break;
            default:
                break;
        }
        return today.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const filterTasksByDay = (selectedDay) => {
        const today = new Date();
        switch (selectedDay.name) {
            case "Yesterday":
                today.setDate(today.getDate() - 1);
                break;
            case "Tomorrow":
                today.setDate(today.getDate() + 1);
                break;
            default:
                break;
        }
        const formattedDate = today.toLocaleDateString('en-GB');
        return tasks.filter((task) => task.date === formattedDate);
    };

    const toggleTaskCompletion = (taskToUpdate) => {
        setTasks(tasks.map(task =>
            task.id === taskToUpdate.id
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const startEditing = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId 
                ? { ...task, isEditing: true } 
                : { ...task, isEditing: false }
        ));
    };

    const cancelEditing = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId 
                ? { ...task, isEditing: false } 
                : task
        ));
    };

    const saveEditedTask = (taskId, newTaskData) => {
        setTasks(tasks.map(task =>
            task.id === taskId 
                ? { ...task, ...newTaskData, isEditing: false } 
                : task
        ));
    };

    let greeting;
    const formattedDate = getDateForSelectedDay(resDay);

    function greetUser() {
        let currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) greeting = "Good Morning";
        else if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon";
        else if (currentHour >= 18 && currentHour < 22) greeting = "Good Evening";
        else greeting = "Good Night";
    }

    greetUser();

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setShowTimer(true);
        }
    };

    const handleAddTag = () => {
        setShowTagInput(true);
    };

    const confirmTask = () => {
        if (startTime && endTime) {
            const today = new Date();
            switch (resDay.name) {
                case "Yesterday":
                    today.setDate(today.getDate() - 1);
                    break;
                case "Tomorrow":
                    today.setDate(today.getDate() + 1);
                    break;
                default:
                    break;
            }

            const taskWithTime = {
                id: nextId,
                task: newTask,
                time: `${startTime} - ${endTime}`,
                tags: newTag ? `#${newTag.replace(/^#/, '')}` : "",
                people: [],
                date: today.toLocaleDateString('en-GB'),
                completed: false,
                isEditing: false
            };

            setTasks([...tasks, taskWithTime]);
            setNextId(nextId + 1);
            setNewTask("");
            setNewTag("");
            setStartTime("");
            setEndTime("");
            setShowTimer(false);
            setShowTagInput(false);
        }
    };

    return (
        <div className='localtaskContainer'>
            <div className='prv_con'>
                <div className='GreetBox'>
                    <div>
                        <h2>{`${greeting}, Shivam`}<span style={{color:"orange"}}>!</span></h2>
                        <p>{resDay.name}, {formattedDate}</p>
                    </div>
                    <div className="card">
                        <Dropdown
                            value={resDay}
                            onChange={(e) => setResDay(e.value)}
                            options={filterDay}
                            optionLabel="name"
                            placeholder="Today"
                            className="filterDrop"
                        />
                    </div>
                </div>
                <div className='taskportion'>
                    <Tasks
                        tasks={filterTasksByDay(resDay)}
                        onToggleComplete={toggleTaskCompletion}
                        onDelete={deleteTask}
                        onEdit={startEditing}
                        onCancelEdit={cancelEditing}
                        onSaveEdit={saveEditedTask}
                    />
                </div>
            </div>

            <div className='Adder'>
                <FaPlus className='icons' onClick={handleAddTask} />
                <input
                    type='text'
                    placeholder='Add task'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
                <FaTag className={`icons ${newTag ? 'colororg' : ' '}`} onClick={handleAddTag}/>
                <FaClock className='icons' onClick={() => setShowTimer(true)} />

                {showTagInput && (
                    <div className="TagContainer">
                        <input
                            type="text"
                            placeholder="Enter tag (without #)"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="tag-input"
                            onKeyDown={(e) => e.key === "Enter" && setShowTagInput(false)}
                        />
                    </div>
                )}

                {showTimer && (
                    <div className="Timercontainer">
                        <div>
                            <label>Start Time: </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="time-input"
                            />
                        </div>
                        <div>
                            <label>End Time: </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                ref={endTimeRef}
                                className="time-input"
                            />
                        </div>
                        <button onClick={confirmTask} className="confirm-button">
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Tasks = ({ tasks, onToggleComplete, onDelete, onEdit, onCancelEdit, onSaveEdit }) => {
    return (
        <div className="task-container">
            {tasks.map((taskItem) => (
                <TaskBox
                    key={taskItem.id}
                    {...taskItem}
                    onToggleComplete={() => onToggleComplete(taskItem)}
                    onDelete={() => onDelete(taskItem.id)}
                    onEdit={() => onEdit(taskItem.id)}
                    onCancelEdit={() => onCancelEdit(taskItem.id)}
                    onSaveEdit={(newData) => onSaveEdit(taskItem.id, newData)}
                />
            ))}
        </div>
    );
};

const TaskBox = ({ id, task, time, tags, completed, isEditing, onToggleComplete, onDelete, onEdit, onCancelEdit, onSaveEdit }) => {
    const [editedTask, setEditedTask] = useState(task);
    const [editedTime, setEditedTime] = useState(time);
    const [editedTags, setEditedTags] = useState(tags);

    const handleSave = () => {
        onSaveEdit({
            task: editedTask,
            time: editedTime,
            tags: editedTags,
            completed
        });
    };

    //press to confirm
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    if (isEditing) {
        return (
            <div className={`task-box editing ${completed ? "checked" : ""}`}>
                <div className="task-left">
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        className="task-edit-input"
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="task-right">
                    <input
                        type="text"
                        value={editedTags}
                        onChange={(e) => setEditedTags(e.target.value)}
                        className="tag-edit-input"
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        type="text"
                        value={editedTime}
                        onChange={(e) => setEditedTime(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="time-edit-input"
                    />
                </div>

                <div className="task-actions">
                    <FaCheck className="action-icon save-icon" onClick={handleSave} />
                    <FaTimes className="action-icon cancel-icon" onClick={onCancelEdit} />
                </div>
            </div>
        );
    }

    return (
        <div className={`task-box ${completed ? "checked" : ""}`}>
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggleComplete}
                    className="task-checkbox"
                />
                <span className="task-text">{task}</span>
            </div>

            <div className="task-right">
                {tags && <span className="task-tag">{tags}</span>}
                <span className="task-time">{time}</span>
            </div>

            <div className="task-actions">
                <FaEdit className="action-icon edit-icon" onClick={onEdit} />
                <FaTrash className="action-icon delete-icon" onClick={onDelete} />
            </div>
        </div>
    );
};

export default PrvTask;