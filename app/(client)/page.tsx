import React from "react";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import PopularCategories from "@/components/Home/PopularCategories/PopularCategories";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
export default function HomePage() {
  return (
    <div className="">
      <div>
        <HeroSection />
      </div>
      <div className="my-28">
        <PopularCategories />
      </div>
      <div className="my-28 ">
        <TopClinics />
      </div>
    </div>
  );
}
