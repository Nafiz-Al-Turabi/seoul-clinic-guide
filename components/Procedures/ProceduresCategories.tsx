'use client'
import React, { useState,JSX, useRef, useEffect } from 'react';
import StemCell from '../Home/Procedures/Tabcomponents/StemCell';
import { MdClose, MdKeyboardArrowRight, MdMenu } from 'react-icons/md';

const categories = [
    'All Procedures',
    'Stem Cell',
    'Nose Surgery',
    'Breast',
    'Face Lift',
    'Dental',
    'Obstetrics and Gynecology',
    'Eye Surgery',
    'LGBTQ+',
    'Urology',
];

const tabComponents = categories.reduce((acc, category) => {
    acc[category] = <p>{category}</p>;
    return acc;
  }, {} as Record<string, JSX.Element>);

const ProceduresCategories = () => {
    const [activeTab, setActiveTab] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
        <div className="max-w-[86rem] mx-auto px-4 pb-6 pt-20 flex gap-10 relative">
        
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden absolute top-6 items-center gap-2 px-4 py-2 bg-[#68B0D4] text-white rounded-full shadow-md"
      >
        <MdMenu size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out p-6 lg:p-0  lg:rounded-none z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile) */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-[#305162]">Procedures</h4>
          <button onClick={() => setIsOpen(false)} className="text-[#305162]">
            <MdClose size={24} />
          </button>
        </div>
        <h4 className="hidden lg:block font-medium text-[#B4B4B4] mb-4">Categories</h4>
        <div className="flex flex-col gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                setIsOpen(false);
              }}
              className={`text-left px-4 py-2 lg:py-3 rounded-full duration-300 font-medium text-sm lg:text-lg cursor-pointer ${
                activeTab === item
                  ? "bg-[#68B0D4] text-white"
                  : "text-[#305162] hover:text-[#B4B4B4]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <p className="flex items-center gap-2 text-xl text-[#305162] font-semibold mb-4">
          Clinics <MdKeyboardArrowRight /> {activeTab}
        </p>
        <div className="">
            
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
    );
};

export default ProceduresCategories; 