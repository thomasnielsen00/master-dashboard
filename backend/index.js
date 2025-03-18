require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database at", res.rows[0].now);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define other routes here

const groupRoutes = require("./routes/groups");
app.use("/api", groupRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
