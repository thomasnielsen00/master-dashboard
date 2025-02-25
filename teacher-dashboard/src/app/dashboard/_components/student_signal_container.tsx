"use client";

import React from "react";
import styles from "./student_signal_container.module.css";
import EngagementLevel from "../../components/engagement_meter";
import Tooltip from "@mui/material/Tooltip";

type StudentSignalContainerProps = {
  status: "success" | "warning" | "error";
  name: string;
  engagement_level: number;
  feeling:
    | "angry"
    | "fearful"
    | "happy"
    | "sad"
    | "surprised"
    | "disgusted"
    | "neutral";
  stress_level: "high" | "medium" | "low";
};

export default function StudentSignalContainer({
  status,
  name,
  engagement_level,
  feeling,
  stress_level,
}: StudentSignalContainerProps) {
  const feelings = {
    angry: { emoji: "😡", no: "sint" },
    fearful: { emoji: "😨", no: "redd" },
    happy: { emoji: "😁", no: "glad" },
    sad: { emoji: "😢", no: "lei seg" },
    surprised: { emoji: "😲", no: "overrasket" },
    disgusted: { emoji: "🥴", no: "frastøtt" },
    neutral: { emoji: "😐", no: "nøytral" },
  };

  const stress = {
    high: "Høyt",
    medium: "Middels",
    low: "Lavt",
  };

  return (
    <div>
      <div className={`${styles.signal_container} ${styles[status]} `}>
        <div className={styles.name}> {name}</div>
        <EngagementLevel engagement_value={engagement_level} />
        <div className={styles.feelingContainer}>
          <Tooltip title={name + " er " + feelings[feeling].no}>
            <p className={styles.emoji}>{feelings[feeling].emoji}</p>
          </Tooltip>
          <p className={styles.feelingExplanation}></p>
        </div>
        <div>Stressnivå: {stress[stress_level]}</div>
      </div>
    </div>
  );
}
