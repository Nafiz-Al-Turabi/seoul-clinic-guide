"use client";

import React, { useState, useEffect } from "react";
import ProcedureCard from "@/components/ui/Cards/ProcedureCard";
import {
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
} from "@/app/store/api/clinicApi";
import LoadingSpinner from "@/components/shared/Loading/Loading";

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
    return <LoadingSpinner/>
  }

  return (
    <div className="container mx-auto">
      <h3 className="px-4 2xl:px-0 primary-text font-bold mb-8">Procedures</h3>

      {/* Tabs */}
      <div className="overflow-x-auto mb-6 pl-4 xl:pl-0">
        <div className="flex xl:flex-wrap gap-4">
          {categories.slice(0,8).map((cat) => (
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
