import { useState, useEffect } from "react";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskForm = (e) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // post request to send the data to api and database
    const response = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(task),
    });
    console.log(response);

    const data = await response.json();

    console.log(data);

    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#1e272e", padding: "1rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Create Task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                sx={{ display: "block", margin: ".5rem 0" }}
                label="Write your title"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                name="title"
                onChange={handleChange}
              />

              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                name="description"
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save Task"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
