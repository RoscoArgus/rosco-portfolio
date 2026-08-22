import htmlIcon from '../assets/skills/html.png';
import cssIcon from '../assets/skills/css.png';
import jsIcon from '../assets/skills/js.png';
import tsIcon from '../assets/skills/ts.png';
import nodeIcon from '../assets/skills/node.png';
import reactIcon from '../assets/skills/react.png';
import reactNativeIcon from '../assets/skills/react-native.png';
import javaIcon from '../assets/skills/java.png';
import pythonIcon from '../assets/skills/python.png';
import cIcon from '../assets/skills/c.png';
import cppIcon from '../assets/skills/cpp.png';
import cSharpIcon from '../assets/skills/csharp.png';
import mysqlIcon from '../assets/skills/mysql.png';
import firebaseIcon from '../assets/skills/firebase.png';
import figmaIcon from '../assets/skills/figma.png';
import photoshopIcon from '../assets/skills/photoshop.png';
import officeIcon from '../assets/skills/office.png';

export interface Technology {
    title: string;
    icon: string;
}

export const Technologies: Record<string, Technology> = {
    HTML: {
      title: 'HTML',
      icon: htmlIcon,
    },
    CSS: {
      title: 'CSS',
      icon: cssIcon,
    },
    JavaScript: {
      title: 'JavaScript',
      icon: jsIcon,
    },
    TypeScript: {
      title: 'TypeScript',
      icon: tsIcon,
    },
    Node: {
      title: 'Node',
      icon: nodeIcon,
    },
    React: {
      title: 'React',
      icon: reactIcon,
    },
    ReactNative: {
      title: 'React Native',
      icon: reactNativeIcon,
    },
    Java: {
      title: 'Java',
      icon: javaIcon,
    },
    Python: {
      title: 'Python',
      icon: pythonIcon,
    },
    C: {
      title: 'C',
      icon: cIcon,
    },
    CPP: {
      title: 'C++',
      icon: cppIcon,
    },
    CSharp: {
      title: 'C#',
      icon: cSharpIcon,
    },
    MySQL: {
      title: 'MySQL',
      icon: mysqlIcon,
    },
    Firebase: {
      title: 'Firebase',
      icon: firebaseIcon,
    },
    Figma: {
      title: 'Figma',
      icon: figmaIcon,
    },
    Photoshop:{
      title: 'Photoshop',
      icon: photoshopIcon,
    },
    MicrosoftOffice: {
      title: 'Microsoft Office',
      icon: officeIcon,
    },
} as const satisfies Record<string, Technology>;