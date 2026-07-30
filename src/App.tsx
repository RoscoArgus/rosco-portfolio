import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <Hero />
        <About />
        <div id="Skills"></div>
        <div id="Experience"></div>
        <div id="Projects"></div>
        <div id="Contact"></div>
      </main>
    </>
  );
}

export default App;

