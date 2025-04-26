"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import {
  Camera,
  Clock,
  MapPin,
  Phone,
  Link,
  Check,
  Clipboard,
  Award,
  FileText,
} from "lucide-react";
import {
  useCreateClinicMutation,
  useGetCategoriesQuery,
  useGetClinicByIdQuery,
  useGetAllProceduresQuery,
  useUpdateClinicMutation,
} from "@/app/store/api/clinicApi";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";

interface AddClinicProps {
  id: string;
}

export default function AddClinicForm({ id }: AddClinicProps) {
  const editorRef = useRef<any>(null);
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: procedureList } = useGetAllProceduresQuery(null);
  
  console.log( "procedureList", procedureList)
  const { data: categoryList } = useGetCategoriesQuery(null);
  const [createClinic, { isLoading, error }] = useCreateClinicMutation();
  const { data: clinic } = useGetClinicByIdQuery(id);
  const singleClinic = clinic?.data;
  const [updateClinic, { isLoading: updating }] = useUpdateClinicMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "operating_hours",
  });
  //it is using for updating clinic
  useEffect(() => {
    if (!clinic) return;

    reset({
      name: singleClinic?.name,
      clinic_category_id: String(singleClinic?.clinic_category_id),
      phone: singleClinic?.phone || "",
      website: singleClinic?.website || "",
      address: singleClinic?.address,
      subway_station: singleClinic?.subway_station || "",
      operating_hours: singleClinic?.operating_hours || [],
      is_top: singleClinic?.is_top,
      procedures: singleClinic?.procedures?.map((p: any) => String(p.id)) || [],
    });

    setDescription(singleClinic?.description || "");
    setBannerPreview(singleClinic?.banner_url || null);
  }, [singleClinic, reset]);

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const bannerWatch = watch("banner");

  useEffect(() => {
    if (bannerWatch && bannerWatch.length > 0) {
      const file = bannerWatch[0];
      const objectUrl = URL.createObjectURL(file);
      setBannerPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [bannerWatch]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    (data.clinic_category_id || []).forEach(
      (categoriesId: string, index: number) => {
        formData.append(`categories[${index}]`, categoriesId);
      }
    );
    formData.append("phone", data.phone || "");
    formData.append("website", data.website || "");
    formData.append("address", data.address);
    formData.append("subway_station", data.subway_station || "");
    (data.procedures || []).forEach((procedureId: string, index: number) => {
      formData.append(`procedures[${index}]`, procedureId);
    });

    (data.operating_hours || []).forEach((item: any, index: number) => {
      formData.append(`operating_hours[${index}][day]`, item.day || "");
      formData.append(
        `operating_hours[${index}][open_time]`,
        item.open_time || ""
      );
      formData.append(
        `operating_hours[${index}][close_time]`,
        item.close_time || ""
      );
    });

    formData.append("description", description || "");
    formData.append("is_top", data.is_top ? "true" : "false");

    const bannerFile = data.banner?.[0];
    if (bannerFile) {
      formData.append("banner", bannerFile);
    }

    try {
      let response;
      if (id) {
        response = await updateClinic({ id, formData }).unwrap();
      } else {
        response = await createClinic(formData).unwrap();
      }

      if (response.success) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const messages = error?.data?.message?.message;

      if (Array.isArray(messages)) {
        messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(
          typeof messages === "string"
            ? messages
            : "Something went wrong. Please try again."
        );
      }

      console.error("Submit error (raw):", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className=" bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#68B0D4] to-[#68B0D4]/90 p-6 text-white">
          <h3 className="text-3xl font-bold">
            {id ? "Update Clinic" : "Add New Clinic"}
          </h3>
          <p className="mt-2 opacity-90">
            Enter the details to register a new healthcare facility
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="p-4 xl:p-8"
        >
          {/* Banner Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 primary-text flex items-center">
              <Camera size={20} className="mr-2 text-[#68B0D4]" />
              Banner Image
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#68B0D4] transition-colors">
              {bannerPreview ? (
                <div className="relative">
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="mx-auto rounded-md max-h-64"
                  />
                  <button
                    type="button"
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-md transition-colors"
                    onClick={() => setBannerPreview(null)}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Camera size={24} className="text-[#68B0D4]" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Drag and drop an image here or click to browse
                  </p>
                  <p className="text-gray-400 text-sm">
                    Recommended size: 1200 x 600px
                  </p>
                </div>
              )}
              <input
                type="file"
                id="banner"
                accept="image/*"
                {...register("banner")}
                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-medium
                file:bg-blue-50 file:text-[#68B0D4] hover:file:bg-blue-100 cursor-pointer
                ${bannerPreview ? "hidden" : "mt-4"}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 primary-text flex items-center">
                <FileText size={20} className="mr-2 text-[#68B0D4]" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text- mb-1"
                  >
                    Clinic Name*
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", {
                        required: "Clinic name is required",
                      })}
                      id="name"
                      placeholder="Enter clinic name"
                      className="w-full px-4 py-2 pl-10 border rounded-lg outline-none"
                    />
                    <Award
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text- mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+-]+$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      id="phone"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 pl-10 border rounded-lg outline-none"
                    />
                    <Phone
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.phone.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text- mb-1"
                  >
                    Website
                  </label>
                  <div className="relative">
                    <input
                      {...register("website", {
                        pattern: {
                          value:
                            /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/,
                          message: "Please enter a valid URL",
                        },
                      })}
                      id="website"
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 pl-10 border rounded-lg outline-none"
                    />
                    <Link
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                  </div>
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.website.message)}
                    </p>
                  )}
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium mb-1">
                    Clinic Category*
                  </label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-2 border px-4 py-2 rounded-lg">
                    {categoryList?.data?.map((category: any) => (
                      <label
                        key={category.id}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          value={category.id}
                          {...register("clinic_category_id", {
                            validate: (value) =>
                              value?.length > 0 ||
                              "At least one category must be selected",
                          })}
                          className="h-6 w-6 rounded border-gray-300 accent-[#68B0D4] "
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {errors.clinic_category_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.clinic_category_id.message)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 primary-text flex items-center">
                <MapPin size={20} className="mr-2 text-[#68B0D4]" />
                Location Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text- mb-1"
                  >
                    Address*
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("address", {
                        required: "Address is required",
                      })}
                      id="address"
                      rows={2}
                      placeholder="Enter full address"
                      className="w-full px-4 py-2 pl-10 border rounded-lg outline-none resize-none"
                    />
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.address.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subway_station"
                    className="block text-sm font-medium text- mb-1"
                  >
                    Nearest Subway Station
                  </label>
                  <input
                    {...register("subway_station")}
                    id="subway_station"
                    placeholder="Enter nearest station"
                    className="w-full px-4 py-2 border rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Operating Hours
                  </label>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 mb-3 flex-wrap"
                    >
                      <select
                        {...register(`operating_hours.${index}.day`)}
                        className="px-3 py-2 border rounded-lg w-[20%] bg-white"
                      >
                        <option value="">Select Day</option>
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <span className="font-medium">Open time</span>
                      <input
                        {...register(`operating_hours.${index}.open_time`)}
                        type="time"
                        className="px-3 py-2 border rounded-lg w-[20%]"
                      />
                      <span className="font-medium">Close time</span>
                      <input
                        {...register(`operating_hours.${index}.close_time`)}
                        type="time"
                        className="px-3 py-2 border rounded-lg w-[20%]"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        -
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      append({ day: "", open_time: "", close_time: "" })
                    }
                    className=" inline-flex items-center px-3 py-2.5 bg-[#68B0D4] text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    + Add Time Slot
                  </button>
                </div>
              </div>
            </div>

            {/* Clinic Details */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 primary-text flex items-center">
                <Clipboard size={20} className="mr-2 text-[#68B0D4]" />
                Clinic Details
              </h2>
              <div className="space-y-4">
                <div>
                  <Editor
                    apiKey="sk77lbge33d4v322u8sel5ryk6t1j2t298xgizldv4zsv1jl"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={description}
                    onEditorChange={(newText) => setDescription(newText)}
                    init={{
                      height: 600,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview",
                      fontsize_formats:
                        "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 40pt 56pt 64pt 72pt",
                      automatic_uploads: true,
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xl font-medium primary-text my-4">
                    Available Procedures
                  </label>
                  <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {procedureList?.procedures?.map((procedure: any) => (
                      <div
                        key={procedure.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={procedure.id}
                          {...register("procedures")}
                          className="h-6 w-6 rounded border-gray-300 accent-[#68B0D4] "
                        />
                        <label className="text-[#68B0D4] text-lg capitalize">
                          {procedure.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text- hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#68B0D4] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>{id ? "Update Clinic" : "Add Clinic"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
