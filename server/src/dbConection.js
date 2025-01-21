import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render's SSL connections
  },
});

// Function to ensure the `task` table exists
const ensureTaskTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS task (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    const client = await pool.connect(); // Get a connection from the pool
    await client.query(createTableQuery); // Run the query
    console.log("Table 'task' is ready.");
    client.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error ensuring 'task' table exists:", error);
  }
};

// Ensure the table exists when starting the app
ensureTaskTableExists();

export default pool;
