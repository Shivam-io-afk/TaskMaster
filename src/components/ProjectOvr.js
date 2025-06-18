import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';
import MyComponent from '../components/Bgeffect';
import SubsectionApp from '../components/SubSection_App';
import SubSection from '../components/SubSection';
import TaskPortion from '../components/TaskPortion';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { useState, useCallback } from 'react';
import '../App.css';
import {  FaTrash } from 'react-icons/fa';
import { FaSave, FaTimes } from 'react-icons/fa';

function ProjectOverview() {
    const [Pages, setPages] = useState(0); // this handels Project overview 
    const [selectedProject, setSelectedProject] = useState(null);

    const handlePageChange = (page, project = null) => {
        setPages(page);
        if (project) {
            setSelectedProject(project);
        }
    };

    return (
        <>
            {Pages === 1 ? (
                <MainPart
                    project={selectedProject}
                    onPageChange={handlePageChange}
                />
            ) : (
                <ProjectCardview onPageChange={handlePageChange} />
            )}
        </>
    );
}

const MainPart = ({ project, onPageChange }) => {
    const [searchText, setSearchText] = useState('');

    // Memoized search handler with debounce
    const handleSearch = useCallback((text) => {
        setSearchText(text);
    }, []);

    // Navigation handler
    const handleNavigation = (page) => {
        onPageChange(page);
    };

    const subsectionData = {
        priority: project?.priority || "Not specified",
        duedate: project?.duedate || " - No due date",
        tags: project?.tags || ['---', '---', '---'],
        team: project?.team || ['---', '---', '---']
    };

    return (
        <>
            <div className='topBanner'>
                <MyComponent />
                <div className='context'>
                    <p>{project?.name || "Hello World"}</p>
                    <p>Assigned on - &nbsp;<FaCalendarAlt className='incs' />{project?.duedate || "No due date"}</p>
                    <span className='dir_span'>
                        <span onClick={() => handleNavigation(0)}> Dashboard </span>
                        <b> / </b>
                        <span onClick={() => handleNavigation(1)}> Project Overview </span>
                    </span>
                </div>
            </div>

            <SubsectionApp
                data={subsectionData}
                onSearch={handleSearch}
            />

            <SubSection />
            <TaskPortion
                searchText={searchText}
                project={project}
            />
        </>
    );
};



// Date Formater
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



// very first-screen project-overview 


