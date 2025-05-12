"use client";

import React, { useState, useEffect, useRef } from "react";
import ProcedureCard from "@/components/ui/Cards/ProcedureCard";
import {
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
} from "@/app/store/api/clinicApi";
import LoadingSpinner from "@/components/shared/Loading/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full bg-[#68B0D4] shadow-md flex items-center justify-center text-white"
  >
    {direction === "left" ? <FaArrowLeft size={16} /> : <FaArrowRight size={16} />}
  </button>
);

const Procedures = () => {
  const [activeTab, setActiveTab] = useState<Category | null>(null);
  const sliderRef = useRef<Slider>(null);

  const { data: clinic_category, isLoading: loadingCategories } =
    useGetClinicCategoryQuery(null);
  const categories: Category[] = clinic_category?.data || [];

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab({ id: categories[0].id, name: categories[0].name });
    }
  }, [categories]);

  const { data: procedures, isLoading: loadingProcedures } =
    useGetProcedureByCategoryQuery(activeTab?.id, {
      skip: !activeTab?.id,
    });

  const proceduresData = procedures?.data || [];

  if (loadingCategories) {
    return <LoadingSpinner />;
  }

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      {/* Heading with Arrows on Mobile */}
      <div className="flex justify-between items-center px-4 2xl:px-0 mb-6">
        <h3 className="primary-text font-bold">Procedures</h3>

        {/* Arrows - only on mobile */}
        <div className="flex gap-2 xl:hidden">
          <ArrowButton
            direction="left"
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <ArrowButton
            direction="right"
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden xl:block overflow-x-auto mb-6 pl-4 xl:pl-0">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border ${
                activeTab?.id === cat.id
                  ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                  : "border-[#EEF3F8] text-main"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Slider Tabs */}
      <div className="xl:hidden mb-6 pl-4">
        <Slider ref={sliderRef} {...sliderSettings}>
          {categories.map((cat) => (
            <div key={cat.id} className="px-2 box-border">
              <button
                onClick={() => setActiveTab(cat)}
                className={`text-sm whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border ${
                  activeTab?.id === cat.id
                    ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                    : "border-[#EEF3F8] text-main"
                }`}
              >
                {cat.name}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      <div className="container mx-auto px-4 2xl:px-0">
        {loadingProcedures ? (
          <p>Loading...</p>
        ) : proceduresData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {proceduresData.map((procedure: any) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No procedures found.</p>
        )}
      </div>
    </div>
  );
};

export default Procedures;
