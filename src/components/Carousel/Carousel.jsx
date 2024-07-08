/* 
Component by cod3xpert on codesandbox.io
https://codesandbox.io/p/sandbox/react-carousel-3d-9x3wt?file=%2Fsrc%2FSlider.js%3A1%2C1-118%2C1

Slightly modified to fit my needs
*/

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub, FaInfoCircle } from "react-icons/fa";
import styles from './Carousel.module.css';
import { getImageUrl } from "../../utils";

export const Carousel = (props) => {
  const [activeSlide, setActiveSlide] = useState(props.activeSlide);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1050);
  const gap = 400;

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1150);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setActiveSlide((activeSlide + 1) % props.data.length);
  };

  const prev = () => {
    setActiveSlide((activeSlide - 1 + props.data.length) % props.data.length);
  };

  const getStyles = (index) => {
    const slidesCount = props.data.length;
    const currentIndex = (index - activeSlide + slidesCount) % slidesCount;

    if (isSmallScreen) {
      if (currentIndex === 0)
        return {
          opacity: 1,
          transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
          zIndex: 10
        };
      return {
        opacity: 0,
        transform: "translateX(0%) translateZ(0px) rotateY(180deg)",
        zIndex: 7
      };
    }

    if (currentIndex === 0)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10
      };
    else if (currentIndex === slidesCount - 1 || currentIndex === 1)
      return {
        opacity: 1,
        transform: `translateX(${(currentIndex === 1 ? 1 : -1) * gap}px) translateZ(-400px) rotateY(${(currentIndex === 1 ? -1 : 1) * 35}deg)`,
        zIndex: 9
      };
    else if (currentIndex === slidesCount - 2 || currentIndex === 2)
      return {
        opacity: 1,
        transform: `translateX(${(currentIndex === 2 ? 1 : -1) * gap * 2}px) translateZ(-500px) rotateY(${(currentIndex === 2 ? -1 : 1) * 35}deg)`,
        zIndex: 8
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7
      };
    else
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7
      };
  };

  return (
    <div className={styles.carousel}>
      {/* carousel */}
      <div className={styles.slideC}>
        {props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <div
              className={styles.slide}
              style={{
                background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i)
              }}
            >
              <SliderContent {...item} />
            </div>
            <div
              className={styles.reflection}
              style={{
                background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                ...getStyles(i)
              }}
            />
          </React.Fragment>
        ))}
      </div>
      {/* carousel */}

      <div className={styles.btns}>
        <FaChevronLeft
          className={styles.btn}
          onClick={prev}
          color="#fff"
          size="50px"
        />
        <FaChevronRight
          className={styles.btn}
          onClick={next}
          color="#fff"
          size="50px"
        />
      </div>
    </div>
  );
};

const SliderContent = (props) => {

  const handleIconClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      // Handle the case where the URL is not provided
      console.log("URL not provided");
    }
  }

  return (
    <div className={styles.sliderContent}>
      <div className={styles.sliderImg}>
        <img src={getImageUrl(props.imageSrc)} />
      </div>
      <div className={styles.sliderText}>
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
      <div className={styles.sliderButtons}>
        <FaGithub
          className={`${styles.sliderBtn} ${!props.source ? styles.disabled : ''}`}
          title="Source Code"
          onClick={() => handleIconClick(props.source)}
        />
        <FaInfoCircle
          className={`${styles.sliderBtn} ${!props.demo ? styles.disabled : ''}`}
          title="Demo/Info"
          onClick={() => handleIconClick(props.demo)}
        />
      </div>
    </div>
  );
};