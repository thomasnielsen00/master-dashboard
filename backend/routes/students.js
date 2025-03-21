const express = require("express");
const router = express.Router();
const {
  getStudentFeelings,
  getStudentAttentionNeeded,
} = require("../database/students");

// this should not be used in production
router.get("/students/feelings", async (req, res) => {
  try {
    const data = await getStudentFeelings();
    res.json(data);
  } catch (error) {
    console.error("Error fetching student feelings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:sessionId/students/attentionNeeded/", (req, res) => {
  const sessionId = parseInt(req.params.sessionId, 10);

  getStudentAttentionNeeded(sessionId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(
        "Error fetching count of students in need of attention:",
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
