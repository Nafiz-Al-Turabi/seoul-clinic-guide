"use client";
import { useBlogCategoriesQuery } from "@/app/store/api/blogApi";
import BlogCard from "@/components/ui/Cards/BlogCard";
import { useState } from "react";



const BlogCategories = ({params}) => {
  const [activeTab, setActiveTab] = useState("All Blogs");
  const { data, isLoading, error } = useBlogCategoriesQuery(null);

  const categories = data?.data || [];
  const tabs = [{ id: "all", name: "All Blogs" }, ...categories];
  return (
    <div className="max-w-[86rem] mx-auto px-4 2xl:px-0 py-24">
      <div className="flex overflow-x-auto mb-8">
        <div className="flex justify-items-end gap-4 w-max">
          {tabs.map((tab) => (
            <button
            key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border
                  ${
                    activeTab === tab
                      ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                      : "border-[#EEF3F8] text-main"
                  }`}
            >
              {tab?.name}
            </button>
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div> */}
    </div>
  );
};

export default BlogCategories;
