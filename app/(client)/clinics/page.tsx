import Clinic from "@/components/Clinics/Clinic";
import ClinicCard from "@/components/ui/Cards/ClinicCard";
import React from "react";

const Clinics = () => {
  return (
    <div className="max-w-[86.5rem] mx-auto px-4 2xl:px-0">
      <h1 className="font-bold primary-text uppercase">Seoul Clinics</h1>
      <p className="text-gray-600">Explore our top clinics</p>
      <Clinic />
    </div>
  );
};

export default Clinics;
