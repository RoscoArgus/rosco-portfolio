import './Hero.css';
import heroImage from '../../assets/hero1.jpg';
import { FaGithub, FaLinkedin, FaFigma } from 'react-icons/fa';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const Hero = () => {
  const links: SocialLink[] = [
    { href: 'https://github.com/RoscoArgus', icon: <FaGithub className="icon" />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/roscoargus/', icon: <FaLinkedin className="icon" />, label: 'LinkedIn' },
    { href: 'https://www.figma.com/@roscoargus', icon: <FaFigma className="icon" />, label: 'Figma' },
  ];

  return (
    <section id="hero" className="hero">
      <div className="heroContainer">
        <div className="heroContent">
          <h1>Hi! I'm Ross.</h1>
          <p>
            I'm a Software Engineer based in <b>Dublin, Ireland</b> with a passion for frontend development. Keep
            scrolling to learn more!
          </p>
          <ul>
            {links.map((link, index) => (
              <li key={index} title={link.label} aria-label={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <img src={heroImage} alt="Hero image of me" />
      </div>
    </section>
  );
};

export default Hero;
