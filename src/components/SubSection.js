import React from 'react';
import '../App.css';
import { FaCirclePlus } from 'react-icons/fa6';



const SubSection = () => {
    return (
        <div className="box_container">
            <div className='btn_tsk'>
                <button>New Task &nbsp;&nbsp;<FaCirclePlus className='incs' /></button>
            </div>
            <div className='filters'>
                  
            </div>
        </div>
    );
}


export default SubSection;

