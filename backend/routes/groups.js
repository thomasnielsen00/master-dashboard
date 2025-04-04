const express = require("express");
const router = express.Router();
const {
  getGroupsBySession,
  getGroupsWithDetails,
} = require("../database/groups");
const ClassProgression = require("../data/classProgression");

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

// get group progression
router.get("/sessions/:session_id/groupProgression", (req, res) => {
  const sessionId = req.params.session_id;
  const latestProgress = ClassProgression[sessionId].map((group) => {
    const lastPoint = group.data[group.data.length - 1];
    return {
      group_id: group.id,
      latest_progress: lastPoint.y,
    };
  });

  res.json(latestProgress);
});

router.get("/:sessionId/groups/attentionNeeded", (req, res) => {
  const sessionId = parseInt(req.params.sessionId, 10);

  getGroupsWithDetails(sessionId)
    .then((groups) => {
      const attentionNeededCount = groups.filter(
        (g) => g.status === "error" || g.status === "warning"
      ).length;
      res.json(attentionNeededCount);
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
