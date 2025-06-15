"use client";

import FileUploader from "@/components/FileUploader";
import TextAreaField from "@/components/TextAreaField";
import { FormEvent, useState } from "react";

export default function SpecificAssignmentPage() {
  const [studentComments, setStudentComments] = useState("");
  const [files, setFiles] = useState<File[]>([]);
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

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStudentComments(e.target.value);
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("assignmentId", assignment.id);
      formData.append("courseID", assignment.courseID);
      formData.append("studentComments", studentComments);

      files.forEach((file) => {
        formData.append("files", file, file.name);
      });

      console.log("FormData contents:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // const response = await fetch("/api/assignments/submit", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit assignment.");
      // }

      // const result = await response.json();
      // alert("Assignment submitted successfully!");
      // console.log("Server response:", result);

      // setFiles([]);
      // setStudentComments("");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("An error occurred while submitting. Please try again.");
    }
  }

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

      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Upload your submission</h3>
        <FileUploader files={files} setFiles={setFiles} />
        <TextAreaField
          label="Student Comments"
          name="studentComments"
          value={studentComments}
          onChange={handleCommentsChange}
        />
        <button
          type="submit"
          className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-blue-800 active:scale-95 transition-all font-medium"
        >
          Save Assignment
        </button>
      </form>
    </div>
  );
}
