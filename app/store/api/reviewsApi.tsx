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
      invalidatesTags: ["Reviews"],
    }),

    // get reviews
    getAdminReviews: builder.query({
      query: () => ({
        url: "/admin/clinic-reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    // get review details
    getReviewDetails: builder.query({
      query: (id) => ({
        url: `/admin/clinic-reviews/${id}`,
        method: "GET",
      }),
    }),

    
  }),
});

export const { useCreateReviewMutation, useGetAdminReviewsQuery, useGetReviewDetailsQuery } = reviewsApi;
