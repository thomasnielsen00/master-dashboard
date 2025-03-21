const pool = require("../db");

async function getStudentFeelings() {
  try {
    const result = await pool.query(`
      SELECT 
        s.student_id, s.name, 
        w.session_id, w.timestamp, w.emotion
      FROM webcam_logs w
      JOIN students s ON w.student_id = s.student_id
      ORDER BY w.timestamp DESC;
    `);
    return result.rows;
  } catch (error) {
    console.error("Database error (getStudentFeelings):", error);
    throw error;
  }
}

module.exports = { getStudentFeelings };
