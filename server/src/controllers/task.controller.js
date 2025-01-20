export const getAllTasks = async (req, res) => {
  res.send("retriving the list of tasks");
};

export const getOneTask = async (req, res) => {
  res.send("getting one task");
};

export const createTask = async (req, res) => {
  res.send("creating a task");
};

export const deleteTask = async (req, res) => {
  res.send("deleting a task");
};

export const updateTask = async (req, res) => {
  res.send("updating a task");
};
