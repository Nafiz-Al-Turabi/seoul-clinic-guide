"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clinicImage from "@/public/assets/topClinicImages/top-clinic-1.png";
import clinicImage2 from "@/public/assets/topClinicImages/top-clinic-2.png";
import clinicImage3 from "@/public/assets/topClinicImages/top-clinic-3.png";
import clinicImage4 from "@/public/assets/topClinicImages/top-clinic-4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const topClinics = [
  {
    id: 1,
    image: clinicImage,
    name: "Three Wishes Clinic - Myeongdong",
    address: "2900 Ritter Street, Huntsville, AL 35802",
  },
  {
    id: 2,
    image: clinicImage2,
    name: "B.V Clinic",
    address: "4093 Overlook Drive, Richmond, IN 47374",
  },
  {
    id: 3,
    image: clinicImage3,
    name: "Seojin Plastic Surgery Clinic",
    address: "2323 Dancing Dove Lane, Long Island City, NY 11101",
  },
  {
    id: 4,
    image: clinicImage4,
    name: "Haru Clinic",
    address: "591 Joanne Lane, Wilmington, MA 01887",
  },
];

const PrevArrow = ({ onClick }: any) => (
  <button
    className="p-3 rounded-full shadow-lg transition duration-200 bg-[#68B0D4] text-white absolute right-14 -top-24 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    className="p-3 rounded-full shadow-lg transition duration-200 bg-[#68B0D4] text-white absolute right-0 -top-24 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowRight />
  </button>
);

const TopClinics = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-[100px] bg-[#F9FDFD]">
      <div className="container mx-auto px-4 2xl:px-0">
        <div className="flex items-center justify-between">
          <h2 className="primary-text mb-8">Top Clinics</h2>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {topClinics.map((clinic) => (
              <div key={clinic.id} className="px-2">
                <div className="">
                  <Image
                    src={clinic.image}
                    alt="clinic-image"
                    className="aspect-auto rounded-xl"
                  />
                </div>
                <div>
                  <h4 className="primary-text">{clinic.name}</h4>
                  <p className="text-sm text-gray-500">{clinic.address}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopClinics;
