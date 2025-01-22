import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;

const app = express();

// middlewares
app.use(cors());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173/", // O el dominio de tu frontend desplegado
  })
);
app.use(morgan("dev"));
app.use(express.json());
// use routes
app.use(taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
