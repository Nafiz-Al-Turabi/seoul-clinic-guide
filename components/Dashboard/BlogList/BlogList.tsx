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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectValue } from "@radix-ui/react-select";
import { BsSortDown, BsThreeDotsVertical } from "react-icons/bs";
import React from "react";
import { BiNotepad } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import Link from "next/link";
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/app/store/api/blogApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BlogList = () => {
  const router  = useRouter()
  const { data: blogs, isLoading,refetch } = useGetBlogsQuery(null);
  const [deleteBlog ] = useDeleteBlogMutation();


  const columns: TableColumn[] = [
    { key: "banner_url", label: "Thumbnail", type: "image" },
    { key: "title", label: "Blog Title ", type: "text" },
    { key: "author_name", label: "Author Name", type: "text" },
    { key: "updated_at", label: "Date & Time", type: "text" },
  ];
  
  const blogsData =
    blogs?.data?.blogs?.map((blog: any) => ({
      ...blog,
      updated_at: new Date(blog.updated_at).toLocaleString(),
    })) || [];

  const handleDelete = async (BlogId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Blog?"
    );
    if (!confirmed) return;

    try {
      await deleteBlog(BlogId).unwrap();
      toast.success("Clinic deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete clinic.");
    }
  };


    const tableActions = (blog: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-[#555F7E] hover:border p-1 rounded-full">
            <BsThreeDotsVertical size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => router.push(`/dashboard/blog-post/${blog.id}`)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(blog.id)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return (
    <div className="bg-white p-4 border border-[#EEF3F8] rounded-[12px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 ">
        <div className="flex items-center gap-2">
          <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
            <BiNotepad size={20} />
          </span>
          <h5 className="text-base sm:text-[1.5rem] font-bold">Blogs</h5>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link
            href="/dashboard/blog-post"
            className="text-sm text-main flex gap-2 items-center border p-2 rounded-md cursor-pointer"
          >
            <TbNotes />
            Add New Blog <FaPlus size={10} />
          </Link>
          <Select>
            <SelectTrigger className=" justify-between text-main  py-5">
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
      <CustomTable data={blogsData} columns={columns} actions={tableActions} />
    </div>
  );
};

export default BlogList;
