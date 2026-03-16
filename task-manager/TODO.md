# Task Manager Setup & Run

## Current Progress
- [x] Analyzed project structure and identified port mismatch bug (frontend 3001 vs backend 5000)
- [ ] Fix frontend API port and proxy
- [ ] Verify backend .env (MONGO_URI=mongodb://localhost:27017/taskmanager, JWT_SECRET)
- [ ] Install deps if needed
- [ ] Start backend: cd task-manager/backend & npm run dev
- [ ] Start frontend: cd task-manager/frontend & npm start  
- [ ] Test: http://localhost:3000 - register, login, CRUD tasks

## Notes
- Local MongoDB at localhost:27017/taskmanager (ensure Mongo service running)
- JWT_SECRET: generate strong one, e.g. openssl rand -base64 32
