"use client";

import React, { useState } from "react";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateCoursePage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id || user.role !== "INSTRUCTOR") {
      toast.error("Only instructors can create courses.");
      return;
    }

    const payload = {
      ...formData,
      category: formData.category.toUpperCase(),
    };

    try {
      await toast.promise(
        fetch("http://localhost:8080/courses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).then(async (res) => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`);
          return res.json();
        }),
        {
          loading: "Creating course...",
          success: "Course created successfully! 🎉",
          error: (err) => `Failed to create course: ${err.message}`,
        }
      );

      router.push("/courses");
    } catch (err) {
      console.error("Course creation failed:", err);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
      <form onSubmit={handleSubmit} className="p-6 max-w-6xl space-y-4">
        <h1 className="text-2xl font-semibold mb-4">Create New Course</h1>
        <InputField
          label="Course Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        <TextAreaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          options={["", "ICT", "SCIENCE", "MATH", "ENGLISH", "COMMERCE"]}
          onChange={handleChange}
        />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-[#0f5cad] active:scale-95 transition-all font-medium"
          >
            Create Course
          </button>
        </div>
      </form>
    </ProtectedRoute>
  );
}
