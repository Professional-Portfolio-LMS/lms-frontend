import React, { useState, ChangeEvent } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  value?: string;
  options: string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) => {
  const [internalValue, setInternalValue] = useState("");
  const selectValue = value !== undefined ? value : internalValue;

  const isFloated = selectValue !== "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  return (
    <div className="mb-2">
      <div className="border border-[#1475cf] rounded-md h-[43px] text-[14px] relative focus-within:border-[#0f5ea8]">
        <select
          name={name}
          id={name}
          className="w-full h-full px-2 pt-3 outline-none bg-transparent peer"
          value={selectValue}
          onChange={handleChange}
          autoComplete="off"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label
          htmlFor={name}
          className={`text-gray-400 absolute left-2 transition-all duration-200
            ${isFloated ? "text-[10px] top-1" : "text-[14px] top-2"}
            peer-focus:text-[10px] peer-focus:top-1`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default SelectField;
