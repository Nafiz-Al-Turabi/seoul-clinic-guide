import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import React from "react";
import BlogHero from "@/components/Blogs/BlogHero/BlogHero";

const Blogs = () => {
  return (
    <div>
      <BlogHero />
      <NewsLetter /> 
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default Blogs;
