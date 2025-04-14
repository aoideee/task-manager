// Filename: /config/db.js

// Import pg for PostgreSQL and dotenv to load environment variables
import pg from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Destructure the Pool constructor from the pg module
const { Pool } = pg;

// Create a new PostgreSQL connection pool using environment variables
const pool = new Pool({
  host: process.env.DB_HOST, // Database server host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT, // Database port
});

// Attempt an initial connection to verify configuration
pool.connect((err, client, release) => {
  if (err) {
    // Log an error message if the connection fails
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  // Release the client back to the pool once connected
  release();
});

// Listen for unexpected errors on the idle clients in the pool
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Export a helper function to perform queries using the connection pool
export const query = (text, params) => pool.query(text, params);

// Export the pool instance as the default export for use in other modules
export default pool;