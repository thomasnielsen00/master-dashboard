import React from "react";
import StudentSection from "./_sections/student_section";
import GroupSection from "./_sections/group_section";
import AiAssistiantSection from "./_sections/ai_assistant_section";
import SummarySection from "./_sections/summary_section";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <SummarySection />
        <AiAssistiantSection />
      </div>
      <div className={styles.row}>
        <GroupSection />
        <StudentSection />
      </div>
    </div>
  );
}
