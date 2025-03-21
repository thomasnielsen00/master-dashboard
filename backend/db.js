require("dotenv").config();
const { Pool } = require("pg");

// Change for test and productions
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_TEST_DATABASE,
  // database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database at", res.rows[0].now);
  }
});

pool.on("error", (err, client) => {
  console.error("Error occurred:", err);
  process.exit(-1);
});

module.exports = pool;
