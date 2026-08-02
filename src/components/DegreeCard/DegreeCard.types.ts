export interface Degree {
  institution: string;
  icon: string;
  title: string;
  dates: string;
  yearlyGrades: DegreeYear[];
  achievements: string[];
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
