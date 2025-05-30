import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
import { baseApi } from "./baseApi";
import { create } from "domain";

export const clinicApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProcedures: builder.query({
      query: () => ({
        url: "/admin/procedures",
        method: "GET",
        providesTags: ["procedures"],
      }),
    }),

    getAllProcedures: builder.query({
      query: () => ({
        url: "/admin/procedures/all",
        method: "GET",
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
      query: ({page = 1, limit, sortBy, search}) => ({
        url: "/admin/clinics",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          search,
        },
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

    getSimilarClinics: builder.query({
      query: (id) => ({
        url: `/clinics/related-clinics/${id}`,
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
      invalidatesTags: ["Clinics"]
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

    getUsersClinics: builder.query({
      query: ({ page = 1, limit, search, procedure }) => ({
        url: "/clinics",
        method: "GET",
        params: {
          page,
          limit,
          search,
          procedure,
        },
      }),
    }),

    getClinicDetails: builder.query({
      query: (slug) => ({
        url: `/clinics/${slug}`,
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
      }),
    }),
    getClientProcedures: builder.query({
      query: ({ clinic_category_id, page = 1, limit = 12 }) => ({
        url: `/procedures`,
        method: "GET",
        params: {
          page,
          limit,
          category: clinic_category_id,
        },
      }),
    }),
    
  }),
});

export const {
  useGetProceduresQuery,
  useGetAllProceduresQuery,
  useGetCategoriesQuery,
  useCreateClinicMutation,
  useGetClinicsQuery,
  useDeleteClinicMutation,
  useUpdateClinicMutation,
  useGetClinicByIdQuery,
  useGetTopClinicsQuery,
  useGetSimilarClinicsQuery,
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery, //this is for procedures
  useGetClinicsByCategoryQuery,
  useGetUsersClinicsQuery,
  useGetClinicDetailsQuery,
  useGetClientProceduresQuery,
} = clinicApi;
