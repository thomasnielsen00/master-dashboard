const express = require("express");
const router = express.Router();
const {
  getStudentFeelings,
  getStudentsAttentionNeeded,
  getStudentsTotalCount,
} = require("../database/students");
const {
  getStudentEngagement,
  getGroupEngagement,
} = require("../database/groups");

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

router.get("/:sessionId/students/attentionNeeded", (req, res) => {
  const sessionId = parseInt(req.params.sessionId, 10);

  getStudentsAttentionNeeded(sessionId)
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

router.get("/:sessionId/students/total", (req, res) => {
  const sessionId = parseInt(req.params.sessionId, 10);

  getStudentsTotalCount(sessionId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching count of students in total:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
