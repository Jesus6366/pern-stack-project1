import pool from "../dbConection.js";

pool;

export const getAllTasks = async (req, res) => {
  res.send("retriving the list of tasks");
};

export const getOneTask = async (req, res) => {
  res.send("getting one task");
};

export const createTask = async (req, res) => {
  // missing validation of data
  const { title, description } = req.body;

  // sql consult using palceholders to avoid sql inyection
  pool.query("INSERT INTO task(title, description) VALUES($1,$2)", [
    title,
    description,
  ]);
  res.send("creating a task");
};

export const deleteTask = async (req, res) => {
  res.send("deleting a task");
};

export const updateTask = async (req, res) => {
  res.send("updating a task");
};
