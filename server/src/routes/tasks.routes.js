import express from "express";

const router = express.Router();

router.get("/api/tasks", (req, res) => {
  res.send("getting all tasks");
});

router.get("/api/tasks/:id", (req, res) => {
  res.send("getting one task");
});

router.post("/api/tasks", (req, res) => {
  res.send("creating a task");
});

router.delete("/api/tasks/:id", (req, res) => {
  res.send("deleting a task");
});

router.put("/api/tasks/:id", (req, res) => {
  res.send("updating a task");
});

export default router;
