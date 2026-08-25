import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import projects from './data/projects';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h1>Projects</h1>
      <div className="projects-items">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
