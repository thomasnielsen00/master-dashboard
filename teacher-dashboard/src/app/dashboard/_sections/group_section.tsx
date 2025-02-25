import React from "react";
import styles from "./group_section.module.css";
import GroupSignalContainer from "../_components/group_signal_container";

export default function GroupSection() {
  return (
    <div className={styles.containter}>
      <h3>Grupper</h3>
      <p className={styles.tableTitles}>
        <span className={styles.groupTitle}>Gruppe</span>
        <span>Elever</span>
        <span>Progresjon</span>
        <span>Status</span>
      </p>
      <GroupSignalContainer
        status="error"
        progress_value={0.5}
        progress="Mid"
        group_number={1}
        students={[
          { name: "Ola", feeling: "angry" },
          { name: "Kari", feeling: "angry" },
          { name: "Thomas", feeling: "sad" },
          { name: "Nils", feeling: "sad" },
        ]}
      />
      <GroupSignalContainer
        status="warning"
        progress="Bad"
        progress_value={0.2}
        group_number={2}
        students={[
          { name: "Ola", feeling: "surprised" },
          { name: "Kari", feeling: "happy" },
          { name: "Thomas", feeling: "fearful" },
        ]}
      />
      <GroupSignalContainer
        status="success"
        progress="Good"
        progress_value={0.9}
        group_number={3}
        students={[
          { name: "Ola", feeling: "happy" },
          { name: "Kari", feeling: "happy" },
          { name: "Thomas", feeling: "neutral" },
        ]}
      />
    </div>
  );
}
