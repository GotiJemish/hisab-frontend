
"use client";

import { useLoading } from "@/context/LoadingContext";
import React from "react";

const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* <SpinnerIcon className="w-10 h-10 animate-spin text-brand-500 dark:text-brand-400" />
        <p className="text-sm text-gray-700 dark:text-gray-300">Loading...</p> */}
         <span className='border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600'></span>
      </div>
    </div>
  );
};

export default GlobalLoader;
