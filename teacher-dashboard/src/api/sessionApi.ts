import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

interface Progression {
  x: "string";
  y: number;
}

export interface ClassProgressionType {
  id: number;
  data: Progression[];
}

export interface ClassEngagementType {
  engagement_value: number;
  trend: "up" | "flat" | "down";
}

export async function fetchClassProgression(
  sessionId: number
): Promise<ClassProgressionType[]> {
  return axios
    .get<ClassProgressionType[]>(
      `${BASE_URL}/sessions/${sessionId}/classProgression`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch class progression:", error);
      throw error;
    });
}

export async function fetchClassEngagement(
  sessionId: number
): Promise<ClassEngagementType> {
  return axios
    .get<ClassEngagementType>(
      `${BASE_URL}/sessions/${sessionId}/classEngagement`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch class engagement:", error);
      throw error;
    });
}
