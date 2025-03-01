import React, { useState, useRef } from "react";
import '../styles/privateTask.css';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FaPlus, FaClock } from 'react-icons/fa';

const PrvTask = () => {
    const [resDay, setResDay] = useState("Today"); // State for selected day
    const [tasks, setTasks] = useState([
        {
            task: "Wireframing new product",
            time: "09:00 - 11:00",
            tags: "#Mobal Project",
            people: ["https://randomuser.me/api/portraits/men/32.jpg"],
            date: new Date().toLocaleDateString('en-GB'), // Today's date
        },
        {
            task: "Weekly meeting",
            time: "11:00 - 13:00",
            tags: "#Futur Project",
            people: [
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/36.jpg"
            ],
            date: new Date().toLocaleDateString('en-GB'), // Today's date
        },
    ]);
    const [newTask, setNewTask] = useState(""); // State for input field
    const [showTimer, setShowTimer] = useState(false); // State to show/hide timer
    const [startTime, setStartTime] = useState(""); // Start time state
    const [endTime, setEndTime] = useState(""); // End time state
    const endTimeRef = useRef(null);

    const filterDay = [
        { name: 'Today' },
        { name: 'Yesterday' },
        { name: 'Tomorrow' }
    ];

    // Function to get the date based on the selected day
    const getDateForSelectedDay = (selectedDay) => {
        const today = new Date();
        switch (selectedDay) {
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

    // Function to filter tasks based on the selected day
    const filterTasksByDay = (selectedDay) => {
        const today = new Date();
        switch (selectedDay) {
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

    let greeting;
    const formattedDate = getDateForSelectedDay(resDay); // Get date based on selected day

    function greetUser() {
        let currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) greeting = "Good Morning";
        else if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon";
        else if (currentHour >= 18 && currentHour < 22) greeting = "Good Evening";
        else greeting = "Good Night";
    }

    greetUser();

    // Function to handle adding new task
    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setShowTimer(true); // Show timer input fields
        }
    };

    // Function to confirm the task with timer
    const confirmTask = () => {
        if (startTime && endTime) {
            const taskWithTime = {
                task: newTask,
                time: `${startTime} - ${endTime}`,
                tags: "",
                people: [],
                date: new Date().toLocaleDateString('en-GB'), // Default to today's date
            };

            // Update the task's date based on the selected day
            const today = new Date();
            switch (resDay) {
                case "Yesterday":
                    today.setDate(today.getDate() - 1);
                    break;
                case "Tomorrow":
                    today.setDate(today.getDate() + 1);
                    break;
                default:
                    break;
            }
            taskWithTime.date = today.toLocaleDateString('en-GB');

            setTasks([...tasks, taskWithTime]);
            setNewTask(""); // Clear input field
            setStartTime(""); // Clear start time
            setEndTime(""); // Clear end time
            setShowTimer(false); // Hide timer input fields
        }
    };

    return (
        <>
            <div className='localtaskContainer'>
                <div className='prv_con'>
                    <div className='GreetBox'>
                        <div>
                            <h2>{`${greeting}, Joseph!`}</h2>
                            <p>{resDay}, {formattedDate}</p>
                        </div>
                        <div className="card flex justify-content-center">
                            <Dropdown
                                value={resDay}
                                onChange={(e) => setResDay(e.value.name)}
                                options={filterDay}
                                optionLabel="name"
                                placeholder="Today"
                                className="w-full md:w-14rem filterDrop"
                            />
                        </div>
                    </div>
                    <div className='taskportion'>
                        <Tasks tasks={filterTasksByDay(resDay)} />
                    </div>
                </div>

                <div className='Adder'>
                    <FaPlus className='icons' onClick={handleAddTask} />
                    <input
                        type='text'
                        placeholder='Add task'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask()} // Trigger add task on Enter key
                    />
                    <FaClock className='icons' />

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
        </>
    );
};

const Tasks = ({ tasks }) => {
    return (
        <div className="task-container">
            {tasks.map((taskItem, index) => (
                <TaskBox key={index} {...taskItem} />
            ))}
        </div>
    );
};

const TaskBox = ({ task, time, tags, people }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className={`task-box ${checked ? "checked" : ""}`}>
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="task-checkbox"
                />
                <span className="task-text">{task}</span>
            </div>

            <div className="task-right">
                {tags && <span className="task-tag">{tags}</span>}
                <span className="task-time">{time}</span>
                <div className="task-avatars">
                    {people &&
                        people.map((p, i) => (
                            <img key={i} src={p} alt="avatar" className="task-avatar" />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PrvTask;