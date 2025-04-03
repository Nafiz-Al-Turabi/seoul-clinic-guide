import Image from "next/image";
import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div className="bg-white rounded-xl border border-[#EEF3F8]  hover:shadow-md transition p-3 flex flex-col">
      <div className="relative w-full h-44 rounded-md overflow-hidden mb-4">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover aspect-square"
        />
      </div>
      <p className="text-sm text-[#C9C9C9] mb-1">{blog.date}</p>
      <h4 className="text-lg font-semibold primary-text mb-2 leading-[180%] w-[18ch]">
        {blog.title}
      </h4>
      <p className="text-[#929292] text-base mb-4 leading-[180%]">
        {blog.desc.length > 116 ? blog.desc.slice(0, 116) + "..." : blog.desc}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <a href="#" className="text-sm font-semibold secondary-text uppercase">
          READ MORE
        </a>
        <span className="text-white primary-bg rounded-full p-2">
          <HiArrowUpRight size={21} />
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
