'use client';

import React, { useState } from 'react';

// Define user roles
const USER_ROLE: 'student' | 'instructor' = 'student';

// Course and module data types
interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  students?: { id: string; name: string; email: string }[];
}

interface Module {
  title: string;
  unit: string;
  status: string;
}

// Shared data
const coursesData: Course[] = [
  { 
    id: 'ENG', 
    name: 'Diploma in English', 
    code: 'OXF/ENG/01',
    description: 'English language basics and grammar.',
    startDate: '2024-06-01',
    endDate: '2024-12-01',
    category: 'Language',
    students: [
      { id: 'S1', name: 'Alex John', email: 'alex@example.com' },
      { id: 'S2', name: 'Sara Kim', email: 'sara@example.com' },
    ],
  },
  { 
    id: 'IT', 
    name: 'Diploma in IT', 
    code: 'OXF/DIT/01',
    description: 'Introduction to Information Technology.',
    startDate: '2024-06-01',
    endDate: '2024-12-01',
    category: 'Technology',
    students: [
      { id: 'S3', name: 'John Doe', email: 'john@example.com' },
      { id: 'S4', name: 'Jane Smith', email: 'jane@example.com' },
    ],
  },
  { 
    id: 'HND', 
    name: 'HND in Computing', 
    code: 'OXF/HND/01',
    description: 'Higher National Diploma in Computing.',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    category: 'Technology',
    students: [
      { id: 'S5', name: 'Mike Johnson', email: 'mike@example.com' },
    ],
  },
];

const semesters = ['Semester 01', 'Semester 02', 'Semester 03', 'Semester 04'];

const modulesData: Record<string, Record<number, Module[]>> = {
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
  
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [form, setForm] = useState<Omit<Course, 'students'>>({
    id: '',
    name: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const modules = modulesData[selectedCourse]?.[selectedSemester] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name || !form.code) return;
    
    if (isEditing) {
      setCourses(courses.map((c) =>
        c.id === form.id ? { ...form, students: c.students || [] } : c
      ));
    } else {
      setCourses([...courses, { ...form, students: [] }]);
    }

    resetForm();
  };

  const handleEdit = (course: Course) => {
    const { students, ...courseInfo } = course;
    setForm(courseInfo);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const resetForm = () => {
    setForm({ id: '', name: '', code: '', description: '', startDate: '', endDate: '', category: '' });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">

      {USER_ROLE === 'student' ? (
        <div className="p-6 bg-white">
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
      ) : (
        <div className="bg-[#ecf3f4] p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-[#194e63] mb-6">Course Management</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-10">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                {isEditing ? 'Edit Course' : 'Add New Course'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Course Name" value={form.name} onChange={handleChange} className="border rounded p-2" />
                <input name="code" placeholder="Course Code" value={form.code} onChange={handleChange} className="border rounded p-2" />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border rounded p-2 col-span-full" />
                <input name="startDate" type="date" placeholder="Start Date" value={form.startDate} onChange={handleChange} className="border rounded p-2" />
                <input name="endDate" type="date" placeholder="End Date" value={form.endDate} onChange={handleChange} className="border rounded p-2" />
                <textarea name="description" placeholder="Course Description" value={form.description} onChange={handleChange} className="border rounded p-2 col-span-full" />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleSubmit} className="bg-[#194e63] text-white px-4 py-2 rounded shadow">
                  {isEditing ? 'Update Course' : 'Add Course'}
                </button>
                {isEditing && (
                  <button onClick={resetForm} className="px-4 py-2 rounded border border-gray-300 bg-gray-100 text-gray-600">
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Courses</h2>
              {courses.length > 0 ? (
                <table className="w-full table-auto">
                  <thead className="text-left text-gray-600 border-b">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Code</th>
                      <th className="p-3">Enrolled</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{course.id}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3">{course.code}</td>
                        <td className="p-3">{course.students?.length || 0}</td>
                        <td className="p-3 flex gap-2">
                          <button onClick={() => handleEdit(course)} className="text-sm text-blue-600">Edit</button>
                          <button onClick={() => handleDelete(course.id)} className="text-sm text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No courses available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}