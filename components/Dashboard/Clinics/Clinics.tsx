"use client";
import React from "react";
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
import { useDeleteClinicMutation, useGetClinicsQuery } from "@/app/store/api/clinicApi";

const Clinics = () => {
  const { data: clinics, isLoading } = useGetClinicsQuery(null);
  console.log(clinics, "clinics");
  const [deleteClinic] = useDeleteClinicMutation();

  const columns: TableColumn[] = [
    { key: "clinicName", label: "Clinic Name", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "idNumber", label: "ID Number", type: "text" },
    { key: "joinDateTime", label: "Join Date & Time", type: "text" },
  ];

  const clinicsData =
    clinics?.data?.clinics?.map((clinic: any) => ({
      clinicName: clinic.name,
      location: clinic.address,
      idNumber: clinic.id,
      joinDateTime: new Date(clinic.created_at).toLocaleString(),
    })) || [];

    
  const tableActions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[#555F7E] hover:border p-1 rounded-full">
          <BsThreeDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => console.log("Update", row)}>
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Delete", row)}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
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
          <h5 className="text-base sm:text-[1.5rem] font-bold">Clinics</h5>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/add-clinic"
            className="text-sm text-main flex gap-2 items-center border p-2 rounded-md cursor-pointer"
          >
            <TbNotes />
            Add New Clinic <FaPlus size={10} />
          </Link>
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
                <SelectItem value="date">Sort by Date</SelectItem>
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
    </div>
  );
};

export default Clinics;
