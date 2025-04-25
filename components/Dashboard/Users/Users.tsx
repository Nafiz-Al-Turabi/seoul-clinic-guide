"use client";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "@/components/shared/Loading/Loading";

const Users = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sortBy, setSortBy] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const router = useRouter();

  const { data, isLoading } = useGetusersQuery({ page, limit, sortBy, month });
  const users = data?.data?.users || [];
  const totalPages = data?.data?.totalPages || 0;
  

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
                toast.success(
                  `User is now ${checked ? "an Admin" : "a regular User"}`
                );
              } catch (err) {
                console.error("Failed to update role", err);
              }
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    router.push(`/dashboard/users?page=${selectedItem.selected + 1}&sortBy=${sortBy}&month=${month}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
          <Select onValueChange={(value) => setMonth(Number(value))}>
            <SelectTrigger className="justify-between py-5">
              <span className="flex items-center gap-2">
                <MdOutlineCalendarMonth size={20} />
                <SelectValue placeholder="Select Month" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CustomTable data={usersData} columns={columns} actions={tableActions} />
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

export default Users;
