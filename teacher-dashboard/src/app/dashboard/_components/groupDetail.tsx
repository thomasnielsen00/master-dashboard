"use client";

import React from "react";
import styles from "./styles/group_detail.module.css";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import EngagementLevel from "../../components/engagement_meter";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AiSuggestion from "./ai_suggestion";

type Student = {
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
};

type GroupSignalContainerProps = {
  status: "success" | "warning" | "error" | string;
  group_number: number;
  progress: "Good" | "Mid" | "Bad" | string;
  progress_value: number;
  students: Student[];
  AiSuggestions: string[];
};

export default function GroupDetails({
  group_number,
  status,
  students,
  progress,
  // should possibly remove the progress prop
  progress_value,
  AiSuggestions,
}: GroupSignalContainerProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const engagementComparison = "10% above class average";
  const progressionComparison = "30% below class average";

  return (
    <div>
      <div className={`${styles.signal_container} ${styles[status]}`}>
        <h3>Gruppe {group_number}</h3>
        <div className={styles.emojicontainer}>
          {students.map((student, index) => (
            <div key={index}>
              <Tooltip
                title={student.name + " er " + feelings[student.feeling].no}
              >
                <span
                  className={`${
                    student.student_status === "error"
                      ? styles.emojierror
                      : student.student_status === "warning"
                      ? styles.emojiwarning
                      : styles.emoji
                  }`}
                >
                  {feelings[student.feeling].emoji}
                </span>
              </Tooltip>
              <p>
                <span className={styles.name}>{student.name}</span>
              </p>
            </div>
          ))}
        </div>
        <Divider>Suggested actions</Divider>
        <div>
          <ol>
            {AiSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ol>
        </div>

        <button className={styles.button1} onClick={handleExpandClick}>
          {expanded ? (
            <>
              See less{" "}
              <ExpandMoreIcon
                sx={{
                  transform: "rotate(180deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </>
          ) : (
            <>
              See more{" "}
              <ExpandMoreIcon
                sx={{
                  transition: "transform 0.3s ease-in-out", // Smooth transition effect
                }}
              />
            </>
          )}
        </button>
        <Collapse
          sx={{ display: "flex" }}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <Divider>Engasjement</Divider>

          <div className={styles.engagementContainer}>
            <EngagementLevel engagement_value={70} size={"small"} />
            <p>{engagementComparison} </p>
          </div>
          <Divider>Progresjon</Divider>

          <div className={styles.progressOverview}>
            <div className={styles.progressContainer}>
              <progress
                className={`${styles.progress} ${
                  styles[`progress${progress}`]
                }`}
                value={progress_value}
                max="1"
              ></progress>
              <span className={styles.progressText}>
                {Math.round(progress_value * 100)}%
              </span>
            </div>
            <p>{progressionComparison}</p>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
