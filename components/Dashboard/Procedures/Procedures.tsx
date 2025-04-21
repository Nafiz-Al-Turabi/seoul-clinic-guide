"use client";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import React from "react";

const Procedures = () => {
    const data=[]
  const columns: TableColumn[] = [
    { key: "name", label: "Clinic Name", type: "text" },
    { key: "address", label: "Location", type: "text" },
    // { key: "id", label: "ID Number", type: "text" },
    { key: "created_at", label: "Join Date & Time", type: "text" },
  ];

  const tableActions = ()=>(
    <div>
        Hello
    </div>
  )
  return (
    <div>
      <CustomTable
        data={data}
        columns={columns}
        actions={tableActions}
      />
    </div>
  );
};

export default Procedures;
