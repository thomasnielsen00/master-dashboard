const express = require("express");
const router = express.Router();
const { getGroupsBySession } = require("../database/groups");

// get all groups from a session
router.get("/sessions/:session_id/groups", async (req, res) => {
  const { session_id } = req.params;

  try {
    const groups = await getGroupsBySession(session_id);
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups for session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/group/:group_id/status", async (req, res) => {
  const { group_id } = req.params;

  // Hardcoded for now — later fetch from DB
  const response = {
    status: "success",
    progress_value: 0.5,
    progress: "Mid",
    group_number: parseInt(group_id),
    AiSuggestions: ["Thomas er lei seg, se på det", "Nils får ikke til noe"],
    students: [
      { name: "Ola", feeling: "happy", student_status: "success" },
      { name: "Kari", feeling: "neutral", student_status: "success" },
      { name: "Thomas", feeling: "sad", student_status: "error" },
      { name: "Nils", feeling: "sad", student_status: "warning" },
    ],
  };

  res.json(response);
});

module.exports = router;
