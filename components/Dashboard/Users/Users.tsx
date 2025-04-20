"use client";
import React from "react";
import CustomTable, { TableColumn } from "../../reusable/CustomTable";
import { PiUsersThree } from "react-icons/pi";
import placeholder from "@/public/placeholder.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsSortDown } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useGetusersQuery } from "@/app/store/api/userApi";

// const data = [
//   {
//     name: "Paula Mora",
//     image: girlImage,
//     idNumber: "#123",
//     email: "r.g.rhodes@aol.com",
//     joinDateTime: "Feb 27, 2025 7:02 am",
//   },
//   {
//     name: "Autumn Phillips",
//     image: girlImage,
//     idNumber: "#234",
//     email: "judith403@gmail.com",
//     joinDateTime: "Mar 10, 2025 11:06 pm",
//   },
//   {
//     name: "Corina McCoy",
//     image: girlImage,
//     idNumber: "#784",
//     email: "k.p.allen@aol.com",
//     joinDateTime: "Mar 17, 2025 11:08 pm",
//   },
//   {
//     name: "Alex Buckmaster",
//     image: girlImage,
//     idNumber: "#236",
//     email: "Daniel_hamilton@aol.com",
//     joinDateTime: "Mar 9, 2025 10:52 pm",
//   },
//   {
//     name: "Patricia Sanders",
//     image: girlImage,
//     idNumber: "#189",
//     email: "katie63@aol.com",
//     joinDateTime: "Mar 13, 2025 3:31 am",
//   },
//   {
//     name: "Eddie Lake",
//     image: girlImage,
//     idNumber: "#018",
//     email: "k_pacheco@gmail.com",
//     joinDateTime: "Feb 19, 2025 11:07 pm",
//   },
//   {
//     name: "Rodger Struck",
//     image: girlImage,
//     idNumber: "#018",
//     email: "k.r.mastrangelo@outlook.com",
//     joinDateTime: "Mar 4, 2025 1:12 pm",
//   },
//   {
//     name: "Kenneth Allen",
//     image: girlImage,
//     idNumber: "#018",
//     email: "lorri73@gmail.com",
//     joinDateTime: "Mar 6, 2025 9:14 am",
//   },
//   {
//     name: "Kimberly Mastrangelo",
//     image: girlImage,
//     idNumber: "#018",
//     email: "alex941@outlook.com",
//     joinDateTime: "Feb 27, 2025 1:03 pm",
//   },
//   {
//     name: "Frances Swann",
//     image: girlImage,
//     idNumber: "#018",
//     email: "patricia651@outlook.com",
//     joinDateTime: "Mar 12, 2025 10:10 am",
//   },
//   {
//     name: "Rhonda Rhodes",
//     image: girlImage,
//     idNumber: "#018",
//     email: "m.k.freund@aol.com",
//     joinDateTime: "Mar 8, 2025 3:10 pm",
//   },
//   {
//     name: "Dennis Callis",
//     image: girlImage,
//     idNumber: "#789",
//     email: "r.m.smith@gmail.com",
//     joinDateTime: "Mar 2, 2025 2:28 pm",
//   },
// ];

const Users = () => {
  const { data, isLoading  } = useGetusersQuery(1)
  console.log(data?.data?.users, "user_data");
  const users = data?.data?.users || [];

  const usersData = users?.map((user: any) => ({
    name: user.name,
    image: user.avatar_url || placeholder,
    phone_number: user.phone_number,
    email: user.email,
    joinDateTime: user.updated_at ? new Date(user.updated_at).toLocaleString() : "N/A",
  }));
  
  const columns: TableColumn[] = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Name", type: "text" },
    { key: "phone_number", label: "Number", type: "text" },
    { key: "email", label: "Email Address", type: "text" },
    { key: "joinDateTime", label: "Join Date & Time", type: "text" },
  ];

  const tableActions = (row: any) => (
    <button className="border-b text-[#555F7E] capitalize">View</button>
  );
  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 ">
        <div className="flex items-center gap-2">
          <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
            <PiUsersThree size={20} />
          </span>
          <h5 className="text-base sm:text-[1.5rem] font-bold">Users</h5>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Select>
            <SelectTrigger className="justify-between py-5">
              <span className="flex items-center gap-2">
                <MdOutlineCalendarMonth   size={20} />
                <SelectValue placeholder="Select Month" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
      <CustomTable data={usersData} columns={columns} actions={tableActions} />
    </div>
  );
};

export default Users;
