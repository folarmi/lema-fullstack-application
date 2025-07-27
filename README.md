# Lema Fullstack App

A full-stack app with a React frontend (Vercel) and Node.js/Express backend (Render) for user blog posts with paginated data fetching.

## Hosted Links

- Frontend: [https://lema-fullstack-app.vercel.app](https://lema-fullstack-app.vercel.app)
- Backend: [https://lema-backend-87ow.onrender.com](https://lema-backend-87ow.onrender.com)

## Repository Structure

- `frontend/`: React app (package.json, src/, public/).
- `backend/`: Node.js/Express API (package.json, server.ts, dist/).
- `.gitignore`: Ignores node_modules/, dist/, build/, .env.
- `README.md`: This file.

## Prerequisites

- Node.js: v16+
- npm: v8+
- Git

## Setup

### Clone Repository

```bash
git clone https://github.com/your-username/lema-fullstack-app.git
cd lema-fullstack-app
```

# Node.js + Express + TypeScript + SQLite Backend

This is a simple backend server for handling blog posts and users, built with Express, TypeScript, and SQLite using `better-sqlite3`.

## 🚀 Features

- REST API (CRUD for Posts and Users)
- SQLite database (embedded, no external setup)
- Zod-based input validation
- CORS protection with environment-based origin config
- Secure headers with Helmet
- Custom error handler
- Timestamps for post creation (`created_at` field)

### Frontend

1.  Navigate: cd frontend
2.  Install: npm install
3.  Run: npm start (runs on http://localhost:5173)

### Backend

1.  Navigate: cd backend
2.  Install: npm install
3.  Create .env:

## Deployment

### Frontend (Vercel)

- Root: frontend
- Build: npm install && npm run build
- Output: build
- URL: <https://lema-fullstack-app.vercel.app>

### Backend (Render)

- Root: backend
- Build: npm install && npm run build
- Start: node dist/server.js
- Env: ALLOWED_ORIGINS=http://localhost:5173,https://lema-fullstack-app.vercel.app
- URL: <https://lema-backend-87ow.onrender.com>

## Contributing

1.  Branch: git checkout -b feature/your-feature
2.  Commit: git commit -m "Add feature"
3.  Push: git push origin feature/your-feature
4.  Open PR
