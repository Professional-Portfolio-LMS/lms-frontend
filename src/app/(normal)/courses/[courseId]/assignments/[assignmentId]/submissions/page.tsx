"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DataTable, { Column } from "@/components/DataTable";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Assignment } from "../page";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR";
  createdAt: string;
}

interface Submission {
  id: string;
  assignmentId: string;
  student: User;
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
  const [assignment, setAssignment] = useState<Assignment | null>(null);
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

  useEffect(() => {
    async function loadAssignment() {
      try {
        const res = await fetch(
          `http://localhost:8080/assignments/course/${courseId}/assignment/${assignmentId}`
        );
        if (!res.ok) throw new Error("Failed to fetch assignment");

        const data = await res.json();
        setAssignment({
          ...data,
          files: data.fileUrls.map((url: string) => {
            const fileName = decodeURIComponent(url.split("/").pop() || "file");
            return { fileName, fileURL: url };
          }),
        });
      } catch (err) {
        console.error("Error fetching assignment:", err);
      }
    }

    if (courseId && assignmentId) loadAssignment();
  }, [courseId, assignmentId]);

  const columns: Column[] = [
    {
      header: "Student Name",
      accessor: (row: Submission) => row.student?.name || "—",
    },
    {
      header: "Student ID",
      accessor: (row: Submission) => row.student?.id || "—",
    },
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
    <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="border-[#00173d] border-2 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">{assignment?.title}</h2>
        <p className="text-sm text-gray-500">
          Due: {assignment?.dueDate.toLocaleString()}
        </p>
        <p className="mt-4">{assignment?.description}</p>
        <div className="mt-4 flex flex-col gap-1">
          <p className="font-semibold">Attached Files:</p>
          {assignment?.files.length && assignment.files.length > 0
            ? assignment?.files.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  download={file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {file.fileName}
                </a>
              ))
            : "None"}
        </div>
      </div>
        <h1 className="text-2xl font-semibold mb-3 mt-6">Student Submissions</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={submissions} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default CourseSubmissionsPage;
