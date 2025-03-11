"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import path from "path";

const pages = [
  { name: "Overview", path: "/dashboard" },
  { name: "Groups", path: "/groups" },
  { name: "Conclude session", path: "/conclude" },
];

export default function Navbar() {
  const pathname = usePathname(); // Get current route

  let teacher = {
    name: "Teacher Teach",
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        {pages.map((page) => (
          <Link
            className={`${
              pathname == page.path ? styles.activeLink : styles.link
            }`}
            key={page.path}
            href={page.path}
          >
            {page.name}
          </Link>
        ))}
      </div>

      <div className={styles.rightSection}>
        <Link href={"/"}>
          <SettingsIcon style={{ fontSize: 28, cursor: "pointer" }} />
        </Link>
        <Avatar
          style={{
            backgroundColor: "#37005B",
            height: 30,
            width: 30,
            cursor: "pointer",
          }}
          alt={teacher.name}
          src=""
        />
      </div>
    </nav>
  );
}
