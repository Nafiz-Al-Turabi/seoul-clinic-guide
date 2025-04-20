import { baseApi } from "./baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: "/admin/subscriptions",
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
    }),

    downloadSubscribers: builder.query({
      query: () => ({
        url: "/admin/subscriptions/export",
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
    }),
  }),
});

export const { useGetSubscriptionsQuery, useLazyDownloadSubscribersQuery } = subscriptionApi;
