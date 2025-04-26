"use client";
import React from "react";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-600">
      <svg
        className="w-12 h-12 mb-3 text-red-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h5 className="text-lg font-semibold">Something went wrong</h5>
      <p className="text-sm text-gray-500">Please try again later or check your connection.</p>
    </div>
  );
};

export default ErrorComponent;
