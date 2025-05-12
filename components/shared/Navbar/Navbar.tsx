"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/logo.svg";
import CustomImage from "@/components/reusable/CustomImage";
import DropdownProfile from "../DropdownProfile/DropdownProfile";
import { useGetMeQuery } from "@/app/store/api/authApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const menus = [
  { path: "/", label: "Home" },
  {
    label: "Categories",
    dropdown: [
      { path: "/categories", label: "All Categories" },
      {
        path: "/categories?category=6a17b3e3-62c3-42aa-8c5b-736e406eef8b",
        label: "Stem Cell",
      },
      {
        path: "/categories?category=c6966a48-88bb-44bb-a846-60688048e17f",
        label: "Thread Lifting",
      },
      {
        path: "/categories?category=cf60bd9b-af51-4a06-b6c8-139650b65540",
        label: "Nose Surgery",
      },
      {
        path: "/categories?category=91a7bd04-919e-44ac-8e72-68de87ce3e10",
        label: "Breast",
      },
      {
        path: "/categories?category=1c885913-3e2b-4442-9abd-c79c43fdce0c",
        label: "Face Lift",
      },
      {
        path: "/categories?category=495bde35-3de3-47d4-a16b-b241a527dbb9",
        label: "Dental",
      },
      {
        path: "/categories?category=1f01c0a7-8b2d-482f-969f-0994e76d1a0c",
        label: "Obstetrics and Gynecology",
      },
      {
        path: "/categories?category=d92df6da-1379-4a42-8407-ee338ede0534",
        label: "Eye Surgery",
      },
      {
        path: "/categories?category=8cfb4922-d74d-43ed-bea0-7028541a555b",
        label: "LGBTQ+",
      },
      {
        path: "/categories?category=35e7fe92-7782-4c13-b6e5-c63d3dbf0975",
        label: "Urology",
      },
      {
        path: "/categories?category=3274cfbf-cfcf-4a6f-987e-82a41a38c4ee",
        label: "Oriental Medicine",
      },
      {
        path: "/categories?category=7cd3610d-184e-4fc5-a221-3446024a3c79",
        label: "Facial Contouring",
      },
      {
        path: "/categories?category=d9d94bdd-3b4d-4b8d-a5b6-72c4a4293d3f",
        label: "Hair Removal",
      },
      {
        path: "/categories?category=d3e712e7-de40-4cc9-a269-b6a4eb6fd05b",
        label: "Botox",
      },
      {
        path: "/categories?category=08bcbb11-cb3f-46cf-9862-8d5f12d78e51",
        label: "Skin Care",
      },
      {
        path: "/categories?category=06288c0a-0061-486d-8bb1-ca8c068d0b36",
        label: "Fillers",
      },
      {
        path: "/categories?category=08bac345-e8fa-46fd-9189-adb5a1286ae0",
        label: "Hair Transplant",
      },
      {
        path: "/categories?category=60092c26-dd77-4159-8692-a42b8ed717eb",
        label: "Microblading and Make-up",
      },
      {
        path: "/categories?category=ac1894a3-f621-4a57-b552-02d00bb3df2d",
        label: "Liposuction",
      },
      {
        path: "/categories?category=e678d29d-22d3-4a15-a9e1-489d1f2e195e",
        label: "Eye Clinic",
      },
      {
        path: "/categories?category=593dc849-bfb2-4b2d-b5ab-1de06c995625",
        label: "Others",
      },
    ],
  },
  // {
  //   label: "Clinics",
  //   dropdown: [{ path: "/clinics", label: "Seoul Clinics" }],
  // },
  { path: "/clinics", label: "Clinics" },
  { path: "/procedures", label: "Procedures" },
  { path: "/blogs", label: "Blogs" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: user } = useGetMeQuery(null);

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

  // Category Navbar Active
  const isActive = (path: string) => {
    const [basePath, query] = path.split("?");
    const currentCategory = searchParams.get("category");
    const targetCategory = query
      ? new URLSearchParams(query).get("category")
      : null;
    if (!targetCategory) {
      return pathname === basePath && currentCategory === null;
    }
    return pathname === basePath && currentCategory === targetCategory;
  };

  const isDropdownActive = (items: { path: string }[]) =>
    items.some((item) => isActive(item.path));

  useEffect(() => {
    const el = document.getElementById("categories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [searchParams.toString()]);
  
  const handleCategoryClick = (path: string) => {
    setDropdownOpen("");
    router.push(path);
  };

  return (
    <nav className="bg-white z-50 relative py-2">
      <div className="container mx-auto px-4 2xl:px-0 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CustomImage src={logo} alt="Logo" />
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
                  className={`flex items-center gap-1 text-base duration-300 cursor-pointer ${
                    isDropdownActive(menu.dropdown)
                      ? "text-[#68B0D4]"
                      : "text-gray-700 hover:text-[#68B0D4]"
                  }`}
                >
                  {menu.label} <ChevronDown size={14} />
                </button>
                {dropdownOpen === menu.label && (
                  <div className="absolute top-full grid grid-cols-2 gap-2 mt-2 w-[500px] p-2 bg-white shadow-lg rounded-md py-2 z-40 animate-fadeIn">
                    {menu.dropdown.map((item, subIdx) => (
                      <button
                      key={subIdx}
                      onClick={() => handleCategoryClick(item.path)}
                      className={`block text-left w-full px-4 py-2.5 text-base hover:bg-gray-100 ${
                        isActive(item.path)
                          ? "text-[#68B0D4]"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                href={menu.path}
                className={`text-base p-2.5 duration-300 ${
                  isActive(menu.path)
                    ? "text-[#68B0D4]"
                    : "text-gray-700 hover:text-[#68B0D4]"
                }`}
              >
                {menu.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth */}
        {user ? (
          <div className="hidden lg:flex items-center gap-4">
            <DropdownProfile />
            {user?.data?.type === "admin" ? (
              <Link
                href="/dashboard"
                className="primary-bg text-white py-2.5 px-6 rounded-full duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/clinics"
                className="primary-bg text-white py-2.5 px-6 rounded-full duration-300"
              >
                Start Enquiry
              </Link>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <Link
              href="/auth/login"
              className="px-6 py-2.5 primary-bg text-white rounded-full text-sm"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2.5 border border-[#68B0D4] rounded-full text-sm hover:bg-sky-50"
            >
              Signup
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <div className="block lg:hidden">
            <DropdownProfile />
          </div>
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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
                  className={`flex items-center justify-between w-full font-medium ${
                    isDropdownActive(menu.dropdown)
                      ? "text-[#68B0D4]"
                      : "text-gray-700"
                  }`}
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
                        className={`block text-sm ${
                          isActive(item.path)
                            ? "text-[#68B0D4] font-semibold"
                            : "text-gray-600"
                        }`}
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
                className={`text-base mb-3 ${
                  isActive(menu.path) ? "text-[#68B0D4]" : "text-gray-700"
                }`}
              >
                {menu.label}
              </Link>
            )
          )}

          <div className="flex flex-col gap-2">
            {user ? (
              <Link
                href="/contact?seaul-clinic-guide-enquiry"
                className="primary-bg text-white py-2.5 px-6 rounded-full duration-300 mt-6"
              >
                Start Enquiry
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-[#68B0D4] text-white rounded-full text-sm text-center mb-2 hover:bg-sky-500"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 border border-[#68B0D4] text-[#68B0D4] rounded-full text-sm text-center hover:bg-sky-50"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
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
