"use client";
import React from "react";
import Image from "next/image";
import blog1 from "@/public/assets/recentBlog/recent-blog1.png";
import blog2 from "@/public/assets/recentBlog/recent-blog2.png";
import { HiArrowUpRight } from "react-icons/hi2";
import BlogCard from "../Cards/BlogCard";
import { useGetRecentBlogsQuery } from "@/app/store/api/blogApi";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/Loading/Loading";
import ErrorComponent from "@/components/shared/ErrorComponent/ErrorComponent";

const RecentBlogs = () => {
  const { data: recentBlogs, isLoading, error } = useGetRecentBlogsQuery(null);
  const recentBlogsData = recentBlogs?.data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <section className="w-full px-4  pt-16 pb-20  bg-[#68b0d4]/20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="primary-text font-bold">Recent Blogs</h3>
          <Link
            href="/blogs"
            className="primary-bg text-white font-medium px-5 py-2 rounded-full hover:bg-blue-200 transition cursor-pointer"
          >
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
