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

    getTopClinics: builder.query({
      query: () => ({
        url: "/clinics/top-clinics",
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

    // 1. Fetch a single clinic by ID
    getClinicById: builder.query({
      query: (id) => `/admin/clinics/${id}`,
      providesTags: (result, error, id) => [{ type: "Clinics", id }],
    }),

    // Update clinic
    updateClinic: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/clinics/${id}`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Clinics", id }],
    }),

    deleteClinic: builder.mutation({
      query: (id) => ({
        url: `/admin/clinics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clinics"],
    }),

    // procedure ..............................

    getClinicCategory: builder.query({
      query: (i) => ({
        url: "/clinic-categories",
        method: "GET",
      }),
    }),

    getClinicsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/clinics`,
        method: "GET",
        params: categoryId ? { category: categoryId } : {},
      }),
    }),

    getProcedureByCategory: builder.query({
      query: (clinic_category_id) => ({
        url: `/procedures/by-category/${clinic_category_id}`,
        method: "GET",
        params: {
          page: 1,
        },
      }),
    }),





    
  }),
});

export const {
  useGetProceduresQuery,
  useGetCategoriesQuery,
  useCreateClinicMutation,
  useGetClinicsQuery,
  useDeleteClinicMutation,
  useUpdateClinicMutation,
  useGetClinicByIdQuery,
  useGetTopClinicsQuery,
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
  useGetClinicsByCategoryQuery,
} = clinicApi;
