"use client";

import React, { useState, useEffect } from "react";
import ProcedureCard from "@/components/ui/Cards/ProcedureCard";
import {
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
} from "@/app/store/api/clinicApi";
import LoadingSpinner from "@/components/shared/Loading/Loading";

import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Category {
  id: string;
  name: string;
}

const Procedures = () => {
  const [activeTab, setActiveTab] = useState<Category | null>(null);

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
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <div className="absolute right-14 -top-[75px] bg-[#68B0D4] text-white shadow-lg cursor-pointer transition duration-200 flex items-center justify-center p-3 rounded-full">
        <FiChevronRight className="text-2xl text-[#68B0D4]" />
      </div>
    ),
    prevArrow: (
      <div className="absolute right-0 -top-[75px] transition duration-200 flex items-center justify-center p-3  rounded-full">
        <FiChevronLeft className="text-2xl text-[#68B0D4]" />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto relative">
      <h3 className="px-4 2xl:px-0 primary-text font-bold mb-8">Procedures</h3>

      {/* Tabs for Desktop */}
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

      {/* Tabs for Mobile */}
      <div className="xl:hidden mb-6 pl-4 relative">
        <Slider {...sliderSettings}>
          {categories.map((cat) => (
            <div key={cat.id} className="pr-2">
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

      {/* Procedures Grid */}
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
