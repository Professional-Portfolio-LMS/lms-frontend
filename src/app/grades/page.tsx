import StudentGradeView from '@/components/StudentGradeView';

const dummyGrades = [
  { activity: 'Quiz 1', course: 'Math 101', grade: 85, remarks: 'Good work' },
  { activity: 'Assignment 2', course: 'Physics 102', grade: 92, remarks: 'Excellent' },
  { activity: 'Homework', course: 'Chemistry 103', grade: 76, remarks: 'Needs improvement' },
];

export default function StudentGradesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Your Grades</h1>
      <StudentGradeView grades={dummyGrades} />
    </div>
  );
}
