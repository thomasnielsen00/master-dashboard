import React from "react";
import styles from "./group_section.module.css";
import GroupDetails from "../_components/groupDetail";

const groups = [
  {
    status: "success",
    progress_value: 0.5,
    progress: "Mid",
    group_number: 1,
    AiSuggestions: ["Thomas er lei seg, se på det", "Nils får ikke til noe"],
    students: [
      { name: "Ola", feeling: "happy", student_status: "success" },
      { name: "Kari", feeling: "neutral", student_status: "success" },
      { name: "Thomas", feeling: "sad", student_status: "error" },
      { name: "Nils", feeling: "sad", student_status: "warning" },
    ],
  },
  {
    status: "warning",
    progress_value: 0.5,
    progress: "Mid",
    group_number: 2,
    AiSuggestions: ["Thomas er lei seg, se på det", "Nils får ikke til noe"],
    students: [
      { name: "Ola", feeling: "happy", student_status: "success" },
      { name: "Kari", feeling: "neutral", student_status: "success" },
      { name: "Thomas", feeling: "sad", student_status: "error" },
      { name: "Nils", feeling: "sad", student_status: "warning" },
    ],
  },
  {
    status: "error",
    progress_value: 0.5,
    progress: "Mid",
    group_number: 3,
    AiSuggestions: ["Thomas er lei seg, se på det", "Nils får ikke til noe"],
    students: [
      { name: "Ola", feeling: "happy", student_status: "success" },
      { name: "Kari", feeling: "neutral", student_status: "success" },
      { name: "Thomas", feeling: "sad", student_status: "error" },
      { name: "Nils", feeling: "sad", student_status: "warning" },
    ],
  },
  {
    status: "success",
    progress_value: 0.5,
    progress: "Mid",
    group_number: 4,
    AiSuggestions: ["Thomas er lei seg, se på det", "Nils får ikke til noe"],
    students: [
      { name: "Ola", feeling: "happy", student_status: "success" },
      { name: "Kari", feeling: "neutral", student_status: "success" },
      { name: "Thomas", feeling: "sad", student_status: "error" },
      { name: "Nils", feeling: "sad", student_status: "warning" },
    ],
  },
];

const statusOrder = {
  error: 1,
  warning: 2,
  success: 3,
};

export default function GroupSection() {
  const sortedGroups = [...groups].sort(
    // @ts-ignore
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  return (
    <div className={styles.containter}>
      <h2 className={styles.title}>Group Overview</h2>
      {sortedGroups.map((group, index) => (
        <GroupDetails
          key={index}
          status={group.status}
          progress_value={group.progress_value}
          progress={group.progress}
          group_number={group.group_number}
          AiSuggestions={group.AiSuggestions}
          // @ts-ignore
          students={group.students}
        />
      ))}
    </div>
  );
}
