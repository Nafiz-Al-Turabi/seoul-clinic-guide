import AddSocials from "@/components/Dashboard/AddSocials/AddSocials";
import AddTestimonial from "@/components/Dashboard/AddTestimonial/AddTestimonial";
import Testimonial from "@/components/Dashboard/Testimonial/Testimonial";
import React from "react";

export default function Others() {
  return (
    <div className="grid xl:grid-cols-12 gap-4">
      <div className="xl:col-span-4">
        <AddSocials />
      </div>
      <div className="xl:col-span-8">
        <AddTestimonial />
      </div>
      <div className="xl:col-span-12">
        <Testimonial />
      </div>
    </div>
  );
}
