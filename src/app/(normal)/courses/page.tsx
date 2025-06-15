"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

type Course = {
  id: number;
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
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/courses/student/enrolled",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        const images = [
          "/courses/chemisty.jpg",
          "/courses/physics.jpg",
          "/courses/biology.jpg",
          "/courses/mathematics.jpg",
          "/courses/ict.webp",
          "/courses/agriculture.jpg",
        ];

        // Assign random image to each course
        const coursesWithImages = data.map((course: Course) => ({
          ...course,
          image: images[Math.floor(Math.random() * images.length)],
        }));

        setCourses(coursesWithImages);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    if (token) {
      fetchCourses();
    } else {
      console.warn("No token found — skipping course fetch.");
    }
  }, [token]);

  return (
    <div className={`${poppins.className} p-8 text-lg leading-relaxed`}>
      <h1 className="text-3xl font-bold mb-6">COURSES</h1>
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
              <p className="text-sm text-gray-800">{course.instructor.name}</p>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
