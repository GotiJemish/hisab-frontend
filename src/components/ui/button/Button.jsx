import React from "react";

const Button = ({
  title = "",
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick = () => {},
  className = "",
  disabled = false,
  type = "button",
  as: Component = "button",
  ...rest
}) => {
  // Size Classes
  const sizeClasses = {
    model: "px-4 py-2.5 text-sm",
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    success: "text-white bg-success-500 shadow-theme-xs hover:bg-success-600",
    info:"text-white bg-blue-light-500 shadow-theme-xs hover:bg-blue-light-600",
    warning:"text-white bg-warning-500 shadow-theme-xs hover:bg-warning-600",
    error: "text-white bg-error-500 shadow-theme-xs hover:bg-error-600",
  };
  return (
    <Component
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {title}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </Component>
  );
};

export default Button;
