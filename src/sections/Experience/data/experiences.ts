import { type Experience } from '../../../components/Timeline/Timeline';
import workdayIcon from '../../../assets/experience/workday-icon.png';
import workdayBanner from '../../../assets/experience/workday-banner.png';
import odeonIcon from '../../../assets/experience/odeon-icon.png';
import odeonBanner from '../../../assets/experience/odeon-banner.png';
import tcdIcon from '../../../assets/experience/tcd-icon.png';
import tcdBanner from '../../../assets/experience/tcd-banner.png';

/* import nitroIcon from '../../../assets/experience/nitro-icon.png';
import nitroBanner from '../../../assets/experience/nitro-banner.png';
import quantexaIcon from '../../../assets/experience/quantexa-icon.png';
import quantexaBanner from '../../../assets/experience/quantexa-banner.png'; */
  
const experiences: Experience[] = [
    {
      title: 'Odeon Cinemas',
      jobType: 'Part-Time',
      roles: [
        {
          title: 'Cinema Host',
          startDate: new Date('2021-06-21'),
          endDate: new Date('2025-01-12'),
          description: 'I worked as a host in one of Ireland\'s busiest cinemas, providing enjoyable and memorable guest experiences through food & beverage sales and ushering in line with company visions and values.',
        },
      ],
      highlights: [
        'Awarded \'Visions & Values\' award for providing exceptional customer service and embodying the company\'s values.',
        'Consistently received positive feedback from customers and management for my friendliness and quality of service.',
        'Completed company performance scheme by demonstrating exceptional performance and dedication to the role.',
        'Trained and mentored new staff members, helping them to develop their skills and knowledge of the company.',
        'Partnered with marketing team to promote Odeon student offers to Trinity College Dublin students.'
      ],
      icon: odeonIcon,
      banner: odeonBanner,
      backgroundColor: '#00235B',
    },
    /* {
      title: 'Nitro',
      jobType: 'Industrial Project',
      roles: [
        {
          title: 'Student Software Engineer',
          startDate: new Date('2023-01-24'),
          endDate: new Date('2023-04-04'),
          description: 'I worked with on a group project the Data & Document Intelligence team to develop a machine learning model to identify the location of non-text content in PDF documents.',
        },
      ],
      icon: nitroIcon,
      banner: nitroBanner,
      backgroundColor: '#FC6030',
    },
    {
      title: 'Quantexa',
      jobType: 'Industrial Project',
      roles: [
        {
          title: 'Student Project Lead',
          startDate: new Date('2024-01-23'),
          endDate: new Date('2024-04-9'),
          description: 'I worked on a group project with the NLP Data Science team to develop an interactive AI taxonomy builder to assist in threat detection and risk management. I was responsible for leading the team, managing the project timeline, and ensuring that the project met the client\'s requirements.',
        },
      ],
      icon: quantexaIcon,
      banner: quantexaBanner,
      backgroundColor: '#342243',
    }, */
    {
      title: 'Workday',
      jobType: 'Internship',
      roles: [
        {
          title: 'Software Development Engineer Intern',
          startDate: new Date('2025-02-10'),
          endDate: new Date('2025-08-22'),
          description: 'I worked with the AI Experience organisation on various guidance features incorporating Workday\'s AI Assistant. I was responsible for developing and implementing new features, as well as testing and debugging existing features. This included a complete overhaul our application from JavaScript to TypeScript.',
        },
      ],
      highlights: [
        'Worked on several guidance features across Workday tasks to improve navigation and user experience.',
        'Migrated our entire application from JavaScript to TypeScript, improving code quality and maintainability.',
        'Implemented styling improvements across the application, enhancing the user experience and visual appeal.',
        'Developed Generative UI component for the Workday Assistant to enable a more interactive and engaging user experience.',
      ],
      icon: workdayIcon,
      banner: workdayBanner,
      backgroundColor: '#0F2E66',
    },
    {
      title: 'Trinity Business School',
      jobType: 'Part-Time',
      roles: [
        {
          title: 'Operations Assistant',
          startDate: new Date('2025-09-29'),
          endDate: new Date('2026-07-31'),
          description: 'I worked as an operations assistant for Trinity\'s innovation and enterprise hub, Portal, assisting with daily operations and event management, acting as support staff for corportate gatherings.',
        }
      ],
      highlights: [
        'Assisted with the preparation of Trinity\'s Innovation Hub on Grand Canal Quay',
        'Set-up the Portal Main Space for events, workshops, and classes, ensuring that the space was clean, organized, and ready for use.',
        'Provided support for various events and workshops, ensuring smooth operations and positive experiences for attendees.',
      ],
      icon: tcdIcon,
      banner: tcdBanner,
      backgroundColor: '#0071BD',
    },
    {
      title: 'Workday',
      jobType: 'Full-Time',
      roles: [
        {
          title: 'Software Development Engineer',
          startDate: new Date('2026-09-21'),
          description: 'Coming soon!',
        },
      ],
      icon: workdayIcon,
      banner: workdayBanner,
      backgroundColor: '#0F2E66',
    },
];

export default experiences;