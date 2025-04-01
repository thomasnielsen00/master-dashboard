"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles/group_detail.module.css";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import EngagementLevel from "../../components/engagement_meter";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  progress: "good" | "medium" | "bad" | string;
  progress_value: number;
  engagement: number;
  students: Student[];
  summary: string[];
  ClassEngagementAvg: number;
  ClassProgressionAvg: number;
};

export default function GroupDetails({
  group_number,
  status,
  students,
  progress,
  progress_value,
  engagement,
  summary,
  ClassEngagementAvg,
  ClassProgressionAvg,
}: GroupSignalContainerProps) {
  const [expanded, setExpanded] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleExpandClick = () => {
    const newState = !expanded;
    setExpanded(newState);
    if (!expanded) setShouldScroll(true);
  };

  const feelings = {
    angry: { emoji: "😡" },
    fearful: { emoji: "😨" },
    happy: { emoji: "😁" },
    sad: { emoji: "😢" },
    surprised: { emoji: "😲" },
    disgusted: { emoji: "🥴" },
    neutral: { emoji: "😐" },
  };

  function compareToClassAverage(classAvg: number, groupValue: number): string {
    // Prevent division by zero or invalid data
    if (classAvg === 0) {
      return groupValue === 0 ? "Equal to class" : "+∞% / -∞%";
    }



    // Calculate difference ratio
    const difference = groupValue - classAvg;
    const percentChange = (difference / classAvg) * 100;

    // Round for display
    const roundedPercent = Math.round(percentChange * 10) / 10;

    // Return as a string with sign indicator
    if (roundedPercent > 0) {
      return `+${roundedPercent}% compared to class`;
    } else if (roundedPercent < 0) {
      return `${roundedPercent}% compared to class`;
    } else {
      return "Equal to class";
    }
  }

  return (
    <section id={`group-${group_number}`}>
      <div className={`${styles.signal_container} ${styles[status]}`}>
        <h3>Group {group_number}</h3>
        <div className={styles.emojicontainer}>
          {students.map((student, index) => (
            <div key={index}>
              <Tooltip title={`${student.name} is ${student.feeling}`}>
                <span
                  className={`${
                    student.student_status === "error"
                      ? styles.emojierror
                      : student.student_status === "warning"
                      ? styles.emojiwarning
                      : styles.emoji
                  }`}
                >
                  {feelings[student.feeling]?.emoji}
                </span>
              </Tooltip>
              <p>
                <span className={styles.name}>{student.name}</span>
              </p>
            </div>
          ))}
        </div>
        <Divider style={{ color: "#686666" }}>Summary</Divider>
        <div>
          <ol
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {summary.map((suggestion, index) => (
              <li key={index}>📌 {suggestion}</li>
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
                  transition: "transform 0.3s ease-in-out",
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
          onEntered={() => {
            const element = document.getElementById(`group-${group_number}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          <Divider style={{ color: "#686666" }}>Engagement</Divider>

          <div className={styles.engagementContainer}>
            <EngagementLevel engagement_value={engagement} size={"small"} />
            <p>{compareToClassAverage(ClassEngagementAvg, engagement)} </p>
          </div>
          <Divider style={{ color: "#686666" }}>Progression</Divider>

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
            <p>{compareToClassAverage(ClassProgressionAvg, progress_value)}</p>
          </div>
        </Collapse>
      </div>
    </section>
  );
}
