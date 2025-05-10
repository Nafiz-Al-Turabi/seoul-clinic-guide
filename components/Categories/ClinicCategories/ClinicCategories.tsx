"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  useGetClinicCategoryQuery,
  useGetClinicsByCategoryQuery,
} from "@/app/store/api/clinicApi";
import { MdKeyboardArrowRight, MdMenu, MdClose } from "react-icons/md";
import ClinicCard from "@/components/ui/Cards/ClinicCard";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/shared/Loading/Loading";
import ErrorComponent from "@/components/shared/ErrorComponent/ErrorComponent";
import { IoSearchSharp } from "react-icons/io5";

const ClinicCategories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: clinicCategories } = useGetClinicCategoryQuery(null);
  const categoryList = clinicCategories?.data || [];

  const [activeCategory, setActiveCategory] = useState("All Clinics");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Set active category from URL on mount or when category list changes
  useEffect(() => {
    const categoryIdFromUrl = searchParams.get("category");

    if (categoryIdFromUrl && categoryList.length > 0) {
      const matchedCategory = categoryList.find((cat: any) => cat.id === categoryIdFromUrl);
      if (matchedCategory) {
        setActiveCategory(matchedCategory.name);
        setActiveCategoryId(matchedCategory.id);
      }
    } else {
      setActiveCategory("All Clinics");
      setActiveCategoryId(null);
    }
  }, [categoryList, searchParams]);

  const {
    data: clinicsByCategory,
    isLoading,
    error,
  } = useGetClinicsByCategoryQuery(activeCategoryId, {
    refetchOnMountOrArgChange: true,
  });

  const filteredCategories = categoryList.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (name: string, id: string | null) => {
    setActiveCategory(name);
    setActiveCategoryId(id);
    setMenuOpen(false);

    const queryParam = id ? `?category=${id}` : "";
    router.push(`${queryParam}`, { scroll: false });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorComponent />;

  return (
    <div className="container mx-auto px-4 py-20 flex gap-10 relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="lg:hidden absolute top-6 items-center gap-2 px-4 py-2 bg-[#68B0D4] text-white rounded-full shadow-md"
      >
        <MdMenu size={20} />
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out p-6 lg:p-0 lg:rounded-none z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-[#305162]">Categories</h4>
          <button onClick={() => setMenuOpen(false)} className="text-[#305162]">
            <MdClose size={24} />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full p-2 rounded-full border border-[#305162] mb-4 focus:border-[#68b0d4]"
          />
          <IoSearchSharp
            size={20}
            className="text-[#9aa2a7] absolute right-4 top-[35%] -translate-y-1/2"
          />
        </div>
        <h4 className="hidden lg:block font-medium text-[#B4B4B4] mb-4">Categories</h4>
        <div className="lg:w-56 xl:w-72 max-h-[calc(90vh-120px)] overflow-y-auto custom-scroll flex flex-col gap-2">
          <button
            onClick={() => handleCategoryClick("All Clinics", null)}
            className={`text-left mr-2 px-4 py-2 lg:py-3 rounded-full duration-300 font-medium text-sm lg:text-lg cursor-pointer ${
              activeCategory === "All Clinics"
                ? "bg-[#68B0D4] text-white"
                : "text-[#305162] hover:text-[#B4B4B4]"
            }`}
          >
            All Clinics
          </button>
          {filteredCategories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name, cat.id)}
              className={`text-left mr-2 px-4 py-2 lg:py-3 rounded-full duration-300 font-medium text-sm lg:text-lg cursor-pointer ${
                activeCategory === cat.name
                  ? "bg-[#68B0D4] text-white"
                  : "text-[#305162] hover:text-[#B4B4B4]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <p className="flex items-center gap-2 text-xl text-[#305162] font-semibold mb-4">
          Clinics <MdKeyboardArrowRight /> {activeCategory}
        </p>

        {isLoading ? (
          <p className="text-center py-10">Loading clinics...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicsByCategory?.data?.clinics?.length > 0 ? (
              clinicsByCategory.data.clinics.map((clinic: any) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))
            ) : (
              <p className="text-gray-500">No clinics found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicCategories;
