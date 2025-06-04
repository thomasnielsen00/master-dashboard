"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "../context/SessionContext";

export default function Page() {
  const { teacherName, sessionId, setTeacherName, setSessionId } =
    useSessionContext();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here is where you'd actually log in
    console.log("Logging in with:", { teacherName });
  };

  function handleTestStart(testPart: number) {
    console.log("name: " + teacherName);
    if (testPart === 1) {
      // usability test start
      setSessionId(1);
      router.push("/setup");
    }
    if (testPart === 2) {
      // scenario test 1: All is good
      setSessionId(1);
      router.push("/dashboard");
    }
    if (testPart === 3) {
      setSessionId(2);
      router.push("/dashboard");
    }
    if (testPart === 4) {
      setSessionId(3);
      router.push("/dashboard");
    }
    if (testPart === 5) {
      setSessionId(4);
      router.push("/dashboard");
    }
    if (testPart === 6) {
      setSessionId(5);
      router.push("/dashboard");
    }
    if (testPart === 7) {
      setSessionId(6);
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ margin: "5rem 15rem" }}>
      <h1 style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>
        Welcome to the user test!
      </h1>
      <p style={{ fontSize: 20, marginBottom: 24 }}>
        This page is set up to prepare the correct data and environment before
        the testing begins. You do not need to consider this page when
        evaluating the system. When you start a part of the test, you will
        receive instructions from the test facilitator. You are encouraged to
        think aloud and say what you are thinking throughout the session. There
        are no right or wrong answers, it is the system that is being tested,
        not you.
      </p>
      {/* <h2 style={{ fontWeight: 600 }}>Hello {teacherName || "Teacher"}</h2> */}

      {/* Name Form */}
      <form onSubmit={handleLogin} style={{ marginBottom: "2rem" }}>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="teacherName"
            style={{ display: "block", marginBottom: "0.5rem", width: 300 }}
          >
            Please enter your name first:
          </label>
          <input
            id="teacherName"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: "0.5rem", width: 300, borderRadius: 8 }}
          />
        </div>

        {/* <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Log In
        </button> */}
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(1)}
        >
          Start test part 1
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(2)}
        >
          Start test part 2
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(3)}
        >
          Start test part 3
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(4)}
        >
          Start test part 4
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(5)}
        >
          Start test part 5
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(6)}
        >
          Start test part 6
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(7)}
        >
          Start test part 7
        </button>
      </div>

      <p>SessionID: {sessionId}</p>

      {/* <div>
        <Link href="dashboard">Trykk her for å komme til dashboadet</Link>
      </div>
      <div>
        <Link href="setup">Trykk her for å komme til setup</Link>
      </div>
      <div>
        <Link href="studentInterface">Trykk her for å komme til student</Link>
      </div> */}
    </div>
  );
}
