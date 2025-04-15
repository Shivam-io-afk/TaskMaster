import React, { useState, useRef } from 'react';
import '../App.css';
import { FaCirclePlus, FaX, FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../styles/TimeRange.css"; 
import { SelectableCal } from './Celn';


const SubSection = () => {
    const [selectfil_oe, setselectfil_oe] = useState(null);
    const [selectfil_ee, setselectfil_ee] = useState(null);
    const [selectfil_fe, setselectfil_fe] = useState(null);
    const [render, Setrender] = useState(0);


    const filter_oe = [
        { name: 'Status' },
        { name: 'Due Date' },
        { name: 'Assignee' },
        { name: 'Priority' },
        { name: 'Tags' }
    ];

    const filter_ee = [
        { name: 'Urgent' },
        { name: 'Client Meeting' },
        { name: 'Bug Fixes' },
        { name: 'Design Review' },
        { name: 'Testing Required' }
    ];


    const filter_fe = [
        { name: 'UI/UX Design' },
        { name: 'Frontend' },
        { name: 'Backend Development' },
        { name: 'Research & Analysis' },
        { name: 'Testing & QA' },
        { name: 'Meetings & Communication' }
    ];

    
    let ToggleTaskAdder = (res,resp = 0) => {
        if(resp === 1){
            console.log("Task Added");
        }
        Setrender(res);
    }



    return (
        <>
            <div className="box_container">
                <div className='btn_tsk'>
                    <button onClick={() => Setrender(1)}>New Task &nbsp;&nbsp;<FaCirclePlus className='incs' /></button>
                </div>
                <div className='filters'>

                    <div className="card flex justify-content-center">
                        <Dropdown value={selectfil_oe} onChange={(e) => setselectfil_oe(e.value)} options={filter_oe} optionLabel="name" placeholder="Filter" className="w-full md:w-14rem filterDrop" />
                    </div>
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectfil_ee} onChange={(e) => setselectfil_ee(e.value)} options={filter_ee} optionLabel="name" placeholder="Label" className="w-full md:w-14rem filterDrop" />
                    </div>
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectfil_fe} onChange={(e) => setselectfil_fe(e.value)} options={filter_fe} optionLabel="name" placeholder="Category" className="w-full md:w-14rem filterDrop" />
                    </div>
                </div>

            </div>
            {
                render === 1 ? <Taskadder data={ToggleTaskAdder}/> : null 
            }
        </>
    );
}




function Taskadder(prop) {
    console.clear();
    const [taskName, setTaskName] = useState();
    const [Condition, setCondition] = useState(1);
    const [startTime, setStartTime] = useState('Start-Time');
    const [EndTime, setEndTime] = useState('End-Time');


    const [selectedDate, setSelectedDate] = useState(null);

    console.log(selectedDate);
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date);
    };

    return (
        <div className='taskadder_container'>
            <div className='m_container'>
                <div>
                    <FloatingInputLabel label="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <div className='time_date'>
                        <div className='indicator'>
                            <FaArrowLeft title='Prev' className='icon' onClick={() => setCondition(1)} />
                            <p className='box'>
                                {
                                    Condition === 2 ? <>
                                        <p>{startTime}</p>
                                        <p>{EndTime}</p>
                                    </>

                                        : <p>{selectedDate ? selectedDate : 'Date'}</p>
                                }
                            </p>
                            <FaArrowRight title='Next' className='icon' onClick={() => setCondition(2)} />
                        </div>
                        {
                            Condition === 1 ? <SelectableCal onDateSelect={handleDateSelect} /> : <TimeRangePicker onChange={(start, end) => { setStartTime(start); setEndTime(end); console.log("Selected Time Range:", start, "to", end); }} />
                        }
                        <button className='btn clicktorem' title='Close' onClick={() => prop.data(0)}><FaX/></button>
                        <button className='btn clicktoadd' title='Add Task' onClick={() => prop.data(0,1)}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}







function FloatingInputLabel({ label, value = "", onChange, type = "text" }) {
    const [focused, setFocused] = useState(false);
    const [selectfill, setselectfill] = useState(null);

    let inputref = useRef(null);

    const filter = [
        { name: 'To-Do' },
        { name: 'In-Progress' },
    ];

    const HandleClear = () => {
        if(onChange)
            onChange({ target: { value: '' } })
    }

    return (
        <div className={`input-container ${focused || value ? "focused" : ""}`}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(value.length > 0)}
                ref={inputref} />
            <FaX className='icon' onClick={HandleClear}/>
            <div className='filters'>
                <div className="card flex justify-content-center">
                    <Dropdown value={selectfill} onChange={(e) => setselectfill(e.value)} options={filter} optionLabel="name" placeholder="To-Do" className="w-full md:w-14rem filterDrop" />
                </div>
            </div>
        </div>
    );
}





function TimeRangePicker({ onChange }) {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const times = [
        "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00"
    ];

    const handleTimeClick = (time) => {
        if (time === startTime) {
            setStartTime(null);
            setEndTime(null);
            if (onChange) onChange('-- : --', '-- : --');



        } 
        else if (time === endTime) {
            setEndTime(null);
           
            if (onChange) onChange(startTime, null);
        } 
        else if (!startTime || (startTime && endTime)) {
            setStartTime(time);
            setEndTime(null);
        } 
        else if (startTime && !endTime && time > startTime) {
            setEndTime(time);
            if (onChange) onChange(startTime, time);
        }
    };

    return (
        <div className="time-range-container">
            <div className="time-grid">
                {times.map((time) => (
                    <button
                        key={time}
                        className={`time-slot ${time === startTime ? "selected-start" : ""} 
                                    ${time === endTime ? "selected-end" : ""} 
                                    ${startTime && endTime && time > startTime && time < endTime ? "in-range" : ""}`}
                        onClick={() => handleTimeClick(time)}>
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
}




export default SubSection;

