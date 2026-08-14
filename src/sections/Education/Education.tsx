import './Education.css';
import DegreeCard from '../../components/DegreeCard/DegreeCard';
import { degrees } from './data/qualifications';

const Education = () => {
  return (
    <section className="education" id="education">
      <h1>Education</h1>
      <div className="degree-cards">
        {degrees.map((degree, _) => (
          <DegreeCard degree={degree} />
        ))}
      </div>
    </section>
  );
};

export default Education;
