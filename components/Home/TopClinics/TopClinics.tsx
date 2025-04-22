"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clinicImage from "@/public/assets/topClinicImages/top-clinic-1.png";
import clinicImage2 from "@/public/assets/topClinicImages/top-clinic-2.png";
import clinicImage3 from "@/public/assets/topClinicImages/top-clinic-3.png";
import clinicImage4 from "@/public/assets/topClinicImages/top-clinic-4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClinicCard from "@/components/ui/Cards/ClinicCard";
import { useGetTopClinicsQuery } from "@/app/store/api/clinicApi";
import LoadingSpinner from "@/components/shared/Loading/Loading";

const PrevArrow = ({ onClick, isDisabled }: any) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={`absolute right-14 -top-[75px] transition duration-200 flex items-center justify-center p-3 rounded-full
      ${
        isDisabled
          ? "bg-transparent text-gray-400 cursor-not-allowed"
          : "bg-[#68B0D4] text-white  shadow-lg cursor-pointer"
      }
    `}
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick, isDisabled }: any) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={`absolute right-0 -top-[75px] transition duration-200 flex items-center justify-center p-3  rounded-full
      ${
        isDisabled
          ? "bg-transparent text-gray-400 cursor-not-allowed "
          : "bg-[#68B0D4] text-white shadow-lg cursor-pointer"
      }
    `}
  >
    <FaArrowRight />
  </button>
);

const TopClinics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const { data: topClinic, isLoading } = useGetTopClinicsQuery(null);

  const topClinics = topClinic?.data || [];
  console.log(topClinics);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else if (width < 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const totalSlides = topClinics.length;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    prevArrow: <PrevArrow isDisabled={currentSlide === 0} />,
    nextArrow: (
      <NextArrow isDisabled={currentSlide >= totalSlides - slidesToShow} />
    ),
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

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="py-[100px] bg-[#F9FDFD]">
      <div className="max-w-[86rem] mx-auto px-4 2xl:px-0">
        <div className="flex items-center justify-between">
          <h3 className="primary-text font-bold mb-8">Top Clinics</h3>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {topClinics?.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopClinics;
