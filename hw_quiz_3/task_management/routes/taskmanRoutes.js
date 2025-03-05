// Filename: taskmanRoutes.js

import express from "express";
const router = express.Router();

let taskman = [];

// Show task list
router.get("/", (req, res) => {
  res.render("home", {
    title: "Add a Task",
    tasks: taskman,
  });
});

// Add new task
router.post("/add-task", (req, res) => {
  const { task, description } = req.body;
  if (!task) return res.status(400).send("Task name required.");

  taskman.push({
    id: Date.now().toString(),
    name: task,
    description: description || "",
    completed: false,
  });

  res.redirect("/");
});

// Toggle completed status
router.post("/toggle-task/:id", (req, res) => {
  const { id } = req.params;
  const task = taskman.find((t) => t.id === id);

  if (!task) {
    return res.status(404).send("Task not found.");
  }

  task.completed = !task.completed;
  res.redirect("/");
});

// Delete task
router.post("/delete-task/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = taskman.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send("Task not found.");
  }

  taskman.splice(taskIndex, 1);
  res.redirect("/");
});

export default router;
