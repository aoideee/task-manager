# Task Management Web App

## Overview

This Task Management Web App is built using Node.js, Express, EJS, and PostgreSQL. The application allows users to view a list of tasks, add new tasks, toggle their completion status, update task details, and delete tasks. It also includes features like search, filtering, and pagination.

## Features

- **View Tasks:** Display a list of all tasks retrieved from a PostgreSQL database.
- **Add New Task:** Create a new task with validations ensuring that the title is between 3-100 characters and the optional description does not exceed 500 characters.
- **Toggle Completion:** Mark tasks as complete or incomplete.
- **Update Task:** Modify task details via an inline hidden form.
- **Delete Task:** Remove tasks from the database.
- **Filtering & Search:** Filter tasks by priority or completion status, and search for tasks by title or description.
- **Pagination:** Display tasks in pages using LIMIT and OFFSET queries.

## Technologies Used

- **Backend:** Node.js, Express, EJS
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS (with Flexbox for layout)
- **Additional:** dotenv for environment variable management, method-override to support PUT/PATCH/DELETE methods in forms

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or later recommended)
- **PostgreSQL** installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project with the following variables (adjust as necessary):
```bash
DB_USER=tasks
DB_PASSWORD=pbm
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tasks
PORT=3000
```

### 4. Set Up the PostgreSQL Database
Create a PostgreSQL database (named tasks as used above) and execute the following SQL command to create the required table:

```bash
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  priority VARCHAR(10) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
### 5. Run the Application
```bash
npm start
```
Open your browser and navigate to http://localhost:3000 to use the app.

## Project Structure
- /config/db.js: Database connection configuration using PostgreSQL and connection pooling.

- /controllers/taskManControllers.js: Controller functions to handle task creation, updating, deletion, toggling, and retrieval.

- /models/taskManModels.js: Database operations with parameterized queries.

- /routes/taskmanRoutes.js: Express route definitions for the task management functionality.

- /views/: EJS templates (including partials for header and footer) for server-side rendering.

- /public/styles.css: Stylesheet for the app’s frontend.

- .env: Environment configuration file (not committed to GitHub).

- .gitignore: Specifies files/folders (like /node_modules and .env) to ignore in Git.

## Additional Notes
- Server-Side Validation: Input data is validated on the server; if validation fails, appropriate error messages are displayed to the user.

- Error Handling: Both database and application errors are handled gracefully, with the server logging errors and returning meaningful status codes.

- Stretch Goals: The project includes filtering, search functionality, and pagination as additional features.

## License
This project is for educational purposes.
