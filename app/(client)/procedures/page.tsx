import React from "react";
import ProceduresCategories from "@/components/Procedures/ProceduresCategories";
import RecentBlogs from "@/components/ui/RecentBlogs/RecentBlogs";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
const Procedures = () => {
  return (
    <div>
      <div>
        <ProceduresCategories />
      </div>

      <div>
        <TopClinics />
      </div>
      <div>
        <TestimonialSlider />
      </div>
      <div>
        <RecentBlogs />
      </div>
    </div>
  );
};

export default Procedures;
