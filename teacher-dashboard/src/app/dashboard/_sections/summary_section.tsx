import React from "react";
import styles from "./summary_section.module.css";
import ProgressionChart from "../_components/progression_chart";
import ClassEngagement from "../_components/class_engagement";

export default function SummarySection() {
  return (
    <section className={styles.section}>
      <h2>Live overview</h2>
      <div className={styles.container}>
        <ClassEngagement engagement_value={50} trend="down" />
        <ProgressionChart />
        <div></div>
      </div>
    </section>
  );
}
