import React from "react";
import styles from "./styles/getStarted.module.css";
import SessionSetup from "./components/sessionSetup";

export default function GetStarted() {
  return (
    <div className={styles.main}>
      <div className={styles.containerLeft}>
        <img src="/getstarted.png" alt="Person jumping" />
      </div>

      <div className={styles.containerRight}>
        <h1>Get started with the groups 👇</h1>
        <div className={styles.actionContainer}>
          <SessionSetup />
        </div>
      </div>
    </div>
  );
}
