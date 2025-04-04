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
import {
  fetchGroupsBySession,
  fetchGroupsInNeedCount,
} from "@/src/api/groupsApi";
import {
  fetchClassProgression,
  ClassProgressionType,
  fetchClassEngagement,
  ClassEngagementType,
} from "@/src/api/sessionApi";
import { useSessionContext } from "../../../context/SessionContext";

export default function SummarySection() {
  const [studentsInNeed, setStudentsInNeed] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);
  const [groupsInNeed, setGroupsInNeed] = useState(0);

  const [classProgression, setClassProgression] = useState<
    ClassProgressionType[]
  >([]);
  const [classEngagement, setClassEngagement] = useState(0);
  const [classEngagementHistory, setClassEngagementHistory] = useState([30]);
  const [engagementTrend, setEngagementTrend] = useState<Trend>("flat");
  const { teacherName, sessionId } = useSessionContext();

  type Trend = "up" | "down" | "flat";

  interface EngagementRecord {
    engagement_value: number;
  }

  useEffect(() => {
    console.log("Teacher Name Updated:", teacherName);
  }, [teacherName]);

  function getEngagementTrend(history: number[]): Trend {
    // If we have fewer than 3 points, default to flat
    if (history.length < 2) return "flat";

    const last = history[history.length - 1];
    const prev = history[history.length - 2];

    const delta = last - prev;
    if (Math.abs(delta) < 2) {
      return "flat"; // small changes are considered flat
    }
    return delta > 0 ? "up" : "down";
  }

  useEffect(() => {
    console.log(teacherName, sessionId, "from summary page");
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

    fetchGroupsInNeedCount(sessionId)
      .then((count) => {
        setGroupsInNeed(count);
      })
      .catch((err) => {
        console.error("Error loading groups in need of attention count:", err);
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
        const newEngagement = Number(engagement);

        setClassEngagement(newEngagement);
        setClassEngagementHistory((prev) => {
          const updated = [...prev, newEngagement];
          setEngagementTrend(getEngagementTrend(updated)); // update trend immediately
          return updated;
        });
      })
      .catch((err) => {
        console.error("Error loading class engagement data:", err);
      });
    // add a time here to refresh the data
  }, []);

  return (
    <section className={styles.section}>
      <h2>Welcome, {teacherName}👋</h2>
      <div className={styles.container}>
        <div className={styles.graphContainer}>
          <h3>Group progression over time</h3>
          <ProgressionGraph data={classProgression} />
        </div>
        <div style={{ width: "456px" }}>
          <AttentionBubble
            totalGroups={totalGroups}
            groupsInNeed={groupsInNeed}
            totalStudents={totalStudents}
            studentsInNeed={studentsInNeed}
          />
        </div>
        <div>
          <ClassEngagement
            engagement_value={classEngagement}
            trend={engagementTrend}
          />
        </div>
      </div>
    </section>
  );
}
