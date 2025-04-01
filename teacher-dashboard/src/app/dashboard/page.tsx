"use client";

import React from "react";
import GroupSection from "./_sections/group_section";
import SummarySection from "./_sections/summary_section";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <SummarySection />
      </div>
      <div className={styles.row2}>
        <GroupSection />
      </div>
    </div>
  );
}
