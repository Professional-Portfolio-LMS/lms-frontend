"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CourseResponseDTO {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.courseId;
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const promise = fetch(`http://localhost:8080/courses/${courseId}`).then(
          async (res) => {
            if (!res.ok) throw new Error("Failed to fetch course");
            return res.json();
          }
        );

        const data = await toast.promise(
          promise,
          {
            loading: "Loading course...",
            success: "Course loaded!",
            error: "Failed to load course 😢",
          },
          {
            success: { duration: 2500 },
            error: { duration: 3500 },
          }
        );

        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="p-6">Loading course...</div>;
  }

  if (!course) {
    return <div className="p-6 text-red-600">Course not found.</div>;
  }

  const isInstructor = user?.role === "INSTRUCTOR";
  const isStudent = user?.role === "STUDENT";

  return (
    <div className="max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-bold text-[#00173d] mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">
        {course.description || "No description provided."}
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Taught by <span className="font-medium">{course.instructor.name}</span>{" "}
        • {new Date(course.createdAt).toLocaleDateString()}
      </p>

      <div className="bg-white shadow rounded-lg p-6 border mb-10">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Java Basics: Data types, Variables, and Operators</li>
          <li>Object-Oriented Programming with Classes</li>
          <li>Exception Handling</li>
          <li>Java Collections Framework</li>
          <li>Streams and Lambda Expressions</li>
          <li>Mini Project: Java-based Console App</li>
        </ul>
      </div>

      <button
        onClick={() => router.push(`/courses/${course.id}/assignments`)}
        className="bg-[#00173d] text-white px-4 py-2 mr-4 rounded hover:bg-blue-700 transition"
      >
        View Assignments
      </button>

      {isInstructor && (
        <button
          onClick={() => router.push(`/instructor/courses/${course.id}/manage`)}
          className="bg-green-700 text-white px-4 py-2 rounded mr-4 hover:bg-green-800 transition"
        >
          Manage Course
        </button>
      )}
    </div>
  );
}
