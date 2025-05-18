"use client";

import React, { FormEvent, JSX, useState } from "react";
import {
  CloudUpload,
  File,
  FileImage,
  FileText,
  FileAudio,
  FileVideo,
  FileArchive,
  FileCode,
  Trash,
} from "lucide-react";
import TextAreaField from "./TextAreaField";

interface UploaderWithDescProps {
  otherInputs?: JSX.Element[];
  assignmentId: string;
}

const UploaderWithDesc = ({
  otherInputs = [],
  assignmentId = "CS301",
}: UploaderWithDescProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const studentId = "210745B";

  const getIconForFileType = (ext: string | undefined) => {
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage size={20} color="#00173d" />;
      case "pdf":
        return <FileText size={20} color="#00173d" />;
      case "mp3":
      case "wav":
        return <FileAudio size={20} color="#00173d" />;
      case "mp4":
      case "mov":
        return <FileVideo size={20} color="#00173d" />;
      case "zip":
      case "rar":
        return <FileArchive size={20} color="#00173d" />;
      case "js":
      case "ts":
      case "html":
      case "css":
        return <FileCode size={20} color="#00173d" />;
      case "txt":
        return <FileText size={20} color="#00173d" />;
      default:
        return <File size={20} color="#00173d" />;
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const selectedFiles = Array.from(selected);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData();

    const comment = (form.querySelector('[name="comment"]') as HTMLInputElement)
      ?.value;

    const dto = {
      comment,
    };

    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    files.forEach((file) => {
      formData.append("files", file);
    });

    for (let [key, value] of formData.entries()) {
      if (value instanceof globalThis.File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      const res = await fetch(
        `http://localhost:8080/submissions/${assignmentId}/student/${studentId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to submit: ${res.status}`);
      }

      const responseData = await res.json();
      console.log("Submission success:", responseData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {otherInputs.map((element) => element)}

        <div
          className="uploader-div"
          onClick={() => {
            const input = document.querySelector(
              ".file-input"
            ) as HTMLInputElement | null;
            input?.click();
          }}
        >
          <input
            className="file-input"
            type="file"
            name="file"
            hidden
            multiple
            onChange={handleFileChange}
          />
          {files.length === 0 ? (
            <>
              <CloudUpload color="#00173d" size={60} />
              <p>Browse files to upload</p>
            </>
          ) : (
            <p>{files.length} file(s) selected</p>
          )}
        </div>

        {files.length > 0 && (
          <section className="uploaded-list space-y-2 mt-4">
            {files.map((file, index) => (
              <div key={index} className="uploaded-row flex items-center gap-2">
                {getIconForFileType(getFileExtension(file.name))}
                <span className="upload-content text-sm break-all">
                  {file.name}
                </span>
                <Trash
                  className="cursor-pointer"
                  onClick={() => removeFile(index)}
                />
              </div>
            ))}
          </section>
        )}

        <TextAreaField key="comments" label="Comments" name="comments" />

        <div className="flex w-full justify-center align-middle mt-4">
          <button
            type="submit"
            className="bg-[#00173d] text-white px-5 py-2 rounded-md cursor-pointer hover:bg-[#0f5cad] active:scale-95 transition-all font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploaderWithDesc;
