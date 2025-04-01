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

  function handleTestStart(session: number) {
    setSessionId(session);

    console.log("name: " + teacherName);
    if (session === 1) {
      // router.push("/dashboard");
    }
    if (session === 2) {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ margin: "5rem 15rem" }}>
      <h1 style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>
        Velkommen til test!
      </h1>
      <p style={{ fontSize: 20, marginBottom: 24 }}>
        Denne siden er laget for å sette opp riktig data og miljø før testingen
        skal gjennomføres. Du trenger ikke ta hensyn til denne siden når du
        vurderer siden! Når du starter en del av testen vil du får instuksjoner
        på skjermen, i tillegg har du instruksjonene og oppgavene på arket du
        fikk.
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
            Vennligst skriv inn ditt navn først:
          </label>
          <input
            id="teacherName"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Skriv inn navnet ditt"
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
          Start test del 1
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(2)}
        >
          Start test del 2
        </button>
        <button
          className={styles.buttonMain}
          onClick={() => handleTestStart(3)}
        >
          Start test del 3
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
