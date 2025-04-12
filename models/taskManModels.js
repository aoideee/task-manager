// Filename: /models/taskManModels.js

import { query } from "../config/db.js";

export const getTasks = async () => {
    try {
        const result = await query(
        "SELECT * FROM tasks ORDER BY priority ASC, id ASC"
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching tasks:", err);
      throw err;
    }
};

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

export const toggleTask = async (id) => {
    try {
      await query(
        "UPDATE tasks SET completed = NOT completed WHERE id = $1",
        [id]
      );
    } catch (err) {
      console.error("Error toggling task:", err);
      throw err;
    }
};

export const deleteTask = async (id) => {
    try {
      await query("DELETE FROM tasks WHERE id = $1", [id]);
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
};