"use client";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiHospitalThin } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { RiSettingsLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useGetMeQuery } from "@/app/store/api/authApi";
import useLogout from "@/hooks/useLogout";
import { on } from "events";
import { LiaProceduresSolid } from "react-icons/lia";

// Menu and Bottom items
const menuItems = [
  { href: "/dashboard", icon: <RxDashboard size={18} />, label: "Overview" },
  {
    href: "/dashboard/users",
    icon: <HiOutlineUsers size={18} />,
    label: "User list",
  },
  { href: "/dashboard/procedures", icon: <LiaProceduresSolid  size={18} />, label: "Procedures" },
  {
    href: "/dashboard/clinics",
    icon: <PiHospitalThin size={18} />,
    label: "Clinic List",
  },
  { href: "/dashboard/blogs", icon: <CgNotes size={18} />, label: "Blogs" },
];

const bottomMenu = [
  {
    href: "/dashboard/settings",
    icon: <RiSettingsLine size={18} />,
    label: "Settings",
  },
  {
    href: "/logout",
    click:true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
      >
        <path
          d="M10.5 14.3751L10.2315 15.1807C9.96675 15.975 9.10313 16.3987 8.31293 16.1222L3.75671 14.5275C2.85427 14.2116 2.25 13.3599 2.25 12.4038V6.59646C2.25 5.64034 2.85427 4.78864 3.75671 4.47278L8.31293 2.8781C9.10313 2.60154 9.96675 3.02533 10.2315 3.81955L10.5 4.62513"
          stroke="#151623"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.875 7.625L15.75 9.5L13.875 11.375M7.5 9.5H15.2934"
          stroke="#151623"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Log out",
  },
];

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: user } = useGetMeQuery(null);
  // console.log(user);
  const handleLogout = useLogout();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const TopBar = () => {
    const currentPage =
      [...menuItems]
        .sort((a, b) => b.href.length - a.href.length)
        .find(
          (item) => pathname === item.href || pathname.startsWith(item.href)
        )?.label || "Dashboard";

    return (
      <div className="bg-white text-main p-4 flex items-center justify-between border-b border-[#EEF3F8]">
        <div className="font-semibold text-2xl">{currentPage}</div>
      </div>
    );
  };

  return (
    <div className="flex bg-[#fafbfc] min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 h-screen w-64 transform bg-white border-r border-[#EEF3F8] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center py-8 pl-12">
          <Link href="/">
            <Image src={logo} alt="logo" width={100} height={100} />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 px-4">
          {menuItems.map((item, index) => {
            const isActive = (() => {
              if (item.href === "/dashboard") {
                return pathname === "/dashboard";
              }
              return pathname.startsWith(item.href);
            })();
            return (
              <div className="mb-2" key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center text-base font-medium px-4 py-3 rounded-md gap-1 ${
                    isActive
                      ? "bg-[#E7F2F8] primary-text font-medium"
                      : "text-main hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Bottom menu */}
        <div className="absolute bottom-0 w-full">
          {bottomMenu.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div className="px-2 py-1" key={index}>
                <Link
                  href={item.href}
                  onClick={item.click ? handleLogout : undefined}
                  className={`flex items-center text-base font-medium px-4 py-3 rounded-md gap-1 ${
                    isActive
                      ? "bg-[#E7F2F8] primary-text font-medium"
                      : "text-main hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            );
          })}
          <div className="flex items-center p-4">
            <div className="flex-shrink-0">
              <Image
                className="w-10 h-10 rounded-full"
                src={user?.data?.avatar_url || "/images/profile.png"}
                width={40}
                height={40}
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.data?.name}</p>
              <p className="text-xs text-gray-500">{user?.data?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-64">
        <div className="p-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-main focus:outline-none"
          >
            <HiOutlineMenuAlt1 size={26} />
          </button>
        </div>
        <TopBar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
