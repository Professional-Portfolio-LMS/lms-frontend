import StudentGradeView from '@/components/StudentGradeView';

const dummyGrades = [
  { activity: 'Quiz 1', course: 'Math 101', grade: 35, remarks: 'Very bad performance', subtext: '1 attempt recorded' },
  { activity: 'Assignment 2', course: 'Physics 102', grade: 57, remarks:"The student's performance was excellent", subtext: '2 attempts submitted' },
  { activity: 'Homework', course: 'Chemistry 103', grade: 66, remarks: 'Needs improvement',},
  { activity: 'Past Paper', course: 'Biology 104', grade: 78, remarks: 'Well done', subtext: '1 attempt recorded' },
  { activity: 'Model Paper', course: 'History 105', grade: 90, remarks: 'Great job', subtext: '1 attempt recorded' },
];

export default function StudentGradesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Your Grades</h1>
      <StudentGradeView grades={dummyGrades} />
    </div>
  );
}