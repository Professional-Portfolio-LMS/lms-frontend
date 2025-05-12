"use client";

import React from "react";
import Link from "next/link";

interface Submission {
  id: string;
  studentName: string;
  indexNumber: string;
  submittedAt: string; // ISO string
  grade: number | null;
}

const dummySubmissions: Submission[] = [
  {
    id: "sub-001",
    studentName: "Jane Perera",
    indexNumber: "IT2020001",
    submittedAt: "2025-05-10T11:43:00Z",
    grade: null,
  },
  {
    id: "sub-002",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-003",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-004",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-005",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-006",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-007",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-008",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-009",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-010",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-011",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-012",
    studentName: "Ravi Fernando",
    indexNumber: "IT2020002",
    submittedAt: "2025-05-10T10:10:00Z",
    grade: 85,
  },
  {
    id: "sub-013",
    studentName: "Nimal Rajapaksa",
    indexNumber: "IT2020003",
    submittedAt: "2025-05-10T09:55:00Z",
    grade: 74,
  },
  {
    id: "sub-014",
    studentName: "Dilani Wickramasinghe",
    indexNumber: "IT2020004",
    submittedAt: "2025-05-10T11:15:00Z",
    grade: null,
  },
  {
    id: "sub-015",
    studentName: "Kavindu Gunasekara",
    indexNumber: "IT2020005",
    submittedAt: "2025-05-10T10:50:00Z",
    grade: 91,
  },
  {
    id: "sub-016",
    studentName: "Sajini Weerasinghe",
    indexNumber: "IT2020006",
    submittedAt: "2025-05-10T11:05:00Z",
    grade: 68,
  },
  {
    id: "sub-017",
    studentName: "Tharindu Alwis",
    indexNumber: "IT2020007",
    submittedAt: "2025-05-10T11:20:00Z",
    grade: null,
  },
];

const CourseSubmissionsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Student Submissions</h1>

      {dummySubmissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-md shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#00173d] text-white">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Index No</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummySubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-t bg-[#e8f1f2] hover:bg-[#c2e8f8]"
                >
                  <td className="py-3 px-4">{submission.studentName}</td>
                  <td className="py-3 px-4">{submission.indexNumber}</td>
                  <td className="py-3 px-4">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {submission.grade !== null ? submission.grade : "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/courses/123/assignments/ass-1/submissions/${submission.id}`}
                      className="text-[#1475cf] font-medium hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseSubmissionsPage;
