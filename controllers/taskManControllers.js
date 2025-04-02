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
