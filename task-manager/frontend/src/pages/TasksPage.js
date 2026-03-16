import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import './TasksPage.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      const res = await getTasks(params);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleSave = async (data) => {
    if (editTask) {
      await updateTask(editTask._id, data);
    } else {
      await createTask(data);
    }
    setEditTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const handleStatusChange = async (id, data) => {
    await updateTask(id, data);
    fetchTasks();
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => setFilters({ status: '', priority: '', search: '' });

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>My Tasks <span className="task-count">{tasks.length}</span></h1>
        <button className="btn-new-task" onClick={() => { setEditTask(null); setShowModal(true); }}>
          + New Task
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="🔍 Search tasks..."
          className="search-input"
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {(filters.status || filters.priority || filters.search) && (
          <button onClick={clearFilters} className="btn-clear">✕ Clear</button>
        )}
      </div>

      {loading ? (
        <div className="tasks-loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Try adjusting filters or create a new task.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => { setEditTask(t); setShowModal(true); }}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {showModal && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTask(null); }}
        />
      )}
    </div>
  );
};

export default TasksPage;
