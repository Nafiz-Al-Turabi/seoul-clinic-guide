"use client";

import React from "react";
import Image from "next/image";

const blogs = [
  {
    title: "Masseter Botox in Korea",
    desc: "Imagine achieving a softer, more contoured jawline without undergoing surgery—this is t...",
    date: "Feb 16, 2025 4:02 am",
    image: "/assets/images/blog1.jpg",
  },
  {
    title: "Hyperhidrosis Botox in Korea",
    desc: "Are you tired of constantly battling excessive sweating that impacts your daily life an...",
    date: "Feb 16, 2025 4:02 am",
    image: "/assets/images/blog2.jpg",
  },
  {
    title: "Vaginal Tightening Laser in Korea",
    desc: "Imagine a world where women can reclaim their intimate health and confidence throug...",
    date: "Feb 16, 2025 4:02 am",
    image: "/assets/images/blog3.jpg",
  },
  {
    title: "ONDA Lifting in Korea",
    desc: "Are you struggling with stubborn skin laxity or seeking to enhance your facial contou...",
    date: "Feb 16, 2025 4:02 am",
    image: "/assets/images/blog4.jpg",
  },
];

const RecentBlogs = () => {
  return (
    <section className="w-full px-4 py-16 bg-white">
      <div className="max-w-[86rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Recent Blogs</h2>
          <button className="bg-blue-100 text-blue-700 font-medium px-5 py-2 rounded-full hover:bg-blue-200 transition">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover aspect-3/2"
                />
              </div>
              <p className="text-xs text-gray-400 mb-1">{blog.date}</p>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                {blog.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{blog.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  READ MORE
                </a>
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
