import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';
import Education from './sections/Education/Education';

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <Hero />
        <About /> {/*Personal snippet. Maybe a quiz? or Flash cards like before? */}
        <Education /> {/*Where did I go to college and what qualifications do I have? Facts about my time in college*/}
        <Experience /> {/*What work / industry experience do I have?*/}
        <Projects /> {/*What personal projects have I worked on? Programming, */}
        <Contact /> {/**/}
      </main>
    </>
  );
}

export default App;

