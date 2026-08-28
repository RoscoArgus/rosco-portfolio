import './DegreeCard.css';
import { useState, useMemo } from 'react';
import { type Degree } from './DegreeCard.types';
import { calculateClassification, calculateOverallGPA, calculateOverallPercentage } from '../../utils/gradeCalculation';

interface DegreeCardProps {
  degree: Degree;
}

const DegreeCard: React.FC<DegreeCardProps> = ({ degree }) => {
  const [awardType, setAwardType] = useState<'percentage' | 'honours' | 'gpa'>('honours');
  const { institution, title, dates, icon, yearlyGrades, additionalContent } = degree;

  const classification = useMemo(() => calculateClassification(yearlyGrades), [yearlyGrades]);
  const gpa = useMemo(() => calculateOverallGPA(yearlyGrades), [yearlyGrades]);
  const percentage = useMemo(() => calculateOverallPercentage(yearlyGrades), [yearlyGrades]);

  return (
    <div className="degree-card">
      <div className="degree-content">
        <div className="degree-header">
          <img src={icon} />
          <div>
            <h2>{institution}</h2>
            <h3>{title}</h3>
            <p>{dates}</p>
          </div>
        </div>
        <div className="degree-body">
          {additionalContent.map((content, index) => (
            <div key={index} className="additional-content">
              <h4>{content.title}</h4>
              <ul>
                {content.content.map((item, idx) =>
                  typeof item === 'string' ? (
                    <li key={idx}>{item}</li>
                  ) : (
                    <li key={idx}>
                      {item.body}
                      {item.links &&
                        item.links.length > 0 &&
                        item.links.map((link, linkIdx) => (
                          <>
                            {' '}
                            <a key={linkIdx} href={link.url}>
                              {link.text}
                            </a>
                          </>
                        ))}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="degree-award">
        <h2>Awarded:</h2>
        <div className="award-details">
          <p className="award-grade">
            {awardType === 'honours' ? classification?.grade : awardType === 'percentage' ? `${percentage}%` : gpa}
          </p>
          <p className="award-description">
            {awardType === 'honours'
              ? classification?.description
              : awardType === 'percentage'
                ? 'Percent Average'
                : 'Grade-Point Average'}
          </p>
        </div>
        <div className="award-toggle">
          <button
            type="button"
            className={awardType === 'percentage' ? 'active' : ''}
            aria-label="Percent Average"
            aria-pressed={awardType === 'percentage'}
            onClick={() => setAwardType('percentage')}
            title="Percent Average"
          >
            %
          </button>
          <button
            type="button"
            className={awardType === 'honours' ? 'active' : ''}
            onClick={() => setAwardType('honours')}
            aria-pressed={awardType === 'honours'}
            title="Honours Classification"
          >
            Hons.
          </button>
          <button
            type="button"
            className={awardType === 'gpa' ? 'active' : ''}
            onClick={() => setAwardType('gpa')}
            aria-pressed={awardType === 'gpa'}
            title="Grade Point Average"
          >
            GPA
          </button>
        </div>
      </div>
    </div>
  );
};

export default DegreeCard;
