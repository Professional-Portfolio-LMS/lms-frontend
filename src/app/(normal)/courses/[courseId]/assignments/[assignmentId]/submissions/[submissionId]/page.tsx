"use client";

import React, { FormEvent, useState } from "react";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";

const SpecificSubmissionPage = () => {
  const [grade, setGrade] = useState("");
  const [instructorFeedback, setInstructorFeedback] = useState("");

  // Dummy data
  const submission = {
    studentName: "Jane Perera",
    indexNumber: "IT2020001",
    assignmentTitle: "Operating Systems Assignment 1",
    submittedAt: "2025-05-10T11:43:00Z",
    files: [
      {
        name: "report.pdf",
        url: "/uploads/report.pdf",
      },
    ],
    studentComments:
      "Please find my assignment attached. Let me know if there are any issues.",
    wasLate: true,
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructorFeedback(e.target.value);
  };

  function handleSave(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  }

  return (
    <div className="max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Submission Details</h1>

      <div className="space-y-2 mb-6">
        <p>
          <span className="font-medium">Student:</span> {submission.studentName}{" "}
          ({submission.indexNumber})
        </p>
        <p>
          <span className="font-medium">Assignment:</span>{" "}
          {submission.assignmentTitle}
        </p>
        <p>
          <span className="font-medium">Submitted At:</span>{" "}
          {new Date(submission.submittedAt).toLocaleString()}
        </p>
        {submission.wasLate && (
          <p className="text-red-600 font-semibold">⚠️ Submitted Late</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">Submitted Files:</h2>
        <ul className="list-disc pl-6">
          {submission.files.map((file, index) => (
            <li key={index}>
              <a
                href={file.url}
                className="text-[#00173d] underline hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-1">Student Comments:</h2>
        <p className="border p-2 rounded-md">{submission.studentComments}</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="mb-4">
          <InputField
            label="Grade"
            name="grade"
            type="number"
            value={grade}
            onChange={handleGradeChange}
          />
        </div>
        <div className="mb-6">
          <TextAreaField
            label="Instructor Feedback (optional)"
            name="instructorFeedback"
            value={instructorFeedback}
            onChange={handleFeedbackChange}
          />
        </div>
        <button
          type="submit"
          className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-blue-800 active:scale-95 transition-all font-medium"
        >
          Save Grade
        </button>
      </form>
    </div>
  );
};

export default SpecificSubmissionPage;
