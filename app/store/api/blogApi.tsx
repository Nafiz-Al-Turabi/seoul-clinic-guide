import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";
import { get } from "http";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page = 1, limit, sortBy, search }) => ({
        url: "/admin/blogs",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          search,
        },
      }),
      providesTags: ["Blogs"],
    }),
    getBlogsByCategory: builder.query({
      query: ({categoryId = null, page = 1, limit = 12}) => ({
        url: `/blogs`,
        method: "GET",
        params: {
          ...(categoryId && { category: categoryId }),
          page,
          limit,
        },
      }),
      providesTags: ["Blogs"],
    }),

    getRecentBlogs: builder.query({
      query: () => ({
        url: "/blogs/recent-blogs",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    getBlogDetails: builder.query({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    createBlog: builder.mutation({
      query: (formData) => ({
        url: "/admin/blogs",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),

    BlogCategories: builder.query({
      query: () => ({
        url: "/admin/blog-categories",
        method: "GET",
      }),
      providesTags: ["BlogCategories"],
    }),

    userBlogCategories: builder.query({
      query: () => ({
        url: "/blogs/categories",
        method: "GET",
      }),
      providesTags: ["BlogCategories"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/admin/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    getBlogById: builder.query({
      query: (id) => `/admin/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/blogs/${id}`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useBlogCategoriesQuery,
  useUserBlogCategoriesQuery,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useGetRecentBlogsQuery,
  useGetBlogDetailsQuery,
  useGetBlogsByCategoryQuery,
} = blogApi;
