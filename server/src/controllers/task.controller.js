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
  const id = parseInt(req.params.id);
  // validation of id
  if (!id && typeof id !== Number) {
    return res
      .status(400)
      .json({ message: "id must not be empty and has to be a number" });
  }
  console.log(id);
  try {
    const foundTask = await pool.query("SELECT * FROM task WHERE id = $1", [
      id,
    ]);

    if (foundTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(foundTask.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
  const id = parseInt(req.params.id);
  // validation of id
  if (!id && typeof id !== Number) {
    return res
      .status(400)
      .json({ message: "id must not be empty and has to be a number" });
  }

  try {
    const foundTaskToBeDeleted = await pool.query(
      "DELETE FROM task WHERE id = $1",
      [id]
    );

    if (foundTaskToBeDeleted.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  res.send("updating a task");
};
