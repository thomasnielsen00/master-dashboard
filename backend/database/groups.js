const pool = require("../db"); // Import the database connection
const ClassProgression = require("../data/classProgression");

// ✅ Fetch all groups in a session
function getGroupsBySession(session_id) {
  return pool
    .query(
      `SELECT g.group_id, g.group_name 
       FROM session_groups sg
       JOIN student_groups g ON sg.group_id = g.group_id
       WHERE sg.session_id = $1
       ORDER BY g.group_id`,
      [session_id]
    )
    .then((result) => result.rows)
    .catch((error) => {
      console.error("Database error (getGroupsBySession):", error);
      throw error;
    });
}

function getStudentIdsByGroupAndSession(groupId, sessionId) {
  return pool
    .query(
      `
      SELECT s.student_id
      FROM students s
      JOIN student_groups g ON s.group_id = g.group_id
      JOIN session_groups sg ON sg.group_id = g.group_id
      WHERE g.group_id = $1 AND sg.session_id = $2
      ORDER BY s.student_id;
      `,
      [groupId, sessionId]
    )
    .then((result) => result.rows.map((row) => row.student_id))
    .catch((error) => {
      console.error("Database error (getStudentIdsByGroupAndSession):", error);
      throw error;
    });
}

function getClassEngagement(sessionId) {
  return getGroupsBySession(sessionId)
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

function getClassAverageProgression(sessionId) {
  if (!Array.isArray(ClassProgression) || ClassProgression.length === 0) {
    return 0;
  }

  let total = 0;
  let count = 0;

  ClassProgression.forEach((group) => {
    const dataPoints = group.data;
    if (Array.isArray(dataPoints) && dataPoints.length > 0) {
      const newestValue = dataPoints[dataPoints.length - 1].y;
      total += newestValue;
      count += 1;
    }
  });

  if (count === 0) return 0;
  return total / count;
}

function getStudentStatus(emotion, engagement) {
  // If no emotion was detected, treat it as "neutral"
  if (!emotion) emotion = "neutral";

  const negativeFeelings = ["angry", "fearful", "disgusted"];
  const warningFeelings = ["sad", "surprised"];
  const positiveFeelings = ["happy", "neutral"];

  let status = "success";
  let cause = null;

  const isNegativeFeeling = negativeFeelings.includes(emotion);
  const isLowEngagement = engagement < 40;

  if (isNegativeFeeling || isLowEngagement) {
    status = "error";

    // Figure out the cause
    if (isNegativeFeeling && isLowEngagement) {
      cause = "both";
    } else if (isNegativeFeeling) {
      cause = "emotion";
    } else {
      cause = "engagement";
    }

    return { status, cause };
  }

  const isWarningFeeling = warningFeelings.includes(emotion);
  const isMediumEngagement = engagement >= 40 && engagement < 60;

  if (isWarningFeeling || isMediumEngagement) {
    status = "warning";

    // If you want a cause for warnings, set it here
    if (isWarningFeeling && isMediumEngagement) {
      cause = "both";
    } else if (isWarningFeeling) {
      cause = "emotion";
    } else {
      cause = "engagement";
    }

    return { status, cause };
  }

  return { status, cause };
}

// based on student status, group progression, and group engagement
function getGroupStatus(students, groupProgress, groupEngagement) {
  return "success";
}

// INPUT:
// const sampleEmotions = {
//   "angry": 0,
//   "fearful": 0,
//   "happy": 2,
//   "sad": 0,
//   "surprised": 1,
//   "disgusted": 0,
//   "neutral": 10
// };

// potentially use studentid and sessionid to fecth from db
function getStudentEngagement(studentId, sessionId) {
  // Arousal-based scores for each emotion (1–100 scale)
  // Adjusted "neutral" to 50 to better represent a mid-level arousal
  const emotionArousalMap = {
    angry: 70,
    fearful: 80,
    happy: 85,
    sad: 30,
    surprised: 90,
    disgusted: 40,
    neutral: 40,
  };

  // Neutral discount factor - reduce neutral’s frequency so it doesn’t overshadow others.
  // Example: 0.5 means we treat neutral as half as impactful as other emotions.
  const neutralDiscountFactor = 0.5;

  return new Promise((resolve, reject) => {
    pool
      .query(
        `SELECT emotion, COUNT(*) AS count
         FROM webcam_logs
         WHERE student_id = $1 AND session_id = $2
         GROUP BY emotion`,
        [studentId, sessionId]
      )
      .then((result) => {
        const emotionFrequencies = {
          angry: 0,
          fearful: 0,
          happy: 0,
          sad: 0,
          surprised: 0,
          disgusted: 0,
          neutral: 0,
        };

        result.rows.forEach((row) => {
          const emotion = row.emotion;
          const count = parseInt(row.count);
          if (emotion in emotionFrequencies) {
            emotionFrequencies[emotion] = count;
          }
        });

        // Calculate engagement
        let totalWeightedScore = 0;
        let totalFrequency = 0;

        for (const emotion in emotionFrequencies) {
          const freq = emotionFrequencies[emotion];
          const effectiveFreq =
            emotion === "neutral" ? freq * neutralDiscountFactor : freq;

          totalWeightedScore += emotionArousalMap[emotion] * effectiveFreq;
          totalFrequency += effectiveFreq;
        }

        let engagement = 0;
        if (totalFrequency > 0) {
          engagement = totalWeightedScore / totalFrequency;
        }

        engagement = Math.max(1, Math.min(100, engagement));
        resolve(Math.round(engagement));
      })
      .catch((err) => {
        console.error("Error fetching emotion counts:", err);
        reject(err);
      });
  });
}

function getGroupEngagement(groupId, sessionId) {
  return getStudentIdsByGroupAndSession(groupId, sessionId)
    .then((studentIds) => {
      const engagementPromises = studentIds.map((studentId) =>
        getStudentEngagement(studentId, sessionId)
      );

      return Promise.all(engagementPromises);
    })
    .then((engagementValues) => {
      const total = engagementValues.reduce((sum, val) => sum + val, 0);
      const average = total / engagementValues.length || 0;
      return Math.round(average);
    })
    .catch((error) => {
      console.error("Error calculating group engagement:", error);
      throw error;
    });
}
// remeber to fetch class engagement level with trend
async function getGroupsWithDetails(sessionId) {
  const result = await pool.query(
    `
    SELECT 
      g.group_id,
      g.group_name,
      s.student_id,
      s.name AS student_name,
      wl.emotion
    FROM student_groups g
    JOIN students s ON s.group_id = g.group_id
    LEFT JOIN (
      SELECT DISTINCT ON (student_id) *
      FROM webcam_logs
      WHERE session_id = $1
      ORDER BY student_id, timestamp DESC
    ) wl ON wl.student_id = s.student_id
    JOIN session_groups sg ON sg.group_id = g.group_id
    WHERE sg.session_id = $1
    ORDER BY g.group_id, s.student_id
    `,
    [sessionId]
  );

  const groups = {};
  const classEngagementAvg = await getClassEngagement(sessionId);
  const classProgressionAvg = await getClassAverageProgression(sessionId);

  // Process each row (student)
  for (const row of result.rows) {
    const groupId = row.group_id;

    // Initialize this group if we haven't yet
    if (!groups[groupId]) {
      const progressMatch = ClassProgression.find((p) => p.id === groupId);
      const progress_value =
        progressMatch && progressMatch.data.length > 0
          ? progressMatch.data.at(-1).y
          : 0.1;

      const progress =
        progress_value > 0.6 ? "good" : progress_value > 0.3 ? "medium" : "bad";

      const engagement = await getGroupEngagement(groupId, sessionId);

      groups[groupId] = {
        group_id: groupId,
        status: "success", // temporary value
        progress_value,
        progress,
        group_number: groupId,
        engagement: engagement,
        summary: [],
        students: [],
        classEngagementAvg,
        classProgressionAvg,
      };
    }

    // Get this student's personal engagement (await your existing function)
    const studentEngagement = await getStudentEngagement(
      row.student_id,
      sessionId
    );

    // Determine student's status based on emotion + personal engagement
    const studentStatus = getStudentStatus(row.emotion, studentEngagement);

    // If the student is in an error state, add a suggestion
    if (studentStatus.status === "error" && studentStatus.cause === "emotion") {
      groups[groupId].summary.push(
        `${row.student_name} is feeling ${row.emotion}`
      );
    }

    if (
      (studentStatus.status === "error" ||
        studentStatus.status === "warning") &&
      studentStatus.cause === "engagement"
    ) {
      groups[groupId].summary.push(`${row.student_name} has low engagement`);
    }

    if (studentStatus.status === "error" && studentStatus.cause === "both") {
      groups[groupId].summary.push(
        `${row.student_name} is feeling ${row.emotion} and has low engagement`
      );
    }

    // Store the student info
    groups[groupId].students.push({
      student_id: row.student_id,
      name: row.student_name,
      feeling: row.emotion,
      student_engagement: studentEngagement,
      student_status: studentStatus.status,
    });
  }

  // ──────────────────────────────────────────────────────────
  //  AFTER processing all students, set each group's status
  // ──────────────────────────────────────────────────────────
  for (const group of Object.values(groups)) {
    // Count how many students in each status
    let errorCount = 0;
    let warningCount = 0;

    for (const student of group.students) {
      if (student.student_status === "error") {
        errorCount++;
      } else if (student.student_status === "warning") {
        warningCount++;
      }
    }

    if (group.progress === "medium") {
      warningCount++;
    }

    if (group.progress === "bad") {
      errorCount++;
    }

    if (errorCount === 1) {
      group.status = "warning";
    } else if (errorCount >= 2) {
      group.status = "error";
    } else if (warningCount >= 4) {
      group.status = "error";
    } else if (warningCount > 2) {
      group.status = "warning";
    } else {
      group.status = "success";
    }
  }

  return Object.values(groups);
}

module.exports = {
  getGroupsBySession,
  getGroupsWithDetails,
  getStudentEngagement,
  getGroupEngagement,
  getClassEngagement,
};
