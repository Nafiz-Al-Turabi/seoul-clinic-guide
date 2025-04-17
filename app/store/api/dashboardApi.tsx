import exp from "constants";
import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getDashboardSearchEngagement: builder.query({
            query: () => ({
                url: "/admin/dashboard/search-engagement",
                method: "GET",
            }),
        }),
    })
})

export const { useGetDashboardSearchEngagementQuery } = dashboardApi;