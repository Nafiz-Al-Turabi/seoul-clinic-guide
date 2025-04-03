'use client'
import React, { useState,JSX } from 'react';
import StemCell from '../Home/Procedures/Tabcomponents/StemCell';
import { MdKeyboardArrowRight } from 'react-icons/md';

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

const tabComponents: { [key: string]: JSX.Element } = {
    "All Procedures": <StemCell />,
    "Stem Cell": <StemCell />,
    "Nose Surgery": <>Nose Surgery</>,
    Breast: <>Breast</>,
    "Face Lift": <>Face Lift</>,
    Dental: <>Dental</>,
    "Obstetrics and Gynecology": <>Obstetrics and Gynecology</>,
    "Eye Surgery": <>Eye Surgery</>,
    Urology: <>Urology</>,
    "LGBTQ+": <>LGBTQ+</>,
};

const ProceduresCategories = () => {
    const [activeTab, setActiveTab] = useState(categories[0]);

    return (
        <div className="max-w-[86rem] mx-auto px-4 py-6 flex gap-10">
            {/* Left Tabs */}
            <div className="min-w-[250px]">
                <h4 className="font-medium text-[#B4B4B4] mb-4">Procedures</h4>
                <div className="flex flex-col gap-2">
                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`text-left p-3 rounded-full duration-300 cursor-pointer ${activeTab === item
                                    ? 'bg-[#68B0D4] text-white'
                                    : 'text-[#305162] hover:text-[#B4B4B4]'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1">
                <p className="flex items-center gap-2 text-xl text-[#305162] font-semibold mb-2 ">Procedures <MdKeyboardArrowRight /> {activeTab}</p>
                <div>
                    {tabComponents[activeTab]}
                </div>
            </div>
        </div>
    );
};

export default ProceduresCategories; 