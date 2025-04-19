"use client";
import React from "react";
import ClinicCard from "../ui/Cards/ClinicCard";
import { useGetClinicsQuery } from "@/app/store/api/clinicApi";

const Clinic = () => {
  const { data: clinics, isLoading, isError } = useGetClinicsQuery(null);
  console.log(clinics, "clinics");
  const clinicsData = clinics?.data?.clinics || [];
  return (
    <div className="mb-20">
      <div className="w-full px-4  mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {clinicsData.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinic;
