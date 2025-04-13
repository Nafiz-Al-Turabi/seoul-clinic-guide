import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => `admin/user?page=${page}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "admin/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "/auth/update",
        method: "PATCH",
        body: formData,
        formData: true,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
