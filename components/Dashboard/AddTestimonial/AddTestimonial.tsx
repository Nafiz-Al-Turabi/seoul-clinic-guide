"use client";

import { useCreateTestimonialMutation } from "@/app/store/api/othersApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TestimonialFormData = {
  title: string;
  image: FileList;
  name: string;
  message: string;
  location: string;
};

export default function AddTestimonial() {
  const [createTestimonial, { isLoading }] = useCreateTestimonialMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>();

  const onSubmit = async (data: TestimonialFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("message", data.message);
    formData.append("location", data.location);
    
    try {
      const res = await createTestimonial(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
    
  };


  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h5 className="text-2xl font-bold mb-">Add Testimonial</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1  grid grid-cols-3 gap-2"
      >
        {/* Title */}
        <div  className="col-span-3">
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-2 w-full border rounded p-2"
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>
        {/* Author Image */}
        <div>
          <label className="block font-medium text-gray-700">
            Author Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="mt-2 w-full border rounded p-2"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">Image is required</span>
          )}
        </div>
         

        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-2 w-full border rounded p-2"
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>
        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="mt-2 w-full border rounded p-2"
            placeholder="New York, USA"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">Location is required</span>
          )}
        </div>

        {/* Message */}
        <div className="col-span-3">
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            {...register("message", { required: true })}
            className="mt-2 w-full border rounded p-2"
            placeholder="Write the testimonial message..."
            rows={4}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">Message is required</span>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="primary-bg text-white py-2 px-4 rounded"
          >
            Submit Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
