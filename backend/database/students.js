const pool = require("../db");

function getStudentFeelings() {
  return new Promise((resolve, reject) => {
    pool
      .query(
        `
      SELECT 
        s.student_id, s.name, 
        w.session_id, w.timestamp, w.emotion
      FROM webcam_logs w
      JOIN students s ON w.student_id = s.student_id
      ORDER BY w.timestamp DESC;
    `
      )
      .then((result) => resolve(result.rows))
      .catch((error) => {
        console.error("Database error (getStudentFeelings):", error);
        reject(error);
      });
  });
}

function getStudentAttentionNeeded(sessionId) {
  return new Promise((resolve, reject) => {
    pool
      .query(
        `
        SELECT COUNT(DISTINCT student_id) AS affected_student_count
        FROM (
          SELECT student_id, emotion
          FROM (
            SELECT *,
                   ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY timestamp DESC) AS rn
            FROM webcam_logs
            WHERE session_id = $1
          ) ranked
          WHERE rn <= 3
            AND emotion IN ('angry', 'fearful', 'sad', 'surprised', 'disgusted')
        ) filtered;
        `,
        [sessionId]
      )
      .then((result) => resolve(result.rows[0].affected_student_count))
      .catch((error) => {
        console.error("Database error (getStudentAttentionNeeded):", error);
        reject(error);
      });
  });
}

module.exports = { getStudentFeelings, getStudentAttentionNeeded };
