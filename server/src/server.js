import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import taskRoutes from "./routes/tasks.routes.js";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
// use routes
app.use(taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
