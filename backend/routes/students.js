const express = require("express");
const router = express.Router();
const { getStudentFeelings } = require("../database/students");

router.get("/students/feelings", async (req, res) => {
  try {
    const data = await getStudentFeelings();
    res.json(data);
  } catch (error) {
    console.error("Error fetching student feelings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
