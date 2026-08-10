import Timeline from '../../components/Timeline/Timeline';
import './Experience.css';
import workdayIcon from '../../assets/experience/workday-icon.png';
import workdayBanner from '../../assets/experience/workday-banner.png';
import nitroIcon from '../../assets/experience/nitro-icon.png';
import nitroBanner from '../../assets/experience/nitro-banner.png';
import quantexaIcon from '../../assets/experience/quantexa-icon.png';
import quantexaBanner from '../../assets/experience/quantexa-banner.png';

const Experience = () => {
  const experiences = [
    {
      title: 'Nitro',
      roles: [
        {
          title: 'Student Software Engineer',
          startDate: new Date('2023-01-24'),
          endDate: new Date('2023-04-04'),
          description: 'TODO',
        },
      ],
      icon: nitroIcon,
      banner: nitroBanner,
      backgroundColor: '#FC6030',
    },
    {
      title: 'Quantexa',
      roles: [
        {
          title: 'Student Project Lead',
          startDate: new Date('2024-01-23'),
          endDate: new Date('2024-04-9'),
          description: 'TODO',
        },
      ],
      icon: quantexaIcon,
      banner: quantexaBanner,
      backgroundColor: '#342243',
    },
    {
      title: 'Workday',
      roles: [
        {
          title: 'Software Development Engineer Intern',
          startDate: new Date('2025-02-10'),
          endDate: new Date('2025-08-22'),
          description: 'TODO',
        },
      ],
      icon: workdayIcon,
      banner: workdayBanner,
      backgroundColor: '#0F2E66',
    },
  ];

  return (
    <section className="experience" id="experience">
      <h1>Experience</h1>
      <Timeline experiences={experiences} />
    </section>
  );
};

export default Experience;
