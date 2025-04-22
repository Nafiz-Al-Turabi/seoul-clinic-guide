import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl = "http://192.168.5.8:4000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Users","Blogs","Procedures", "BlogCategories", "Clinics", "Doctors", "Patients","Subscriptions,","SearchEngagement"],
});

export const { useQuery, useMutation } = baseApi as any;