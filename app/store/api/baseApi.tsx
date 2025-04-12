import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl = "http://192.168.5.8:4000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("token");
      if (token) {  
      headers.set(
        "authorization",
        `Bearer ${token}`
      );
    }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Users"],
});

export const { useQuery, useMutation } = baseApi as any;