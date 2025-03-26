import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../context/SessionContext"; // adjust path if needed

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "Dashboard for teachers in K-12 education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
