"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/attention_bubble.module.css";

type AttentionBubbleProps = {
  totalGroups: number;
  groupsInNeed: number;
  totalStudents: number;
  studentsInNeed: number;
};

export default function AttentionBubble({
  totalGroups,
  groupsInNeed,
  totalStudents,
  studentsInNeed,
}: AttentionBubbleProps) {
  const [groupSize, setGroupSize] = useState("0px");
  const [studentSize, setStudentSize] = useState("0px");
  const [groupColor, setGroupColor] = useState("neutralBubble");
  const [studentColor, setStudentColor] = useState("neutralBubble");

  const calculateSize = (total: number, attentionNeed: number): string => {
    if (total === 0) return "0px";
    const ratio = attentionNeed / total;
    const multiplier = 1 + ratio;
    const size = 110 * multiplier;
    return isNaN(size) ? "0px" : `${size}px`;
  };

  const calculateColor = (total: number, attentionNeed: number): string => {
    if (total === 0) return "neutralBubble";

    const percentage = (attentionNeed / total) * 100;

    if (percentage > 75) return "errorBubble";
    if (percentage > 25) return "warningBubble";
    if (percentage > 10) return "neutralBubble";
    return "successBubble";
  };

  useEffect(() => {
    setGroupSize(calculateSize(totalGroups, groupsInNeed));
    setStudentSize(calculateSize(totalStudents, studentsInNeed));
    setGroupColor(calculateColor(totalGroups, groupsInNeed));
    setStudentColor(calculateColor(totalStudents, studentsInNeed));
  }, [totalGroups, groupsInNeed, totalStudents, studentsInNeed]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.bubble} ${styles[groupColor]}`}
        style={{ width: groupSize, height: groupSize }}
      >
        <p className={styles.number}>{groupsInNeed}</p>
        <p className={styles.text}>
          {groupsInNeed === 1
            ? "Group in need of attention"
            : "Groups in need of attention"}
        </p>
      </div>

      <div
        className={`${styles.bubble} ${styles[studentColor]}`}
        style={{ width: studentSize, height: studentSize }}
      >
        <p className={styles.number}>{studentsInNeed}</p>
        <p className={styles.text}>
          {studentsInNeed === 1
            ? "Student in need of attention"
            : "Students in need of attention"}
        </p>
      </div>
    </div>
  );
}
