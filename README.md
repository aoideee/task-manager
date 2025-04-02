# 📝 Task Mates – A Task Management Web App

Welcome to **Task Mates**, a simple, server-rendered task management web app built with **Node.js**, **Express**, **PostgreSQL**, and **EJS**. This app allows users to:

✅ View their list of tasks  
✅ Add new tasks with optional descriptions and priority levels  
✅ Mark tasks as complete  
✅ Delete tasks  
✅ See validation feedback if input is invalid

---

## 📁 Project Structure

- `/controllers` – Logic for handling requests  
- `/models` – PostgreSQL database operations  
- `/routes` – Express routes setup  
- `/views` – EJS templates for server-side rendering  
- `/public` – CSS and static assets

---

## 🚀 How to Run the App

1. **Clone the repository**  
```bash
git clone https://github.com/aoideee/task-manager.git
cd task-manager
```
2. **Install dependencies**
```bash
npm install
```
3. **Create a .env file**
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=taskmates_db
```
4. **Set up the database**

  Run this SQL in your PostgreSQL shell or GUI:
```bash
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  priority VARCHAR(10),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
5. **Start the server**
```bash
node app.js
```
or
```bash
npx nodemon app.js
```
6. **Visit:**
```bash
http://localhost:3000
```

## ✅ Features

- Server-side rendering using EJS

- Clean MVC structure

- Form validation with inline error display

- Priority badge styles (Low, Medium, High)

- Completed task styling

- Partials for reusable layout (header/footer)

## 🛠 Technologies Used
- Node.js

- Express

- PostgreSQL

- EJS

- CSS (custom, no frameworks)

- dotenv
