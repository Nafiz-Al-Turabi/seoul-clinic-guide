"use client";

import { useState, useRef, useEffect } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import profileImage from "@/public/girl.jpg";
import Image from "next/image";
import useLogout from "@/hooks/useLogout";
import { useGetMeQuery } from "@/app/store/api/authApi";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function DropdownProfile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { data: user, isLoading } = useGetMeQuery(null);

  const handleLogout = useLogout();

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition bg-white border border-[#EEF3F8]"
      >
        <Image
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
        />
        <IoIosArrowDown />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2  bg-white rounded-xl shadow-lg z-50 p-4 space-y-3
          transition-all duration-200 transform
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <Link
          href="/profile"
          className="flex items-center gap-2 text-gray-800 hover:text-black transition w-full"
        >
          <FaUser />
          <span>Account</span>
        </Link>
        <button className="flex items-center gap-2 text-gray-800 hover:text-black transition w-full">
          <span>
            <MdEmail />
          </span>
          <span>{user?.data?.email}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-800 hover:text-red-500 transition w-full"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
