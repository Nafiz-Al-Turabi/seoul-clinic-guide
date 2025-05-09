import Clinic from "@/components/Clinics/Clinic";
import ClinicCard from "@/components/ui/Cards/ClinicCard";
import RecentBlogs from "@/components/ui/RecentBlogs/RecentBlogs";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import React from "react";

const Clinics = () => {
  return (
    <div className="container mx-auto px-4 2xl:px-0">
      
      <Clinic />
      <RecentBlogs />
      <TestimonialSlider />
    </div>
  );
};

export default Clinics;
