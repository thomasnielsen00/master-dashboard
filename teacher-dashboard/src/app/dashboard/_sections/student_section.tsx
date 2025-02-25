import React from "react";
import SignalContainer from "../_components/student_signal_container";
import styles from "./student_section.module.css";

export default function StudentSection() {
  return (
    <div className={styles.containter}>
      <h3>Elever</h3>
      <p className={styles.tableTitles}>
        <span>Navn</span>
        <span>Engasjement</span>
        <span className={styles.feeling}>Følelse</span>
        <span>Stressnivå</span>
      </p>
      <SignalContainer
        status="error"
        name="Ola"
        feeling="sad"
        engagement_level={30}
        stress_level="high"
      />
      <SignalContainer
        status="warning"
        name="Kari"
        feeling="angry"
        engagement_level={60}
        stress_level="medium"
      />
      <SignalContainer
        status="success"
        name="Thomas"
        feeling="happy"
        engagement_level={90}
        stress_level="low"
      />
    </div>
  );
}
