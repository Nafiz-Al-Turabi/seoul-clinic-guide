import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";
import { create } from "domain";

export const clinicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    getClinics: builder.query({
      query: () => ({
        url: "/admin/clinics",
        method: "GET",
      }),
      providesTags: ["Clinics"],
    }),

    createClinic: builder.mutation({
      query: (formData) => ({
        url: "/admin/clinics",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Clinics"],
    }),

    updateClinic: builder.mutation({
      query:({id,formData}) => ({
        url: `/admin/clinics/${id}`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Clinics"],
    }),

    deleteClinic: builder.mutation({
      query: (id) => ({
        url: `/admin/clinics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clinics"],
    }),
  }),
});

export const {
  useGetProceduresQuery,
  useGetCategoriesQuery,
  useCreateClinicMutation,
  useGetClinicsQuery,
  useDeleteClinicMutation,
} = clinicApi;
