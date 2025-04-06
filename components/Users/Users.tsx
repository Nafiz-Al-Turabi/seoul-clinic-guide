"use client";
import React from "react";
import CustomTable, { TableColumn } from "../reusable/CustomTable";
import { PiUsersThree } from "react-icons/pi";
import girlImage from "@/public/girl.jpg";

const data = [
  {
    name: "Paula Mora",
    image: girlImage,
    idNumber: "#123",
    email: "r.g.rhodes@aol.com",
    joinDateTime: "Feb 27, 2025 7:02 am",
  },
  {
    name: "Autumn Phillips",
    image: girlImage,
    idNumber: "#234",
    email: "judith403@gmail.com",
    joinDateTime: "Mar 10, 2025 11:06 pm",
  },
  {
    name: "Corina McCoy",
    image: girlImage,
    idNumber: "#784",
    email: "k.p.allen@aol.com",
    joinDateTime: "Mar 17, 2025 11:08 pm",
  },
  {
    name: "Alex Buckmaster",
    image: girlImage,
    idNumber: "#236",
    email: "Daniel_hamilton@aol.com",
    joinDateTime: "Mar 9, 2025 10:52 pm",
  },
  {
    name: "Patricia Sanders",
    image: girlImage,
    idNumber: "#189",
    email: "katie63@aol.com",
    joinDateTime: "Mar 13, 2025 3:31 am",
  },
  {
    name: "Eddie Lake",
    image: girlImage,
    idNumber: "#018",
    email: "k_pacheco@gmail.com",
    joinDateTime: "Feb 19, 2025 11:07 pm",
  },
  {
    name: "Rodger Struck",
    image: girlImage,
    idNumber: "#018",
    email: "k.r.mastrangelo@outlook.com",
    joinDateTime: "Mar 4, 2025 1:12 pm",
  },
  {
    name: "Kenneth Allen",
    image: girlImage,
    idNumber: "#018",
    email: "lorri73@gmail.com",
    joinDateTime: "Mar 6, 2025 9:14 am",
  },
  {
    name: "Kimberly Mastrangelo",
    image: girlImage,
    idNumber: "#018",
    email: "alex941@outlook.com",
    joinDateTime: "Feb 27, 2025 1:03 pm",
  },
  {
    name: "Frances Swann",
    image: girlImage,
    idNumber: "#018",
    email: "patricia651@outlook.com",
    joinDateTime: "Mar 12, 2025 10:10 am",
  },
  {
    name: "Rhonda Rhodes",
    image: girlImage,
    idNumber: "#018",
    email: "m.k.freund@aol.com",
    joinDateTime: "Mar 8, 2025 3:10 pm",
  },
  {
    name: "Dennis Callis",
    image: girlImage,
    idNumber: "#789",
    email: "r.m.smith@gmail.com",
    joinDateTime: "Mar 2, 2025 2:28 pm",
  },
];

const Users = () => {
    const columns: TableColumn[] = [
        { key: "image", label: "Image", type: "image" },
        { key: "name", label: "Name", type: "text" },
        { key: "idNumber", label: "ID Number", type: "text" }, 
        { key: "email", label: "Email Address", type: "text" },
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
            <PiUsersThree size={20} />
          </span>
          <h5 className="text-base sm:text-[1.5rem] font-bold">Users</h5>
        </div>
        <div>
          <button className="border p-3">Filter and other </button>
        </div>
      </div>
      <CustomTable data={data} columns={columns} actions={tableActions} />
    </div>
  );
};

export default Users;
