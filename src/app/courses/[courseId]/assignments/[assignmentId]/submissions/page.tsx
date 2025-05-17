"use client";

import React from "react";
import Link from "next/link";
import DataTable, { Column } from "@/components/DataTable";

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
  const columns: Column[] = [
    { header: "Student Name", accessor: "studentName" },
    { header: "Index No", accessor: "indexNumber" },
    {
      header: "Submitted At",
      accessor: (row) => new Date(row.submittedAt).toLocaleString(),
    },
    { header: "Grade", accessor: (row) => row.grade ?? "—", numeric: true },
    {
      header: "Action",
      accessor: (row) => (
        <Link
          href={`/courses/123/assignments/ass-1/submissions/${row.id}`}
          className="text-[#00173d] font-medium hover:underline"
        >
          View →
        </Link>
      ),
      numeric: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Student Submissions</h1>
      <DataTable columns={columns} data={dummySubmissions} />
    </div>
  );
};

export default CourseSubmissionsPage;
