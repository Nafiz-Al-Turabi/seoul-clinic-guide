import Clinic from "@/components/Clinics/Clinic";
import ClinicCard from "@/components/ui/Cards/ClinicCard";
import RecentBlogs from "@/components/ui/RecentBlogs/RecentBlogs";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import React from "react";

const Clinics = () => {
  return (
    <div className="max-w-[86.5rem] mx-auto px-4 2xl:px-0">
      <div className="py-10">
        <h1 className="font-bold primary-text uppercase">Seoul Clinics</h1>
      </div>
      <Clinic />
      <RecentBlogs />
      <TestimonialSlider />
    </div>
  );
};

export default Clinics;
