"use client";

import React from "react";
import { useForm } from "react-hook-form";
import CustomImage from "@/components/reusable/CustomImage";
import loginImage from "@/public/assets/images/login.svg";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
    // Handle login here
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex gap-5lg:gap-10 xl:gap-28 items-center py-10 md:py-0">
          <div className="hidden md:block 2xl:w-[45%]">
            <CustomImage
              src={loginImage}
              width={713}
              height={914}
              alt="login-image"
            />
          </div>

          <div className=" w-full lg:w-[40%] 2xl:w-[40%] px-5 xl:px-0">
            <div className="mb-[38px]">
              <h2 className="primary-text">Welcome Back!</h2>
              <p className="typography sm:w-[40ch]  xl:w-[38ch]">
                Don’t have an account?{" "}
                <Link href="/auth/register" className="secondary-text border-b">
                  Create New account now.
                </Link>{" "}
                it’s <span className="secondary-text">FREE!</span> Takes less
                than a minute
              </p>
            </div>

            {/* React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-7 mb-7">
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full text-main text-lg placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-[-20px]">
                    {errors.email.message}
                  </span>
                )}

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full text-main text-lg placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-[-20px]">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#68B0D4] text-white text-lg p-2 lg:p-3 w-full rounded-full hover:bg-[#305162] cursor-pointer duration-300"
              >
                Login Now
              </button>
            </form>

            <button className="flex items-center justify-center gap-2 w-full text-lg p-2 lg:p-3 text-center border border-[#151623] rounded-full mt-7 cursor-pointer active:bg-[#EEF3F8] active:border-[#EEF3F8] duration-300">
              <FcGoogle className="text-sm lg:text-2xl" />
              Login With Google
            </button>

            <p className="mt-5 text-center text-[#93949A]">
              Forget Password?
              <Link
                href={"/reset-password"}
                className="text-main border-b font-medium "
              >
                {" "}
                Click Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
