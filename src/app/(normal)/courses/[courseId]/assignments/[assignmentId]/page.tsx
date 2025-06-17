"use client";

import FileUploader from "@/components/FileUploader";
import TextAreaField from "@/components/TextAreaField";
import { FormEvent, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface Assignment {
  id: string;
  courseId: string;
  type: "ASSIGNMENT" | "QUIZ" | "EXAM";
  title: string;
  description: string;
  dueDate: Date;
  maxScore: number;
  createdAt: Date;
  files: {
    fileName: string;
    url: string;
  }[];
}

export default function SpecificAssignmentPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const assignmentId = params?.assignmentId as string;

  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    async function loadAssignment() {
      try {
        const res = await fetch(
          `http://localhost:8080/assignments/course/${courseId}/assignment/${assignmentId}`
        );
        if (!res.ok) throw new Error("Failed to fetch assignment");

        const data = await res.json();
        setAssignment({
          ...data,
          files: data.fileUrls.map((url: string) => {
            const fileName = decodeURIComponent(url.split("/").pop() || "file");
            return { fileName, fileURL: url };
          }),
        });
      } catch (err) {
        console.error("Error fetching assignment:", err);
      }
    }

    if (courseId && assignmentId) loadAssignment();
  }, [courseId, assignmentId]);

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const { token } = useAuth();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const formData = new FormData();

    if (assignment) {
      formData.append("assignmentId", assignment.id);
      formData.append("courseID", assignment.courseId);
      formData.append("comment", comment);
      files.forEach((file) => formData.append("files", file, file.name));

      try {
        await toast.promise(
          fetch(
            `http://localhost:8080/submissions/${courseId}/${assignment?.id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          ).then(async (res) => {
            if (!res.ok) {
              const msg = await res.text();
              throw new Error(msg || "Failed to submit assignment");
            }
            return res.json();
          }),
          {
            loading: "Submitting your work...",
            success: "Assignment submitted successfully!",
            error: (err) => `Submission failed: ${err.message}`,
          }
        );

        setFiles([]);
        setComment("");
      } catch (error) {
        console.error("Submission failed:", error);
      }
    }
  }

  if (!assignment) return <p>Loading assignment...</p>;

  return (
    <div className="flex flex-col gap-3 max-w-6xl p-6">
      {/* Assignment Details */}
      <div className="border-[#00173d] border-2 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">{assignment.title}</h2>
        <p className="text-sm text-gray-500">
          Due: {assignment.dueDate.toLocaleString()}
        </p>
        <p className="mt-4">{assignment.description}</p>
        <div className="mt-4 flex flex-col gap-1">
          <p className="font-semibold">Attached Files:</p>
          {assignment.files.length > 0
            ? assignment.files.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  download={file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {file.fileName}
                </a>
              ))
            : "None"}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Upload your submission</h3>
        <FileUploader files={files} setFiles={setFiles} />
        <TextAreaField
          label="Student Comments"
          name="comment"
          value={comment}
          onChange={handleCommentsChange}
        />
        <button
          type="submit"
          className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-blue-800 active:scale-95 transition-all font-medium"
        >
          Submit your Work
        </button>
      </form>
    </div>
  );
}
