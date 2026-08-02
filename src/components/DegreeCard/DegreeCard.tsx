import './DegreeCard.css';
import { useState, useEffect } from 'react';
import { type Degree } from './DegreeCard.types';
import { calculateClassification, calculateOverallGPA } from '../../utils/gradeCalculation';

interface DegreeCardProps {
  degree: Degree;
}

const DegreeCard: React.FC<DegreeCardProps> = ({ degree }) => {
  const [awardType, setAwardType] = useState<'honours' | 'gpa'>('honours');
  const { institution, title, dates, icon, yearlyGrades, achievements } = degree;
  const [classification, setClassification] = useState<{ grade: string; description: string } | null>(null);
  const [gpa, setGPA] = useState<string | null>(null);

  useEffect(() => {
    const classificationResult = calculateClassification(yearlyGrades);
    setClassification(classificationResult);

    const overallGPA = calculateOverallGPA(yearlyGrades);
    setGPA(overallGPA);
  }, [yearlyGrades]);

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
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="degree-award">
        <h2>Awarded:</h2>
        <div className="award-details">
          <p className="award-grade">{awardType === 'honours' ? classification?.grade : gpa}</p>
          <p className="award-description">
            {awardType === 'honours' ? classification?.description : 'Grade-Point Average'}
          </p>
        </div>
        <div className="award-toggle">
          <button
            type="button"
            className={awardType === 'honours' ? 'active' : ''}
            onClick={() => setAwardType('honours')}
            aria-pressed={awardType === 'honours'}
          >
            Honours
          </button>
          <button
            type="button"
            className={awardType === 'gpa' ? 'active' : ''}
            onClick={() => setAwardType('gpa')}
            aria-pressed={awardType === 'gpa'}
          >
            GPA
          </button>
        </div>
      </div>
    </div>
  );
};

export default DegreeCard;
