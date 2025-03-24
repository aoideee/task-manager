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
    name: task,
    description: description || "",
    completed: false,
  });

  res.redirect("/");
});

// Toggle completed status
router.post("/toggle-task", (req, res) => {
  const { index } = req.body;
  const taskIndex = parseInt(index, 10);

  console.log(`Toggle request for task index: ${taskIndex}`);

  if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < taskman.length) {
    taskman[taskIndex].completed = !taskman[taskIndex].completed;
  } else {
    console.log(`Invalid toggle index: ${taskIndex}`);
  }

  res.redirect("/");
});

// Delete task
router.post("/delete-task", (req, res) => {
  const { index } = req.body;
  const taskIndex = parseInt(index, 10);

  console.log(`Delete request for task index: ${taskIndex}`);

  if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < taskman.length) {
    taskman.splice(taskIndex, 1);
    console.log(`Task deleted. New task list:`, taskman);
  } else {
    console.log(`Invalid delete index: ${taskIndex}`);
  }

  res.redirect("/");
});

export default router;
