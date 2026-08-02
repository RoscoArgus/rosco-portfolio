import './Education.css';
import DegreeCard from '../../components/DegreeCard/DegreeCard';
import tcd_logo from '../../assets/education/tcd.png';

const Education = () => {
  const degrees = [
    {
      institution: 'Trinity College Dublin',
      icon: tcd_logo,
      title: 'Bachelors of Computer Science (BA)',
      dates: 'Sept. 2021 - May 2025',
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
      achievements: [],
    },
    {
      institution: 'Trinity College Dublin',
      icon: tcd_logo,
      title: 'Master of Computer Science (MCS)',
      dates: 'Sept. 2025 - May 2026',
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
      achievements: [],
    },
  ];

  return (
    <section className="education" id="education">
      <h1>Education</h1>
      <div className="degree-cards">
        {degrees.map((degree, _) => (
          <DegreeCard degree={degree} />
        ))}
      </div>
    </section>
  );
};

export default Education;
