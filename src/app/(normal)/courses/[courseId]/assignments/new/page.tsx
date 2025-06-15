"use client";

import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    dueDate: "",
    maxScore: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxScore" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("courseId", courseId);
    data.append("type", formData.type.toUpperCase());
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("dueDate", new Date(formData.dueDate).toISOString());
    data.append("maxScore", String(formData.maxScore));
    files.forEach((file) => data.append("files", file));

    try {
      await toast.promise(
        fetch("http://localhost:8080/assignments", {
          method: "POST",
          body: data,
        }).then(async (res) => {
          if (!res.ok) throw new Error(`Failed to submit: ${res.status}`);
          return res.json();
        }),
        {
          loading: "Submitting assignment...",
          success: "Assignment submitted successfully!",
          error: (err) => `Submission failed: ${err.message}`,
        }
      );

      // ✅ Reset form and file state after successful submission
      setFormData({
        type: "",
        title: "",
        description: "",
        dueDate: "",
        maxScore: "",
      });
      setFiles([]);
    } catch (err) {
      // ❌ Do nothing on error
      console.error("Submission failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-6xl space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Assignment</h1>

      <SelectField
        label="Assignment Type"
        name="type"
        value={formData.type}
        options={["", "Assignment", "Quiz", "Exam"]}
        onChange={handleChange}
      />
      <InputField
        label="Title"
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
      <InputField
        label="Due Date"
        name="dueDate"
        type="datetime-local"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <InputField
        label="Max Score"
        name="maxScore"
        type="number"
        value={formData.maxScore}
        onChange={handleChange}
      />
      <FileUploader files={files} setFiles={setFiles} />

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-[#0f5cad] active:scale-95 transition-all font-medium"
        >
          Submit Assignment
        </button>
      </div>
    </form>
  );
}
