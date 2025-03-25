const pool = require("../db"); // Import the database connection

// ✅ Fetch all groups in a session
async function getGroupsBySession(session_id) {
  try {
    const result = await pool.query(
      `SELECT g.group_id, g.group_name 
       FROM session_groups sg
       JOIN student_groups g ON sg.group_id = g.group_id
       WHERE sg.session_id = $1
       ORDER BY g.group_id`,
      [session_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Database error (getGroupsBySession):", error);
    throw error;
  }
}

function getStudentStatusFromEmotion(emotion) {
  if (!emotion) return "neutral";

  const negativeFeelings = ["angry", "fearful", "sad", "disgusted"];
  const warningFeelings = ["neutral", "surprised"];
  const positiveFeelings = ["happy"];

  if (negativeFeelings.includes(emotion)) return "error";
  if (warningFeelings.includes(emotion)) return "warning";
  if (positiveFeelings.includes(emotion)) return "success";

  return "neutral";
}

function getGroupsWithDetails(sessionId) {
  return pool
    .query(
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
    )
    .then((result) => {
      const groups = {};

      result.rows.forEach((row) => {
        const groupId = row.group_id;

        if (!groups[groupId]) {
          groups[groupId] = {
            group_id: groupId,
            status: "success", // default
            progress_value: 0.5, // fake value — replace later
            progress: "Mid", // fake value — replace later
            group_number: groupId,
            AiSuggestions: [],
            students: [],
          };
        }

        const status = getStudentStatusFromEmotion(row.emotion);
        if (status === "error") {
          groups[groupId].AiSuggestions.push(
            `${row.student_name} is feeling ${row.emotion}`
          );
          groups[groupId].status = "warning"; // escalate if needed
        }

        groups[groupId].students.push({
          name: row.student_name,
          feeling: row.emotion,
          student_status: status,
        });
      });

      return Object.values(groups);
    })
    .catch((error) => {
      console.error(
        "Database error (getGroupsWithStudentsAndFeelings):",
        error
      );
      throw error;
    });
}

module.exports = { getGroupsBySession, getGroupsWithDetails };
