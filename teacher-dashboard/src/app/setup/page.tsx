import Link from "next/link";
import React from "react";
import styles from "./styles/page.module.css";

export default function Setup() {
  const name = "Thomas";
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div>
          <img
            className={styles.image}
            src="welcome.png"
            alt="Illustration of teacher analyzing data"
          />
        </div>
        <div className={styles.rightSide}>
          <h1>Welcome, {name} </h1>
          <p>
            This is a dashboard that enhances learning through real-time data
            and insights. We analyze sensor data to help you as teachers, better
            understand your students' progress and needs during creative tasks.
          </p>
          <div>
            <div className={styles.buttons}>
              <button className={styles.buttonMain}>
                <Link href={"setup/getStarted"}>
                  Get started with new class
                </Link>
              </button>
              <button className={styles.buttonWhite}>Use previous setup</button>
              <button className={styles.buttonWhite}>
                {" "}
                <Link href="/">Navigate to home</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
