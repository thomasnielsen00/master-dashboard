const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure you have a separate db.js file

router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
