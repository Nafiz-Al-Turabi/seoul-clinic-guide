import React from "react";
import DetailsOfBlog from "../../../../components/BlogDetails/DetailsOfBlog";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return (
    <div>
      <DetailsOfBlog slug={slug} />
      <NewsLetter />
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default BlogDetails;
