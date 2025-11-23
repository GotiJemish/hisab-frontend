import React from "react";


const Label = ({ htmlFor, label, className="",required=false,isHidden=false,disabled=false,...rest }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 block text-sm font-medium ${className} ${isHidden && "sr-only"} ${disabled? "text-gray-400" : "text-gray-700 dark:text-gray-400"}`}
    {...rest}
    >
      {/* {children} */}
      {label}
      {required && <span className="text-error-500">*</span>}{" "}
    </label>
  );
};

export default Label;
