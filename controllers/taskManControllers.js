// Filename: /contollers/taskManControllers.js

import { getTasks, addTask, toggleTask, deleteTask } from "../models/taskManModels.js";

// Show task list
export const getHome = async (req, res) => {
  const tasks = await getTasks();
  res.render('home', {title: 'Your Task List', tasks});
};

// Add new task
export const postAddTask = async (req, res) => {
  const { task, description, priority } = req.body;
  const errors = [];

  if (!task || task.trim().length < 3 || task.length > 100) {
    errors.push("Task title must be between 3 and 100 characters.");
  }

  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    const tasks = await getTasks();
    return res.render("home", {title: "Task Mates", tasks, errors});
  }

  await addTask(task, description, priority);
  res.redirect('/');
};

// Toggle completed status
export const postToggleTask = async (req, res) => {
  const { index } = req.body;
  await toggleTask(index);
  res.redirect('/');
};

// Delete task
export const postDeleteTask = async (req, res) => {
  const { index } = req.body;
  await deleteTask(index);
  res.redirect('/');
};
