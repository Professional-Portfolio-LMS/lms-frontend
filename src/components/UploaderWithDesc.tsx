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
}

const UploaderWithDesc = ({ otherInputs = [] }: UploaderWithDescProps) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("No file selected");

  const getIconForFileType = (ext: string | undefined) => {
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage size={20} color="#00173d" />;
      case "pdf":
        return <FileText size={20} color="#00173d" />; // lucide doesn't have FilePdf, so use FileText or similar
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
        return <File size={20} color="#00173d" />; // fallback icon
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase();
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    for (let [key, value] of formData.entries()) {
      if (value instanceof Blob) {
        console.log(`${key}:`, (value as File).name);
      } else {
        console.log(`${key}:`, value);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {otherInputs.map((element) => {
          return element;
        })}
        <div
          className="uploader-div"
          onClick={() => {
            const fileInput = document.querySelector(
              ".file-input"
            ) as HTMLInputElement | null;
            fileInput?.click();
          }}
        >
          <input
            className="file-input"
            type="file"
            name="file"
            hidden
            onChange={({ target: { files } }) => {
              if (files) {
                files[0] && setFilename(files[0].name);
                files[0] && setFile(URL.createObjectURL(files[0]));
              }
            }}
          />
          {file ? (
            <div>{filename}</div>
          ) : (
            <>
              <CloudUpload color="#00173d" size={60} />
              <p>Browse files to upload</p>
            </>
          )}
        </div>
        <section className="uploaded-row">
          {getIconForFileType(getFileExtension(filename))}
          <span className="upload-content">
            {filename} &nbsp; - &nbsp;
            <Trash
              className="cursor-pointer"
              onClick={() => {
                const fileInput = document.querySelector(
                  ".file-input"
                ) as HTMLInputElement | null;

                if (fileInput) {
                  fileInput.value = "";
                }

                setFilename("No file selected");
                setFile("");
              }}
            />
          </span>
        </section>
        <TextAreaField key="comments" label="Comments" name="comments" />
        <div className="flex w-full justify-center align-middle mt-2">
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
