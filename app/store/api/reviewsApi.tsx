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
      query: ({page = 1, limit}) => ({
        url: "/admin/clinic-reviews",
        method: "GET",
        params: {
          page,
          limit,
        },
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

    // approve review
    approveReview: builder.mutation({
      query: (id) => ({
        url: `/admin/clinic-reviews/${id}`,
        method: "PATCH",
        body: {
          approved: true,
        },
      }),
      invalidatesTags: ["Reviews"],
    }),

    // delete review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/admin/clinic-reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAdminReviewsQuery,
  useGetReviewDetailsQuery,
  useApproveReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
