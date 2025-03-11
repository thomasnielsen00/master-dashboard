"use client";

import React from "react";
import styles from "./styles/class_engagement.module.css";
import EngagementLevel from "../../components/engagement_meter";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

type ClassEngagementProps = {
  engagement_value: number;
  trend: "up" | "flat" | "down";
};

export default function ClassEngagement({
  engagement_value,
  trend,
}: ClassEngagementProps) {
  let trendIcon;

  if (trend === "up") {
    trendIcon = <TrendingUpIcon style={{ color: "green", fontSize: 60 }} />;
  } else if (trend === "flat") {
    trendIcon = <TrendingFlatIcon style={{ color: "gray", fontSize: 60 }} />;
  } else if (trend === "down") {
    trendIcon = <TrendingDownIcon style={{ color: "red", fontSize: 60 }} />;
  }
  return (
    <div className={styles.container}>
      <h3>Class engagement level</h3>
      <div className={styles.engagementContainer}>
        <EngagementLevel engagement_value={engagement_value} size="large" />
        <div className={styles.icon}>
          {trendIcon}
          <p>Trend</p>
        </div>
      </div>
    </div>
  );
}
