import Carousel from '../../components/Carousel/Carousel';
import './About.css';
import { type CarouselItem } from '../../components/Carousel/Carousel';
import { Technologies } from '../../constants/technologies';

const About = () => {
  const skills: CarouselItem[] = Object.values(Technologies).map((tech) => ({
    title: tech.title,
    icon: tech.icon,
  }));

  return (
    <section className="about" id="about">
      <h1>About Me</h1>
      <h2>Skills</h2>
      <Carousel items={skills} />
    </section>
  );
};

export default About;
