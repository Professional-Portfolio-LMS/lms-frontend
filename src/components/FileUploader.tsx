// FileUploader.tsx
"use client";

import React from "react";
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

interface FileUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ files, setFiles }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const selectedFiles = Array.from(selected);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileExtension = (filename: string) => filename.split(".").pop()?.toLowerCase();

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

  return (
    <>
      <div
        className="uploader-div"
        onClick={() => {
          const input = document.querySelector(".file-input") as HTMLInputElement | null;
          input?.click();
        }}
      >
        <input
          className="file-input"
          type="file"
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
              <span className="upload-content text-sm break-all">{file.name}</span>
              <Trash className="cursor-pointer" onClick={() => removeFile(index)} />
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default FileUploader;
