import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTaskStats, getTasks } from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { createTask, updateTask, deleteTask } from '../utils/api';
import './Dashboard.css';

const StatCard = ({ label, count, color }) => (
  <div className="stat-card" style={{ borderTopColor: color }}>
    <div className="stat-count" style={{ color }}>{count}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ todo: 0, 'in-progress': 0, completed: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        getTaskStats(),
        getTasks({ sort: '-createdAt', limit: 5 }),
      ]);
      setStats(statsRes.data.stats);
      setRecentTasks(tasksRes.data.tasks.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (editTask) {
      await updateTask(editTask._id, data);
    } else {
      await createTask(data);
    }
    setEditTask(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id);
      fetchData();
    }
  };

  const handleStatusChange = async (id, data) => {
    await updateTask(id, data);
    fetchData();
  };

  const total = stats.todo + stats['in-progress'] + stats.completed;
  const completionPct = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Good {getGreeting()}, {user?.name?.split(' ')[0]} 👋</h1>
          <p>Here's your productivity overview</p>
        </div>
        <button className="btn-new-task" onClick={() => { setEditTask(null); setShowModal(true); }}>
          + New Task
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="To Do" count={stats.todo} color="#38bdf8" />
        <StatCard label="In Progress" count={stats['in-progress']} color="#f59e0b" />
        <StatCard label="Completed" count={stats.completed} color="#22c55e" />
        <div className="stat-card" style={{ borderTopColor: '#a78bfa' }}>
          <div className="stat-count" style={{ color: '#a78bfa' }}>{completionPct}%</div>
          <div className="stat-label">Completion Rate</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="section-header">
        <h2>Recent Tasks</h2>
        <Link to="/tasks" className="view-all">View all →</Link>
      </div>

      {recentTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create your first task to get started!</p>
          <button className="btn-new-task" onClick={() => setShowModal(true)}>+ Create Task</button>
        </div>
      ) : (
        <div className="tasks-grid">
          {recentTasks.map((task) => (
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

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
};

export default Dashboard;
