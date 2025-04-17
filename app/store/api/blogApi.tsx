import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";
import { get } from "http";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/admin/blogs",
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
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useBlogCategoriesQuery,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} = blogApi;
