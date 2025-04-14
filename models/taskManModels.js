// Filename: /models/taskManModels.js

// Import the query helper from our database configuration.
import { query } from "../config/db.js";

/**
 * getTasks - Retrieves tasks from the database with optional filtering, search, and pagination.
 */
export const getTasks = async (filter = {}) => {
  const conditions = [];
  const params = [];
  let paramIdx = 1;

  // Filter by priority if provided.
  if (filter.priority && ["Low", "Medium", "High"].includes(filter.priority)) {
    conditions.push(`priority = $${paramIdx}`);
    params.push(filter.priority);
    paramIdx++;
  }

  // Filter by completion status if defined.
  if (filter.completed !== undefined && filter.completed !== "") {
    // Convert the completed value to boolean (it could be a string from query parameters)
    const completed = filter.completed === "true";
    conditions.push(`completed = $${paramIdx}`);
    params.push(completed);
    paramIdx++;
  }

  // Filter by search term in title or description if provided.
  if (filter.search) {
    conditions.push(
      `(title ILIKE $${paramIdx} OR description ILIKE $${paramIdx})`
    );
    params.push(`%${filter.search}%`);
    paramIdx++;
  }

  // Build the base SQL query.
  let queryStr = "SELECT * FROM tasks";
  if (conditions.length > 0) {
    queryStr += " WHERE " + conditions.join(" AND ");
  }
  queryStr += " ORDER BY priority ASC, id ASC";

  // Apply pagination if page and limit are provided.
  if (filter.page && filter.limit) {
    queryStr += ` LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`;
    params.push(
      parseInt(filter.limit, 10),
      (parseInt(filter.page, 10) - 1) * parseInt(filter.limit, 10)
    );
    paramIdx += 2;
  }

  try {
    const result = await query(queryStr, params);
    return result.rows;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

/**
 * addTask - Inserts a new task into the database.
 */
export const addTask = async (title, description, priority) => {
  try {
    await query(
      "INSERT INTO tasks (title, description, priority, completed) VALUES ($1, $2, $3, false)",
      [title, description, priority]
    );
  } catch (err) {
    console.error("Error adding task:", err);
    throw err;
  }
};

/**
 * toggleTask - Toggles the completion status of a task.
 */
export const toggleTask = async (id) => {
  try {
    await query("UPDATE tasks SET completed = NOT completed WHERE id = $1", [
      id,
    ]);
  } catch (err) {
    console.error("Error toggling task:", err);
    throw err;
  }
};

/**
 * updateTask - Updates a task's details in the database.
 */
export const updateTask = async (id, title, description, priority) => {
  try {
    await query(
      "UPDATE tasks SET title = $1, description = $2, priority = $3 WHERE id = $4",
      [title, description, priority, id]
    );
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};

/**
 * deleteTask - Deletes a task from the database.
 */
export const deleteTask = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting task:", err);
    throw err;
  }
};