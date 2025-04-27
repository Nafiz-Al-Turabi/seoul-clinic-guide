import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import React, { Suspense } from "react";
import BlogHero from "@/components/Blogs/BlogHero/BlogHero";
import BlogCategories from "@/components/Blogs/BlogCategories/BlogCategories";
const Blogs = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<p>Loading search results...</p>}>
        <BlogHero />
        <BlogCategories />
        <NewsLetter />
        <TopClinics />
        <TestimonialSlider />
      </Suspense>
    </div>
  );
};

export default Blogs;
