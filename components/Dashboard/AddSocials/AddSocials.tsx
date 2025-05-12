"use client";

import {
  useAddAndUpdateSocialsMutation,
  useGetAdminSocialsQuery,
} from "@/app/store/api/socialApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddSocials() {
  const [addAndUpdateSocials, { isLoading }] = useAddAndUpdateSocialsMutation();
  const { data: socials } = useGetAdminSocialsQuery(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
  });

  useEffect(() => {
    if (socials?.data) {
      reset({
        facebook: socials.data.facebook || "",
        twitter: socials.data.twitter || "",
        instagram: socials.data.instagram || "",
        youtube: socials.data.youtube || "",
      });
    }
  }, [socials, reset]);

  const onSubmit = async (data: any) => {
    try {
      const res = await addAndUpdateSocials(data);
      if (res.data) {
        toast.success("Social Links Updated Successfully");
      } else if (res.error) {
        toast.info("Fill all the required fields");
      }
    } catch (error: any) {
      console.log(error?.data?.message.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <h5 className="text-base sm:text-[1.5rem] font-bold">Add Social Links</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[16.5px]"
      >
        {(["facebook", "twitter", "instagram", "youtube"] as const).map(
          (platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium capitalize text-gray-700 mb-1">
                {platform} URL
              </label>
              <input
                type="url"
                {...register(platform)}
                placeholder={`https://${platform}.com/your-profile`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {errors[platform] && (
                <p className="text-sm text-red-500 mt-1">
                  {String(errors[platform]?.message)}
                </p>
              )}
            </div>
          )
        )}

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="w-fit px-6 py-2 primary-bg text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save Socials"}
          </button>
        </div>
      </form>
    </div>
  );
}
