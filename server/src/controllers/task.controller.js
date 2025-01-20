import pool from "../dbConection.js";

pool;

export const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOneTask = async (req, res) => {
  res.send("getting one task");
};

export const createTask = async (req, res) => {
  // missing validation of data
  const { title, description } = req.body;

  console.log("Request body:", req.body);

  // sql consult using palceholders to avoid sql inyection
  try {
    // Perform SQL insert query using placeholders
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    // Send a response with the newly created task
    return res
      .status(201)
      .json({ message: "Task created successfully", task: result.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Database error", details: error.message });
  }
};

export const deleteTask = async (req, res) => {
  res.send("deleting a task");
};

export const updateTask = async (req, res) => {
  res.send("updating a task");
};
