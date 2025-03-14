import MyComponent from '../components/Bgeffect';
import SubsectionApp from '../components/SubSection_App';
import SubSection from '../components/SubSection';
import TaskPortion from '../components/TaskPortion';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import '../App.css';
import { useState } from 'react';

function ProjectOverview() {
    console.clear(); //
    const [Pages, setPages] = useState(0); // Navigate pages
    const [selectedProject, setSelectedProject] = useState(null);

    const tags = ["meetings", "ui-design", "development", "ux-research"];
    const assigness = ['AlphaStudio', 'BetaCodes', 'GammaLabs'];

    // Callback function to receive data from child
    const handlePageChange = (page, project = null) => {
        setPages(page);
        if (project) {
            setSelectedProject(project);
        }
        // alert(`Page changed to: ${page}`);
    };

    return (
        <>
            {
                Pages === 1 ?
                    <MainPart
                        projectname={selectedProject?.name || "Hello World"} // Use selected project data
                        priority="Most"
                        duedate="12 Mar 2025"
                        alltags={tags}
                        assign={assigness}
                        onPageChange={handlePageChange}/>
                    :
                    <ProjectCardview onPageChange={handlePageChange} />
            }
        </>
    );
}

const MainPart = (props) => {
    //callback function
    const handleNavigation = (page) => {
        props.onPageChange(page); // Send data to parent
    };

    return (
        <>
            <div className='topBanner'>
                <MyComponent />
                <div className='context'>
                    <p>{props.projectname}<FaRegEdit className='incs' style={{ cursor: "pointer" }} /></p>
                    <p><FaCalendarAlt className='incs' />19 Mar 2025</p>
                    <span className='dir_span'>
                        <span onClick={() => handleNavigation(0)}> Dashboard </span>
                        <b> / </b>
                        <span onClick={() => handleNavigation(1)}> Project Overview </span>
                    </span>
                </div>
            </div>
            <SubsectionApp data={props} />
            <SubSection />
            <TaskPortion />
        </>
    );
};

const ProjectCardview = ({ onPageChange }) => {
    // Sample project data
    const projects = [
        { id: 1, name: "Project 1", description: "This is project 1" },
        { id: 2, name: "Project 2", description: "This is project 2" },
        { id: 3, name: "Project 3", description: "This is project 3" },
        { id: 4, name: "Project 4", description: "This is project 4" },
        { id: 5, name: "Project 5", description: "This is project 5" },
        { id: 6, name: "Project 6", description: "This is project 6" },
        { id: 7, name: "Project 7", description: "This is project 7" },
        { id: 8, name: "Project 8", description: "This is project 8" },
        { id: 9, name: "Project 9", description: "This is project 9" },
        { id: 10, name: "Project 10", description: "This is project 10" }
    ];

    return (
        <div className='card-container'>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className='card'
                    onClick={() => onPageChange(1, project)} // Passes selected project data
                >
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectOverview;