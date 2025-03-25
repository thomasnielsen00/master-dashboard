import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export function fetchStudentsInNeedCount(sessionId: number): Promise<number> {
  // @ts-ignore
  return axios
    .get<number>(`${BASE_URL}/${sessionId}/students/attentionNeeded`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch student count:", error);
      throw error;
    });
}

export function fetchStudentsTotal(sessionId: number): Promise<number> {
  // @ts-ignore
  return axios
    .get<number>(`${BASE_URL}/${sessionId}/students/total`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch total student count:", error);
      throw error;
    });
}
