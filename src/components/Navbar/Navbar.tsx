import MenuButton from '../MenuButton/MenuButton';
import './Navbar.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

interface Link {
  text: string;
  href: string;
  external?: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useClickOutside<HTMLElement>(() => setIsMenuOpen(false));

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const links: Link[] = [
    { text: 'About Me', href: '/#about' },
    { text: 'Contact', href: 'mailto:roscod@live.ie', external: true },
  ];

  return (
    <nav ref={navbarRef} className="navbar">
      <a className="title" href="/">
        roscoargus.dev
      </a>
      {/*If media query triggered, display menu button*/}
      <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <ul className={`navLinks ${isMenuOpen ? 'open' : ''}`}>
        {links.map((link, index) => {
          return (
            <li key={index}>
              <a href={link.href}>
                {link.text}
                {link.external && <FaExternalLinkAlt className="icon" />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
