import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import { FaEnvelope, FaGithub, FaLinkedin, FaFigma } from 'react-icons/fa';

const links = [
    { href: "mailto:roscod@live.ie", icon: <FaEnvelope />, label: "Email" },
    { href: "https://github.com/RoscoArgus", icon: <FaGithub />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/roscoargus/", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://www.figma.com/@roscoargus", icon: <FaFigma />, label: "Figma" },
];

export const Hero = () => {
  return (
    <section className={styles.container}>
        <div className={styles.background}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm Ross</h1>
                <p className={styles.description}>
                I'm a 4th Year Integrated Computer Science student and aspiring Software Engineer. Keep scrolling to learn more!
                </p>
                <ul className={styles.listItems}>
                    {links.map((link, index) => (
                        <li key={index} className={styles.listItem}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                            {link.icon}
                        </a>
                        </li>
                    ))}
                </ul>
            </div>
            <img
                src="hero1.jpg"
                alt="Hero image of me"
                className={styles.heroImg}
            />
        </div>
    </section>
  );
};
