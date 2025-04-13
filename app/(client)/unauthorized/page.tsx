"use client";

import Link from "next/link";
import React from "react";
import { ShieldAlert } from "lucide-react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="text-center max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 border border-red-200 animate-fade-in">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 text-base mb-6">
          You don't have permission to view this page. If you think this is an error, please contact the administrator.
        </p>
        <Link
          href="/"
          className="inline-block w-full text-center px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-all duration-200"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Page;
