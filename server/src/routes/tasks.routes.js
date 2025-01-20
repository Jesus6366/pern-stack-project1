import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/api/tasks", getAllTasks);

router.get("/api/tasks/:id", getOneTask);

router.post("/api/tasks", createTask);

router.delete("/api/tasks/:id", deleteTask);

router.put("/api/tasks/:id", updateTask);

export default router;
