import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

new Pool({
  // default user postgres

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
