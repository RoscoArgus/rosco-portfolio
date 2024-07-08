import React from 'react'
import styles from "./Experience.module.css"
import { getImageUrl } from '../../utils';
import history from '../../data/experience/history.json';
import skills from '../../data/experience/skills.json';

export const Experience = () => {
  return (
    <section className={styles.section} id="experience">
        <h1 className={styles.title}>Experience</h1>
        <div className={styles.container}>
            <div className={styles.itemContainer}>
              {skills.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.circle}>
                    <img className={styles.circleImage} title={item.label} src={getImageUrl(item.image)} />
                  </div>
                  <h4>{item.label}</h4>
                </div>
              ))}
            </div>
            <div className={styles.jobContainer}>
              {history.map((item, index) => (
                <div key={index} className={styles.job}>
                  <div className={styles.info}>
                    <img className={styles.image} src={getImageUrl(item.imageSrc)} />
                    <div className={styles.jobText}>
                      <h3 className={styles.jobDetails}>{item.role}</h3>
                      <h3 className={styles.jobDetails}>{item.organisation}</h3>
                      <h4 className={styles.jobDetails}>{item.startDate} - {item.endDate}</h4>
                    </div>
                  </div>
                  <ul className={styles.experiences}>
                    {item.experiences.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}