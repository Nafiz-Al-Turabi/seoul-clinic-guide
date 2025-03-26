"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/logo.svg";
import CustomImage from "@/components/reusable/CustomImage";

const menus = [
  { path: "/", label: "Home" },
  {
    label: "Categories",
    dropdown: [
      { path: "#", label: "Skincare" },
      { path: "#", label: "Hair" },
    ],
  },
  {
    label: "Clinics",
    dropdown: [
      { path: "#", label: "Seoul Clinics" },
      { path: "#", label: "Top Rated" },
    ],
  },
  { path: "#", label: "Procedures" },
  { path: "#", label: "Blogs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <nav className="bg-white z-50 relative py-2">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <CustomImage src={logo} alt="Logo"  />
          {/* <Image src={logo} alt="Logo"  /> */}
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden lg:flex flex-1 justify-center gap-6 items-center relative"
          ref={dropdownRef}
        >
          {menus.map((menu, idx) =>
            menu.dropdown ? (
              <div key={idx} className="relative">
                <button
                  onClick={() =>
                    setDropdownOpen(
                      dropdownOpen === menu.label ? "" : menu.label
                    )
                  }
                  className="flex items-center gap-1 text-base text-gray-700 hover:text-[#68B0D4] duration-300 cursor-pointer"
                >
                  {menu.label} <ChevronDown size={14} />
                </button>
                {dropdownOpen === menu.label && (
                  <div className="absolute top-full mt-2 w-44 bg-white shadow-lg rounded-md  py-2 z-40 animate-fadeIn">
                    {menu.dropdown.map((item, subIdx) => (
                      <Link
                        key={subIdx}
                        href={item.path}
                        className="block px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                href={menu.path}
                className="text-base p-2.5  hover:text-[#68B0D4] duration-300"
              >
                {menu.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex gap-2">
          <Link
            href="/auth/login"
            className="px-6 py-2.5 primary-bg text-white rounded-full text-sm  transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-2.5 border border-[#68B0D4]  rounded-full text-sm hover:bg-sky-50 transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed lg:hidden top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-end mb-4">
            <button onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {menus.map((menu, idx) =>
            menu.dropdown ? (
              <div key={idx} className="mb-3">
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium"
                  onClick={() => toggleMobileDropdown(menu.label)}
                >
                  {menu.label}
                  <ChevronDown
                    size={16}
                    className={`transform transition ${
                      mobileDropdowns[menu.label] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdowns[menu.label] && (
                  <div className="ml-3 mt-1 space-y-1">
                    {menu.dropdown.map((item, subIdx) => (
                      <Link
                        key={subIdx}
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm text-gray-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                href={menu.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 mb-3"
              >
                {menu.label}
              </Link>
            )
          )}

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-[#68B0D4] text-white rounded-full text-sm text-center mb-2 hover:bg-sky-500 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 border border-[#68B0D4] text-[#68B0D4] rounded-full text-sm text-center hover:bg-sky-50 transition"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Fade Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
