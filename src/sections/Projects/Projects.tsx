import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import projects from './data/projects';
import { useState, type CSSProperties } from 'react';
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, projects.length - 1));
    setCurrentIndex(newIndex);
  };

  return (
    <section className="projects" id="projects">
      <h1>Projects</h1>
      <div className="projects-items" style={{ '--index': currentIndex } as CSSProperties}>
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
      <span className="projects-controls">
        <button onClick={() => updateIndex(0)} disabled={currentIndex === 0}>
          <FaAngleDoubleLeft className="icon" />
        </button>
        <button onClick={() => updateIndex(currentIndex - 1)} disabled={currentIndex === 0}>
          <FaAngleLeft className="icon" />
        </button>
        <button onClick={() => updateIndex(currentIndex + 1)} disabled={currentIndex === projects.length - 1}>
          <FaAngleRight className="icon" />
        </button>
        <button onClick={() => updateIndex(projects.length - 1)} disabled={currentIndex === projects.length - 1}>
          <FaAngleDoubleRight className="icon" />
        </button>
      </span>
    </section>
  );
};

export default Projects;
