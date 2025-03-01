import MyComponent from '../components/Bgeffect';
import SubsectionApp from '../components/SubSection_App';
import SubSection from '../components/SubSection';
import TaskPortion from '../components/TaskPortion';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import '../App.css';

function ProjectOverview() {
    return (
        <>
            <div className='topBanner'>
                <MyComponent />
                <div className='context'>
                    <p>My Project<FaRegEdit className='incs' style={{ cursor: "pointer" }} /></p>
                    <p><FaCalendarAlt className='incs' />19 Mar 2025</p>
                    <span className='dir_span'><span>Dashboard</span><b> / </b><span>Project Overview</span></span>
                </div>
            </div>
            <SubsectionApp />
            <SubSection />
            <TaskPortion />
        </>
    );
}


export default ProjectOverview;