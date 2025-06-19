"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable, { Column } from "@/components/DataTable";
import { useParams } from "next/navigation";

interface Submission {
  id: string;
  studentId: string;
  comment: string;
  submittedAt: string;
  grade: number | null;
  instructorComments: string;
  fileUrls: string[];
}

const CourseSubmissionsPage = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const assignmentId = params?.assignmentId as string;
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !assignmentId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/submissions/${courseId}/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, assignmentId]);

  const columns = [
    { header: "Student ID", accessor: "studentId" },
    {
      header: "Submitted At",
      accessor: (row: Submission) => new Date(row.submittedAt).toLocaleString(),
    },
    {
      header: "Grade",
      accessor: (row: Submission) =>
        row.grade !== null ? (
          row.grade
        ) : (
          <span className="text-red-600 italic">Ungraded</span>
        ),
      numeric: true,
    },
    {
      header: "Action",
      accessor: (row: Submission) => (
        <Link
          href={`/courses/${courseId}/assignments/${assignmentId}/submissions/${row.id}`}
          className="text-[#00173d] font-medium hover:underline"
        >
          View →
        </Link>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Student Submissions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={submissions} />
      )}
    </div>
  );
};

export default CourseSubmissionsPage;
