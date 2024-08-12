import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <li>
            <a href="#about">About Me</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="mailto:roscod@live.ie">Contact</a>
          </li>
          <li>
            <a href="https://drive.google.com/file/d/15AJh0spDycVOvn6wqInrF_d16-5phCW7/view?usp=sharing" target="_blank">CV</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
