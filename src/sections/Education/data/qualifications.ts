import tcd_logo from '../../../assets/education/tcd.png';
import { type Degree } from '../../../components/DegreeCard/DegreeCard.types';

export const degrees: Degree[] = [
  {
    institution: 'Trinity College Dublin',
    icon: tcd_logo,
    title: 'Master of Computer Science (MCS)',
    dates: 'Sept. 2025 – May 2026',
    yearlyGrades: [
      {
        year: 1,
        weight: 1,
        grades: [
          {
            module: 'MSc in CS Dissertation',
            etcs: 30,
            mark: 83,
          },
          {
            module: 'Research and Innovation Methods',
            etcs: 5,
            mark: 70,
          },
          {
            module: 'Data Visualisation',
            etcs: 5,
            mark: 82,
          },
          {
            module: 'Information Retrieval and Web Search',
            etcs: 5,
            mark: 75,
          },
          {
            module: 'Internet of Things',
            etcs: 5,
            mark: 92,
          },
          {
            module: 'Security and Privacy',
            etcs: 5,
            mark: 76,
          },
          {
            module: 'Extended Reality',
            etcs: 5,
            mark: 89,
          },
        ],
      },
    ],
    additionalContent: [
      {
        title: 'Dissertation',
        content: [
          {
            body: 'A study on the design of accessible computing education workshops for families of blind and visually impaired children, with a focus on the use of assitive technologies and tactile manipulatives.',
            links: [
              {
                text: 'View Dissertation',
                url: '/view?file=dissertation',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    institution: 'Trinity College Dublin',
    icon: tcd_logo,
    title: 'Bachelor of Computer Science (BA)',
    dates: 'Sept. 2021 – May 2025',
    yearlyGrades: [
      {
        year: 3,
        weight: 0.3,
        grades: [
          {
            module: 'Software Engineering',
            etcs: 5,
            mark: 87,
          },
          {
            module: 'Software Engineering Project II',
            etcs: 5,
            mark: 71,
          },
          {
            module: 'Concurrent Systems',
            etcs: 5,
            mark: 72,
          },
          {
            module: 'Computer Networks',
            etcs: 5,
            mark: 78,
          },
          {
            module: 'Artificial Intelligence I',
            etcs: 5,
            mark: 56,
          },
          {
            module: 'Compiler Design I',
            etcs: 5,
            mark: 76,
          },
          {
            module: 'Symbolic Programming',
            etcs: 5,
            mark: 83,
          },
          {
            module: 'Introduction to Functional Programming',
            etcs: 5,
            mark: 93,
          },
          {
            module: 'Computer Architecture II',
            etcs: 5,
            mark: 91,
          },
          {
            module: 'Information Management II',
            etcs: 5,
            mark: 87,
          },
          {
            module: 'Design Thinking',
            etcs: 5,
            mark: 68,
          },
          {
            module: 'Engaging in the Digital World: Today and Tomorrow',
            etcs: 5,
            mark: 74,
          },
        ],
      },
      {
        year: 4,
        weight: 0.7,
        grades: [
          {
            module: 'Industrial or Research Lab Internship',
            etcs: 30,
            mark: 79,
          },
          {
            module: 'Internet Applications',
            etcs: 5,
            mark: 80,
          },
          {
            module: 'Fuzzy Logic and Control Systems',
            etcs: 5,
            mark: 73,
          },
          {
            module: 'Computer Graphics',
            etcs: 5,
            mark: 82,
          },
          {
            module: 'Computer Vision',
            etcs: 5,
            mark: 76,
          },
          {
            module: 'Machine Learning',
            etcs: 5,
            mark: 83,
          },
          {
            module: 'Project Methods',
            etcs: 5,
            mark: 81,
          },
        ],
      },
    ],
    additionalContent: [
      {
        title: 'Dublin University Computer Science Society (DUCSS)',
        content: ['Member since 2021', 'Amenities Officer 2023/2024', 'Competitions Officer 2024/2025'],
      },
      {
        title: 'Hackathons',
        content: ['J.P. Morgan Code for Good, Glasgow 2023'],
      },
    ],
  },
];
