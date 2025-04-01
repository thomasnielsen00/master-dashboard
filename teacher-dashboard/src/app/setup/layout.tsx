"use client";

import { SessionProvider } from "../../context/SessionContext";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <SessionProvider>{children}</SessionProvider>
      </main>
    </>
  );
}
