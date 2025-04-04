import React from "react";
import DetailsOfBlog from "../../../../components/BlogDetails/DetailsOfBlog";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";

const BlogDetails = () => {
  return (
    <div>
      <DetailsOfBlog />
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default BlogDetails;
