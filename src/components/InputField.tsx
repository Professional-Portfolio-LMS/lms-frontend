import React, { useState, ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputValue = value !== undefined ? value : internalValue;
  const isFloated = inputValue !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const inputType =
    type === "datetime-local" && !isFocused && !isFloated ? "text" : type;

  return (
    <div className="mb-2">
      <div className="border border-[#00173d] rounded-md h-[43px] text-[14px] relative focus-within:border-[#0f5ea8]">
        <input
          type={inputType}
          name={name}
          id={name}
          className="w-full h-full px-2 pt-3 outline-none bg-transparent peer"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          autoComplete="off"
        />
        <label
          htmlFor={name}
          className={`text-gray-400 absolute left-2 transition-all duration-200
            ${
              isFloated || isFocused ? "text-[10px] top-1" : "text-[14px] top-2"
            }
            peer-focus:text-[10px] peer-focus:top-1`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputField;
