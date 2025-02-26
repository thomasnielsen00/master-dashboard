import Link from "next/link";

export default function Page() {
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
