"use client";
import React, { useState } from "react";

const Tooltip = ({ children, message, position = "top" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClasses = {
    top: "bottom-12 left-1/2 -translate-x-1/2",
    bottom: "top-12 left-1/2 -translate-x-1/2",
    left: "right-12 top-1/2 -translate-y-1/2",
    right: "left-12 top-1/2 -translate-y-1/2",
  };

  const arrowPosition = {
    top: "left-1/2 bottom-[-6px] -translate-x-1/2 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-gray-900",
    bottom: "left-1/2 top-[-6px] -translate-x-1/2 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-gray-900",
    left: "top-1/2 right-[-6px] -translate-y-1/2 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-gray-900",
    right: "top-1/2 left-[-6px] -translate-y-1/2 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-gray-900",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          className={`absolute ${positionClasses[position]} bg-gray-900 text-white text-sm px-3 py-1 rounded-md shadow-lg transition-opacity duration-200 z-10`}
          style={{ whiteSpace: "nowrap" }}
        >
          {message}
          <div className={`absolute w-0 h-0 ${arrowPosition[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
