"use client";
import React from "react";
import Image from "next/image";
import mostSearchClinicImage from "@/public/most-search.jpeg";
import { LuScanSearch } from "react-icons/lu";
import { useGetDashboardUserEngagementQuery } from "@/app/store/api/dashboardApi";

const MostSearchClinic = () => {
    const { data: searcUserEngagementData } = useGetDashboardUserEngagementQuery(null);
    console.log(searcUserEngagementData);
    const topClinic = searcUserEngagementData?.data?.topClinic || 0;
  
  return (
    <div>
      <div className="bg-white rounded-lg p-4 shadow-sm w-full xl:h-[439px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#EAF4FA] p-2 rounded-md">
              <LuScanSearch size={20} />
            </span>
            <div>
              <h5 className="text-xl font-semibold main-text">
                Most Searched Clinic
              </h5>
              <p className="text-sm text-[#44454F]">Seoul Global Center</p>
            </div>
          </div>
          <div className="w-24 rounded-md overflow-hidden">
            <Image
              src={mostSearchClinicImage}
              alt="Clinic"
              width={200}
              height={200}
              className="object-cover aspect-square"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-200" />

        {/* User Search */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-[#44454F]">User Search</p>
            <p className="text-2xl font-semibold text-main">2,40,437</p>
          </div>
          <div className="text-right">
            <p className="text-base text-[#44454F]">Average</p>
            <p className="text-sm font-medium text-gray-700">37%</p>
            <p className="text-xs text-green-500 font-medium">+40%</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="my-2 border-t border-gray-100" />

        {/* Site Visit */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-[#44454F]">Site Visit</p>
            <p className="text-2xl font-semibold text-main">1,03,258</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#44454F]">Average</p>
            <p className="text-sm font-medium text-gray-700">90%</p>
            <p className="text-xs text-green-500 font-medium">+10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSearchClinic;
