"use client";
import React, { useState } from "react";
import { useDeleteProcedureMutation, useGetProceduresQuery } from "@/app/store/api/adminProcedureApi";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { BsSortDown, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { PiHospitalThin } from "react-icons/pi";
import { TbNotes } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/Loading/Loading";

const Procedures = () => {
  const [page, setPage] = useState(1);
  const limit = 40;
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const { data: procedures, isLoading, refetch } = useGetProceduresQuery({
    page,
    limit,
    sortBy,
  });

  const [deleteProcedure] = useDeleteProcedureMutation();

  const data = procedures?.data?.procedures || [];
  const totalPages = procedures?.data?.totalPages || 0;

  const columns: TableColumn[] = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Procedures Name", type: "text" },
    { key: "clinic_count", label: "Clinics", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];

  const proceduresData = data.map((procedur: any) => ({
    ...procedur,
    created_at: new Date(procedur.created_at).toLocaleString(),
  }));

  const handleDelete =  async (procedureId: string)=>{
    const confirmed = window.confirm("Are you sure you want to delete this procedure?");
    if(!confirmed) return;

    try {
      await deleteProcedure(procedureId).unwrap();
      toast.success("Procedure deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete procedure.");
  }}


  const tableActions = (procedure: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[#555F7E] hover:border p-1 rounded-full cursor-pointer">
          <BsThreeDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem className="cursor-pointer">Update</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>handleDelete(procedure.id)} className="cursor-pointer">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    router.push(`/dashboard/procedures?page=${selectedItem.selected + 1}&sortBy=${sortBy}`);
  };

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
          <h5 className="text-base sm:text-[1.5rem] font-bold">Procedures</h5>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm text-main flex gap-2 items-center border p-2 rounded-md cursor-pointer">
            <TbNotes />
            Add Procedures <FaPlus size={10} />
          </button>
          <Select onValueChange={(value) => setSortBy(value)}>
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

      <CustomTable
        data={proceduresData}
        columns={columns}
        actions={tableActions}
      />

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

export default Procedures;
