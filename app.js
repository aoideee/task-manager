// Filename: app.js

// Imports
import express from "express";
import path from "path";
import taskmanRoutes from "./routes/taskmanRoutes.js"

// Express app setup
const app = express(); // Creates the web server

// Middleware setup
app.use(express.urlencoded({ extended: true }));  // 
app.use(express.static(path.join(process.cwd(), "public"))); 
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views")); 

// Logging Middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}; 

app.use(loggingMiddleware);

// Route handler setup
app.use("/", taskmanRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render("notfound", {
      title: "Not Found",
      message: "Woahhh 0_0! Slow down there pal~ That page doesn't exist...",
    });
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 