import { useState } from 'react';
import '../styles/privateTask.css';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FaPlus, FaClock } from 'react-icons/fa';

const PrvTask = () => {
    const [resDay, setResDay] = useState(null); // Filtering day state
    const [tasks, setTasks] = useState([
        {
            task: "Wireframing new product",
            time: "09:00 - 11:00",
            tags: "#Mobal Project",
            people: ["https://randomuser.me/api/portraits/men/32.jpg"],
        },
        {
            task: "Weekly meeting",
            time: "11:00 - 13:00",
            tags: "#Futur Project",
            people: [
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/36.jpg"
            ],
        },
    ]);
    const [newTask, setNewTask] = useState(""); // State for input field

    const filterDay = [
        { name: 'Yesterday' },
        { name: 'Tomorrow' }
    ];

    let greeting;
    const options = { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options);

    function greetUser() {
        let currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) greeting = "Good Morning";
        else if (currentHour >= 12 && currentHour < 18) greeting = "Good Afternoon";
        else if (currentHour >= 18 && currentHour < 22) greeting = "Good Evening";
        else greeting = "Good Night";
    }

    greetUser();

    // Function to add a new task
    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { task: newTask, time: "No time set", tags: "", people: [] }]);
            setNewTask(""); // Clear input field
        }
    };

    return (
        <>
            <div className='localtaskContainer'>
                <div className='prv_con'>
                    <div className='GreetBox'>
                        <div>
                            <h2>{`${greeting}, Joseph!`}</h2>
                            <p>Today, {formattedDate}</p>
                        </div>
                        <div className="card flex justify-content-center">
                            <Dropdown value={resDay} onChange={(e) => setResDay(e.value)} options={filterDay} optionLabel="name" placeholder="Today" className="w-full md:w-14rem filterDrop" />
                        </div>
                    </div>
                    <div className='taskportion'>
                        <Tasks tasks={tasks} />
                    </div>
                </div>
            </div>
            <div className='Adder'>
                <FaPlus className='icons' onClick={addTask} />
                <input 
                    type='text' 
                    placeholder='Add task' 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()} // Add task on Enter key
                />
                <FaClock className='icons' />
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
