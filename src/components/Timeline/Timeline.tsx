import './Timeline.css';
import { useState, useRef } from 'react';

interface TimelineProps {
  experiences: Experience[];
}

interface Role {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface Experience {
  title: string;
  roles: Role[];
  icon: string;
  banner: string;
  backgroundColor: string;
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClick = (experience: Experience) => {
    setActiveExperience(experience);

    requestAnimationFrame(() => {
      popoverRef.current?.showPopover();
    });
  };

  return (
    <div className="timeline">
      {experiences.map((experience, index) => (
        <button key={index} type="button" className="timeline-item" onClick={() => handleClick(experience)}>
          <img className="timeline-icon" src={experience.icon} alt={experience.title} />
        </button>
      ))}
      {activeExperience && (
        <div
          ref={popoverRef}
          id="experience-popover"
          popover="auto"
          className="experience-popover"
          style={{ backgroundColor: activeExperience.backgroundColor }}
        >
          <img className="experience-banner" src={activeExperience.banner} alt={activeExperience.title} />
          {activeExperience.title}
        </div>
      )}
    </div>
  );
};

export default Timeline;
