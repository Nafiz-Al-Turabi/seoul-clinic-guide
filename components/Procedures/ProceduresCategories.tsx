'use client';
import React, { useState, useRef, useEffect } from 'react';
import StemCell from '../Home/Procedures/Tabcomponents/StemCell';
import { MdClose, MdKeyboardArrowRight, MdMenu } from 'react-icons/md';
import {
  useGetClinicCategoryQuery,
  useGetProcedureByCategoryQuery,
} from '@/app/store/api/clinicApi';
import ProcedureCard from '../ui/Cards/ProcedureCard';

interface Category {
  id: string;
  name: string;
}

const ProceduresCategories = () => {
  const [activeTab, setActiveTab] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: clinic_category, isLoading: loadingCategories } =
    useGetClinicCategoryQuery(null);
  const categories: Category[] = clinic_category?.data || [];

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab({ id: categories[0].id, name: categories[0].name });
    }
  }, [categories]);

  const { data: procedures, isLoading: loadingProcedures } =
    useGetProcedureByCategoryQuery(activeTab?.id, {
      skip: !activeTab?.id,
    });

  const proceduresData = procedures?.data || [];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      <div
        ref={menuRef}
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out p-6 lg:p-0  lg:rounded-none z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-[#305162]">Procedures</h4>
          <button onClick={() => setIsOpen(false)} className="text-[#305162]">
            <MdClose size={24} />
          </button>
        </div>

        <h4 className="hidden lg:block font-medium text-[#B4B4B4] mb-4">Procedures</h4>

        <div className="flex flex-col gap-3">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item);
                setIsOpen(false);
              }}
              className={`text-left px-4 py-2 lg:py-3 rounded-full duration-300 font-medium text-sm lg:text-lg cursor-pointer ${
                activeTab?.id === item.id
                  ? 'bg-[#68B0D4] text-white'
                  : 'text-[#305162] hover:text-[#B4B4B4]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-[86rem] mx-auto px-4 2xl:px-0">
      <p className="flex items-center gap-2 text-xl text-[#305162] font-semibold mb-4">
          Clinics <MdKeyboardArrowRight /> {activeTab?.name}
        </p>
        {loadingProcedures ? (
          <p>Loading...</p>
        ) : proceduresData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {proceduresData.map((procedure: any) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No procedures found.</p>
        )}
      </div>
    </div>
  );
};

export default ProceduresCategories;
