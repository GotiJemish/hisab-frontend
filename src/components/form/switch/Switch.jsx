"use client";
import React, { useState } from "react";
import Label from "../Label";

const Switch = ({
  label = "",
  id = "",
  defaultChecked = false,
  disabled = false,
  onChange = () => {},
  name = "",
  required = false,
  color = "blue", // Default to blue color
  coverClass=""
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
let coverClasses = ` ${coverClass}`;
  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const switchColors =
    color === "blue"
      ? {
          background: isChecked
            ? "bg-brand-500 "
            : "bg-gray-200 dark:bg-white/10", // Blue version
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: isChecked
            ? "bg-gray-800 dark:bg-white/10"
            : "bg-gray-200 dark:bg-white/10", // Gray version
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    <div className={coverClasses}>
      <Label
        htmlFor={id}
        label={label}
        required={required}
        disabled={disabled}
        onClick={handleToggle}
      />
      <div className="relative inline-block" >
        <input
          id={id}
          name={name}
          onClick={handleToggle}
          required={required}
          className={`block cursor-pointer transition duration-150 ease-linear h-6 w-11 rounded-full ${
            disabled
              ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
              : switchColors.background
          }`}
        />
     
        <div
          className={`absolute cursor-pointer left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
        onClick={handleToggle}></div>
      </div>
         {/* <div
          className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${
            disabled
              ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
              : switchColors.background
          }`}
        ></div> */}
      {/* <label
        className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
          disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
        }`}
         // Toggle when the label itself is clicked
      >
        <div className="relative"onClick={handleToggle}>
          <div
            className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${
              disabled
                ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
                : switchColors.background
            }`}
          ></div>
          <div
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
          ></div>
        </div>
        {label}
      </label> */}
    </div>
  );
};

export default Switch;
