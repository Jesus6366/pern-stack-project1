import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

dotenv.config(); // Load environment variables

const port = process.env.PORT || 4000;
const frontendURL = process.env.FRONTEND_URL;

const app = express();

// middlewares
app.use(cors());

app.use(
  cors({
    origin: frontendURL, // Cambia esto según tu dominio de frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
// use routes
app.use(taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
