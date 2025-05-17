"use client";
import UploaderWithDesc from "@/components/UploaderWithDesc";
import { useState } from "react";

export default function SpecificAssignmentPage() {
  const [file, setFile] = useState<File>();
  const [assignment, setAssignment] = useState({
    id: "a1b2c3d4",
    courseID: "cs101",
    title: "Midterm Assignment",
    type: "assign",
    description: "Submit the analysis report on OS design.",
    dueDate: "2025-06-25T23:59:00Z",
    maxScore: 100,
    createdAt: "2025-05-09T10:15:00Z",
    files: [
      {
        fileName: "instructions.pdf",
        fileURL: "https://your-cdn.com/uploads/instructions.pdf",
      },
      {
        fileName: "grading_rubric.docx",
        fileURL: "https://your-cdn.com/uploads/grading_rubric.docx",
      },
    ],
  });

  // Add function to fetch assignment from backend

  return (
    <div className="flex flex-col gap-3 max-w-6xl p-6">
      {/* Assignment Details */}
      <div className="border-[#00173d] border-2 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">{assignment.title}</h2>
        <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
        <p className="mt-4">{assignment.description}</p>
        <div className="mt-4 flex flex-col gap-1">
          <p className="font-semibold">Attached Files:</p>
          {assignment.files.map((file, idx) => (
            <a
              key={idx}
              href={file.fileURL}
              download={file.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {file.fileName}
            </a>
          ))}
        </div>
      </div>
      <UploaderWithDesc />
    </div>
  );
}
