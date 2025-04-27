import { baseApi } from "./baseApi";

export const AdminProcedureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProcedure: builder.mutation({
      query: (data) => ({
        url: "/admin/procedures",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Procedures"],
    }),

    updateProcedure: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/procedures/${id}`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Procedures"], 
    }),

    deleteProcedure: builder.mutation({
      query: (id) => ({
        url: `/admin/procedures/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Procedures"], 
    }),

    getProcedureById: builder.query({
      query: (id) => {
        console.log("32", id);
        return {
          url: `/admin/procedures/${id}`,
          method: "GET",
        };
      },
    }),

    getProcedures: builder.query({
      query: ({ page, limit, sortBy }) => ({
        url: "/admin/procedures",
        method: "GET",
        params: { page, limit, sortBy },
      }),
      providesTags: ["Procedures"], // Ensure this is consistent
    }),

    getClinicCategories: builder.query({
      query: () => ({
        url: "/admin/clinic-categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProcedureMutation,
  useUpdateProcedureMutation,
  useDeleteProcedureMutation,
  useGetProcedureByIdQuery,
  useGetProceduresQuery,
  useGetClinicCategoriesQuery,
} = AdminProcedureApi;
