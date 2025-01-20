import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  updateTask,
} from "../controllers/task.controller.js";

import { validateCreateTask } from "../middleware/createTaskValidation.js";

const router = express.Router();

router.get("/api/tasks", getAllTasks);

router.get("/api/tasks/:id", getOneTask);

router.post("/api/tasks", validateCreateTask, createTask);

router.delete("/api/tasks/:id", deleteTask);

router.put("/api/tasks/:id", validateCreateTask, updateTask);

export default router;
