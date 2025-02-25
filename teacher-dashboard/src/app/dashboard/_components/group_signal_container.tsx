import React from "react";
import styles from "./group_signal_container.module.css";
import Tooltip from "@mui/material/Tooltip";

type Student = {
  name: string;
  feeling:
    | "angry"
    | "fearful"
    | "happy"
    | "sad"
    | "surprised"
    | "disgusted"
    | "neutral";
};

type GroupSignalContainerProps = {
  status: "success" | "warning" | "error";
  group_number: number;
  progress: "Good" | "Mid" | "Bad";
  progress_value: number;
  students: Student[];
};

export default function GroupSignalContainer({
  group_number,
  status,
  students,
  progress,
  // should possibly remove the progress prop
  progress_value,
}: GroupSignalContainerProps) {
  const feelings = {
    angry: { emoji: "😡", no: "sint" },
    fearful: { emoji: "😨", no: "redd" },
    happy: { emoji: "😁", no: "glad" },
    sad: { emoji: "😢", no: "lei seg" },
    surprised: { emoji: "😲", no: "overrasket" },
    disgusted: { emoji: "🥴", no: "frastøtt" },
    neutral: { emoji: "😐", no: "nøytral" },
  };

  const status_column = {
    success: { emoji: "✅", no: "Alt ser bra ut" },
    warning: { emoji: "⚠️", no: "Følg ekstra med" },
    error: { emoji: "🚨", no: "Krever handling" },
  };

  return (
    <div>
      <div className={`${styles.signal_container} ${styles[status]}`}>
        <p className={styles.group_name}>Gruppe {group_number}</p>

        <div>
          {students.map((student, index) => (
            <Tooltip
              key={index}
              title={student.name + " er " + feelings[student.feeling].no}
            >
              <span className={styles.emoji}>
                {feelings[student.feeling].emoji}
              </span>
            </Tooltip>
          ))}
        </div>

        <div className={styles.progressContainer}>
          <progress
            className={`${styles.progress} ${styles[`progress${progress}`]}`}
            value={progress_value}
            max="1"
          ></progress>
          <span className={styles.progressText}>
            {Math.round(progress_value * 100)}%
          </span>
        </div>
        <div>
          <p>
            <span className={styles.emoji}>{status_column[status].emoji}</span>
            <span>{status_column[status].no}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
