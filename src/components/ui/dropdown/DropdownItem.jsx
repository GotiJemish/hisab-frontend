import React from "react";
import Link from "next/link";

const DropdownItem = ({
  as = "button",       // button | a | link
  href = "",
  onClick,
  disabled = false,
  variant = "default",  // default | danger | success | custom
  size = "md",          // sm | md | lg
  className = "",
  baseClassName = "",
  leftIcon,
  rightIcon,
  children,
  ...rest
}) => {
  const variants = {
    default: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    danger: "text-red-600 hover:bg-red-100 hover:text-red-700",
    success: "text-green-600 hover:bg-green-100 hover:text-green-700",
    custom: "",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const finalClasses = `
    block w-full text-left 
    ${sizes[size]}
    ${variants[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${baseClassName}
    ${className}
  `.replace(/\s+/g, " ").trim();

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) onClick(event);
  };

  // If tag is LINK
  if (as === "link") {
    return (
      <Link href={href} className={finalClasses} {...rest}>
        <span className="flex items-center gap-2">
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </Link>
    );
  }

  // Default: BUTTON
  return (
    <button className={finalClasses} onClick={handleClick} disabled={disabled} {...rest}>
      <span className="flex items-center gap-2">
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  );
};

export default DropdownItem;
