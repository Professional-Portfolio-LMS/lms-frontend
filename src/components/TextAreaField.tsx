import React, { useState, ChangeEvent } from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
}: TextAreaFieldProps) => {
  const [internalValue, setInternalValue] = useState("");
  const textAreaValue = value !== undefined ? value : internalValue;

  const isFloated = textAreaValue !== "";

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  return (
    <div className="mb-2">
      <div className="border border-[#1475cf] rounded-md h-[80px] text-[14px] relative focus-within:border-[#0f5ea8]">
        <textarea
          name={name}
          id={name}
          className="w-full h-full px-2 pt-4 outline-none bg-transparent peer"
          value={textAreaValue}
          onChange={handleChange}
          autoComplete="off"
        />
        <label
          htmlFor={name}
          className={`text-gray-400 absolute left-2 transition-all duration-200
            ${isFloated ? "text-[10px] top-[3px]" : "text-[14px] top-2"}
            peer-focus:text-[10px] peer-focus:top-[3px]`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default TextAreaField;
