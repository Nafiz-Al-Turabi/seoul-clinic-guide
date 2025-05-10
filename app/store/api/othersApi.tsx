import { baseApi } from "./baseApi";

export const OthersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),


    
  }),
});

export const { useCreateContactMailMutation, useCreateTestimonialMutation } = OthersApi;
