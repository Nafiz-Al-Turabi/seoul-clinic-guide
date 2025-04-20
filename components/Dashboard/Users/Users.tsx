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
import { BsSortDown, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import {
  useGetusersQuery,
  useRoleUpdateMutation,
} from "@/app/store/api/userApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Users = () => {
  const { data, isLoading } = useGetusersQuery(1);
  const users = data?.data?.users || [];

  const [roleUpdate] = useRoleUpdateMutation();

  const usersData = users?.map((user: any) => ({
    id: user.id,
    name: user.name,
    type: user.type,
    image: user.avatar_url || placeholder,
    phone_number: user.phone_number,
    email: user.email,
    joinDateTime: user.updated_at
      ? new Date(user.updated_at).toLocaleString()
      : "N/A",
  }));

  const columns: TableColumn[] = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Name", type: "text" },
    { key: "phone_number", label: "Number", type: "text" },
    { key: "email", label: "Email Address", type: "text" },
    { key: "joinDateTime", label: "Join Date & Time", type: "text" },
  ];

  const tableActions = (user: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-[#555F7E] hover:border p-1 rounded-full">
          <BsThreeDotsVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2 p-2">
        <DropdownMenuItem className="text-[#046601] bg-[#04660115] cursor-pointer border">
          Details
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between items-center gap-2 border p-2">
          <span className="text-sm">
            {user.type === "admin" ? "Remove Admin" : "Make Admin"}
          </span>
          <Switch
            checked={user.type === "admin"}
            onCheckedChange={async (checked) => {
              try {
                await roleUpdate({
                  id: user.id,
                  type: checked ? "admin" : "user",
                }).unwrap();
                toast.success(`User is now ${checked ? "an Admin" : "a regular User"}`);
              } catch (err) {
                console.error("Failed to update role", err);
              }
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4">
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
                <MdOutlineCalendarMonth size={20} />
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
            <SelectTrigger className="justify-between py-5">
              <span className="flex items-center gap-2">
                <BsSortDown size={20} />
                <SelectValue placeholder="Filter Sort" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="apple">Ascending</SelectItem>
                <SelectItem value="banana">Descending</SelectItem>
                <SelectItem value="blueberry">Sort by Date</SelectItem>
                <SelectItem value="grapes">Sort by Name</SelectItem>
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
