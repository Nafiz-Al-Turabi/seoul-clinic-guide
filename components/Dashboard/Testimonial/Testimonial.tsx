"use client";
import { useDeleteTestimonialMutation, useGetTestimonialsQuery } from "@/app/store/api/othersApi";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

const Testimonial = () => {
  const { data, isLoading } = useGetTestimonialsQuery(null);
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  console.log(data?.data);
  const testimonialsData = data?.data;

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmed) return;
    const res = await deleteTestimonial(id).unwrap();
    if (res.success) {
      toast.success("Testimonial deleted successfully");
    } else {
      toast.error("Testimonial deletion failed");
    }
  };

  const columns: TableColumn[] = [
    { key: "title", label: "Title", type: "text" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "name", label: "Name", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "message", label: "Message", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];
  const tableActions = (testimonial: any) => (
    <Button onClick={() => handleDelete(testimonial.id)} size="sm" className="bg-red-500 text-white cursor-pointer hover:bg-red-600">Delete</Button>
  );

  const testimonials = testimonialsData?.map((testimonial: any) => ({
    ...testimonial,
    created_at: new Date(testimonial.created_at).toLocaleString(),
    message: testimonial.message.slice(0, 60) + "...",
  }));

  

  return (
    <div>
      <CustomTable columns={columns} data={testimonials} actions={tableActions} />
    </div>
  );
};

export default Testimonial;
