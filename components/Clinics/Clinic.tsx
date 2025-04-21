"use client";
import React, { useState } from "react";
import ClinicCard from "../ui/Cards/ClinicCard";
import { useGetUsersClinicsQuery } from "@/app/store/api/clinicApi";
import ReactPaginate from "react-paginate";
import "./Clinic.css";
import { useRouter } from "next/navigation";

const LIMIT = 48; // Number of clinics per page

const Clinic = () => {
  const router = useRouter();
  const [page, setPage] = useState(0); 

  const { data, isLoading, isError } = useGetUsersClinicsQuery({ page: page + 1, limit: LIMIT });

  const clinicsData = data?.data?.clinics || [];
  const totalPages = data?.data?.totalPages || 1;

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
    router.push(`?page=${event.selected + 1}` );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="mb-20">
      <div className="w-full px-4 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
              pageClassName="page-item"
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
    </div>
  );
};

export default Clinic;
