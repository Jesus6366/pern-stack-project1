import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const loadTasks = async () => {
    // fetch data from server
    const response = await fetch("http://localhost:5000/api/tasks");

    // transform data into json
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    console.log(response);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card
          key={task.title}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ color: "white" }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => console.log("Editing")}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default TaskList;
