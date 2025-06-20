"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  const router = useRouter();

  useEffect(() => {
    if (!token || !user) return;

    const fetchCourses = async () => {
      const endpoint =
        user.role === "INSTRUCTOR"
          ? "http://localhost:8080/courses/instructor/instructing"
          : "http://localhost:8080/courses/student/enrolled";

      const fetchPromise = fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await res.json();

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
        })
        .catch((err) => {
          console.error("Error fetching courses:", err);
          throw err; // rethrow so toast can handle it
        })
        .finally(() => {
          setLoading(false);
        });

      toast.promise(fetchPromise, {
        loading: "Loading courses...",
        success: "Courses loaded!",
        error: "Failed to load courses",
      });
    };

    fetchCourses();
  }, [token, user]);

  if (!user) {
    return <p className="p-8 text-lg">Loading user info...</p>;
  }

  return (
    <div className={`max-w-6xl px-6 py-8`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {user.role === "INSTRUCTOR" ? "Your Courses (Instructor)" : "Courses"}
        </h1>

        {user.role === "INSTRUCTOR" && (
          <button
            onClick={() => router.push("/courses/new")}
            className="bg-[#00173d] text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-700 transition font-medium"
          >
            + Create Course
          </button>
        )}
      </div>

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
