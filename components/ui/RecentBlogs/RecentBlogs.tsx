"use client";
import React from "react";
import Image from "next/image";
import blog1 from "@/public/assets/recentBlog/recent-blog1.png";
import blog2 from "@/public/assets/recentBlog/recent-blog2.png";
import { HiArrowUpRight } from "react-icons/hi2";
import BlogCard from "../Cards/BlogCard";
import { useGetRecentBlogsQuery } from "@/app/store/api/blogApi";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "Masseter Botox in Korea",
    desc: "Imagine achieving a softer, more contoured jawline without undergoing surgery—this is t...",
    date: "Feb 16, 2025 4:02 am",
    image: blog1,
  },
  {
    id: 2,
    title: "Hyperhidrosis Botox in Korea",
    desc: "Are you tired of constantly battling excessive sweating that impacts your daily life an...",
    date: "Feb 16, 2025 4:02 am",
    image: blog2,
  },
  {
    id: 3,
    title: "Vaginal Tightening Laser in Korea",
    desc: "Imagine a world where women can reclaim their intimate health and confidence throug...",
    date: "Feb 16, 2025 4:02 am",
    image: blog1,
  },
  {
    id: 4,
    title: "ONDA Lifting in Korea",
    desc: "Are you struggling with stubborn skin laxity or seeking to enhance your facial contou amar hisnd jf njus ok  okf [pf kjnhdf hsfus ,sjflksf khf sjpjn snksfi ksjfois ba aohdf iohfbsf  osjf f,sfofjs;[poms;lfiu jjhisuf iosfu",
    date: "Feb 16, 2025 4:02 am",
    image: blog2,
  },
];

const RecentBlogs = () => {
  const { data: recentBlogs } = useGetRecentBlogsQuery(null);
  const recentBlogsData = recentBlogs?.data || [];
  console.log(recentBlogsData);

  return (
    <section className="w-full px-4  py-16 bg-white">
      <div className="max-w-[86rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="primary-text font-bold">Recent Blogs</h3>
          <Link href="/blogs" className="primary-bg text-white font-medium px-5 py-2 rounded-full hover:bg-blue-200 transition cursor-pointer">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentBlogsData?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
