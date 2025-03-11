import React from "react";
import styles from "./summary_section.module.css";
import ProgressionChart from "../_components/progression_chart";
import ClassEngagement from "../_components/class_engagement";
import MyResponsiveLine from "../_components/graph";

export default function SummarySection() {
  let teacher = {
    name: "Thomas",
  };

  let testData = [
    {
      id: "japan",
      color: "hsl(264, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 268,
        },
        {
          x: "helicopter",
          y: 123,
        },
        {
          x: "boat",
          y: 123,
        },
        {
          x: "train",
          y: 59,
        },
        {
          x: "subway",
          y: 99,
        },
        {
          x: "bus",
          y: 290,
        },
        {
          x: "car",
          y: 186,
        },
        {
          x: "moto",
          y: 4,
        },
        {
          x: "bicycle",
          y: 66,
        },
        {
          x: "horse",
          y: 10,
        },
        {
          x: "skateboard",
          y: 2,
        },
        {
          x: "others",
          y: 138,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(44, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 280,
        },
        {
          x: "helicopter",
          y: 37,
        },
        {
          x: "boat",
          y: 164,
        },
        {
          x: "train",
          y: 119,
        },
        {
          x: "subway",
          y: 47,
        },
        {
          x: "bus",
          y: 287,
        },
        {
          x: "car",
          y: 231,
        },
        {
          x: "moto",
          y: 235,
        },
        {
          x: "bicycle",
          y: 167,
        },
        {
          x: "horse",
          y: 154,
        },
        {
          x: "skateboard",
          y: 50,
        },
        {
          x: "others",
          y: 8,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(117, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 12,
        },
        {
          x: "helicopter",
          y: 68,
        },
        {
          x: "boat",
          y: 271,
        },
        {
          x: "train",
          y: 187,
        },
        {
          x: "subway",
          y: 3,
        },
        {
          x: "bus",
          y: 260,
        },
        {
          x: "car",
          y: 189,
        },
        {
          x: "moto",
          y: 269,
        },
        {
          x: "bicycle",
          y: 90,
        },
        {
          x: "horse",
          y: 162,
        },
        {
          x: "skateboard",
          y: 62,
        },
        {
          x: "others",
          y: 60,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(27, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 203,
        },
        {
          x: "helicopter",
          y: 273,
        },
        {
          x: "boat",
          y: 32,
        },
        {
          x: "train",
          y: 10,
        },
        {
          x: "subway",
          y: 8,
        },
        {
          x: "bus",
          y: 259,
        },
        {
          x: "car",
          y: 173,
        },
        {
          x: "moto",
          y: 177,
        },
        {
          x: "bicycle",
          y: 283,
        },
        {
          x: "horse",
          y: 209,
        },
        {
          x: "skateboard",
          y: 2,
        },
        {
          x: "others",
          y: 40,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(110, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 269,
        },
        {
          x: "helicopter",
          y: 40,
        },
        {
          x: "boat",
          y: 89,
        },
        {
          x: "train",
          y: 70,
        },
        {
          x: "subway",
          y: 137,
        },
        {
          x: "bus",
          y: 197,
        },
        {
          x: "car",
          y: 215,
        },
        {
          x: "moto",
          y: 276,
        },
        {
          x: "bicycle",
          y: 44,
        },
        {
          x: "horse",
          y: 128,
        },
        {
          x: "skateboard",
          y: 29,
        },
        {
          x: "others",
          y: 84,
        },
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <h2>Welcome, {teacher.name}👋</h2>
      <div className={styles.container}>
        <ClassEngagement engagement_value={50} trend="flat" />
        {/* <ProgressionChart /> */}
        {/* <MyResponsiveLine data={testData} /> */}
        <div></div>
      </div>
    </section>
  );
}
