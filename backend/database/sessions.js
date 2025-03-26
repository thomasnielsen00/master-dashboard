const { getGroupsBySession } = require("./groups"); // import your existing function
const { getGroupEngagement } = require("./groups"); // import your existing function

function getClassEngagement(sessionId) {
  return getGroupsBySession(sessionId) // ⬅ MUST return this promise!
    .then((groups) => {
      const groupIds = groups.map((g) => g.group_id);

      const engagementPromises = groupIds.map((groupId) =>
        getGroupEngagement(groupId, sessionId)
      );

      return Promise.all(engagementPromises);
    })
    .then((engagementValues) => {
      if (engagementValues.length === 0) return 0;
      const total = engagementValues.reduce((sum, val) => sum + val, 0);
      const average = total / engagementValues.length;
      return Math.round(average);
    })
    .catch((err) => {
      console.error("Error calculating class engagement:", err);
      throw err;
    });
}

module.exports = { getClassEngagement };
