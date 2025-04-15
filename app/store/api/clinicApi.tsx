import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";
import { create } from "domain";

export const clinicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createClinic: builder.mutation({
      query: (formData) => ({
        url: "/admin/clinics",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
    getProcedures: builder.query({
      query: () => ({
        url: "/admin/procedures",
        method: "GET",
        providesTags: ["procedures"],
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/admin/clinic-categories",
        method: "GET",
        providesTags: ["procedures"],
      }),
    }),
  }),
});

export const { useGetProceduresQuery, useGetCategoriesQuery,useCreateClinicMutation } = clinicApi;
