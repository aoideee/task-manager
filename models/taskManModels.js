// Filename: /models/taskManModels.js

import { query } from "../config/db.js";

export const getTasks = async () => {
    try {
        const result = await query(
        "SELECT * FROM taskman ORDER BY priority ASC, id ASC"
      );
      return result.rows;
    } catch (err) {
      console.error("Error fetching tasks:", err);
      throw err;
    }
};

export const addTask = async (taskname, description, priority) => {
    try {
      await query(
        "INSERT INTO taskman (taskname, description, priority, completed) VALUES ($1, $2, $3, false)",
        [taskname, description, priority]
      );
    } catch (err) {
      console.error("Error adding task:", err);
      throw err;
    }
};

export const toggleTask = async (id) => {
    try {
      await query(
        "UPDATE taskman SET completed = NOT completed WHERE id = $1",
        [id]
      );
    } catch (err) {
      console.error("Error toggling task:", err);
      throw err;
    }
};

export const deleteTask = async (id) => {
    try {
      await query("DELETE FROM taskman WHERE id = $1", [id]);
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
};