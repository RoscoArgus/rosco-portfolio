import Hero from '../../sections/Hero/Hero';
import About from '../../sections/About/About';
import Experience from '../../sections/Experience/Experience';
import Projects from '../../sections/Projects/Projects';
import Contact from '../../sections/Contact/Contact';
import Education from '../../sections/Education/Education';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About /> {/*Personal snippet. Maybe a quiz? or Flash cards like before? */}
      <Education /> {/*Where did I go to college and what qualifications do I have? Facts about my time in college*/}
      <Experience /> {/*What work / industry experience do I have?*/}
      <Projects /> {/*What personal projects have I worked on? Programming, */}
      <Contact /> {/**/}
    </>
  );
};

export default Home;
