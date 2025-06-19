"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import DataTable, { Column } from "@/components/DataTable";
import toast from "react-hot-toast";

type AssignmentType = "HOMEWORK" | "QUIZ" | "PROJECT" | "OTHER";

interface AssignmentResponseDTO {
  id: string;
  courseId: string;
  type: AssignmentType;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  createdAt: string;
  fileUrls: string[];
}

const CourseAssignmentsPage = () => {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [assignments, setAssignments] = useState<AssignmentResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!courseId) return;

    const fetchAssignments = async () => {
      try {
        const promise = fetch(
          `http://localhost:8080/assignments/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch assignments");
          return res.json();
        });

        const data = await toast.promise(
          promise,
          {
            loading: "Fetching assignments...",
            success: "Assignments loaded!",
            error: "Failed to load assignments 😓",
          },
          {
            success: { duration: 2000 },
            error: { duration: 3000 },
          }
        );

        setAssignments(data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const columns: Column[] = [
    {
      header: "Title",
      accessor: (row: AssignmentResponseDTO) => row.title,
    },
    {
      header: "Type",
      accessor: (row: AssignmentResponseDTO) => row.type,
    },
    {
      header: "Due Date",
      accessor: (row: AssignmentResponseDTO) =>
        new Date(row.dueDate).toLocaleDateString(),
    },
    {
      header: "Max Score",
      accessor: (row: AssignmentResponseDTO) => row.maxScore,
      numeric: true,
    },
    {
      header: "Action",
      accessor: (row: AssignmentResponseDTO) => {
        if (user?.role === "INSTRUCTOR") {
          return (
            <Link
              href={`/courses/${row.courseId}/assignments/${row.id}/submissions`}
              onClick={() =>
                sessionStorage.setItem("selectedAssignment", JSON.stringify(row))
              }
              className="text-blue-600 hover:underline font-medium"
            >
              View →
            </Link>
          );
        }

        return (
          <Link
            href={`/courses/${row.courseId}/assignments/${row.id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            View →
          </Link>
        );
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between align-middle items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">Your Assignments</h1>
        {user?.role === "INSTRUCTOR" && (
          <button
            onClick={() => router.push(`/courses/${courseId}/assignments/new`)}
            className="bg-[#00173d] text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-700 transition font-medium"
          >
            + Create Assignment
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : assignments.length > 0 ? (
        <DataTable columns={columns} data={assignments} />
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
};

export default CourseAssignmentsPage;
