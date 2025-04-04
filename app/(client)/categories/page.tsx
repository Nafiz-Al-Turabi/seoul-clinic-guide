import CategoriesHero from "@/components/Categories/CategoriesHero/CategoriesHero";
import ClinicCategories from "@/components/Categories/ClinicCategories/ClinicCategories";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import React from "react";

const Categories = () => {
  return (
    <div>
      <CategoriesHero />
      <TopClinics />
      <ClinicCategories />
    </div>
  );
};

export default Categories;
