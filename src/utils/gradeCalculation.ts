import { type DegreeYear } from '../components/DegreeCard/DegreeCard.types';

interface Classification {
  grade: string;
  description: string;
}

interface Grade {
  grade: string;
  gradePoint: number;
}

const CLASSIFICATIONS: readonly (Classification & { min: number })[] = [
    { min: 70, grade: 'I', description: 'First-Class Honours' },
    { min: 60, grade: 'II.1', description: 'Second-Class Honours, First Division' },
    { min: 50, grade: 'II.2', description: 'Second-Class Honours, Second Division' },
    { min: 40, grade: 'III', description: 'Third-Class Honours' },
    { min: 0, grade: 'F', description: 'Fail' },
];

const GRADES: readonly (Grade & { min: number })[] = [
  { min: 90, grade: 'A+', gradePoint: 4.2 },
  { min: 80, grade: 'A', gradePoint: 4.0 },
  { min: 70, grade: 'A-', gradePoint: 3.8 },
  { min: 66.67, grade: 'B+', gradePoint: 3.6 },
  { min: 63.33, grade: 'B', gradePoint: 3.4 },
  { min: 60, grade: 'B-', gradePoint: 3.2 },
  { min: 56.67, grade: 'C+', gradePoint: 3.0 },
  { min: 53.33, grade: 'C', gradePoint: 2.8 },
  { min: 50, grade: 'C-', gradePoint: 2.6 },
  { min: 46.67, grade: 'D+', gradePoint: 2.4 },
  { min: 43.33, grade: 'D', gradePoint: 2.2 },
  { min: 40, grade: 'D-', gradePoint: 2.0 },
  { min: 36.67, grade: 'E+', gradePoint: 0 },
  { min: 33.33, grade: 'E', gradePoint: 0 },
  { min: 30, grade: 'E-', gradePoint: 0 },
  { min: 26.67, grade: 'F+', gradePoint: 0 },
  { min: 23.33, grade: 'F', gradePoint: 0 },
  { min: 20, grade: 'F-', gradePoint: 0 },
  { min: 16.67, grade: 'G+', gradePoint: 0 },
  { min: 13.33, grade: 'G', gradePoint: 0 },
  { min: 0.01, grade: 'G-', gradePoint: 0 },
  { min: 0, grade: 'NM', gradePoint: 0 },
];

/**
 * Calculate the overall grade for the year as a weighted average of each module based on their ETCS credits.
 * @param year - A DegreeYear object containing the grades for that year.
 * @returns The overall grade for the year
 */
const calculateYearlyGrade = (year: DegreeYear) => {
    const TOTAL_ETCS = year.grades.reduce((acc, grade) => acc + grade.etcs, 0);
    if(TOTAL_ETCS === 0) {
        throw new Error('Total ETCS for the year cannot be zero.');
    }
    const yearlyGrade = year.grades.reduce((acc, grade) => acc + grade.mark * (grade.etcs / TOTAL_ETCS), 0);
    console.log(`Year ${year.year} Average:`, yearlyGrade);
    return yearlyGrade;
};

/**
 * Calculates the GPA for a given year based on the grades and their ETCS credits.
 * @param year 
 * @returns The GPA for the given year
 */
const calculateYearlyGPA = (year: DegreeYear) => {
    const TOTAL_ETCS = year.grades.reduce((acc, grade) => acc + grade.etcs, 0);
    if(TOTAL_ETCS === 0) {
        throw new Error('Total ETCS for the year cannot be zero.');
    }
    const yearlyGPA = year.grades.reduce((acc, grade) => {
        const gradePoint = GRADES.find(g => grade.mark >= g.min)?.gradePoint || 0;
        acc += gradePoint * (grade.etcs / TOTAL_ETCS);
        return acc;
    }, 0);

    console.log(`Year ${year.year} GPA:`, yearlyGPA);
    return yearlyGPA;
}

const calculateYearlyPercentage = (year: DegreeYear) => {
    const TOTAL_ETCS = year.grades.reduce((acc, grade) => acc + grade.etcs, 0);
    if(TOTAL_ETCS === 0) {
        throw new Error('Total ETCS for the year cannot be zero.');
    }
    const yearlyPercentage = year.grades.reduce((acc, grade) => acc + grade.mark * (grade.etcs / TOTAL_ETCS), 0);
    console.log(`Year ${year.year} Percentage:`, yearlyPercentage);
    return yearlyPercentage;
}

/**
* Calculates the honours classification based on the yearly grades and their weights.
* @param yearlyGrades - An array of DegreeYear objects representing the grades for each year.
* @returns An object containing the grade and description of the honours classification.
*/
export const calculateClassification = (yearlyGrades: DegreeYear[]) => {
    const TOTAL_WEIGHT = yearlyGrades?.reduce((acc, year) => acc + year.weight, 0);
    if (TOTAL_WEIGHT === 0) {
        throw new Error('Total weight of yearly grades cannot be zero.');
    }

    const degreeAverage = yearlyGrades?.reduce((acc, year) => acc + calculateYearlyGrade(year) * (year.weight / TOTAL_WEIGHT), 0);
    console.log('Degree Average:', degreeAverage);

    return (
        CLASSIFICATIONS.find((classification) => degreeAverage >= classification.min) || {
            grade: 'N/A',
            description: 'No Classification',
        }
    );
};

/**
 * Calculates the overall GPA based on the yearly grades and their weights.
 * @param yearlyGrades 
 * @returns Average overall GPA for given years
 */
export const calculateOverallGPA = (yearlyGrades: DegreeYear[]) => {
    const TOTAL_WEIGHT = yearlyGrades?.reduce((acc, year) => acc + year.weight, 0);
    if (TOTAL_WEIGHT === 0) {
        throw new Error('Total weight of yearly grades cannot be zero.');
    }

    const overallGPA = yearlyGrades?.reduce((acc, year) => acc + calculateYearlyGPA(year) * (year.weight / TOTAL_WEIGHT), 0);
    console.log('Overall GPA:', overallGPA);
    return overallGPA.toPrecision(3);
}

export const calculateOverallPercentage = (yearlyGrades: DegreeYear[]) => {
    const TOTAL_WEIGHT = yearlyGrades?.reduce((acc, year) => acc + year.weight, 0);
    if (TOTAL_WEIGHT === 0) {
        throw new Error('Total weight of yearly grades cannot be zero.');
    }

    const overallPercentage = yearlyGrades?.reduce((acc, year) => acc + calculateYearlyPercentage(year) * (year.weight / TOTAL_WEIGHT), 0);
    console.log('Overall Percentage:', overallPercentage);
    return Math.round(overallPercentage).toString();
}