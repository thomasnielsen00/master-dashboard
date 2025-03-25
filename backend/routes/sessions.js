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

const ClassProgression = [
  {
    id: "Group 1",
    data: [
      { x: "0 min", y: 0.1 },
      { x: "10 min", y: 0.2 },
      { x: "20 min", y: 0.3 },
      { x: "30 min", y: 0.25 },
      { x: "40 min", y: 0.35 },
      { x: "50 min", y: 0.4 },
      { x: "60 min", y: 0.45 },
    ],
  },
  {
    id: "Group 2",
    data: [
      { x: "0 min", y: 0.05 },
      { x: "10 min", y: 0.15 },
      { x: "20 min", y: 0.25 },
      { x: "30 min", y: 0.2 },
      { x: "40 min", y: 0.3 },
      { x: "50 min", y: 0.35 },
      { x: "60 min", y: 0.38 },
    ],
  },
  {
    id: "Group 3",
    data: [
      { x: "0 min", y: 0.08 },
      { x: "10 min", y: 0.18 },
      { x: "20 min", y: 0.28 },
      { x: "30 min", y: 0.23 },
      { x: "40 min", y: 0.33 },
      { x: "50 min", y: 0.38 },
      { x: "60 min", y: 1 },
    ],
  },
  {
    id: "Group 4",
    data: [
      { x: "0 min", y: 0.18 },
      { x: "10 min", y: 0.28 },
      { x: "20 min", y: 0.38 },
      { x: "30 min", y: 0.43 },
      { x: "40 min", y: 0.53 },
      { x: "50 min", y: 0.68 },
      { x: "60 min", y: 0.91 },
    ],
  },
];

const ClassEngagement = { engagement_value: 80, trend: "up" };

// implement this to external api that provides progression data
router.get("/sessions/:session_id/classProgression", (req, res) => {
  res.json(ClassProgression);
});

//change to a calculation based on data from student last three recoreded feelings
// {engagement_value: 0-100, trend: "up" | "down" | "flat"}
router.get("/sessions/:session_id/classEngagement", (req, res) => {
  res.json(ClassEngagement);
});

module.exports = router;
