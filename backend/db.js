require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err, client) => {
  console.error("Error occurred:", err);
  process.exit(-1);
});

module.exports = pool;
