import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import projects from './data/projects';
import { useState, type CSSProperties } from 'react';
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight, FaTools } from 'react-icons/fa';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const updateIndex = (index: number) => {
    const newIndex = Math.max(1, Math.min(index, projects.length));
    setCurrentIndex(newIndex);
  };

  return (
    <section className="projects" id="projects">
      <h1>Projects</h1>
      <div className="projects-items" style={{ '--index': currentIndex } as CSSProperties}>
        <div className="ghost-card">
          <FaTools className="icon" />
        </div>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} isActive={index === currentIndex - 1} />
        ))}
        <div className="ghost-card">
          <FaTools className="icon" />
        </div>
      </div>
      <span className="projects-controls">
        <button onClick={() => updateIndex(0)} disabled={currentIndex === 1} title="Skip to Start">
          <FaAngleDoubleLeft className="icon" />
        </button>
        <button onClick={() => updateIndex(currentIndex - 1)} disabled={currentIndex === 1} title="Previous Project">
          <FaAngleLeft className="icon" />
        </button>
        <button
          onClick={() => updateIndex(currentIndex + 1)}
          disabled={currentIndex === projects.length}
          title="Next Project"
        >
          <FaAngleRight className="icon" />
        </button>
        <button
          onClick={() => updateIndex(projects.length)}
          disabled={currentIndex === projects.length}
          title="Skip to End"
        >
          <FaAngleDoubleRight className="icon" />
        </button>
      </span>
    </section>
  );
};

export default Projects;
