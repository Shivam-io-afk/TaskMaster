import React, { useState, useRef, useEffect } from "react";
import '../styles/privateTask.css';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FaPlus, FaClock } from 'react-icons/fa';

const PrvTask = () => {
    const [resDay, setResDay] = useState({ name: 'Today' });
    const [tasks, setTasks] = useState([
        {
            task: "Wireframing new product",
            time: "09:00 - 11:00",
            tags: "#Mobal Project",
            people: ["https://randomuser.me/api/portraits/men/32.jpg"],
            date: new Date().toLocaleDateString('en-GB'),
            completed: false
        },
        {
            task: "Weekly meeting",
            time: "11:00 - 13:00",
            tags: "#Futur Project",
            people: [
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/36.jpg"
            ],
            date: new Date().toLocaleDateString('en-GB'),
            completed: false
        },
    ]);

    const [newTask, setNewTask] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const endTimeRef = useRef(null);

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
            task.task === taskToUpdate.task && task.date === taskToUpdate.date
                ? { ...task, completed: !task.completed }
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
                task: newTask,
                time: `${startTime} - ${endTime}`,
                tags: "",
                people: [],
                date: today.toLocaleDateString('en-GB'),
                completed: false
            };

            setTasks([...tasks, taskWithTime]);
            setNewTask("");
            setStartTime("");
            setEndTime("");
            setShowTimer(false);
        }
    };

    return (
        <div className='localtaskContainer'>
            <div className='prv_con'>
                <div className='GreetBox'>
                    <div>
                        <h2>{`${greeting}, Joseph!`}</h2>
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
                <FaClock className='icons' onClick={() => setShowTimer(true)} />

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


const Tasks = ({ tasks, onToggleComplete }) => {
    return (
        <div className="task-container">
            {tasks.map((taskItem, index) => (
                <TaskBox
                    key={index}
                    {...taskItem}
                    onToggleComplete={() => onToggleComplete(taskItem)}
                />
            ))}
        </div>
    );
};



// TaskBoxe
const TaskBox = ({ task, time, tags, people, completed, onToggleComplete }) => {
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
        </div>
    );
};

export default PrvTask; 