"use client";

import React, { useEffect, useState } from "react";
import styles from "./summary_section.module.css";
import ClassEngagement from "../_components/class_engagement";
import ProgressionGraph from "../_components/graph";
import AttentionBubble from "../_components/attention_bubble";
import { fetchStudentsInNeedCount } from "@/src/api/stundentsApi";

export default function SummarySection() {
  const [studentsInNeed, setStudentsInNeed] = useState(0);

  // context
  let teacher = {
    name: "Thomas",
  };

  // temp data, context for later
  const sessionId = 1;

  useEffect(() => {
    fetchStudentsInNeedCount(sessionId)
      .then((count) => {
        setStudentsInNeed(count);
      })
      .catch((err) => {
        console.error(
          "Error loading students in need of attention count:",
          err
        );
      });
    // add a time here to refresh the data
  }, []);

  const testData = [
    {
      id: "Group 1",
      data: [
        { x: "0 min", y: 0.1 },
        { x: "10 min", y: 0.2 },
        { x: "20 min", y: 0.3 },
        { x: "30 min", y: 0.25 },
        { x: "40 min", y: 0.35 },
        { x: "50 min", y: 0.4 },
        { x: "60 min", y: 0.45 },
      ],
    },
    {
      id: "Group 2",
      data: [
        { x: "0 min", y: 0.05 },
        { x: "10 min", y: 0.15 },
        { x: "20 min", y: 0.25 },
        { x: "30 min", y: 0.2 },
        { x: "40 min", y: 0.3 },
        { x: "50 min", y: 0.35 },
        { x: "60 min", y: 0.38 },
      ],
    },
    {
      id: "Group 3",
      data: [
        { x: "0 min", y: 0.08 },
        { x: "10 min", y: 0.18 },
        { x: "20 min", y: 0.28 },
        { x: "30 min", y: 0.23 },
        { x: "40 min", y: 0.33 },
        { x: "50 min", y: 0.38 },
        { x: "60 min", y: 1 },
      ],
    },
    {
      id: "Group 4",
      data: [
        { x: "0 min", y: 0.18 },
        { x: "10 min", y: 0.28 },
        { x: "20 min", y: 0.38 },
        { x: "30 min", y: 0.43 },
        { x: "40 min", y: 0.53 },
        { x: "50 min", y: 0.68 },
        { x: "60 min", y: 0.91 },
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <h2>Welcome, {teacher.name}👋</h2>
      <div className={styles.container}>
        <div
          style={{
            width: "100%",
            flexGrow: 1,
            margin: "0.5rem",
            backgroundColor: "#fff",
            padding: "0.2rem",
            borderRadius: 8,
            border: "1px solid",
            borderColor: "#37005B",
          }}
        >
          <h3 style={{ fontSize: 18, padding: "1rem 1.5rem" }}>
            Group progression over time
          </h3>
          <ProgressionGraph data={testData} />
        </div>
        <AttentionBubble
          totalGroups={10}
          groupsInNeed={2}
          totalStudents={40}
          studentsInNeed={studentsInNeed}
        />
        <ClassEngagement engagement_value={50} trend="flat" />
      </div>
    </section>
  );
}
