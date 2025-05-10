"use client";

import React, { useState } from "react";
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

const getIconForFileType = (ext: string | undefined) => {
  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage />;
    case "pdf":
      return <FileText />; // lucide doesn't have FilePdf, so use FileText or similar
    case "mp3":
    case "wav":
      return <FileAudio />;
    case "mp4":
    case "mov":
      return <FileVideo />;
    case "zip":
    case "rar":
      return <FileArchive />;
    case "js":
    case "ts":
    case "html":
    case "css":
      return <FileCode />;
    case "txt":
      return <FileText />;
    default:
      return <File />; // fallback icon
  }
};

const UploaderWithDesc = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("No file selected");

  const getIconForFileType = (ext: string | undefined) => {
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage size={20} color="#1475cf" />;
      case "pdf":
        return <FileText size={20} color="#1475cf" />; // lucide doesn't have FilePdf, so use FileText or similar
      case "mp3":
      case "wav":
        return <FileAudio size={20} color="#1475cf" />;
      case "mp4":
      case "mov":
        return <FileVideo size={20} color="#1475cf" />;
      case "zip":
      case "rar":
        return <FileArchive size={20} color="#1475cf" />;
      case "js":
      case "ts":
      case "html":
      case "css":
        return <FileCode size={20} color="#1475cf" />;
      case "txt":
        return <FileText size={20} color="#1475cf" />;
      default:
        return <File size={20} color="#1475cf" />; // fallback icon
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase();
  };

  return (
    <div>
      <form>
        <div
          className="uploader-div"
          onClick={() => {
            document.querySelector(".file-input")?.click();
          }}
        >
          <input
            className="file-input"
            type="file"
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
              <CloudUpload color="#1475cf" size={60} />
              <p>Browse files to upload</p>
            </>
          )}
        </div>
        <section className="uploaded-row">
          {getIconForFileType(getFileExtension(filename))}
          <span className="upload-content">
            {filename} -
            <Trash
              onClick={() => {
                setFilename("No selected file");
                setFile("");
              }}
            />
          </span>
        </section>
        <textarea
          title="Comments"
          placeholder="Your comments go here"
          className="w-full p-2 border-2 rounded border-[#1475cf] hover:border-[#0f5ea8] focus:border-[#0f5ea8] outline-none"
        />
      </form>
    </div>
  );
};

export default UploaderWithDesc;
