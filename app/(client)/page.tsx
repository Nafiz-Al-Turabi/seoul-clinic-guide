import React from "react";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import PopularCategories from "@/components/Home/PopularCategories/PopularCategories";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import Procedures from "@/components/Home/Procedures/Procedures";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import RecentBlogs from "@/components/ui/RecentBlogs/RecentBlogs";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
export default function HomePage() {
  return (
    <div className="">
      <div>
        <HeroSection />
      </div>
      <div className="my-28">
        <PopularCategories />
      </div>
      <div className="">
        <TopClinics />
      </div>
      <div className="my-28">
        <Procedures />
      </div>
      <div className="my-28">
        <NewsLetter />
      </div>
      <div className="my-28">
        <RecentBlogs />
      </div>

      <div className="my-28">
        <TestimonialSlider />
      </div>
    </div>
  );
}
