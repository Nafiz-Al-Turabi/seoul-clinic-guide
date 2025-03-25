// "use client";
import React from "react";
import CustomImage from "@/components/reusable/CustomImage";
import loginImage from "@/public/assets/images/login.svg";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex gap-28 items-center">
          <div className="2xl:w-[45%] blur-3xl">
            <CustomImage
              src={loginImage}
              width={713}
              height={914}
              alt="login-image"
            />
          </div>
          <div className="2xl:w-[40%]">
            <div className="mb-[38px]">
              <h2 className="primary-text">Welcome Back!</h2>
              <p className="typography w-[38ch]">
                Don’t have an account?{" "}
                <Link href="/signup" className="secondary-text border-b">
                  Create New account now.
                </Link>{" "}
                it’s <span className="secondary-text">FREE!</span> Takes less
                then a minute
              </p>
            </div>
            <form action="">
              <div className="flex flex-col gap-7 mb-7">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="text-main text-lg placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="text-main text-lg placeholder:text-lg placeholder:text-[#C9C9C9] p-3 border-b border-[#EEF3F8] focus:outline-none focus:border-b focus:border-[#434343] focus:bg-[#F6F6F6] duration-300"
                />
              </div>
              <button className="bg-[#68B0D4] text-white text-lg font-semibold py-3 w-full rounded-full hover:bg-[#305162] cursor-pointer duration-300">
                Login Now
              </button>
            </form>
            <button className="flex items-center justify-center gap-2 w-full text-lg p-3 text-center border border-[#151623] rounded-full mt-7 cursor-pointer active:bg-[#EEF3F8] active:border-[#EEF3F8] duration-300">
              <FcGoogle className="text-2xl" />
              Login With Google
            </button>
            <p className="mt-5 text-center text-[#93949A]">
              Forget Password?
              <Link
                href={"/reset-password"}
                className="text-main border-b font-bold "
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
