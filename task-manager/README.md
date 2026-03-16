# ⚡ TaskFlow — Full-Stack Task Manager (MERN)

A full-stack task management application built with MongoDB, Express.js, React, and Node.js.

## Features
- JWT-based authentication (Register / Login / Protected routes)
- Create, read, update, delete tasks
- Filter tasks by status, priority, and search keyword
- Task stats dashboard with completion rate
- Responsive dark UI

## Project Structure
```
task-manager/
├── backend/
│   ├── server.js           # Express entry point
│   ├── .env.example        # Environment variable template
│   ├── models/
│   │   ├── User.js         # User schema (bcrypt password hashing)
│   │   └── Task.js         # Task schema with indexes
│   ├── middleware/
│   │   └── auth.js         # JWT protect middleware
│   └── routes/
│       ├── auth.js         # POST /register, POST /login, GET /me
│       ├── tasks.js        # Full CRUD + GET /stats/summary
│       └── users.js        # PUT /profile, PUT /password
└── frontend/
    └── src/
        ├── App.js                    # Router + PrivateRoute/PublicRoute
        ├── index.js                  # React entry
        ├── index.css                 # Global reset
        ├── utils/api.js              # Axios instance + all API functions
        ├── context/AuthContext.js    # Global auth state (login/register/logout)
        ├── components/
        │   ├── Navbar.js / .css
        │   ├── TaskCard.js / .css
        │   └── TaskModal.js / .css   # Create + Edit task modal
        └── pages/
            ├── Login.js / Auth.css
            ├── Register.js
            ├── Dashboard.js / .css   # Stats + recent tasks
            └── TasksPage.js / .css   # All tasks with filters
```

## Setup & Run

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in MONGO_URI and JWT_SECRET
npm run dev            # Starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start              # Starts on http://localhost:3000
```

## API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/tasks | Get all tasks (filterable) | Yes |
| POST | /api/tasks | Create task | Yes |
| GET | /api/tasks/:id | Get task by ID | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |
| GET | /api/tasks/stats/summary | Task count by status | Yes |
| PUT | /api/users/profile | Update profile | Yes |
| PUT | /api/users/password | Change password | Yes |
