"use client";

import Image from "next/image";
import React from "react";
import newsLetterImage from "@/public/assets/images/Newsletter.png";

const NewsLetter = () => {
  return (
    <section
      className="relative w-full bg-black bg-position-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${newsLetterImage.src})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 lg:bg-black/60  z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-white mb-4">
            Medical Journey <br /> Starts Here
          </h1>
          <p className="text-white text-xl mb-6 lg:w-[35ch] mx-auto lg:mx-0">
            Sign up for and we'll notify you when we launch new features
          </p>
          <div className="sm:flex items-center justify-center lg:justify-start">
            <div className="w-full sm:w-sm lg:w-md relative mt-4">
              <input
                type="text"
                placeholder="Your Email Address"
                className="w-full lg:w-md px-6 py-2.5 bg-white rounded-full border border-[#E9E9E9] focus:outline-none focus:border-[#68B0D4]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 primary-bg rounded-full px-6 py-1.5 text-white hover:text-white duration-300 cursor-pointer">
                Subscribe Now
              </button>
            </div>
          </div>
          <p className="text-sm text-white text-center lg:text-left opacity-70 mt-4 lg:w-[55ch] mx-auto lg:mx-0">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
