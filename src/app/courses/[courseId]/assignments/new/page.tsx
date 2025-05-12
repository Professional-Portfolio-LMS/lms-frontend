"use client";

import React, { useState } from "react";
import UploaderWithDesc from "@/components/UploaderWithDesc";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";

export default function CreateAssignmentPage() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    dueDate: "",
    maxScore: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(`WAZZAAA name: ${name} and value: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxScore" ? Number(value) : value,
    }));
  };

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-4">Create New Assignment</h1>
      <UploaderWithDesc
        otherInputs={[
          <SelectField
            key="type"
            label="Assignment Type"
            name="type"
            value={formData.type}
            options={["", "Assignment", "Quiz", "Exam"]}
            onChange={handleChange}
          />,
          <InputField
            key="title"
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />,
          <TextAreaField
            key="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />,
          <InputField
            key="dueDate"
            label="Due Date"
            name="dueDate"
            type="datetime-local"
            value={formData.dueDate}
            onChange={handleChange}
          />,
          <InputField
            key="maxScore"
            label="Max Score"
            name="maxScore"
            type="number"
            value={formData.maxScore}
            onChange={handleChange}
          />,
        ]}
      />
    </div>
  );
}
