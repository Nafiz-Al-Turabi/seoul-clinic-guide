"use client";

import React, { useState, useEffect, useRef } from "react";
import ProcedureCard from "@/components/ui/Cards/ProcedureCard";
import {
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
} from "@/app/store/api/clinicApi";
import LoadingSpinner from "@/components/shared/Loading/Loading";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

const Procedures = () => {
  const [activeTab, setActiveTab] = useState<Category | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const { data: clinic_category, isLoading: loadingCategories } =
    useGetClinicCategoryQuery(null);
  const categories: Category[] = clinic_category?.data || [];

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab({ id: categories[0].id, name: categories[0].name });
    }
  }, [categories]);

  useEffect(() => {
    if (window.innerWidth < 1280 && categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = 150;
      categoriesRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const { data: procedures, isLoading: loadingProcedures } =
    useGetProcedureByCategoryQuery(activeTab?.id, {
      skip: !activeTab?.id,
    });

  const proceduresData = procedures?.data || [];

  if (loadingCategories) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between px-4 2xl:px-0 mb-4">
        <h3 className="primary-text font-bold text-xl sm:text-2xl">Procedures</h3>

        <div className="flex gap-2 xl:hidden">
          <button
            onClick={() => scrollCategories("left")}
            className="bg-[#68B0D4] text-white shadow p-3 rounded-full"
          >
            <FaArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollCategories("right")}
            className="bg-[#68B0D4] text-white shadow p-3 rounded-full"
          >
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    
      <div
        ref={categoriesRef}
        className="overflow-x-auto scrollbar-hide mb-6 px-4 xl:hidden"
      >
        <div className="flex gap-4 pr-10">
          {categories?.map((cat) => (
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

      {/* Desktop (xl+): non-scroll, wrapped layout */}
      <div className="hidden xl:block px-0 mb-6">
        <div className="flex flex-wrap gap-4">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={`text-sm lg:text-base whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border ${
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

      {/* Procedures Grid */}
      <div className="container mx-auto px-4 2xl:px-0">
        {loadingProcedures ? (
          <p>Loading...</p>
        ) : proceduresData?.length > 0 ? (
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
