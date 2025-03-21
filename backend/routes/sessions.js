const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure you have a separate db.js file

router.get("/sessions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sessions ORDER BY session_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all groups from a session

module.exports = router;
