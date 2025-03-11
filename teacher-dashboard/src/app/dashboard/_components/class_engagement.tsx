"use client";

import React from "react";
import styles from "./styles/class_engagement.module.css";
import EngagementLevel from "../../components/engagement_meter";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Divider from "@mui/material/Divider";

type ClassEngagementProps = {
  engagement_value: number;
  trend: "up" | "flat" | "down";
};

export default function ClassEngagement({
  engagement_value,
  trend,
}: ClassEngagementProps) {
  let trendIcon;
  let trendDescription = {
    down: "🚨 Engagement is falling",
    up: "✅ Engagement is rising",
    flat: "✔️ Engagement is stable",
  };

  if (trend === "up") {
    trendIcon = <TrendingUpIcon style={{ color: "green", fontSize: 50 }} />;
  } else if (trend === "flat") {
    trendIcon = <TrendingFlatIcon style={{ color: "#37005B", fontSize: 50 }} />;
  } else if (trend === "down") {
    trendIcon = <TrendingDownIcon style={{ color: "red", fontSize: 50 }} />;
  }
  return (
    <div className={styles.container}>
      <h3>Class engagement level</h3>
      <div className={styles.engagementContainer}>
        <EngagementLevel engagement_value={engagement_value} size="large" />
        <div className={styles.icon}>
          {trendIcon} <p style={{ fontSize: 14 }}>Trend</p>
        </div>
        <p></p>
      </div>
      <Divider />
      <p>{trendDescription[trend]}</p>
    </div>
  );
}
