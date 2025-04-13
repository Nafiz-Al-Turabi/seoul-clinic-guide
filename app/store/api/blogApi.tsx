import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getBlogs: builder.query({
            query:()=>({
                url:"/admin/blogs",
                method:"GET",
                providesTags:["Blogs"]
            })
        }),
        
        createBlog: builder.mutation({
            query:(formData)=>({
                url:"/admin/blogs",
                method:"POST",
                body:formData,
                formData:true,
            }),
        }),

        BlogCategories: builder.query({
            query:()=>({
                url:"/admin/blog-categories",
                method:"GET",
                providesTags:["BlogCategories"]
            })
        })
    })
})

export const {useGetBlogsQuery, useCreateBlogMutation, useBlogCategoriesQuery} = blogApi;