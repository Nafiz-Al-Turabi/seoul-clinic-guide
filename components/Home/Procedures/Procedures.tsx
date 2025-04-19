"use client";

import React, { useState, useEffect, JSX } from "react";
import StemCell from "./Tabcomponents/StemCell";
import { useGetClinicCategoryQuery } from "@/app/store/api/clinicApi";
import ProcedureCard from "@/components/ui/Cards/ProcedureCard";

const Procedures = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const { data: clinic_category, isLoading } = useGetClinicCategoryQuery(null);
  const categories = clinic_category?.data || [];


  useEffect(() => {
    if (categories.length > 0) {
      setActiveTab(categories[0].name); 
    }
  }, [categories]);

  return (
    <div className="max-w-[86rem] mx-auto">
      <h3 className="px-4 2xl:px-0 primary-text font-bold mb-8">Procedures</h3>

      {/* Tabs */}
      <div className="overflow-x-auto mb-6 pl-4 xl:pl-0">
        <div className="flex xl:flex-wrap gap-4">
          {categories.map((cat: { name: string }) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border ${
                activeTab === cat.name
                  ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                  : "border-[#EEF3F8] text-main"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="max-w-[86rem] mx-auto px-4 2xl:px-0">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <ProcedureCard />
            <ProcedureCard />
            <ProcedureCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Procedures;
