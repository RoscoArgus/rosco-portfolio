import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = () => {
  const [expanded, setExpanded] = useState(null);

  const handleMouseEnter = (index) => {
    setExpanded(index);
  };

  const handleMouseLeave = () => {
    setExpanded(null);
  };

  return (
    <div className={styles.accordion}>
      {['Education', 'Development', 'Skills'].map((item, index) => (
        <div
          key={index}
          className={`${styles.accordionItem} ${expanded === index ? styles.accordionItemExpanded : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.accordionHeader}>{item}</div>
          <div className={`${styles.accordionContent} ${expanded === index ? styles.accordionContentExpanded : ''}`}>
            {index === 0 && (
              <p>
                I am a 4th Year Integrated Computer Science student at Trinity College Dublin,
                expecting to graduate with my Master's Degree in 2026. I have a First class Honours
                average (3.88 GPA equivalent).
              </p>
            )}
            {index === 1 && <p>Details about development experience...</p>}
            {index === 2 && <p>Details about skills...</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
