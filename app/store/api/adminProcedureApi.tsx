import { baseApi } from "./baseApi";

export const AdminProcedureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProcedure: builder.mutation({
      query: (data) => ({
        url: "/admin/procedures",
        method: "POST",
        body: data,
      }),
    }),

    updateProcedure: builder.mutation({
      query: (data) => ({
        url: "/admin/procedures",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProcedure: builder.mutation({
      query: (id) => ({
        url: `/admin/procedures/${id}`,
        method: "DELETE",
      }),
    }),
    getProcedureById: builder.query({
      query: (id) => ({
        url: `/admin/procedures/${id}`,
        method: "GET",
      }),
    }),

    getProcedures: builder.query({
      query: ({ page, limit, sortBy}) => ({
        url: "/admin/procedures",
        method: "GET",
        params: { page, limit, sortBy },
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
} = AdminProcedureApi;
