import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { text: "About Me", href: "/#about" },
    { text: "Experience", href: "/#experience" },
    { text: "Projects", href: "/#projects" },
    { text: "Dissertation", href: "/dissertation" },
    { text: "CV", href: "/cv" },
    { text: "Contact", href: "mailto:roscod@live.ie" }
  ];

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        roscoargus.dev
      </a>
      <div className={styles.menu}>
      <div
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="menu-button"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
