"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setProfileImage("/default-avatar.jpg");
  };

  return (
    <div className="px-4 py-10 max-w-[86rem] mx-auto 2xl:mb-44">
      <p className="text-[2rem] font-semibold primary-text text-center sm:text-left">Account</p>

      <div className="flex flex-col items-center  sm:flex-row sm:items-center my-6">
        <div className="relative mb-4 sm:mb-0 sm:mr-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={profileImage}
              alt="Profile"
              width={90}
              height={90}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="bg-white text-main px-4 py-2 rounded-full border border-[#E9E9E9] cursor-pointer hover:bg-gray-50 transition">
            Upload a new photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          <button
            type="button"
            onClick={handleDeletePhoto}
            className="bg-gray-100 text-main px-4 py-2 rounded-full  hover:bg-gray-200 transition cursor-pointer"
          >
            Delete photo
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.name.message }
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-gray-700 mb-1">
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              id="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.contactNumber.message }
              </p>
            )}
          </div>

          <div>
            <label htmlFor="region" className="block text-gray-700 mb-1">
              Region<span className="text-red-500">*</span>
            </label>
            <input
              id="region"
              type="text"
              placeholder="Enter your region"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.region ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("region", { required: "Region is required" })}
            />
            {errors.region && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.region.message }
              </p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 mb-1">
              Location<span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter your location"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.location.message }
              </p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="bio" className="block text-gray-700 mb-1">
            Bio<span className="text-red-500">*</span>
          </label>
          <textarea
            id="bio"
            rows={6}
            placeholder="Enter your bio"
            className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
              errors.bio ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            {...register("bio", { required: "Bio is required" })}
          />
          {errors.bio && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.bio.message }
            </p>
          )}
        </div>

        <p className="text-[2rem] font-semibold primary-text mb-6">
          Change Password
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="oldPassword" className="block text-gray-700 mb-1">
              Old Password
            </label>
            <input
              id="oldPassword"
              type="password"
              placeholder="Enter your old password"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.oldPassword.message }
              </p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              className={`w-full p-3 border focus:outline-none focus:border-[#68B0D4] ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.newPassword.message }
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#68B0D4] text-white px-6 py-2 rounded-full hover:bg-[#5093C2] transition cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="bg-white text-main px-6 py-2 rounded-full border border-[#E9E9E9] hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
