"use client";

import React, { FormEvent, useEffect, useState } from "react";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const SpecificSubmissionPage = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const assignmentId = params?.assignmentId as string;
  const submissionId = params?.submissionId as string;

  const [submission, setSubmission] = useState<any>(null);
  const [grade, setGrade] = useState("");
  const [instructorFeedback, setInstructorFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !assignmentId || !submissionId) return;

    const fetchSubmission = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/submissions/${courseId}/${assignmentId}/${submissionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setSubmission(data);
        setGrade(data.grade ?? "");
        setInstructorFeedback(data.instructorComments ?? "");
      } catch (err) {
        console.error("Error fetching submission:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [courseId, assignmentId, submissionId]);

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

    // TODO: Call backend PATCH/POST to save grade and feedback
  }

  if (loading) return <p className="p-6">Loading submission...</p>;
  if (!submission)
    return <p className="p-6 text-red-600">Submission not found.</p>;

  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
      <div className="max-w-6xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Submission Details</h1>
        <div className="space-y-2 mb-6">
          <p>
            <span className="font-medium">Student:</span>{" "}
            {submission?.student?.name} ({submission.student.id})
          </p>
          <p>
            <span className="font-medium">Assignment ID:</span>{" "}
            {submission.assignmentId}
          </p>
          <p>
            <span className="font-medium">Submitted At:</span>{" "}
            {new Date(submission.submittedAt).toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Submitted Files:</h2>
          <ul className="list-disc pl-6">
            {submission.fileUrls.map((url: string, index: number) => (
              <li key={index}>
                <a
                  href={url}
                  className="text-[#00173d] underline hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold mb-1">Student Comments:</h2>
          <p className="border p-2 rounded-md">{submission.comment || "—"}</p>
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
    </ProtectedRoute>
  );
};

export default SpecificSubmissionPage;
