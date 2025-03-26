import MyComponent from '../components/Bgeffect';
import SubsectionApp from '../components/SubSection_App';
import SubSection from '../components/SubSection';
import TaskPortion from '../components/TaskPortion';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import '../App.css';

function ProjectOverview() {
    const [Pages, setPages] = useState(1); // Navigate pages
    const [selectedProject, setSelectedProject] = useState(null);


    // Callback function to receive data from child
    const handlePageChange = (page, project = null) => {
        setPages(page);
        if (project) {
            setSelectedProject(project); // Set the selected project
        }
    };

    return (
        <>
            {Pages === 1 ? (
                <MainPart
                    project={selectedProject} // Pass the entire project object
                    onPageChange={handlePageChange}
                />
            ) : (
                <ProjectCardview onPageChange={handlePageChange} />
            )}
        </>
    );
}






const MainPart = (props) => {
    // Callback function
    const handleNavigation = (page) => {
        props.onPageChange(page); // Send data to parent
    };

    const { project } = props; // Destructure props
    console.log(project);

    const subsectionData = {
        priority: project?.priority || "Not specified",
        duedate: project?.duedate || "No due date",
        tags: project?.tags || ['---','---','---'],
        team: project?.team || ['---','---','---']
    };

    return (
        <>
            <div className='topBanner'>
                <MyComponent />
                <div className='context'>
                    <p>{project?.name || "Hello World"}<FaRegEdit className='incs' style={{ cursor: "pointer" }} /></p>
                    <p>Assigned on - &nbsp;<FaCalendarAlt className='incs' />{project?.duedate || "No due date"}</p>
                    <span className='dir_span'>
                        <span onClick={() => handleNavigation(0)}> Dashboard </span>
                        <b> / </b>
                        <span onClick={() => handleNavigation(1)}> Project Overview </span>
                    </span>
                </div>
            </div>

            <SubsectionApp data={subsectionData} />

            <SubSection />
            <TaskPortion />
        </>
    );
};





function formatDate(date) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}






const ProjectCardview = ({ onPageChange }) => {
    const today = new Date();


    //TempData
    const projects = [
        {
            id: 1,
            name: "Stream App",
            description: "This is project 1",
            duedate: `${formatDate(today)}`,
            priority: 'Mid',
            team: ['AlphaStudio', 'BetaCodes', 'GammaLabs'],
            tags: ["meetings", "ui-design", "development", "ux-research"]
        },
        {
            id: 2,
            name: "WireBook Clone",
            description: "This is project 2",
            duedate: `12-Apr-2025`,
            priority: 'Low',
            team: ['Digital', 'BitCOder', 'Phlabo'],
            tags: ["meetings", "ux-research"]
        },
        {
            id: 3,
            name: "Discussion",
            description: "This is project 3",
            duedate: `03-May-2025`,
            priority: 'High',
            team: ['Digital', 'Phlabo'],
            tags: ["meetings", "development" ,"ux-research"]
        }
    ];




    

    return (
        <div className='card-container'>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className='card'
                    onClick={() => onPageChange(1, project)} // Pass the entire project object
                >
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p><b>Due Date:</b> {project.duedate}</p>
                    <p><b>Priority:</b> {project.priority}</p>
                    <p><b>Tags:</b> {project.tags.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectOverview;