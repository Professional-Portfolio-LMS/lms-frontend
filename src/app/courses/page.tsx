'use client';

import React, { useState } from 'react';

const courses = [
  { id: 'ENG', name: 'Diploma in English', code: 'OXF/ENG/01' },
  { id: 'IT', name: 'Diploma in IT', code: 'OXF/DIT/01' },
  { id: 'HND', name: 'HND in Computing', code: 'OXF/HND/01' },
];

const semesters = ['Semester 01', 'Semester 02', 'Semester 03', 'Semester 04'];

const modulesData: Record<string, Record<number, { title: string; unit: string; status: string }[]>> = {
  ENG: {
    1: [
      { title: 'Writing Skills', unit: 'Unit 01', status: 'Completed' },
      { title: 'Speaking Practice', unit: 'Unit 01', status: 'Ongoing' },
    ],
    2: [{ title: 'Listening', unit: 'Unit 01', status: 'Pending' }],
  },
  IT: {
    1: [
      { title: 'Programming', unit: 'Unit 01', status: 'Completed' },
      { title: 'Networking', unit: 'Unit 01', status: 'Ongoing' },
      { title: 'Database', unit: 'Unit 01', status: 'Pending' },
      { title: 'Professional Practice', unit: 'Unit 01', status: 'Pending' },
    ],
    2: [{ title: 'Web Dev', unit: 'Unit 02', status: 'Pending' }],
  },
  HND: {
    1: [
      { title: 'Computer Systems', unit: 'Unit 01', status: 'Completed' },
      { title: 'Cyber Security', unit: 'Unit 01', status: 'Pending' },
    ],
  },
};

export default function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState('IT');
  const [selectedSemester, setSelectedSemester] = useState(1);

  const modules = modulesData[selectedCourse]?.[selectedSemester] || [];

  return (
    <div className="p-6 bg-white min-h-screen">

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
        <div className="bg-[#001f3f] rounded-full w-full max-w-4xl px-2 py-2 ">
          <div className="flex justify-between">
            {semesters.map((label, index) => (
              <button
                key={label}
                className={`flex-1 text-lg py-2 font-semibold text-center ${
                  selectedSemester === index + 1 ? 'text-orange-400' : 'text-white'
                }`}
                onClick={() => setSelectedSemester(index + 1)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow-md max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Module</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3">Module 0{idx + 1} - {mod.title}</td>
                <td className="p-3">{mod.unit}</td>
                <td className="p-3">{mod.status}</td>
              </tr>
            ))}
            {modules.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-400">No modules available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedSemester((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={selectedSemester === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setSelectedSemester((prev) => Math.min(4, prev + 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={selectedSemester === 4}
        >
          Next
        </button>
      </div>
    </div>
  );
}