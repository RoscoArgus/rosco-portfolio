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
  const getRoleTitle = (experience: Experience): string => {
    switch (experience.roles.length) {
      case 0:
        throw new Error(`Experience "${experience.title}" has no roles.`);
      case 1:
        return experience.roles[0].title;
      default:
        return 'Multiple Roles';
    }
  };

  const getDateRange = (experience: Experience): string => {
    const startYear = experience.roles[0].startDate.getFullYear();
    const endYear = experience.roles[experience.roles.length - 1].endDate.getFullYear();
    return startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;
  };

  return (
    <>
      <div className="timeline">
        {experiences.map((experience, index) => (
          <button key={index} type="button" className="timeline-item" onClick={() => {}}>
            <div className="timeline-label">
              <h2>{experience.title}</h2>
              <h3>{getRoleTitle(experience)}</h3>
              <p>{getDateRange(experience)}</p>
            </div>
            <img className="timeline-icon" src={experience.icon} alt={experience.title} />
          </button>
        ))}
      </div>
    </>
  );
};

export default Timeline;
