import { url } from "inspector";
import { baseApi } from "./baseApi";
type Authorization = {
  token: string;
};
type ApiResponse = {
  authorization?: Authorization;
  [key: string]: any;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup endpoint
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login endpoint
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse) => {
        if (response.authorization && response.authorization.token) {
          localStorage.setItem("token", response.authorization.token);
        } else {
          console.error("Authorization token is missing in the response.");
        }
        return response;
      },
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation,useGetMeQuery } = authApi;
