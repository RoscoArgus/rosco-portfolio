import React from 'react'
import styles from './Projects.module.css';
import { Carousel } from '../Carousel/Carousel';
import projects from '../../data/projects/projects';

export const Projects = () => {
  return (
    <section className={styles.section} id="projects">
        <h1 className={styles.title}>Projects</h1>
        <Carousel data={projects} activeSlide={0} />
    </section>
  )
}