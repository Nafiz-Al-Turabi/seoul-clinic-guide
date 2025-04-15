"use client";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import React from "react";
import { PiHospitalThin } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { BsSortDown } from "react-icons/bs";
import { SelectValue } from "@radix-ui/react-select";
import Link from "next/link";
import { TbNotes } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

const data = [
  {
    clinicName: "r.g.rhodes@aol.com",
    location: "2900 Ritter Street, Huntsville",
    idNumber: "#123",
    joinDateTime: "Feb 27, 2025 7:02 am",
  },
  {
    clinicName: "judith403@gmail.com",
    location: "591 Joanne Lane, Wilmington",
    idNumber: "#234",
    joinDateTime: "Mar 10, 2025 11:06 pm",
  },
  {
    clinicName: "k.p.allen@aol.com",
    location: "3831 Cedar Lane, Somerville",
    idNumber: "#784",
    joinDateTime: "Mar 17, 2025 11:08 pm",
  },
  {
    clinicName: "Daniel_hamilton@aol.com",
    location: "4093 Overlook Drive, Richmond",
    idNumber: "#236",
    joinDateTime: "Mar 9, 2025 10:52 pm",
  },
  {
    clinicName: "katie63@aol.com",
    location: "970 Ersel Street, Carrollton",
    idNumber: "#189",
    joinDateTime: "Mar 13, 2025 3:31 am",
  },
  {
    clinicName: "k_pacheco@gmail.com",
    location: "1949 Linda Street, West Brunswick",
    idNumber: "#018",
    joinDateTime: "Feb 19, 2025 11:07 pm",
  },
  {
    clinicName: "m.k.freund@aol.com",
    location: "2614 Sweetwood Drive, Arvada",
    idNumber: "#018",
    joinDateTime: "Mar 4, 2025 1:12 pm",
  },
  {
    clinicName: "lorri73@gmail.com",
    location: "4267 Cherry Tree Drive, Jacksonville",
    idNumber: "#018",
    joinDateTime: "Mar 6, 2025 9:14 am",
  },
  {
    clinicName: "alex941@outlook.com",
    location: "1851 Lynch Street, New Berlin",
    idNumber: "#018",
    joinDateTime: "Feb 27, 2025 1:03 pm",
  },
  {
    clinicName: "patricia651@outlook.com",
    location: "4130 Butternut Lane, Alton",
    idNumber: "#018",
    joinDateTime: "Mar 12, 2025 10:10 am",
  },
  {
    clinicName: "m.k.freund@aol.com",
    location: "605 Dog Hill Lane, Topeka",
    idNumber: "#018",
    joinDateTime: "Mar 8, 2025 3:10 pm",
  },
  {
    clinicName: "r.m.smith@gmail.com",
    location: "467 Stutler Lane, Altoona",
    idNumber: "#789",
    joinDateTime: "Mar 2, 2025 2:28 pm",
  },
];

const Clinics = () => {
  const columns: TableColumn[] = [
    { key: "clinicName", label: "Clinic Name", type: "text" },
    { key: "location", label: "Location ", type: "text" },
    { key: "idNumber", label: "ID Number", type: "text" },
    { key: "joinDateTime", label: "Join Date & Time", type: "text" },
  ];
  const tableActions = (row: any) => (
    <button className="border-b text-[#555F7E] capitalize">View</button>
  );
  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex justify-between items-center pb-4 ">
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
            <SelectTrigger className=" justify-between  py-5">
              <span className="flex items-center gap-2">
                <BsSortDown size={20} />
                <SelectValue placeholder="Filter Sort" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="apple">Ascending</SelectItem>
                <SelectItem value="banana"> Descending</SelectItem>
                <SelectItem value="blueberry">Sort by Date</SelectItem>
                <SelectItem value="grapes"> Sort by Name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CustomTable data={data} columns={columns} actions={tableActions} />
    </div>
  );
};

export default Clinics;
