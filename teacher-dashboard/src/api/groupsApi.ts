import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

// Type for a group object
export interface Group {
  group_id: number;
  group_name: string;
}

export interface Student {
  name: string;
  student_status: "success" | "warning" | "error" | string;
  feeling:
    | "angry"
    | "fearful"
    | "happy"
    | "sad"
    | "surprised"
    | "disgusted"
    | "neutral";
}

export interface GroupDetailsType {
  status: "success" | "warning" | "error" | string;
  group_number: number;
  progress: "good" | "medium" | "bad" | string;
  progress_value: number;
  engagement: number;
  students: Student[];
  AiSuggestions: string[];
  classEngagementAvg: number;
  classProgressionAvg: number;
}

// Fetch groups by session ID
export async function fetchGroupsBySession(
  sessionId: number
): Promise<Group[]> {
  return axios
    .get<Group[]>(`${BASE_URL}/sessions/${sessionId}/groups`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch groups:", error);
      throw error;
    });
}

export async function fetchGroupsWithDetails(
  sessionId: number
): Promise<GroupDetailsType[]> {
  return axios
    .get<GroupDetailsType[]>(
      `${BASE_URL}/sessions/${sessionId}/groups-with-details`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch groups with details:", error);
      throw error;
    });
}

export async function fetchGroupsInNeedCount(
  sessionId: number
): Promise<number> {
  return axios
    .get<number>(`${BASE_URL}/${sessionId}/groups/attentionNeeded`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch groups in need count:", error);
      throw error;
    });
}
