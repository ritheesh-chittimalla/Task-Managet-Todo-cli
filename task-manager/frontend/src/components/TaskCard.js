import React from 'react';
import './TaskCard.css';

const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleStatusChange = (e) => {
    onStatusChange(task._id, { status: e.target.value });
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-card-header">
        <span
          className="priority-badge"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {task.priority}
        </span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn-edit" title="Edit">✏️</button>
          <button onClick={() => onDelete(task._id)} className="btn-delete" title="Delete">🗑️</button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.tags?.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <div className="task-card-footer">
        <select value={task.status} onChange={handleStatusChange} className="status-select">
          {Object.entries(STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
        {task.dueDate && (
          <span className="due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
