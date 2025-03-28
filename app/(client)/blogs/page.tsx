import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import React from "react";

const page = () => {
  return (
    <div>
      <NewsLetter /> 
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default page;
