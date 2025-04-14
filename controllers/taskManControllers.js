// Filename: controllers/taskManControllers.js

// Import necessary model functions from taskManModels.js
import {
  getTasks,
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
} from "../models/taskManModels.js";

/**
 * validateTask - Helper function to validate task inputs.
 * - Title must be provided and be between 3 and 100 characters.
 * - Description, if provided, cannot exceed 500 characters.
 */
function validateTask(title, description) {
  const errors = [];
  if (!title || title.trim().length < 3 || title.trim().length > 100) {
    errors.push("Title is required and must be between 3 and 100 characters.");
  }
  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters.");
  }
  return errors;
}

/**
 * GET / - Handler for retrieving and displaying all tasks with the Add Task form.
 * Builds a filter object from query parameters to support filtering, search, and pagination.
 */
export async function getTasksHandler(req, res, next) {
  // Destructure possible filtering options from query string.
  const { priority, completed, search, page, limit } = req.query;
  const filter = {};
  if (priority) filter.priority = priority;
  if (completed !== undefined) filter.completed = completed;
  if (search) filter.search = search;
  if (page && limit) {
    filter.page = page;
    filter.limit = limit;
  }

  try {
    // Fetch tasks with the applied filter.
    const tasks = await getTasks(filter);
    // Render the "home" view with tasks and filter options.
    res.render("home", { tasks, errors: [], title: "Task Mates", filter });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /tasks - Handler for creating a new task.
 * Validates input data before inserting into the database.
 * On validation error, re-renders the home view with error messages.
 */
export async function createTask(req, res, next) {
  const { title, description, priority } = req.body;

  // Validate task inputs.
  const errors = validateTask(title, description);
  if (errors.length > 0) {
    // On validation errors, re-fetch tasks and render home view with errors.
    const tasks = await getTasks();
    return res.render("home", {
      tasks,
      errors,
      title: "Task Mates",
      filter: {},
    });
  }

  try {
    // Insert the new task into the database.
    await addTask(title, description, priority);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /tasks/:id - Handler for toggling a task's completion status.
 */
export async function patchToggleTask(req, res, next) {
  const { id } = req.params;
  try {
    await toggleTask(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /tasks/:id - Handler for deleting a task by its ID.
 */
export async function deleteTaskHandler(req, res, next) {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /tasks/:id - Handler for updating a task's details.
 * Validates the new input; if there are errors, re-renders home view with the error messages.
 */
export async function updateTaskHandler(req, res, next) {
  const { id } = req.params;
  const { title, description, priority } = req.body; // extract priority as well
  const errors = validateTask(title, description);

  if (errors.length > 0) {
    // If validation fails, re-fetch tasks and render home view with errors.
    const tasks = await getTasks();
    return res.render("home", {
      tasks,
      errors,
      title: "Task Mates",
      filter: {},
    });
  }

  try {
    // Update the task with the new inputs.
    await updateTask(id, title, description, priority);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}