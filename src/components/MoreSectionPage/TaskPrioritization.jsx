import '../../styles/taskPriortize.css';
import { useState, useEffect } from 'react';

const TaskPrioritization = () => {
  // Load tasks from localStorage if available, otherwise use default
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('prioritizedTasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: '1', 
        text: 'Finish the project report', 
        priority: 'high',
        time: '1h+',
        aiSuggested: true
      },
      { 
        id: '2', 
        text: 'Review the design mockups', 
        priority: 'medium',
        time: '<15m',
        aiSuggested: true 
      },
      { 
        id: '3', 
        text: 'Plan the next sprint', 
        priority: 'medium',
        time: '30m',
        aiSuggested: true
      }
    ];
  });

  const [draggedItem, setDraggedItem] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('prioritizedTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, index) => {
    setDraggedItem(tasks[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragOver = (index) => {
    if (draggedItem === null) return;
    
    const draggedOverItem = tasks[index];
    
    if (draggedItem === draggedOverItem) return;
    
    const newItems = tasks.filter(item => item !== draggedItem);
    newItems.splice(index, 0, draggedItem);
    
    setTasks(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getAISuggestion = () => {
    // Simulate AI recommendation
    const suggestion = {
      id: Date.now().toString(),
      text: 'Prepare client presentation',
      priority: 'high',
      time: '2h',
      aiSuggested: true
    };
    const updatedTasks = [suggestion, ...tasks];
    setTasks(updatedTasks);
  };




  
  return (
    <div className="task-container">
      <div className="task-header">
        <h2>Task Recommendations</h2>
        <button 
          className="ai-suggest-btn"
          onClick={getAISuggestion}
        >
          Get AI Suggestion
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`task-item ${task.aiSuggested ? 'ai-suggested' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
          >
            <div className="task-content">
              <span className="drag-handle">☰</span>
              <span className="task-text">{task.text}</span>
              <div className="task-tags">
                <span className={`priority ${task.priority}`}>{task.priority}</span>
                <span className="time">{task.time}</span>
              </div>
            </div>
            <span className="ai-badge">AI</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPrioritization;