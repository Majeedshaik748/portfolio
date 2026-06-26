export interface Student {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  studyHours: number;
  attendance: number;
  previousScore: number;
  currentScore: number;
  performance: 'Excellent' | 'Good' | 'Average' | 'Below Average';
  parentEducation: 'Primary' | 'Secondary' | 'Higher';
  extracurricular: boolean;
  tutoring: boolean;
  internetAccess: boolean;
  healthStatus: number;
  stressLevel: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(123);
const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'James', 'Sophia', 'Lucas', 'Mia', 'Ethan', 'Isabella', 'Mason', 'Charlotte', 'Logan', 'Amelia', 'Oliver', 'Harper', 'Elijah', 'Evelyn', 'Benjamin', 'Abigail', 'William', 'Emily', 'Alexander', 'Elizabeth', 'Michael', 'Ella', 'Daniel', 'Grace', 'Henry'];
const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Economics'];
const grades: Student['grade'][] = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const parentEdu: Student['parentEducation'][] = ['Primary', 'Secondary', 'Higher'];

function getPerformance(score: number): Student['performance'] {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Average';
  return 'Below Average';
}

export const students: Student[] = Array.from({ length: 200 }, (_, i) => {
  const studyHours = Math.round((rand() * 8 + 1) * 10) / 10;
  const attendance = Math.round((60 + rand() * 40) * 10) / 10;
  const previousScore = Math.round(40 + rand() * 40);
  const improvementFactor = (studyHours / 5) * (attendance / 100);
  const currentScore = Math.min(100, Math.max(30, Math.round(previousScore + improvementFactor * 25 + (rand() - 0.3) * 15)));
  
  return {
    id: i + 1,
    name: names[i % names.length] + ' ' + String.fromCharCode(65 + (i % 26)),
    gender: rand() > 0.5 ? 'Female' : 'Male',
    age: 14 + Math.floor(rand() * 5),
    grade: grades[Math.floor(rand() * grades.length)],
    subject: subjects[Math.floor(rand() * subjects.length)],
    studyHours,
    attendance,
    previousScore,
    currentScore,
    performance: getPerformance(currentScore),
    parentEducation: parentEdu[Math.floor(rand() * parentEdu.length)],
    extracurricular: rand() > 0.5,
    tutoring: rand() > 0.65,
    internetAccess: rand() > 0.15,
    healthStatus: Math.round((60 + rand() * 40) * 10) / 10,
    stressLevel: Math.round((10 + rand() * 80) * 10) / 10,
  };
});

// Aggregated by grade level
export const gradePerformance = grades.map((grade) => {
  const gradeStudents = students.filter((s) => s.grade === grade);
  const avgScore = gradeStudents.reduce((sum, s) => sum + s.currentScore, 0) / gradeStudents.length;
  const avgStudy = gradeStudents.reduce((sum, s) => sum + s.studyHours, 0) / gradeStudents.length;
  const avgAttendance = gradeStudents.reduce((sum, s) => sum + s.attendance, 0) / gradeStudents.length;
  return {
    grade,
    avgScore: Math.round(avgScore),
    avgStudy: Math.round(avgStudy * 10) / 10,
    avgAttendance: Math.round(avgAttendance),
    count: gradeStudents.length,
  };
});

// Performance distribution
export const performanceDistribution = ['Excellent', 'Good', 'Average', 'Below Average'].map((perf) => ({
  performance: perf,
  count: students.filter((s) => s.performance === perf).length,
}));

// Subject performance
export const subjectPerformance = subjects.map((subject) => {
  const subjectStudents = students.filter((s) => s.subject === subject);
  return {
    subject,
    avgScore: Math.round(subjectStudents.reduce((sum, s) => sum + s.currentScore, 0) / subjectStudents.length),
    students: subjectStudents.length,
  };
}).sort((a, b) => b.avgScore - a.avgScore);

// Study hours vs score scatter
export const studyHoursVsScore = students.slice(0, 100).map((s) => ({
  hours: s.studyHours,
  score: s.currentScore,
  attendance: s.attendance,
  grade: s.grade,
}));

// Gender comparison
export const genderComparison = ['Male', 'Female'].map((g) => {
  const gStudents = students.filter((s) => s.gender === g);
  return {
    gender: g,
    avgScore: Math.round(gStudents.reduce((sum, s) => sum + s.currentScore, 0) / gStudents.length),
    avgStudy: Math.round(gStudents.reduce((sum, s) => sum + s.studyHours, 0) / gStudents.length * 10) / 10,
    count: gStudents.length,
  };
});

// Parent education impact
export const parentEducationImpact = parentEdu.map((pe) => {
  const peStudents = students.filter((s) => s.parentEducation === pe);
  return {
    education: pe,
    avgScore: Math.round(peStudents.reduce((sum, s) => sum + s.currentScore, 0) / peStudents.length),
    count: peStudents.length,
  };
});

// Attendance distribution
export const attendanceBrackets = [
  { bracket: '90-100%', min: 90 },
  { bracket: '80-89%', min: 80 },
  { bracket: '70-79%', min: 70 },
  { bracket: '60-69%', min: 60 },
  { bracket: '< 60%', min: 0 },
].map((b) => ({
  bracket: b.bracket,
  count: students.filter((s) => b.min === 0 ? s.attendance < 60 : s.attendance >= b.min && s.attendance < b.min + 10 || (b.min === 90 && s.attendance >= 90)).length,
  avgScore: Math.round(
    students.filter((s) => b.min === 0 ? s.attendance < 60 : s.attendance >= b.min && s.attendance < b.min + 10 || (b.min === 90 && s.attendance >= 90))
      .reduce((sum, s) => sum + s.currentScore, 0) /
    Math.max(1, students.filter((s) => b.min === 0 ? s.attendance < 60 : s.attendance >= b.min && s.attendance < b.min + 10 || (b.min === 90 && s.attendance >= 90)).length)
  ),
}));

// Score distribution histogram
export const scoreDistribution = [
  { range: '30-40', min: 30, max: 40 },
  { range: '40-50', min: 40, max: 50 },
  { range: '50-60', min: 50, max: 60 },
  { range: '60-70', min: 60, max: 70 },
  { range: '70-80', min: 70, max: 80 },
  { range: '80-90', min: 80, max: 90 },
  { range: '90-100', min: 90, max: 100 },
].map((r) => ({
  range: r.range,
  count: students.filter((s) => s.currentScore >= r.min && s.currentScore < r.max).length,
}));

// Tutoring vs no tutoring
export const tutoringComparison = [
  { label: 'With Tutoring', students: students.filter((s) => s.tutoring) },
  { label: 'Without Tutoring', students: students.filter((s) => !s.tutoring) },
].map((item) => ({
  label: item.label,
  avgScore: Math.round(item.students.reduce((sum, s) => sum + s.currentScore, 0) / item.students.length),
  count: item.students.length,
}));

// Stress vs performance
export const stressVsPerformance = [
  { level: 'Low (0-25)', students: students.filter((s) => s.stressLevel < 25) },
  { level: 'Medium (25-50)', students: students.filter((s) => s.stressLevel >= 25 && s.stressLevel < 50) },
  { level: 'High (50-75)', students: students.filter((s) => s.stressLevel >= 50 && s.stressLevel < 75) },
  { level: 'Very High (75+)', students: students.filter((s) => s.stressLevel >= 75) },
].map((item) => ({
  level: item.level,
  avgScore: item.students.length > 0 ? Math.round(item.students.reduce((sum, s) => sum + s.currentScore, 0) / item.students.length) : 0,
  count: item.students.length,
}));

// KPIs
export const totalStudents = students.length;
export const avgOverallScore = Math.round(students.reduce((sum, s) => sum + s.currentScore, 0) / students.length);
export const avgAttendanceOverall = Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length);
export const excellentStudents = students.filter((s) => s.performance === 'Excellent').length;
export const atRiskStudents = students.filter((s) => s.performance === 'Below Average').length;
