"use client";

import CustomImage from "@/components/reusable/CustomImage";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import registerImage from "@/public/assets/images/register.svg";

const Register = () => {
  type LoginFormInputs = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Register data:", data);
    // Handle registration here
  };

  const password = watch("password");

  return (
    <div>
      <div className="max-w-[86rem] mx-auto">
        <div className="flex gap-5 lg:gap-5 xl:gap-10 2xl:gap-28 items-center py-10 md:py-0">
          <div className="hidden lg:block 2xl:w-[45%]">
            <CustomImage
              src={registerImage}
              width={713}
              height={500}
              alt="register-image"
            />
          </div>

          <div className="w-full lg:w-[40%] 2xl:w-[40%] px-5 xl:px-0">
            <div className="mb-[38px]">
              <h1 className="primary-text ">Welcome To</h1>
              <h1 className="secondary-text">Seoul Clinic Guide</h1>
              <p className="typography xl:w-[45ch] 2xl:w-[55ch] mt-2">
                Seoul Clinic Guide helps you find top-rated clinics, doctors,
                and medical services in Seoul with detailed profiles, patient
                reviews, and easy appointment booking.
              </p>
            </div>
            <p className="text-main text-lg font-medium">Create your account</p>
            {/* React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-7 mb-7">
                {/* Email */}
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="text-main lg:text-lg lg:placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-[-20px]">
                    {errors.email.message}
                  </span>
                )}

                {/* Password */}
                <input
                  type="password"
                  placeholder="Create your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="text-main lg:text-lg lg:placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-[-20px]">
                    {errors.password.message}
                  </span>
                )}

                {/* Confirm Password */}
                <input
                  type="password"
                  placeholder="Re-Enter your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="text-main lg:text-lg lg:placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-[-20px]">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#68B0D4] text-white text-sm lg:text-lg p-2 lg:p-3 w-full rounded-full hover:bg-[#305162] cursor-pointer duration-300"
              >
                Register Now
              </button>
            </form>

            <button className="text-sm lg:text-lg flex items-center justify-center gap-2 w-full p-2 lg:p-3 text-center border border-[#151623] rounded-full mt-7 cursor-pointer active:bg-[#EEF3F8] active:border-[#EEF3F8] duration-300">
              <FcGoogle className="text-sm lg:text-2xl" />
              Register With Google
            </button>

            <p className="text-sm lg:text-base mt-5 text-center text-[#93949A]">
              Already have an account?
              <Link
                href={"/auth/login"}
                className="secondary-text border-b font-medium "
              >
                {" "}
                Login Now.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
