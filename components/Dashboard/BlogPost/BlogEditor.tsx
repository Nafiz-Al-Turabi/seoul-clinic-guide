"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  useBlogCategoriesQuery,
  useCreateBlogMutation,
} from "@/app/store/api/blogApi";

type AuthorFormData = {
  title: string;
  author_name: string;
  email: string;
  facebook: string;
  twitter: string;
  blog_category_id: string;
};

export default function BlogEditor() {
  const editorRef = useRef<any>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [authorImage, setAuthorImage] = useState<string>("/default-avatar.jpg");
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [createblog, { isLoading, error }] = useCreateBlogMutation();
  const { data: BlogCategories } = useBlogCategoriesQuery(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AuthorFormData>();

  const openAuthorModal = () => {
    const title = getValues("title");
    if (!title || title.trim() === "") {
      alert("Please enter a blog title first.");
      return;
    }
    setShowModal(true);
  };

  const onSubmit = async (data: AuthorFormData) => {
    const content = editorRef.current?.getContent();
    if (!coverImage || !authorImageFile) {
      alert("Please upload both images.");
      return;
    }

    const blogObject = {
      title: data.title,
      content: content,
      author_name: data.author_name,
      email: data.email,
      facebook: data.facebook,
      twitter: data.twitter,
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", content || "");
    formData.append("author_name", data.author_name);
    formData.append("email", data.email);
    formData.append("facebook", data.facebook);
    formData.append("x", data.twitter);
    formData.append("blog_category_id", data.blog_category_id); 
    // need blog_category_id

    formData.append("author_picture", authorImageFile);

    await createblog(formData)
      .unwrap()
      .then((response) => {
        console.log("Blog created successfully:", response);
        alert("Blog created successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
        alert("Failed to create blog. Please try again.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-6 bg-white rounded-2xl shadow"
    >
      <input
        {...register("title", { required: true })}
        placeholder="Blog title..."
        className="w-full text-4xl font-extrabold text-gray-800 outline-none placeholder-gray-500 border-b pb-2"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">Title is required</p>
      )}

      <div className="flex items-center space-x-4">
        <label className="text-xs sm:text-lg px-4 py-2 bg-[#68b0d4] text-white rounded cursor-pointer hover:bg-[#68b0d4]/90 transition duration-300">
          Upload Cover Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setCoverImage(file);
                setCoverPreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>
        {coverPreview && (
          <div className="h-16 w-16 overflow-hidden rounded">
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="object-cover rounded"
            />
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="blog_category_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Category
        </label>
        <select
          id="blog_category_id"
          {...register("blog_category_id", { required: true })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 p-2.5"
        >
          <option value="">Select a category</option>
          {BlogCategories?.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Editor
        apiKey="sk77lbge33d4v322u8sel5ryk6t1j2t298xgizldv4zsv1jl"
        onInit={(evt, editor) => (editorRef.current = editor)}
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

      <div className="text-right">
        <button
          type="button"
          onClick={openAuthorModal}
          className="bg-[#68b0d4] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          Publish
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full relative">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-xl"
              type="button"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={20} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-center">
                <Image
                  src={authorImage}
                  alt="Author"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover mx-auto border border-gray-200 w-[250px] h-[250px]"
                />
                <input
                  id="author-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAuthorImage(URL.createObjectURL(file));
                      setAuthorImageFile(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="author-image-upload"
                  className="inline-block mt-2 cursor-pointer text-sm font-medium text-[#1d4ed8] hover:underline"
                >
                  Select author image
                </label>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 h-fit relative">
                <div>
                  <label className="block font-semibold mb-1">
                    Author name
                  </label>
                  <input
                    {...register("author_name", { required: true })}
                    placeholder="Please enter full name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#68b0d4]"
                  />
                  {errors.author_name && (
                    <p className="text-red-500 text-sm">
                      Author name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Author email address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Please enter email address"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#68b0d4]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">Facebook</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFacebookF className="text-gray-400" />
                    </div>
                    <input
                      {...register("facebook")}
                      placeholder="Enter your link"
                      className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#68b0d4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    X (Twitter)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaXTwitter className="text-gray-400" />
                    </div>
                    <input
                      {...register("twitter")}
                      placeholder="Enter your link"
                      className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#68b0d4]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:absolute top-1/2 md:left-[40.6%] lg:left-[30%] xl:left-[29.4%] mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#68b0d4] text-white px-6 py-2 rounded hover:shadow-md hover:bg-[#5aa0c3] transition-all"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
