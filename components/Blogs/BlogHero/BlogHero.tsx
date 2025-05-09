import React from "react";
import blogHeroImage from "@/public/assets/images/blogHero.png";
const BlogHero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${blogHeroImage.src})` }}
      className="relative w-full bg-position-center bg-cover bg-center bg-no-repeat h-[30vh] sm:h-[40vh] lg:h-[70.7vh]"
    >
      <div className="absolute inset-0 bg-gradient-to-l to-black/10 from-transparent z-0"></div>
      <div className="container mx-auto px-4 2xl:px-0 flex flex-col justify-center h-full relative z-10">
        <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl ">
          Blog page
        </h1>
        <p className="text-lg sm:text-2xl font-medium text-white  mt-4">
        Read about the top rated blogs written by the exparts
        </p>
      </div>
    </div>
  );
};

export default BlogHero;
