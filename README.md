# Leading Edge Task Manager

A full-stack task manager built with .NET and Next.js for my Leading Edge programming exercise.

## Tech Stack

**Backend**
- .NET 10 (Minimal API)
- Entity Framework Core
- SQLite

**Frontend**
- Next.js 16
- React 19
- Tailwind CSS

## Setup Instructions

**Prerequisites**
- .NET 10 SDK
- Node.js 20+
- pnpm (or npm)

Backend
```bash
cd backend
dotnet run
```
Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

SQLite database will be created on first run (letm.db), the backend will be available at http://localhost:5130 and the frontend at http://localhost:3000.

## Features
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete with sorting by completion status
- Edit task titles and descriptions inline
- Completely responsive and mobile-friendly design with full dark mode support

## API Endpoints
These endpoints are also advertised via the OpenAPI spec at http://localhost:5130/openapi/v1.json when ASPNETCORE_ENVIRONMENT is set to Development.

- `GET /v1/todos` - Get all todos
- `GET /v1/todos/{id}` - Get a specific todo
- `POST /v1/todos` - Create a new todo
- `PATCH /v1/todos/{id}` - Update a specific todo
- `DELETE /v1/todos/{id}` - Delete a specific todo