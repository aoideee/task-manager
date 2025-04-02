// Filename: /routes/taskmanRoutes.js

import express from "express";
const router = express.Router();
import { getHome, postAddTask, postToggleTask, postDeleteTask } from "../controllers/taskManControllers.js";
router.get("/", getHome);
router.post("/add-task", postAddTask);
router.post("/toggle-task", postToggleTask);
router.post("/delete-task", postDeleteTask);

router.get("/");
router.post("/add-task");
router.post("/toggle-task");
router.post("/delete-task");

router.use((req, res) => {
    res.status(404).render('notfound', {title: 'Page Not Found', message: "Woahhh 0_0! Slow down there pal~ That page doesn't exist..."});
});

export default router;
