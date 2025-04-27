"use client";
import React from "react";
import blogHeroImage from "@/public/assets/images/blogHero.png";
import Image from "next/image";
import image from "@/public/placeholder.png";
import image2 from "@/public/assets/stemCellImages/stem-cell.jpg";
import { useGetBlogDetailsQuery } from "@/app/store/api/blogApi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const DetailsOfBlog = ({ slug }) => {
  const { data } = useGetBlogDetailsQuery(slug);

  const blogDetails = data?.data || {};

  return (
    <div>
      <header
        style={{ backgroundImage: `url(${blogDetails?.banner_url})` }}
        className="relative w-full bg-position-center bg-cover bg-center bg-no-repeat h-[30vh] sm:h-[40vh] lg:h-[70.7vh]"
      >
        <div className="absolute inset-0 bg-gradient-to-l to-black/10 from-transparent z-0"></div>
        <div className="max-w-[86rem] mx-auto px-4 2xl:px-0 flex flex-col justify-center h-full relative z-10">
          <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl ">
            Blog Details
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-white  mt-4">
            Read about the top rated blogs written by the exparts
          </p>
        </div>
      </header>
      <section className="max-w-[828px] mx-auto px-4 2xl:px-0 py-[32px]">
        <h5 className="text-lg sm:text-[1.5rem] lg:text-[2rem] font-semibold primary-text tracking-[-1.28] ">
          {blogDetails?.title}
        </h5>
        <div className="flex justify-between py-[32px]  border-b border-[#D7D7D7]">
          <div className="flex items-center gap-3  ">
            <div className="w-[67px] h-[67px] rounded-full overflow-hidden flex items-center justify-center">
              {blogDetails?.author_picture_url ? (
                <Image
                  src={blogDetails.author_picture_url}
                  height={67}
                  width={67}
                  alt={blogDetails?.title || "Author"}
                />
              ) : (
                <Image
                  src={image}
                  height={67}
                  width={67}
                  alt="Default Author"
                />
              )}
            </div>
            <div>
              <h5 className="text-lg font-semibold primary-text">
                {blogDetails?.author_name}
              </h5>
              {/* <p className='text-base font-medium'>B.V Clinic</p> */}
              <p className="text-sm text-[#B4B4B4]">
                {new Date(blogDetails?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <a
              href={blogDetails?.facebook}
              target="blank"
              className="p-2 primary-bg text-white hover:bg-[#385a69] duration-300 rounded-full"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href={blogDetails?.x}
              target="blank"
              className="p-2 primary-bg text-white hover:bg-[#385a69] duration-300 rounded-full"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
        <div
          className="my-12 
                    [&_ol]:list-decimal 
                    [&_ul]:list-disc 
                    [&_li]:ml-6 
                    [&_h1]:font-semibold 
                    [&_h2]:font-semibold 
                    [&_h3]:font-semibold 
                    [&_h4]:font-semibold 
                    [&_h5]:font-semibold 
                    [&_h6]:font-semibold
             "
          dangerouslySetInnerHTML={{
            __html: blogDetails?.content || "",
          }}
        />
      </section>
    </div>
  );
};

export default DetailsOfBlog;
