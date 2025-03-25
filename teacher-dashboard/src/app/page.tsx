"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Fetch data from your backend API
  //   fetch("http://localhost:3001/api/users") // Adjust this URL to your backend route
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data fetched:", data);
  //       setData(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <div style={{ margin: "5rem" }}>
      <h1 style={{ fontWeight: "600" }}>Hello Thomas</h1>
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
