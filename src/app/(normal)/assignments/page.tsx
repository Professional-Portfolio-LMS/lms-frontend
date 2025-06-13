"use client";
import React, { useState } from "react";

const courses = [
  { id: "ENG", name: "Chemistry", code: "CH303" },
  { id: "IT", name: "Software Development", code: "CS303" },
  { id: "HND", name: "Linear Algebra", code: "MA204" },
];

const semesters = ["Computing", "Maths", "Literature", "Music"];

const assignmentsData: Record<
  string,
  Record<
    number,
    {
      unit: string;
      subject: string;
      issueDate: string;
      deadline: string;
      status: string;
      checked: boolean;
    }[]
  >
> = {
  IT: {
    1: [
      {
        unit: "03",
        subject: "CRP",
        issueDate: "03/02/2023",
        deadline: "03/05/2023",
        status: "Submitted",
        checked: true,
      },
      {
        unit: "01",
        subject: "Programming",
        issueDate: "03/09/2023",
        deadline: "03/09/2025",
        status: "Pending",
        checked: false,
      },
      {
        unit: "01",
        subject: "Database",
        issueDate: "03/02/2024",
        deadline: "03/10/2026",
        status: "Pending",
        checked: false,
      },
      {
        unit: "01",
        subject: "Networking",
        issueDate: "02/05/2022",
        deadline: "03/11/2023",
        status: "Pending",
        checked: false,
      },
      {
        unit: "02",
        subject: "Security",
        issueDate: "02/08/2022",
        deadline: "03/10/2023",
        status: "Late Submission",
        checked: true,
      },
    ],
    2: [
      {
        unit: "01",
        subject: "Database",
        issueDate: "03/02/2024",
        deadline: "03/10/2026",
        status: "Pending",
        checked: false,
      },
      {
        unit: "01",
        subject: "Networking",
        issueDate: "02/05/2022",
        deadline: "03/11/2023",
        status: "Pending",
        checked: false,
      },
      {
        unit: "02",
        subject: "Security",
        issueDate: "02/08/2022",
        deadline: "03/10/2023",
        status: "Late Submission",
        checked: true,
      },
    ],
    3: [
      {
        unit: "03",
        subject: "CRP",
        issueDate: "03/02/2023",
        deadline: "03/05/2023",
        status: "Submitted",
        checked: true,
      },
      {
        unit: "01",
        subject: "Programming",
        issueDate: "03/09/2023",
        deadline: "03/09/2025",
        status: "Pending",
        checked: false,
      },
      {
        unit: "01",
        subject: "Database",
        issueDate: "03/02/2024",
        deadline: "03/10/2026",
        status: "Pending",
        checked: false,
      },
    ],
    4: [
      {
        unit: "03",
        subject: "CRP",
        issueDate: "03/02/2023",
        deadline: "03/05/2023",
        status: "Submitted",
        checked: true,
      },
      {
        unit: "01",
        subject: "Programming",
        issueDate: "03/09/2023",
        deadline: "03/09/2025",
        status: "Pending",
        checked: false,
      },
      {
        unit: "01",
        subject: "Database",
        issueDate: "03/02/2024",
        deadline: "03/10/2026",
        status: "Pending",
        checked: false,
      },
    ],
  },
  ENG: {
    1: [
      {
        unit: "01",
        subject: "Essay Writing",
        issueDate: "01/01/2023",
        deadline: "01/15/2023",
        status: "Submitted",
        checked: true,
      },
    ],
    2: [],
    3: [],
    4: [],
  },
  HND: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
};

export default function AssignmentsPage() {
  const [selectedCourse, setSelectedCourse] = useState("IT");
  const [selectedSemester, setSelectedSemester] = useState(1);

  const assignments = assignmentsData[selectedCourse]?.[selectedSemester] || [];

  return (
    <div className="bg-[#ecf3f4] pt-8">
      <div className="flex justify-center gap-6 mb-8">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => {
              setSelectedCourse(course.id);
              setSelectedSemester(1);
            }}
            className={`cursor-pointer text-white p-4 rounded-md w-60 text-center shadow ${
              selectedCourse === course.id ? "bg-[#194e63]" : "bg-[#336b76]"
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
                    ? "text-orange-400"
                    : "text-white"
                }`}
                onClick={() => setSelectedSemester(index + 1)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow max-w-[1100px] mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b">
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
                    <input type="checkbox" checked={a.checked} readOnly />{" "}
                    {a.unit}
                  </td>
                  <td className="p-3">{a.subject}</td>
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
