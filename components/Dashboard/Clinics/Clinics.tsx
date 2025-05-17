"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiHospitalThin } from "react-icons/pi";
import { TbNotes } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { BsSortDown, BsThreeDotsVertical } from "react-icons/bs";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteClinicMutation,
  useGetClinicsQuery,
} from "@/app/store/api/clinicApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "@/components/shared/Loading/Loading";
import { Input } from "@/components/ui/input";

const Clinics = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sortBy, setSortBy] = useState("desc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const router = useRouter();
  const {
    data: clinics,
    isLoading,
    refetch,
  } = useGetClinicsQuery({ page, limit, sortBy, search: debouncedSearch });
  const [deleteClinic] = useDeleteClinicMutation();

  const columns: TableColumn[] = [
    { key: "name", label: "Clinic Name", type: "text" },
    { key: "address", label: "Location", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];

  const clinicsData =
    clinics?.data?.clinics?.map((clinic: any) => ({
      ...clinic,
      address: clinic.address.split(",").slice(0, 2).join(", "),
      created_at: new Date(clinic.created_at).toLocaleString(),
    })) || [];


  const totalPages = clinics?.data?.totalPages || 0;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    router.push(`/dashboard/clinics?page=${selectedItem.selected + 1}&sortBy=${sortBy}`);
  };

  const handleDelete = async (clinicId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this clinic?"
    );
    if (!confirmed) return;

    try {
      await deleteClinic(clinicId).unwrap();
      toast.success("Clinic deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete clinic.");
    }
  };

  const tableActions = (clinic: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[#555F7E] hover:border p-1 rounded-full">
          <BsThreeDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/add-clinic/${clinic.id}`)}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(clinic.id)}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
            <PiHospitalThin size={20} />
          </span>
          <h5 className="text-base sm:text-[1.5rem] font-bold">Clinics</h5>
        </div>
        <div className="flex items-center gap-2">
        <Input
            type="text"
            className="py-5"
            placeholder="Search clinics..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            href="/dashboard/add-clinic"
            className="text-sm primary-bg text-white w-80 flex gap-2 items-center border p-2.5 py-[11px] rounded-md cursor-pointer"
          >
            <TbNotes />
            Add New Clinic <FaPlus size={10} />
          </Link>
          <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
            <SelectTrigger className="justify-between py-5">
              <span className="flex items-center gap-2">
                <BsSortDown size={20} />
                <SelectValue placeholder="Filter Sort" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center py-6">Loading clinics...</p>
      ) : (
        <CustomTable
          data={clinicsData}
          columns={columns}
          actions={tableActions}
        />
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            forcePage={page - 1}
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
  );
};

export default Clinics;
