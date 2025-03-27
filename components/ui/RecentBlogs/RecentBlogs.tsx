import React from "react";
import Image from "next/image";
import blog1 from "@/public/assets/recentBlog/recent-blog1.png";
import blog2 from "@/public/assets/recentBlog/recent-blog2.png";
import { HiArrowUpRight } from "react-icons/hi2";

const blogs = [
  {
    title: "Masseter Botox in Korea",
    desc: "Imagine achieving a softer, more contoured jawline without undergoing surgery—this is t...",
    date: "Feb 16, 2025 4:02 am",
    image: blog1,
  },
  {
    title: "Hyperhidrosis Botox in Korea",
    desc: "Are you tired of constantly battling excessive sweating that impacts your daily life an...",
    date: "Feb 16, 2025 4:02 am",
    image: blog2,
  },
  {
    title: "Vaginal Tightening Laser in Korea",
    desc: "Imagine a world where women can reclaim their intimate health and confidence throug...",
    date: "Feb 16, 2025 4:02 am",
    image: blog1,
  },
  {
    title: "ONDA Lifting in Korea",
    desc: "Are you struggling with stubborn skin laxity or seeking to enhance your facial contou amar hisnd jf njus ok  okf [pf kjnhdf hsfus ,sjflksf khf sjpjn snksfi ksjfois ba aohdf iohfbsf  osjf f,sfofjs;[poms;lfiu jjhisuf iosfu",
    date: "Feb 16, 2025 4:02 am",
    image: blog2,
  },
];

const RecentBlogs = () => {
  return (
    <section className="w-full px-4  py-16 bg-white">
      <div className="max-w-[86rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="primary-text font-bold">Recent Blogs</h3>
          <button className="primary-bg text-white font-medium px-5 py-2 rounded-full hover:bg-blue-200 transition cursor-pointer">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#EEF3F8]  hover:shadow-md transition p-3 flex flex-col"
            >
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
                {blog.desc.length > 116
                  ? blog.desc.slice(0, 116) + "..."
                  : blog.desc}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-semibold secondary-text uppercase"
                >
                  READ MORE
                </a>
                <span className="text-white primary-bg rounded-full p-2">
                  <HiArrowUpRight size={21} />
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
