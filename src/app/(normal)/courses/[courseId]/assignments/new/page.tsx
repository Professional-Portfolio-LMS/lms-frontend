// "use client";

// import React, { useState } from "react";
// import UploaderWithDesc from "@/components/UploaderWithDesc";
// import InputField from "@/components/InputField";
// import TextAreaField from "@/components/TextAreaField";
// import SelectField from "@/components/SelectField";

// export default function CreateAssignmentPage() {
//   const [formData, setFormData] = useState({
//     type: "",
//     title: "",
//     description: "",
//     dueDate: "",
//     maxScore: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     console.log(`WAZZAAA name: ${name} and value: ${value}`);
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "maxScore" ? Number(value) : value,
//     }));
//   };

//   return (
//     <div className="p-6 max-w-6xl">
//       <h1 className="text-2xl font-semibold mb-4">Create New Assignment</h1>
//       <UploaderWithDesc
//         otherInputs={[
//           <SelectField
//             key="type"
//             label="Assignment Type"
//             name="type"
//             value={formData.type}
//             options={["", "Assignment", "Quiz", "Exam"]}
//             onChange={handleChange}
//           />,
//           <InputField
//             key="title"
//             label="Title"
//             name="title"
//             type="text"
//             value={formData.title}
//             onChange={handleChange}
//           />,
//           <TextAreaField
//             key="description"
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />,
//           <InputField
//             key="dueDate"
//             label="Due Date"
//             name="dueDate"
//             type="datetime-local"
//             value={formData.dueDate}
//             onChange={handleChange}
//           />,
//           <InputField
//             key="maxScore"
//             label="Max Score"
//             name="maxScore"
//             type="number"
//             value={formData.maxScore}
//             onChange={handleChange}
//           />,
//         ]}
//       />
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
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

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxScore" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    const dto = {
      type: formData.type,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      maxScore: formData.maxScore,
    };

    console.log("Skibidiii", dto);

    data.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    files.forEach((file) => {
      data.append("files", file);
    });

    console.log("=== FormData Payload ===");
    for (let [key, value] of data.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // try {
    //   const res = await fetch("http://localhost:8080/assignments", {
    //     method: "POST",
    //     body: data,
    //   });

    //   if (!res.ok) throw new Error(`Failed to submit: ${res.status}`);
    //   const responseData = await res.json();
    //   console.log("Submission success:", responseData);
    // } catch (err) {
    //   console.error("Submission error:", err);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-6xl space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Assignment</h1>

      <SelectField
        label="Assignment Type"
        name="type"
        value={formData.type}
        options={["", "Assignment", "Quiz", "Exam"]}
        onChange={handleChange}
      />
      <InputField
        label="Title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
      />
      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <InputField
        label="Due Date"
        name="dueDate"
        type="datetime-local"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <InputField
        label="Max Score"
        name="maxScore"
        type="number"
        value={formData.maxScore}
        onChange={handleChange}
      />
      <FileUploader files={files} setFiles={setFiles} />

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-[#00173d] text-white px-5 py-2 rounded-md hover:bg-[#0f5cad] active:scale-95 transition-all font-medium"
        >
          Submit Assignment
        </button>
      </div>
    </form>
  );
}
