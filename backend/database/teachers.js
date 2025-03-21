const pool = require("../db");

async function getTeachers() {
  try {
    const result = await pool.query(`SELECT * FROM teachers`);
    return result;
  } catch (error) {
    console.error("Failed to get teachers with error: ", error);
    throw error;
  }
}

module.exports = { getTeachers };
