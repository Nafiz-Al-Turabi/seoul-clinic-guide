import CustomImage from "@/components/reusable/CustomImage";
import React from "react";
import heroImage from "@/public/assets/images/hero.png";
import seoulImage from "@/public/assets/images/seoul.svg";

const HeroSection = () => {
  return (
    <div className="bg-[#F9FDFD] px-4 2xl:px-0 relative">
      <div className="container mx-auto flex flex-col-reverse sm:flex-row items-center gap-5 ">
        <div className="capitalize primary-text">
          <h1>FIND THE BEST SPECIALIZED </h1>
          <h1 className="secondary-text">CLINICS IN KOREA</h1>
          <h1>FOR EXPERT CARE</h1>
          <div className="w-full sm:w-sm lg:w-md relative mt-4">
            <input
              type="text"
              placeholder="Search your desired clinic..."
              className="w-full lg:w-md px-6 py-2.5 rounded-full border border-[#E9E9E9] focus:outline-none focus:border-[#68B0D4]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 primary-bg rounded-full px-6 py-1.5 text-white hover:text-white duration-300 cursor-pointer">
              Search
            </button>
          </div>
        </div>
        <div>
          <CustomImage src={heroImage.src} alt="hero-image" />
        </div>
        <div className="hidden xl:flex items-center justify-center xl:w-28 xl:h-28 2xl:w-36 2xl:h-36 absolute xl:right-10 2xl:right-32 -bottom-14  p-4 rounded-full bg-[#D9D9D966] backdrop-blur-sm ">
          <CustomImage src={seoulImage.src} alt="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
