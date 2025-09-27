import React from "react";


const Label = ({ htmlFor, label, className="",required=false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${className}`}
    >
      {/* {children} */}
      {label}
      {required && <span className="text-error-500">*</span>}{" "}
    </label>
  );
};

export default Label;
