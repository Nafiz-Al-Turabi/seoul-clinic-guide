import exp from "constants";
import { baseApi } from "./baseApi";
import { get } from "http";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSearchEngagement: builder.query({
      query: () => ({
        url: "/admin/dashboard/search-engagement",
        method: "GET",
      }),
      providesTags: ["SearchEngagement"],
    }),

    getDashboardUserEngagement: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["SearchEngagement"],
    }),
  }),
});

export const {
  useGetDashboardSearchEngagementQuery,
  useGetDashboardUserEngagementQuery,
} = dashboardApi;
