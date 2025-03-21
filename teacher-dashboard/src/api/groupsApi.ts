import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

// Type for a group object
export interface Group {
  group_id: number;
  group_name: string;
}

// Fetch groups by session ID
export async function fetchGroupsBySession(
  sessionId: number
): Promise<Group[]> {
  try {
    const response = await axios.get<Group[]>(
      `${BASE_URL}/sessions/${sessionId}/groups`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw error;
  }
}
