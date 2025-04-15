import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";

export const clinicApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getProcedures: builder.query({
            query:()=>({
                url:"/admin/procedures",
                method:"GET",
                providesTags:["procedures"]
            })
        }),
 
    })
})

export const {useGetProceduresQuery} = clinicApi;