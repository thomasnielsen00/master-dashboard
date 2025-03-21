import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export async function fetchStudentsInNeedCount(
  sessionId: number
): Promise<number> {
  try {
    const response = await axios.get<number>(
      `${BASE_URL}/${sessionId}/students/attentionNeeded`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw error;
  }
}