const ProjectCardview = ({ onPageChange }) => {
    const today = new Date();
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Stream App",
            description: "A modern streaming platform with AI recommendations",
            duedate: formatDate(today),
            priority: 'Mid',
            team: ['AlphaStudio', 'BetaCodes', 'GammaLabs'],
            tags: ["meetings", "ui-design", "development", "ux-research"]
        }
    ]);

    const [editingProject, setEditingProject] = useState(null);
    const [newTag, setNewTag] = useState('');
    const [newTeamMember, setNewTeamMember] = useState('');


    const handleDelete = (e, id) => {
        e.stopPropagation();
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?\n ⚠️ This action cannot be undone."
        );
        if (confirmDelete) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleEdit = (e, project) => {
        e.stopPropagation();
        setEditingProject({ ...project });
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setProjects(prev =>
            prev.map(p => p.id === editingProject.id ? editingProject : p)
        );
        setEditingProject(null);
    };

    // cancel Tag
    const handleCancel = (e) => {
        e.stopPropagation();
        setEditingProject(null);
    };

    // add Tag
    const handleAddTag = (e) => {
        e.stopPropagation();
        if (newTag.trim() && !editingProject.tags.includes(newTag)) {
            setEditingProject(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    // New Project Tag
    const handleRemoveTag = (e, tag) => {
        e.stopPropagation();
        setEditingProject(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    };

    // Add Team
    const handleAddTeamMember = (e) => {
        e.stopPropagation();
        if (newTeamMember.trim() && !editingProject.team.includes(newTeamMember)) {
            setEditingProject(prev => ({
                ...prev,
                team: [...prev.team, newTeamMember.trim()]
            }));
            setNewTeamMember('');
        }
    };

    //Team Meambers
    const handleRemoveTeamMember = (e, member) => {
        e.stopPropagation();
        setEditingProject(prev => ({
            ...prev,
            team: prev.team.filter(m => m !== member)
        }));
    };

        //NewProject Name,Tag,team
    const handleAddNew = () => {
        const newProject = {
            id: Math.max(...projects.map(p => p.id), 0) + 1,
            name: "New Project",
            description: "Project description",
            duedate: formatDate(new Date()),
            priority: 'Mid',
            team: [],
            tags: []
        };
        setProjects(prev => [...prev, newProject]);
        setEditingProject(newProject);
    };

    const handleCardClick = (project, e) => {
        const interactiveElements = ['button', 'input', 'textarea', 'select', 'a'];
        const isInteractive = interactiveElements.some(tag => e.target.closest(tag));

        if (!editingProject && !isInteractive) {
            onPageChange(1, project);
        }
    };

    return (
        <div className='card-container'>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className='card'
                    onClick={(e) => handleCardClick(project, e)}
                    onMouseEnter={e => !editingProject && (e.currentTarget.style.transform = 'scale(1.02)')}
                    onMouseLeave={e => !editingProject && (e.currentTarget.style.transform = 'scale(1.00)')}>
                    {editingProject?.id === project.id ? (
                        <>
                            <div className='edit-box'>
                                <button onClick={handleSave} className='btn1'>
                                    <FaSave />
                                </button>
                                <button onClick={handleCancel} className='btn2'>
                                    <FaTimes />
                                </button>
                            </div>

                            <input
                                type="text"
                                value={editingProject.name}
                                onChange={(e) => setEditingProject(prev => ({ ...prev, name: e.target.value }))}
                                onClick={(e) => e.stopPropagation()}
                                className='addName-input'/>

                            <textarea
                                value={editingProject.description}
                                onChange={(e) => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                                onClick={(e) => e.stopPropagation()}
                                className='text-area-description'/>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>


                                    <FaCalendarAlt />
                                    <DatePicker
                                        selected={new Date(editingProject.duedate)}
                                        onChange={(date) => setEditingProject(prev => ({ ...prev, duedate: formatDate(date) }))}
                                        onClick={(e) => e.stopPropagation()}
                                        dateFormat="dd-MMM-yyyy"
                                        style={{ padding: '6px' }}/>
                                </div>
                                <select
                                    value={editingProject.priority}
                                    onChange={(e) => setEditingProject(prev => ({ ...prev, priority: e.target.value }))}
                                    onClick={(e) => e.stopPropagation()}
                                    className='priority'>
                                        <option value="High">High</option>
                                        <option value="Mid">Mid</option>
                                        <option value="Low">Low</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                    {editingProject.tags.map((tag, idx) => (
                                        <span key={idx} className='edit-tags'>
                                            #{tag}
                                            <button
                                                onClick={(e) => handleRemoveTag(e, tag)}
                                                className='btn3'>
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="Add new tag"
                                        className='addNewtagTeam'/>
                                    <button
                                        onClick={handleAddTag}
                                        className='btn4'>
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span>Team: </span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                                        {editingProject.team.map((member, idx) => (
                                            <span key={idx} className='teamEdit'>
                                                {member}
                                                <button
                                                    onClick={(e) => handleRemoveTeamMember(e, member)}
                                                    className='btn3'>
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        value={newTeamMember}
                                        onChange={(e) => setNewTeamMember(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="Add team member"
                                        className='addNewtagTeam'/>
                                    <button
                                        onClick={handleAddTeamMember}
                                        className='btn4'>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={(e) => handleEdit(e, project)}
                                    className='btn5'>
                                    <FaRegEdit />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, project.id)}
                                    className='btn5'>
                                    <FaTrash />
                                </button>
                            </div>

                            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#222' }}>
                                {project.name}
                            </h3>
                            <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                {project.description}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FaCalendarAlt />
                                    {project.duedate}
                                </span>
                                <span className='duedatespan'>
                                    {project.priority}
                                </span>
                            </div>

                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className='tags-span'>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ fontSize: '0.9rem', color: '#666', paddingTop: '12px', borderTop: '1px dashed #e5e7eb' }}>
                                Team: {project.team.join(', ')}
                            </div>
                        </>
                    )}
                </div>
            ))}

            <div
                onClick={handleAddNew}
                className='addtask-btn'
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#f8980a';
                    e.currentTarget.style.color = '#f8980a';
                    e.currentTarget.style.background = 'rgba(248, 152, 10, 0.08)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.background = 'rgba(248, 152, 10, 0.03)';
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div className='add-newcard-task'>
                        +
                    </div>
                    <span>Add New Project</span>
                </div>
            </div>
        </div>
    );
};


export default ProjectOverview;