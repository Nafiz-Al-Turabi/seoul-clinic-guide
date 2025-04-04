import React from "react";
import DetailsOfBlog from "../../../../components/BlogDetails/DetailsOfBlog";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";

const BlogDetails = () => {
  return (
    <div>
      <DetailsOfBlog />
      <NewsLetter />
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default BlogDetails;
