"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";

const pages = [
  { name: "Hjem", path: "/" },
  { name: "Oversikt", path: "/dashboard" },
  { name: "Elever", path: "/students" },
  { name: "Grupper", path: "/groups" },
];

export default function Navbar() {
  const pathname = usePathname(); // Get current route
  console.log(pathname);

  return (
    <nav className={styles.navbar}>
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
    </nav>
  );
}
