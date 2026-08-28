export interface Degree {
  institution: string;
  icon: string;
  title: string;
  dates: string;
  yearlyGrades: DegreeYear[];
  additionalContent: AdditionalContent[];
}

export interface DegreeYear {
  year: number;
  weight: number;
  grades: Grade[];
}

interface Grade {
  module: string;
  etcs: number;
  mark: number;
}

interface AdditionalContent {
  title: string;
  content: (string | Content)[];
}

interface Hyperlink {
  text: string;
  url: string;
}
interface Content {
  body: string;
  links?: Hyperlink[];
}
