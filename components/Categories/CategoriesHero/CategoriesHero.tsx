import React from "react";
import categoriesHeroImage from "@/public/assets/images/categories.png";

const CategoriesHero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${categoriesHeroImage.src})` }}
      className="relative w-full bg-position-center bg-cover bg-center bg-no-repeat h-[30vh] sm:h-[40vh] lg:h-[70.7vh]"
    >
      <div className="absolute inset-0 bg-gradient-to-l to-black/50 from-transparent z-0"></div>
      <div className="container mx-auto px-4 2xl:px-0 flex flex-col justify-center h-full relative z-10">
        <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl ">
          Categories
        </h1>
        <p className="text-lg sm:text-2xl font-medium text-white mt-4">
          Look at the clinics you are looking for
        </p>
      </div>
    </div>
  );
};

export default CategoriesHero;
