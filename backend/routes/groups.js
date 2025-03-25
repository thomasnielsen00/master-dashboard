const express = require("express");
const router = express.Router();
const {
  getGroupsBySession,
  getGroupsWithDetails,
} = require("../database/groups");

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

// get group details
router.get("/sessions/:session_id/groups-with-details", (req, res) => {
  const { session_id } = req.params;

  getGroupsWithDetails(session_id)
    .then((groups) => res.json(groups))
    .catch((error) => {
      console.error("Error fetching group data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;

module.exports = router;
