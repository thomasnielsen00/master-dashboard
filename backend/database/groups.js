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

module.exports = { getGroupsBySession };
