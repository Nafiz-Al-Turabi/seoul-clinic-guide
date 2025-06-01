import { baseApi } from "./baseApi";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create review
    createReview: builder.mutation({
      query: (formData) => ({
        url: "/clinic-reviews",
        method: "POST",
        body: formData,
      }),
    }),

    // get reviews
    getReviews: builder.query({
      query: () => ({
        url: "/admin/clinic-reviews",
        method: "GET",
      }),
    }),

    
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewsApi;
