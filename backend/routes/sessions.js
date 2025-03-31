const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure you have a separate db.js file
const ClassEngagement = require("../data/classEngagement");
const ClassProgression = require("../data/classProgression");
const { getClassEngagement } = require("../database/groups");

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

// implement this to external api that provides progression data
router.get("/sessions/:session_id/classProgression", (req, res) => {
  res.json(ClassProgression);
});

router.get("/sessions/:session_id/classEngagement", (req, res) => {
  const session_id = parseInt(req.params.session_id);

  getClassEngagement(session_id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching class engagement:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
