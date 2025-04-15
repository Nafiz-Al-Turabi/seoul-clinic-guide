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
import {
  useDeleteClinicMutation,
  useGetClinicsQuery,
} from "@/app/store/api/clinicApi";
import { toast } from "sonner";

const Clinics = () => {
  const { data: clinics, isLoading, refetch } = useGetClinicsQuery(null);
  const [deleteClinic] = useDeleteClinicMutation();

  const columns: TableColumn[] = [
    { key: "name", label: "Clinic Name", type: "text" },
    { key: "address", label: "Location", type: "text" },
    { key: "id", label: "ID Number", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];

  // keep raw clinic objects
  const clinicsData =
    clinics?.data?.clinics?.map((clinic: any) => ({
      ...clinic,
      created_at: new Date(clinic.created_at).toLocaleString(),
    })) || [];

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
        <DropdownMenuItem onClick={() => console.log("Update", clinic)}>
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
