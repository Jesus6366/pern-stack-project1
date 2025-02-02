import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState(null); // Task-specific editing state

  const loadTasks = async () => {
    setIsLoading(true);
    console.log(import.meta.env.VITE_DB_API_BASE_URL);

    // fetch data from server
    const response = await fetch(
      `${import.meta.env.VITE_DB_API_BASE_URL}api/tasks`
    );

    // transform data into json
    const data = await response.json();
    console.log(data);
    setTasks(data);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_DB_API_BASE_URL}api/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    console.log(response);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setTask(task);
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id) => {
    console.log(id);

    // PUT request to update data
    const response = await fetch(
      `${import.meta.env.VITE_DB_API_BASE_URL}api/tasks/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(task),
      }
    );
    console.log(response);

    const data = await response.json();

    console.log(data);

    setEditingTaskId(null); // Exit editing mode
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>

      {isLoading ? (
        <h1>Loading tasks...</h1>
      ) : (
        tasks.map((t, id) => (
          <Card
            key={id}
            style={{
              marginBottom: ".7rem",
              backgroundColor: "#1e272e",
            }}
          >
            <CardContent
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {editingTaskId === t.id ? (
                <div>
                  <TextField
                    hiddenLabel
                    variant="filled"
                    sx={{ display: "block", margin: ".5rem 0" }}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    name="title"
                    value={task.title || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    variant="filled"
                    sx={{ display: "block", margin: ".5rem 0" }}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    name="description"
                    value={task.description || ""}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div style={{ color: "white" }}>
                  <Typography>{t.title}</Typography>
                  <Typography>{t.description}</Typography>
                </div>
              )}

              <div>
                {editingTaskId === t.id ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => handleSubmit(t.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDelete(t.id)}
                  style={{ marginLeft: ".5rem" }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default TaskList;
