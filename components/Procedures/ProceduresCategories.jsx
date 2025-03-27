'use client'
import React, { useState } from 'react';

const categories = [
    'All Procedures',
    'Procedures',
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

const ProceduresCategories = () => {
    const [activeTab, setActiveTab] = useState('Procedures');

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
                                    ? 'bg-[#305162] text-white'
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
                <h2 className="text-2xl font-semibold mb-2">{activeTab}</h2>
                <p className="text-gray-600">
                    This is the content for <strong>{activeTab}</strong>. You can customize this section to display
                    information, images, or other components based on the selected category.
                </p>
            </div>
        </div>
    );
};

export default ProceduresCategories;
