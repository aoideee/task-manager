// Filename: /routes/taskmanRoutes.js

// Import the Express module and create a new router instance.
import express from "express";
const router = express.Router();

// Import controller functions to handle task operations.
import {
  getTasksHandler, // GET / : Fetch and display all tasks.
  createTask, // POST /tasks : Create a new task.
  patchToggleTask, // PATCH /tasks/:id : Toggle task completion status.
  deleteTaskHandler, // DELETE /tasks/:id : Delete a task.
  updateTaskHandler, // PUT /tasks/:id : Update a task's details.
} from "../controllers/taskManControllers.js";

// Define the route to display the home page with the task list.
router.get("/", getTasksHandler);

// Define the route to create a new task.
router.post("/tasks", createTask);

// Define the route to toggle the completion status of a task.
router.patch("/tasks/:id", patchToggleTask);

// Define the route to delete a task.
router.delete("/tasks/:id", deleteTaskHandler);

// Define the route to update a task's details.
router.put("/tasks/:id", updateTaskHandler);

// Define a catch-all route to handle 404 (Not Found) errors.
// This will render the "notfound" view with a custom message.
router.use((req, res) => {
  res.status(404).render("notfound", {
    title: "Page Not Found",
    message: "Woahhh 0_0! Slow down there pal~ That page doesn't exist...",
  });
});

// Export the router so it can be used in app.js.
export default router;