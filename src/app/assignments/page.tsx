'use client';
import React, { useState } from 'react';

const courses = [
  { id: 'ENG', name: 'English', code: 'ENG/01' },
  { id: 'CHE', name: 'Chemestry', code: 'HND/01' },
  { id: 'IT', name: 'ICT', code: 'DIT/01' },
];

const semesters = ['Semester 01', 'Semester 02', 'Semester 03', 'Semester 04'];

const assignmentsData: Record<string, Record<number, {
  unit: string;
  subject: string;
  issueDate: string;
  deadline: string;
  status: string;
  checked: boolean;
}[]>> = {
  IT: {
    1: [
      { unit: '03', subject: 'CRP', issueDate: '03/02/2025', deadline: '03/05/2025', status: 'Submitted', checked: true },
      { unit: '01', subject: 'Programming', issueDate: '03/09/2025', deadline: '03/09/2025', status: 'Pending', checked: false },
      { unit: '01', subject: 'Database', issueDate: '03/02/2025', deadline: '03/10/2025', status: 'Pending', checked: false },
      { unit: '01', subject: 'Networking', issueDate: '02/05/2025', deadline: '03/11/2025', status: 'Pending', checked: false},
      { unit: '02', subject: 'Security', issueDate: '02/10/2025', deadline: '03/12/2025', status: 'Late Submission', checked: true},
    ],
    2: [],
    3: [],
    4: [],
  },
  ENG: {
    1: [
      { unit: '01', subject: 'Essay Writing', issueDate: '01/01/2023', deadline: '01/15/2023', status: 'Submitted', checked: true },
    ],
    2: [],
    3: [],
    4: [],
  },
  CHE: {
    1: [
      { unit: '01', subject: 'Introduction', issueDate: '01/01/2025', deadline: '01/15/2025', status: 'Submitted', checked: true },
      { unit: '02', subject: 'Organic Chemistry', issueDate: '01/20/2025', deadline: '08/10/2025', status: 'Pending', checked: false },
      { unit: '03', subject: 'Inorganic Chemistry', issueDate: '02/01/2025', deadline: '08/20/2025', status: 'Pending', checked: false },
      { unit: '04', subject: 'Physical Chemistry', issueDate: '02/15/2025', deadline: '03/05/2025', status: 'Late Submission', checked: true },
    ],
    2: [],
    3: [],
    4: [],
  },
};

export default function AssignmentsPage() {
  const [selectedCourse, setSelectedCourse] = useState('CHE');
  const [selectedSemester, setSelectedSemester] = useState(1);

  const assignments = assignmentsData[selectedCourse]?.[selectedSemester] || [];

  return (
    <div className="bg-[#ecf3f4] min-h-screen p-6">
      <div className="flex justify-center gap-6 mb-8">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => {
              setSelectedCourse(course.id);
              setSelectedSemester(1);
            }}
            className={`cursor-pointer text-white p-4 rounded-md w-60 text-center shadow ${
              selectedCourse === course.id ? 'bg-[#194e63]' : 'bg-[#336b76]'
            }`}
          >
            <div className="text-lg font-semibold">{course.name}</div>
            <div className="text-sm">{course.code}</div>
          </div>
        ))}
      </div>


      <div className="flex justify-center mb-6">
        <div className="bg-[#001f3f] rounded-full w-full max-w-3xl px-4 py-2 mx-4">
          <div className="flex justify-between gap-2">
            {semesters.map((label, index) => (
              <button
                key={label}
                className={`flex-1 text-lg py-2 font-semibold text-center rounded-full transition ${
                  selectedSemester === index + 1
                    ? 'text-orange-400'
                    : 'text-white'
                }`}
                onClick={() => setSelectedSemester(index + 1)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-transparent rounded-lg border border-black max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-white border-b bg-black">
              <th className="p-3">Unit</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Issues Date</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={a.checked}
                      readOnly
                    />{' '}
                    {a.unit}
                  </td>
                  <td className="p-3 font-bold">{a.subject}</td>
                  <td className="p-3">{a.issueDate}</td>
                  <td className="p-3">{a.deadline}</td>
                  <td className={`p-3 font-medium text-black`}>{a.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-5 text-gray-400">
                  No assignments available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 border border-gray-300"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
