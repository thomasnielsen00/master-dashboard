const pool = require("../db");

function getStudentsFeelings() {
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

function getStudentsAttentionNeeded(sessionId) {
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
      .then((result) => {
        resolve(parseInt(result.rows[0].affected_student_count, 10));
      })
      .catch((error) => {
        console.error("Database error (getStudentsAttentionNeeded):", error);
        reject(error);
      });
  });
}

function getStudentsTotalCount(sessionId) {
  return pool
    .query(
      `
        SELECT COUNT(*) AS total_students
        FROM students s
        JOIN student_groups g ON s.group_id = g.group_id
        JOIN session_groups sg ON g.group_id = sg.group_id
        WHERE sg.session_id = $1
        `,
      [sessionId]
    )
    .then((result) => {
      return parseInt(result.rows[0].total_students, 10);
    })
    .catch((error) => {
      console.error("Database error (getStudentCountBySession):", error);
      throw error;
    });
}

module.exports = {
  getStudentsFeelings,
  getStudentsAttentionNeeded,
  getStudentsTotalCount,
};
