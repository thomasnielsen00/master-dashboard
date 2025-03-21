const express = require("express");
const router = express.Router();
const { getTeachers } = require("../database/teachers");

// GET all teachers
router.get("/teachers", async (req, res) => {
  try {
    const result = await getTeachers();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
