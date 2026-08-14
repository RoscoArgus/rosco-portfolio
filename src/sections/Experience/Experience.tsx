import Timeline from '../../components/Timeline/Timeline';
import './Experience.css';
import experiences from './data/experiences';

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <h1>Experience</h1>
      <Timeline experiences={experiences} />
    </section>
  );
};

export default Experience;
