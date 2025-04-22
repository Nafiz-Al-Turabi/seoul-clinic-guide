import { useGetusersQuery } from "@/app/store/api/userApi";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import React from "react";
import { LuUsers } from "react-icons/lu";
import placeholder from "@/public/placeholder.png";

const OverviewUsers = () => {
  const { data, isLoading } = useGetusersQuery(1);
  const users = data?.data?.users || [];


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
    <div className="flex items-center gap-2">
      <button className="text-[#555F7E] hover:border p-1 rounded-full">
        <LuUsers size={20} />
      </button>
      <button className="text-[#555F7E] hover:border p-1 rounded-full">
        <LuUsers size={20} />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full ">
      <div className="flex items-center gap-2">
        <span className="bg-[#EAF4FA] p-2 rounded-md">
          <LuUsers size={20} />
        </span>
        <h5 className="text-xl font-semibold main-text">User List</h5>
      </div>
      <div>
        <CustomTable data={usersData} columns={columns} />
      </div>
    </div>
  );
};

export default OverviewUsers;
