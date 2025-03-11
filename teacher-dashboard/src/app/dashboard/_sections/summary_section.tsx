import React from "react";
import styles from "./summary_section.module.css";
import ProgressionChart from "../_components/progression_chart";
import ClassEngagement from "../_components/class_engagement";
import MyResponsiveLine from "../_components/graph";

export default function SummarySection() {
  let teacher = {
    name: "Thomas",
  };

  const testData = [
    {
      id: "Group A",
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
      id: "Group B",
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
      id: "Group C",
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
  ];

  return (
    <section className={styles.section}>
      <h2>Welcome, {teacher.name}👋</h2>
      <div className={styles.container}>
        <ClassEngagement engagement_value={50} trend="flat" />
        {/* <ProgressionChart /> */}
        <div
          style={{
            width: "50%",
            margin: "0.5rem",
            backgroundColor: "#fff",
            padding: "0.2rem",
            borderRadius: 8,
            border: "1px solid",
            borderColor: "#37005B",
          }}
        >
          <h3 style={{ fontSize: 18, padding: "1rem 1.5rem" }}>
            Progression chart over time
          </h3>
          <MyResponsiveLine data={testData} />
        </div>
        <div></div>
      </div>
    </section>
  );
}
