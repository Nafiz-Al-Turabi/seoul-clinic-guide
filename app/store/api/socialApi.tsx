import { baseApi } from "./baseApi";

export const socialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminSocials: build.query({
      query: () => ({
        url: "/admin/social-links",
        method: "GET",
      }),
      providesTags: ["socials"],
    }),

    getSocials: build.query({
      query: () => ({
        url: "/social-links",
        method: "GET",
      }),
      providesTags: ["socials"],
    }),

    addAndUpdateSocials: build.mutation({
      query: (data) => ({
        url: "/admin/social-links",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["socials"],
    }),

  }),
});

export const { useGetAdminSocialsQuery, useAddAndUpdateSocialsMutation, useGetSocialsQuery } =
  socialApi;
