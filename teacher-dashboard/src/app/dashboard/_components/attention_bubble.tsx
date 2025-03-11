import React from "react";
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
  const calculateSize = (total: number, attentionNeed: number) => {
    const ratio = attentionNeed / total;

    // Scale the value between 1 (small) and 2 (large)
    const multiplier = 1 + ratio; // This ensures the result is between 1 and 2
    return 110 * multiplier;
  };

  const calculateColor = (total: number, attentionNeed: number) => {
    if (total === 0) return "neutralBubble";

    const percentage = (attentionNeed / total) * 100;

    if (percentage > 75) return "errorBubble";
    if (percentage > 25) return "warningBubble";
    if (percentage > 10) return "neutralBubble";
    return "successBubble";
  };

  const groupSize = calculateSize(totalGroups, groupsInNeed);
  const studentSize = calculateSize(totalStudents, studentsInNeed);
  const groupColor = calculateColor(totalGroups, groupsInNeed);
  const studentColor = calculateColor(totalStudents, studentsInNeed);

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
