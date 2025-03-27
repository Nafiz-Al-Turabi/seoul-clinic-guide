import React from "react";
import ProceduresCategories from "@/components/Procedures/ProceduresCategories";
import RecentBlogs from "@/components/ui/RecentBlogs/RecentBlogs";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
const Procedures = () => {
  return (
    <div>
      <div>
        <ProceduresCategories />
      </div>
      <div>
        <RecentBlogs />
      </div>
      <div>
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default Procedures;
