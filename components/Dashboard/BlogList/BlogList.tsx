"use client";
import CustomTable, { TableColumn } from "@/components/reusable/CustomTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { BsSortDown } from "react-icons/bs";
import React from "react";
import { BiNotepad } from "react-icons/bi";

const BlogList = () => {
  const data = [];
  const columns: TableColumn[] = [
    { key: "thumbnail", label: "Thumbnail", type: "text" },
    { key: "blogT itle", label: "Blog Title ", type: "text" },
    { key: "author Name", label: "Author Name", type: "text" },
    { key: "date", label: "Date & Time", type: "text" },
  ];
  const tableActions = (row: any) => (
    <button className="border-b text-[#555F7E] capitalize">View</button>
  );
  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex justify-between items-center pb-4 ">
        <div className="flex items-center gap-2">
          <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
            <BiNotepad size={20} />
          </span>
          <h5 className="text-base sm:text-[1.5rem] font-bold">Blogs</h5>
        </div>
        <div>
          <Select>
            <SelectTrigger className=" justify-between  py-5">
              <span className="flex items-center gap-2">
                <BsSortDown size={20}/>
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

export default BlogList;
