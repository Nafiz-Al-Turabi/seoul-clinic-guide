import { baseApi } from "./baseApi";

export const OthersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getclientsTestimonials: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["Testimonials"],
    }),
    createContactMail: builder.mutation({
      query: (formData) => ({
        url: "/contact-mail",
        method: "POST",
        body: formData,
      }),
    }),

    createTestimonial: builder.mutation({
      query: (formData) => ({
        url: "/admin/reviews",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Testimonials"],
    }),

    getTestimonials: builder.query({
      query: () => ({
        url: "/admin/reviews",
        method: "GET",
      }),
      providesTags: ["Testimonials"],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/admin/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"],
    }),
  }),
});

export const {
  useCreateContactMailMutation,
  useCreateTestimonialMutation,
  useGetTestimonialsQuery,
  useDeleteTestimonialMutation,
  useGetclientsTestimonialsQuery,
} = OthersApi;
