import React from 'react';
import styles from './About.module.css';
import { FaAngleDoubleUp, FaGraduationCap, FaTerminal } from 'react-icons/fa';
import { getImageUrl } from '../../utils';

const accordionItems = [
    {
        header: "Education",
        description: "I am a 4th Year Integrated Computer Science student at Trinity College Dublin, expecting to graduate with my Master’s Degree in 2026. I have a First class Honours average (3.88 GPA equivalent).",
        icon: <FaGraduationCap style={{fontSize: "35px"}} />
    },
    {
        header: "Programming",
        description: "I have taken part in numerous projects and hackathons, even internationally. I also have experience in full-stack development as both a developer and project manager.",
        icon: <FaTerminal style={{fontSize: "30px"}} />
    },
    {
        header: "Strengths",
        description: "I’m passionate, driven, and a natural problem solver, meaning I’ll never back down from a challenge. I like things organised and efficient: two things which are greatly reflected in my work. I work well both alone and in teams and show clear consistent initiative.",
        icon: <FaAngleDoubleUp style={{fontSize: "25px"}} />
    }
];

export const About = () => {
  return (
    <section className={styles.section} id="about">
        <h1 className={styles.title}>About Me</h1>
        <div className={styles.aboutItems}>
            <video className={styles.aboutImg} alt="Image of me with my hackathon team" muted loop autoPlay>
                <source src={getImageUrl("about/c4g.mp4")} type="video/mp4"/>
            </video>
            {/*
            <img 
                src={getImageUrl("about/c4g_eyes_open.png")}
                alt="Image of me with my hackathon team"
                className={styles.aboutImg}
            />*/}
            <div className={styles.accordion}>
                {accordionItems.map((item, index) => (
                    <div key={index} className={styles.accordionItem}>
                        <div className={styles.content}>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3 className={styles.header}>{item.header}</h3>
                        </div>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}