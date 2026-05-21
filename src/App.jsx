import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { About } from './components/About/About';
import { PDF } from './components/PDF/PDF';
import { Experience } from './components/Experience/Experience';
import { Hero } from './components/Hero/Hero';
import { Navbar } from './components/Navbar/Navbar';
import { Projects } from './components/Projects/Projects';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.hash) {
        setTimeout(() => {
          const id = window.location.hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          }
        }, 100);
      }
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isDissertation = currentPath === '/dissertation';
  const isCV = currentPath === '/cv';

  return (
    <div className={styles.App}>
      <Navbar />
      {isDissertation 
        ? <PDF src="/documents/Ross_Devine_Dissertation_FINAL.pdf" title="Coding Education for Families with Blind and Visually Impaired Children" />
        : isCV
          ? <PDF src="/documents/CV.pdf" title="Ross Devine - CV" />
          : <>
              <Hero />
              <About />
              <Experience />
              <Projects />
            </>
      }
    </div>
  );
}

export default App
