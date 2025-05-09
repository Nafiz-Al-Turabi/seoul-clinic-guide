import CategoriesHero from "@/components/Categories/CategoriesHero/CategoriesHero";
import ClinicCategories from "@/components/Categories/ClinicCategories/ClinicCategories";
import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import React from "react";

const Categories = () => {
  return (
    <div>
      <CategoriesHero />
      <ClinicCategories />
      <TopClinics />
      <NewsLetter/>
    </div>
  );
};

export default Categories;
