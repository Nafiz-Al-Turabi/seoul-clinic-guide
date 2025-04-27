"use client";

import {
  useCreateProcedureMutation,
  useGetClinicCategoriesQuery,
  useGetProcedureByIdQuery,
  useUpdateProcedureMutation,
} from "@/app/store/api/adminProcedureApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaNoteSticky } from "react-icons/fa6";
import { FiCamera, FiFileText, FiTag } from "react-icons/fi";
import { toast } from "sonner";

type FormValues = {
  image: FileList;
  name: string;
  description: string;
  clinicId: string;
  existingImage?: string;
};

const AddProcedure = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [createProcedure, { isLoading }] = useCreateProcedureMutation();
  const [updateProcedure, { isLoading: isUpdating }] =
    useUpdateProcedureMutation();
  const { data: clinicCategories, refetch } = useGetClinicCategoriesQuery(null);
  const clinicCategoriesData = clinicCategories?.data;

  const { data: singleProcedure, isFetching } = useGetProcedureByIdQuery(id);
  console.log(singleProcedure, 39);

  const [preview, setPreview] = useState<string | null>(null);
  const [hasExistingImage, setHasExistingImage] = useState<boolean>(false);
  const image = watch("image");
  const existingImage = watch("existingImage");

  useEffect(() => {
    if (singleProcedure?.success) {
      reset({
        name: singleProcedure?.data?.name || "",
        description: singleProcedure?.data?.description || "",
        clinicId: String(singleProcedure?.data?.clinic_category_id || ""),
        existingImage: singleProcedure?.data?.image_url || "",
      });

      if (singleProcedure?.data?.image_url) {
        setPreview(singleProcedure?.data?.image_url);
        setHasExistingImage(true);
      }
    }
  }, [id, singleProcedure, reset]);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setHasExistingImage(false);
    } else if (existingImage && hasExistingImage) {
      setPreview(existingImage);
    } else if (!hasExistingImage) {
      setPreview(null);
    }
  }, [image, existingImage, hasExistingImage]);

  const handleRemoveImage = () => {
    setValue("image", null);
    setValue("existingImage", "");
    setPreview(null);
    setHasExistingImage(false);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    } else if (id) {
      formData.append("remove_image", "true");
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("clinic_category_id", data.clinicId);

    try {
      let response;
      if (id) {
        response = await updateProcedure({ id, formData }).unwrap();
        toast.success("Procedure updated successfully");
        router.push("/dashboard/procedures");
        refetch();
      } else {
        if (!data.image || data.image.length === 0) {
          toast.error("Image is required for new procedures");
          return;
        }
        response = await createProcedure(formData).unwrap();
        toast.success("Procedure created successfully");
        reset();
        setPreview(null);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (id && isFetching) {
    return <div className="p-6 text-gray-700">Loading procedure data...</div>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-[#68B0D4] to-[#68B0D4]/90 p-4 xl:p-6 text-white rounded-t-xl">
        <h3 className="text-3xl font-bold">
          {id ? "Update Procedure" : "Add Procedure"}
        </h3>
        <p className="mt-2 opacity-90">
          {id
            ? "Update the details of this procedure"
            : "Enter the details to register a new healthcare facility"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white/80 backdrop-blur-xl rounded-xl p-4 xl:p-8 space-y-6 border border-white/30"
      >
        {/* Image Upload */}
        {!preview ? (
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#68B0D4] transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FiCamera className="text-[#68B0D4] text-2xl" />
              </div>
              <p className="text-gray-600 font-medium">Click to browse</p>
              <p className="text-sm text-gray-400 mt-1">
                Recommended size: 1200 × 600px
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="bg-blue-100 text-[#68B0D4] px-3 py-1 rounded text-sm">
                  Choose File
                </div>
                <p className="text-sm text-gray-400 truncate max-w-[200px]">
                  {image?.[0]?.name || "No file chosen"}
                </p>
              </div>
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              {...register("image", {
                required: !id ? "Image is required" : false,
              })}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-4">
            <img
              src={preview}
              alt="Preview"
              className="h-60 object-contain rounded-lg mb-4"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Remove Image
            </button>
          </div>
        )}
        {errors.image && !preview && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <FaNoteSticky /> Procedure Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Procedure Name"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#68B0D4]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <FiFileText /> Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            placeholder="Write procedure details..."
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#68B0D4]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Clinic Categories */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <FiTag /> Clinic Categories
          </label>
          <select
            {...register("clinicId", {
              required: "Please select at least one clinic category",
            })}
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#68B0D4] bg-white text-gray-800"
          >
            <option value="">Select Clinic Category</option>
            {clinicCategoriesData?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.clinicId && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.clinicId as any).message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#68B0D4] text-white px-6 py-2 rounded-md hover:bg-[#68B0D4]/90 transition-all shadow-sm cursor-pointer"
            disabled={isLoading || isUpdating}
          >
            {isLoading || isUpdating
              ? id
                ? "Updating..."
                : "Submitting..."
              : id
              ? "Update Procedure"
              : "Submit Procedure"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProcedure;
