# Library Management System

A web-based Library Management System developed with a Node.js (Express & Sequelize) backend and a React (Vite & Tailwind CSS/Vanilla CSS) frontend.

## Project Structure

This repository contains both the frontend and backend parts of the application:

*   **`backend/`**: Express server utilizing PostgreSQL/Sequelize for data models (Books, Students, Library transactions).
*   **`frontend/`**: React application built with Vite, utilizing modern interactive components.

---

## Features

### Frontend (React)
- **Dashboard**: High-level overview of library statistics (Total Books, Active Students, Issued Books).
- **Book Management**: Add, view, edit, or delete books, including uploads for book covers.
- **Student Management**: Register and manage students.
- **Issue/Return Tracker**: Check books in and out, track due dates, and view transaction history.

### Backend (Express & PostgreSQL)
- **Node.js/Express REST API**: Clean endpoints for CRUD operations on books, students, and checkouts.
- **ORM Integration**: Database communication using Sequelize with PostgreSQL.
- **File Uploads**: Cover images uploaded and managed via Multer.
- **Seed Data script**: Quick database population script for development and testing.

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (running locally or remotely)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create/Configure environment variables. Copy the `.env` configuration (or create it if it doesn't exist) and set your database connection URI:
   ```env
   PORT=5000
   POSTGRES_URI=postgres://username:password@localhost:5432/library_db
   ```

4. *(Optional)* Seed the database with initial mock data:
   ```bash
   node seed.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   The backend server should run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend app will be running, typically on `http://localhost:5173`.

---

## Git Repository & Push Details
To push this project to your repository, standard git tracking has been configured to exclude dynamic folders such as `node_modules` and local environment variables `.env`.

