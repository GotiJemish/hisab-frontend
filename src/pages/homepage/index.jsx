"use client"
import { useEffect, useState } from "react";

export default function Home() {
  

  return (
    
      <div className="p-8 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-primary">Welcome to My App</h1>
        <p className="mt-4 text-theme">This app uses Tailwind CSS with a custom theme via CSS variables.</p>
        <button
          
          className="mt-6 px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition"
        >
          Toggle Theme
        </button>
      </div>
    
  );
}
