"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdClose, MdKeyboardArrowRight, MdMenu } from "react-icons/md";
import {
  useGetClientProceduresQuery,
  useGetClinicCategoryQuery,
} from "@/app/store/api/clinicApi";
import ProcedureCard from "../ui/Cards/ProcedureCard";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../shared/Loading/Loading";
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";

interface Category {
  id: string;
  name: string;
}

const limit = 12;

const ProceduresCategories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Category | null>(null);
  const pageFromURL = parseInt(searchParams.get("page") || "1", 10);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(pageFromURL - 1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clinic_category, isLoading: loadingCategories } =
    useGetClinicCategoryQuery(null);
  const categories: Category[] = clinic_category?.data || [];

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl && categories.length > 0) {
      const matched = categories.find((cat) => cat.id === idFromUrl);
      setActiveTab(matched || categories[0]);
    } else if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, searchParams]);

  const { data: procedures, isLoading: loadingProcedures } =
    useGetClientProceduresQuery(
      {
        clinic_category_id: activeTab?.id,
        page: page + 1,
        limit,
      },
      {
        skip: !activeTab?.id,
      }
    );

  const proceduresData = procedures?.data?.procedures || [];
  const totalPages = procedures?.data?.totalPages || 1;
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected);
    router.push(`?id=${activeTab?.id}&page=${selected + 1}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const matchedCategory = categories.find(cat => 
        cat.name.toLowerCase() === searchTerm.toLowerCase()
      ) || categories.find(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (matchedCategory) {
        setActiveTab(matchedCategory);
        setPage(0);
        router.push(`/procedures?id=${matchedCategory.id}&page=1`);
        setIsOpen(false);
      }
    }
  };

  if (loadingCategories) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 pb-6 pt-20 flex gap-10 relative ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden absolute top-6 items-center gap-2 px-4 py-2 bg-[#68B0D4] text-white rounded-full shadow-md"
      >
        <MdMenu size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={menuRef}
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out p-6 lg:p-0  lg:rounded-none z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-[#305162]">Procedures</h4>
          <button onClick={() => setIsOpen(false)} className="text-[#305162]">
            <MdClose size={24} />
          </button>
        </div>
        <div className="relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search procedures..."
              className="w-full py-2 px-4 placeholder:italic rounded-full border border-[#afafaf] mb-4 focus:outline-none focus:border-[#68b0d4]"
            />
            <button type="submit" className="absolute right-4 top-[35%] -translate-y-1/2">
              <IoSearchSharp size={20} className="text-[#9aa2a7]" />
            </button>
          </form>
        </div>
        <h4 className="hidden lg:block font-medium text-[#B4B4B4] mb-4">
          Procedures
        </h4>

        <div className="lg:w-56 xl:w-72 max-h-[calc(90vh-120px)] overflow-y-auto custom-scroll flex flex-col gap-2">
          {filteredCategories?.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item);
                setPage(0);
                router.push(`/procedures?id=${item.id}&page=1`);
                setIsOpen(false);
              }}
              className={`text-left mr-2 px-4 py-2 lg:py-3 rounded-full duration-300 font-medium text-sm xl:text-lg cursor-pointer ${
                activeTab?.id === item.id
                  ? "bg-[#68B0D4] text-white"
                  : "text-[#305162] hover:text-[#B4B4B4]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 2xl:px-0 flex-1">
        <p className="flex items-center gap-2 text-xl text-[#305162] font-semibold mb-4">
          Procedures <MdKeyboardArrowRight /> {activeTab?.name}
        </p>

        {loadingProcedures ? (
          <LoadingSpinner />
        ) : proceduresData?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {proceduresData.map((procedure: any) => (
                <ProcedureCard key={procedure.id} procedure={procedure} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                breakLabel="..."
                nextLabel="›"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                forcePage={page}
                previousLabel="‹"
                renderOnZeroPageCount={null}
                containerClassName="custom-pagination"
                pageClassName="page-item hidden sm:inline"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No procedures found.</p>
        )}
      </div>
    </div>
  );
};

export default ProceduresCategories;
