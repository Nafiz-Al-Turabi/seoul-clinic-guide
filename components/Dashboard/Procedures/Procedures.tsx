"use client";
import { useGetProceduresQuery } from "@/app/store/api/adminProcedureApi";
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
import React from "react";
import { BsSortDown, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { PiHospitalThin } from "react-icons/pi";
import { TbNotes } from "react-icons/tb";

const Procedures = () => {
  const { data: procedures, isLoading } = useGetProceduresQuery(null);
  console.log(procedures?.data);

  const data = procedures?.data?.procedures;
  

  const columns: TableColumn[] = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Procedures Name", type: "text" },
    { key: "clinic_count", label: "Clinics", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];

  const proceduresData =
    data?.map((procedur: any) => ({
      ...procedur,
      created_at: new Date(procedur.created_at).toLocaleString(),
    })) || [];

  const tableActions = (procedure: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[#555F7E] hover:border p-1 rounded-full cursor-pointer">
          <BsThreeDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem className="cursor-pointer">Update</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
          <button
            className="text-sm text-main flex gap-2 items-center border p-2 rounded-md cursor-pointer"
          >
            <TbNotes />
            Add Procedures <FaPlus size={10} />
          </button>
          <Select>
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
    </div>
  );
};

export default Procedures;
