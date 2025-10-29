"use client";
import React from "react";
import Tooltip from "./Tooltip";

const PlusButton = ({onClick=()=>{}}) => {
  return (
    <div className="fixed bottom-6 right-6">
      <Tooltip message="Add New Item" position="top">
        <button onClick={onClick} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-2xl shadow-md transition">
          +
        </button>
      </Tooltip>
    </div>
  );
};

export default PlusButton;
