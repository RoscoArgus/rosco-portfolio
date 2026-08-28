import { type Project } from '../../../components/ProjectCard/ProjectCard';
import { Technologies } from '../../../constants/technologies';
import ducssBanner from '../../../assets/projects/ducss.png';
import taxyBanner from '../../../assets/projects/taxy.png';
import countyHunterBanner from '../../../assets/projects/county_hunter.png';
import drawYourWeaponsBanner from '../../../assets/projects/draw_your_weapons.png';
import homeBrewBanner from '../../../assets/projects/homebrew.png';
import ourKidsCodeBanner from '../../../assets/projects/ourkidscode.png';
import roscoArgusBanner from '../../../assets/projects/roscoargus.png';
import taxyDemo from '../../../assets/projects/videos/taxy_demo.mp4';
import drawYourWeaponsDemo from '../../../assets/projects/videos/drawyourweapons_demo.mp4';
import homeBrewDemo from '../../../assets/projects/videos/homebrew_demo.mp4';

const projects: Project[] = [
  {
    title: 'roscoargus.dev',
    description:
      'This very website! My personal portfolio website for showcasing my projects, skills, and experience as a software developer.',
    keyFeatures: ['Responsive Design', 'Animations'],
    technologies: [Technologies.React, Technologies.TypeScript],
    banner: roscoArgusBanner,
    backgroundColor: '#0C3340',
    sourceCode: 'https://github.com/RoscoArgus/rosco-portfolio',
    link: 'https://roscoargus.dev',
  },
  {
    title: 'County Hunter',
    description:
      'A multiplayer geolocation game where players compete to discover a number of locations and finish with the highest score.',
    keyFeatures: ['User Authentication', 'Real-Time Updates', 'Geolocation', 'Responsive Design'],
    technologies: [Technologies.React, Technologies.JavaScript, Technologies.Firebase],
    banner: countyHunterBanner,
    backgroundColor: '#FF4343',
    sourceCode: 'https://github.com/RoscoArgus/county-hunter',
    link: 'https://countyhunter.roscoargus.dev',
  },
  {
    title: 'DUCSS App',
    description:
      'A mobile application for the Dublin University Computer Science Society (DUCSS) to share news and resources and manage events and memberships for the society.',
    keyFeatures: ['User Authentication', 'Mobile Design', 'Geolocation'],
    technologies: [Technologies.ReactNative, Technologies.JavaScript, Technologies.Firebase],
    banner: ducssBanner,
    backgroundColor: '#FF9F2E',
    sourceCode: 'https://github.com/RoscoArgus/DUCSS-App',
  },
  {
    title: 'HomeBrew',
    description:
      'An Internet of Things (IoT) coffee machine that offers users granular control over the brewing process, allowing them to create their perfect cup of coffee.',
    keyFeatures: ['IoT', 'User Authentication', 'Real-Time Updates', 'Data Visualisation', 'MCP', 'LLM Integration'],
    technologies: [
      Technologies.React,
      Technologies.TypeScript,
      Technologies.Python,
      Technologies.C,
      Technologies.MySQL,
    ],
    banner: homeBrewBanner,
    backgroundColor: '#2c1a07',
    sourceCode: 'https://github.com/sixth-sensors/project-cafe',
    video: homeBrewDemo,
  },
  {
    title: 'Draw Your Weapons',
    description:
      'An augmented reality (AR) Unity app for the Meta Quest 3 that demonstrates real-time procedural and AI-powered 3D model generation via the passthrough camera.',
    keyFeatures: ['Computer Vision', '3D Graphics', 'Augmented Reality', 'AI Content Generation'],
    technologies: [Technologies.CSharp],
    banner: drawYourWeaponsBanner,
    backgroundColor: '#5F5F5F',
    sourceCode: 'https://github.com/RoscoArgus/draw_your_weapons',
    video: drawYourWeaponsDemo,
  },
  {
    title: 'Taxy',
    description:
      'An interactive AI taxonomy builder that assists in areas such as fraud detection and data classification.',
    keyFeatures: ['Data Visualisation', 'AI Content Generation'],
    technologies: [Technologies.React, Technologies.JavaScript, Technologies.Python],
    banner: taxyBanner,
    backgroundColor: '#4618D8',
    sourceCode: 'https://github.com/RoscoArgus/taxy',
    video: taxyDemo,
  },
  {
    title: 'OurKidsCode: Accessible Pet',
    description:
      'A WCAG-compliant website for the delivery of an accessible coding workshop for families with blind and visually impaired children.',
    keyFeatures: ['Accessibility', 'Responsive Design', 'High-Contrast Mode', 'Screen-Reader Support'],
    technologies: [Technologies.React, Technologies.JavaScript],
    banner: ourKidsCodeBanner,
    backgroundColor: '#284389',
    sourceCode: 'https://github.com/RoscoArgus/accessible-pet',
    link: 'https://pet.roscoargus.dev',
  },
];

export default projects;
