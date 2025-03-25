"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSessionContext } from "../context/SessionContext";

export default function Page() {
  const { teacherName, sessionId, setSessionId } = useSessionContext();

  return (
    <div style={{ margin: "5rem" }}>
      <h1 style={{ fontWeight: "600" }}>Hello {teacherName}</h1>
      <p>Current Session: {sessionId}</p>

      <div>
        <Link href="dashboard">Trykk her for å komme til dashboadet</Link>
      </div>
      <div>
        <Link href="setup">Trykk her for å komme til setup</Link>
      </div>
      <div>
        <Link href="studentInterface">Trykk her for å komme til student</Link>
      </div>
    </div>
  );
}
