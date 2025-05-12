"use client";
import React, { useState } from "react";
import ClinicCard from "../ui/Cards/ClinicCard";
import { useGetUsersClinicsQuery } from "@/app/store/api/clinicApi";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../shared/Loading/Loading";
import ErrorComponent from "../shared/ErrorComponent/ErrorComponent";

const LIMIT = 24;

const Clinic = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromURL = parseInt(searchParams.get("page") || "1", 10);
  const [searchTerm, setSearchTerm] = useState("");
  const search = searchParams.get("search") || "";
  const procedure = searchParams.get("procedure") || "";
  const [page, setPage] = useState(pageFromURL - 1);

  const { data, isLoading, isError } = useGetUsersClinicsQuery({
    page: page + 1,
    limit: LIMIT,
    search,
    procedure,
  });

  const handleSearch = () => {
    router.push(`/clinics?page=1&search=${searchTerm}`);
  };


  const clinicsData = data?.data?.clinics || [];
  const totalPages = data?.data?.totalPages || 1;

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);

    const queryParams = new URLSearchParams();

    if (procedure) queryParams.set("procedure", procedure);
    if (search) queryParams.set("search", search);
    queryParams.set("page", (event.selected + 1).toString());

    router.push(`?${queryParams.toString()}`);
  };



  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <ErrorComponent/>;

  return (
    <div className="mb-20">
      <div className="py-10 flex flex-col md:flex-row justify-between">
        <h1 className="font-bold primary-text uppercase">Clinics</h1>
        <div className="w-full sm:w-sm lg:w-md relative mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search your desired clinic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-md px-6 py-2.5 rounded-full bg-[#ffffff] border border-[#E9E9E9] focus:outline-none focus:border-[#68B0D4] placeholder:italic"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1.5 lg:top-[31%] top-[50%] -translate-y-1/2 primary-bg rounded-full px-6 py-1.5 text-white hover:text-white duration-300 cursor-pointer"
            >
              Search
            </button>
          </div>
      </div>
      {
        clinicsData.length > 0 ? (
          <div className="w-full  mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clinicsData.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
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
              pageClassName="page-item hidden sm:block"
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
        )}
      </div>
        ) : (
          <div className="w-full px-4 mx-auto">
            <div className="flex justify-center items-center h-[60vh]">
              <h5 className="text-2xl primary-text">Sorry, no clinics found</h5>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Clinic;
