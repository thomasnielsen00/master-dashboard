"use client";

import React, { useEffect, useState } from "react";
import styles from "./summary_section.module.css";
import ClassEngagement from "../_components/class_engagement";
import ProgressionGraph from "../_components/graph";
import AttentionBubble from "../_components/attention_bubble";
import {
  fetchStudentsInNeedCount,
  fetchStudentsTotal,
} from "@/src/api/stundentsApi";
import { fetchGroupsBySession } from "@/src/api/groupsApi";
import {
  fetchClassProgression,
  ClassProgressionType,
  fetchClassEngagement,
  ClassEngagementType,
} from "@/src/api/sessionApi";

export default function SummarySection() {
  const [studentsInNeed, setStudentsInNeed] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);
  const [groupsInNeed, setGroupsInNeed] = useState(0);
  const [classProgression, setClassProgression] = useState<
    ClassProgressionType[]
  >([]);
  const [classEngagement, setClassEngagement] = useState<ClassEngagementType>({
    engagement_value: 0,
    trend: "flat",
  });

  // context
  let teacher = {
    name: "Thomas",
  };

  // temp data, context for later
  const sessionId = 1;

  useEffect(() => {
    fetchStudentsTotal(sessionId)
      .then((total) => {
        setTotalStudents(total);
      })
      .catch((err) => {
        console.error("Error loading total students count:", err);
      });

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

    fetchGroupsBySession(sessionId)
      .then((groups) => {
        setTotalGroups(groups.length);
      })
      .catch((err) => {
        console.error("Error loading total groups count:", err);
      });

    fetchClassProgression(sessionId)
      .then((progression) => {
        setClassProgression(progression);
      })
      .catch((err) => {
        console.error("Error loading class progression data:", err);
      });

    fetchClassEngagement(sessionId)
      .then((engagement) => {
        setClassEngagement(engagement);
        console.log(engagement);
      })
      .catch((err) => {
        console.error("Error loading class engagement data:", err);
      });
    // add a time here to refresh the data
  }, []);

  return (
    <section className={styles.section}>
      <h2>Welcome, {teacher.name}👋</h2>
      <div className={styles.container}>
        <div className={styles.graphContainer}>
          <h3>Group progression over time</h3>
          <ProgressionGraph data={classProgression} />
        </div>
        <div style={{ width: "456px" }}>
          <AttentionBubble
            totalGroups={totalGroups}
            groupsInNeed={1}
            totalStudents={totalStudents}
            studentsInNeed={studentsInNeed}
          />
        </div>
        <div>
          <ClassEngagement
            engagement_value={classEngagement.engagement_value}
            trend={classEngagement.trend}
          />
        </div>
      </div>
    </section>
  );
}
