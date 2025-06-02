"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Star, X, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCreateReviewMutation } from "@/app/store/api/reviewsApi";
import { useGetClientProceduresQuery } from "@/app/store/api/clinicApi";
import { toast } from "sonner";

interface ImageMeta {
  tags: string[];
  caption: string;
  file: File;
  preview: string;
}

interface ReviewFormData {
  procedure: string;
  rating: number;
  headline: string;
  review: string;
  clinic_id: string;
  referer: string;
  images_meta: ImageMeta[];
  images: File[];
}

const TAG_OPTIONS = [
  { value: "Before", label: "Before" },
  { value: "After", label: "After" },
  { value: "Clinic", label: "Clinic" },
  { value: "Reference", label: "Reference" },
  { value: "Other", label: "Other" },
];

const ReviewForm = () => {
  const searchParams = useSearchParams();
  const clinicName = searchParams.get("clinicName");
  console.log(clinicName);
  const clinicId = searchParams.get("clinicId");
  console.log(clinicId);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageMeta[]>([]);

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { data: procedures } = useGetClientProceduresQuery(clinicId);
  const proceduresData = procedures?.data?.procedures;

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      procedure: "",
      rating: 1,
      headline: "",
      review: "",
      clinic_id: clinicId || "",
      referer: "",
      images_meta: [],
      images: [],
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    const formData = new FormData();

    const reviewData = {
      ...data,
      images_meta: selectedImages.map((img) => ({
        tags: img.tags,
        caption: img.caption,
      })),
    };

    delete reviewData.images;

    formData.append("data", JSON.stringify(reviewData));

    images.forEach((file, index) => {
      formData.append("images", file);
    });

    const response = await createReview(formData);
    if (response?.data?.success) {
      toast.success("Review submitted successfully");
      reset();
      setSelectedImages([]);
      setImages([]);
    } else {
      toast.info("Please Login and try again");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: ImageMeta = {
            tags: [],
            caption: "",
            file,
            preview: reader.result as string,
          };
          setSelectedImages((prev) => [...prev, newImage]);
          setImages((prev) => [...prev, file]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateImageMeta = (
    index: number,
    field: keyof ImageMeta,
    value: any
  ) => {
    setSelectedImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h4 className="text-2xl font-semibold text-gray-800 mb-6">
          Share Your Experience with {clinicName}
        </h4>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
        >
          {/* Procedure Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Procedure
            </label>
            <select
              {...register("procedure", { required: "Procedure is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72b5d7]"
            >
              <option value="">Select a procedure</option>
              {proceduresData?.map((procedure: any) => (
                <option key={procedure?.id} value={procedure?.id}>
                  {procedure?.name}
                </option>
              ))}
            </select>
            {errors.procedure && (
              <p className="mt-1 text-sm text-red-600">
                {errors.procedure.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= field.value
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Headline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Headline
            </label>
            <input
              type="text"
              {...register("headline", { required: "Headline is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72b5d7]"
              placeholder="Write a headline for your review"
            />
            {errors.headline && (
              <p className="mt-1 text-sm text-red-600">
                {errors.headline.message}
              </p>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              {...register("review", { required: "Review is required" })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72b5d7]"
              placeholder="Share your experience"
            />
            {errors.review && (
              <p className="mt-1 text-sm text-red-600">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Referer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How did you find us?
            </label>
            <input
              type="text"
              {...register("referer", { required: "Referer is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72b5d7]"
              placeholder="Enter your referer"
            />
            {errors.referer && (
              <p className="mt-1 text-sm text-red-600">
                {errors.referer.message}
              </p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg p-2 bg-gray-50"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="object-cover rounded-lg w-full mb-4"
                      style={{ maxHeight: 120, objectFit: "cover" }}
                    />

                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="mr-2 text-sm">Tags:</span>
                      {TAG_OPTIONS.map((option) => {
                        const isSelected = image.tags.includes(option.value);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              let newTags;
                              if (isSelected) {
                                newTags = image.tags.filter(
                                  (tag) => tag !== option.value
                                );
                              } else {
                                newTags = [...image.tags, option.value];
                              }
                              handleUpdateImageMeta(index, "tags", newTags);
                            }}
                            className={`px-3 py-1 rounded-full border text-sm transition
                              ${
                                isSelected
                                  ? "bg-[#72b5d7] text-white border-[#72b5d7]"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                              }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      value={image.caption}
                      onChange={(e) =>
                        handleUpdateImageMeta(index, "caption", e.target.value)
                      }
                      placeholder="optional caption e.g. X weeks after procedure"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72b5d7]"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Image Upload Button */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#72b5d7] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Plus className="w-8 h-8 mb-2 text-[#72b5d7]" />
                  <p className="mb-2 text-sm text-[#72b5d7]">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or JPEG (MAX. 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#72b5d7] text-white py-2 px-4 rounded-md hover:bg-[#5b9dcf] focus:outline-none focus:ring-2 focus:ring-[#72b5d7] focus:ring-offset-2 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
