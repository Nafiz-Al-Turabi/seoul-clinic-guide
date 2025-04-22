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
  const search = searchParams.get("search") || "";
  const procedure = searchParams.get("procedure") || "";
  const [page, setPage] = useState(pageFromURL - 1);

  const { data, isLoading, isError } = useGetUsersClinicsQuery({
    page: page + 1,
    limit: LIMIT,
    search,
    procedure,
  });

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
