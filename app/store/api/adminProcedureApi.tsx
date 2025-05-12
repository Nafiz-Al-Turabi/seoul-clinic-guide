import { baseApi } from "./baseApi";

export const AdminProcedureApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProcedures: builder.query({
      query: ({ page, limit, sortBy, search }) => ({
        url: "/admin/procedures",
        method: "GET",
        params: { page, limit, sortBy, search },
      }),
      providesTags: ["Procedures"],
    }),

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
        return {
          url: `/admin/procedures/${id}`,
          method: "GET",
        };
      },
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
