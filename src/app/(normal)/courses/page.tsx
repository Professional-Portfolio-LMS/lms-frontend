"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type Course = {
  id: string;
  title: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  description: string;
  image: string;
};

export default function CoursesPage() {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user) return;

    const fetchCourses = async () => {
      try {
        const endpoint =
          user.role === "INSTRUCTOR"
            ? "http://localhost:8080/courses/instructor/instructing"
            : "http://localhost:8080/courses/student/enrolled";

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        const images = [
          "/courses/chemisty.jpg",
          "/courses/physics.jpg",
          "/courses/biology.jpg",
          "/courses/mathematics.jpg",
          "/courses/ict.webp",
          "/courses/agriculture.jpg",
        ];

        const coursesWithImages = data.map((course: Course) => ({
          ...course,
          image: images[Math.floor(Math.random() * images.length)],
        }));

        setCourses(coursesWithImages);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, user]);

  if (!user) {
    return <p className="p-8 text-lg">Loading user info...</p>;
  }

  return (
    <div className={`max-w-6xl px-6 py-8`}>
      <h1 className="text-3xl font-bold mb-6">
        {user.role === "INSTRUCTOR" ? "Your Courses (Instructor)" : "Courses"}
      </h1>

      {loading ? (
        <p className="text-gray-500 text-base">Loading courses...</p> // ✅ Loading placeholder
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-sm text-gray-800">
                  {course.instructor?.name || "Instructor Unknown"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {course.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
