import './ProjectCard.css';
import { type Technology } from '../../constants/technologies';
import { FaGithub, FaGlobe, FaPlayCircle } from 'react-icons/fa';

export interface Project {
  title: string;
  description: string;
  banner: string;
  keyFeatures: string[];
  technologies: Technology[];
  backgroundColor?: string;
  link?: string;
  video?: string;
  sourceCode?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card" style={{ backgroundColor: project.backgroundColor || 'var(--color-bg)' }}>
      <img className="project-banner" src={project.banner} />
      <div className="project-content">
        <div className="project-info">
          <h2>{project.title}</h2>
          <span className="project-sources">
            {project.sourceCode && (
              <a title="GitHub Source Code" href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                <FaGithub className="icon" />
              </a>
            )}
            {project.video && (
              <a title="Video Demo" href={project.link} target="_blank" rel="noopener noreferrer">
                <FaPlayCircle className="icon" />
              </a>
            )}
            {project.link && (
              <a title={`Visit ${project.link}`} href={project.link} target="_blank" rel="noopener noreferrer">
                <FaGlobe className="icon" />
              </a>
            )}
          </span>
          <p>{project.description}</p>
        </div>
        <div className="project-technologies">
          {project.technologies.map((tech) => (
            <img key={tech.title} src={tech.icon} alt={tech.title} title={tech.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
