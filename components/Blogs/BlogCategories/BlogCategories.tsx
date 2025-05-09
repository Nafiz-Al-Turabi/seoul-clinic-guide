"use client";

import {
  useBlogCategoriesQuery,
  useGetBlogsByCategoryQuery,
  useUserBlogCategoriesQuery,
} from "@/app/store/api/blogApi";
import BlogCard from "@/components/ui/Cards/BlogCard";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const BlogCategories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromURL = parseInt(searchParams.get("page") || "1");
  const initialCategoryId = searchParams.get("category") || null;
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);

  const { data: categoriesData, isLoading: loadingCategories } =
    useUserBlogCategoriesQuery(null);
  const {
    data: blogsData,
    isLoading: loadingBlogs,
    error: errorBlogs,
  } = useGetBlogsByCategoryQuery({ categoryId: activeCategoryId, page: pageFromURL });

  const categories = categoriesData?.data || [];
  const blogs = blogsData?.data?.blogs || [];
  const totalPages = blogsData?.data?.totalPages || 1;

  const tabs = useMemo(
    () => [{ id: null, name: "All Blogs" }, ...categories],
    [categories]
  );

  const activeTabName = useMemo(() => {
    if (!activeCategoryId) return "All Blogs";
    return (
      categories.find((cat) => cat.id === activeCategoryId)?.name || "All Blogs"
    );
  }, [activeCategoryId, categories]);

  const handleTabClick = (tab) => {
    setActiveCategoryId(tab.id);
    const query = tab.id ? `?category=${tab.id}` : "";
    router.push(`/blogs${query}`, { scroll: false });
  };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    const query = activeCategoryId
      ? `?category=${activeCategoryId}&page=${newPage}`
      : `?page=${newPage}`;
    router.push(`/blogs${query}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 2xl:px-0 py-24">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto mb-8">
        <div className="flex gap-4 w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id || "all"}
              onClick={() => handleTabClick(tab)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 border cursor-pointer
                ${
                  activeTabName === tab.name
                    ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                    : "border-[#EEF3F8] text-main"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {loadingBlogs ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : errorBlogs ? (
        <div className="text-center py-10 text-red-500">
          Error loading blogs
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="col-span-full text-center py-10">
              No blogs found in this category
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <ReactPaginate
              breakLabel="..."
              nextLabel="›"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              forcePage={pageFromURL - 1}
              previousLabel="‹"
              renderOnZeroPageCount={null}
              containerClassName="custom-pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        )}
    </div>
  );
};

export default BlogCategories;
