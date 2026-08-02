import './Experience.css';
import Carousel, { type CarouselItem } from '../../components/Carousel/Carousel';
import htmlIcon from '../../assets/skills/html.png';
import cssIcon from '../../assets/skills/css.png';
import jsIcon from '../../assets/skills/js.png';
import tsIcon from '../../assets/skills/ts.png';
import nodeIcon from '../../assets/skills/node.png';
import reactIcon from '../../assets/skills/react.png';
import javaIcon from '../../assets/skills/java.png';
import pythonIcon from '../../assets/skills/python.png';
import cIcon from '../../assets/skills/c.png';
import cppIcon from '../../assets/skills/cpp.png';
import mysqlIcon from '../../assets/skills/mysql.png';
import figmaIcon from '../../assets/skills/figma.png';
import photoshopIcon from '../../assets/skills/photoshop.png';
import officeIcon from '../../assets/skills/office.png';

const Experience = () => {
  const skills: CarouselItem[] = [
    {
      title: 'HTML',
      icon: htmlIcon,
    },
    {
      title: 'CSS',
      icon: cssIcon,
    },
    {
      title: 'JavaScript',
      icon: jsIcon,
    },
    {
      title: 'TypeScript',
      icon: tsIcon,
    },
    {
      title: 'Node',
      icon: nodeIcon,
    },
    {
      title: 'React (Web & Native)',
      icon: reactIcon,
    },
    {
      title: 'Java',
      icon: javaIcon,
    },
    {
      title: 'Python',
      icon: pythonIcon,
    },
    {
      title: 'C',
      icon: cIcon,
    },
    {
      title: 'C++',
      icon: cppIcon,
    },
    {
      title: 'MySQL',
      icon: mysqlIcon,
    },
    {
      title: 'Figma',
      icon: figmaIcon,
    },
    {
      title: 'Photoshop',
      icon: photoshopIcon,
    },
    {
      title: 'Microsoft Office',
      icon: officeIcon,
    },
  ];

  return (
    <section className="experience" id="experience">
      <h1>Experience</h1>
      <h2>Skills</h2>
      <Carousel items={skills} />
    </section>
  );
};

export default Experience;
