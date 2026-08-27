import './Timeline.css';
import { useModal } from '../../context/ModalContext';
import { FaTimes } from 'react-icons/fa';

interface TimelineProps {
  experiences: Experience[];
}

interface Role {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

export interface Experience {
  title: string;
  jobType?: 'Full-Time' | 'Part-Time' | 'Internship' | 'Industrial Project';
  roles: Role[];
  highlights?: string[];
  icon: string;
  banner: string;
  backgroundColor: string;
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const { openModal, closeModal } = useModal();

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
    const latestRole = experience.roles[experience.roles.length - 1];
    const endYear = latestRole.endDate ? latestRole.endDate.getFullYear() : 'Present';

    return startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;
  };

  const handleTimelineItemClick = (experience: Experience) => {
    openModal(
      <div className="experience-modal" style={{ backgroundColor: experience.backgroundColor }}>
        <div className="experience-banner-container">
          <img className="experience-banner" src={experience.banner} alt={experience.title} />
          <div
            className="experience-banner-overlay"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, ${experience.backgroundColor} 100%)`,
            }}
          >
            <h2>{experience.title}</h2>
            <p>{experience.jobType}</p>
            <i>{getDateRange(experience)}</i>
          </div>
        </div>
        <div className="experience-content">
          <ul
            className="roles"
            style={{ backgroundColor: `lch(from ${experience.backgroundColor} calc(l * 0.75) c h)` }}
          >
            <h3>Roles</h3>
            {experience.roles.map((role, index) => (
              <>
                <li className="role-item" key={index}>
                  <h4>{role.title}</h4>
                  <i>
                    {role.startDate.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })}
                    {role.endDate &&
                      `- ` + role.endDate?.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })}
                  </i>
                  <p>{role.description}</p>
                </li>
                {index !== experience.roles.length - 1 && <hr style={{ backgroundColor: 'red' }} />}
              </>
            ))}
          </ul>
          {experience.highlights && (
            <ul
              className="highlights"
              style={{ backgroundColor: `lch(from ${experience.backgroundColor} calc(l * 0.75) c h)` }}
            >
              <h3>Highlights</h3>
              {experience.highlights.map((highlight, index) => (
                <>
                  <li key={index}>
                    <p>{highlight}</p>
                  </li>
                </>
              ))}
            </ul>
          )}
          <button className="close-button" onClick={closeModal}>
            <FaTimes className="icon" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="timeline">
        {experiences.map((experience, index) => (
          <button key={index} type="button" className="timeline-item">
            <div className="timeline-label">
              <h2>{experience.title}</h2>
              <h3>{getRoleTitle(experience)}</h3>
              <i>{getDateRange(experience)}</i>
            </div>
            <img
              className="timeline-icon"
              src={experience.icon}
              alt={experience.title}
              onClick={() => handleTimelineItemClick(experience)}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default Timeline;
