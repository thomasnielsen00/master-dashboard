"use client";
import Navbar from "../components/navbar";
import { SessionProvider } from "../../context/SessionContext";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <main>{children}</main>
    </SessionProvider>
  );
}
