// Filename: app.js

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";

// Import routes for task management
import taskRoutes from "./routes/taskmanRoutes.js";

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setup EJS as the view engine and specify the directory for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse URL-encoded data (for form submissions) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use method override to support HTTP verbs such as PUT, PATCH, and DELETE via query parameter _method
app.use(methodOverride("_method"));

// Serve static assets (like CSS, JS, images) from the /public directory
app.use(express.static(path.join(__dirname, "public")));

// Register the task routes with the base URL
app.use("/", taskRoutes);

// Basic error handling middleware - logs error stack and sends a generic error message to the client
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server on the specified port (from environment variable or default 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});