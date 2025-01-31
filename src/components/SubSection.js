import React,{useState} from 'react';
import '../App.css';
import { FaCirclePlus } from 'react-icons/fa6';
import  {Dropdown}  from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import { PrimeReactProvider } from "primereact/api";



const SubSection = () => {
    const [selectfil_oe, setselectfil_oe] = useState(null);
    const [selectfil_ee, setselectfil_ee] = useState(null);
    const [selectfil_fe, setselectfil_fe] = useState(null);


    const filter_oe = [
        { name: 'Status'},
        { name: 'Due Date'},
        { name: 'Assignee'},
        { name: 'Priority'},
        { name: 'Tags'}
    ];

    const filter_ee = [
        { name: 'Urgent'},
        { name: 'Client Meeting'},
        { name: 'Bug Fix'},
        { name: 'Design Review'},
        { name: 'Testing Required'}
    ];


    const filter_fe = [
        { name: 'UI/UX Design'},
        { name: 'Frontend'},
        { name: 'Backend Development'},
        { name: 'Research & Analysis'},
        { name: 'Testing & QA'},
        { name: 'Meetings & Communication'}
    ];




    return (
        <div className="box_container">
            <div className='btn_tsk'>
                <button>New Task &nbsp;&nbsp;<FaCirclePlus className='incs' /></button>
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
    );
}


export default SubSection;


