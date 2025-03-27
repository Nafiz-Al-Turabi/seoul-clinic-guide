"use client";

import React, { useState, JSX } from "react";
import StemCell from "./Tabcomponents/StemCell";

const tabs = [
  "Stem Cell",
  "Nose Surgery",
  "Breast",
  "Face Lift",
  "Dental",
  "Obstetrics and Gynecology",
  "Eye Surgery",
  "Urology",
  "LGBTQ+",
];

const tabComponents: { [key: string]: JSX.Element } = {
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

const Procedures = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="container mx-auto px-4 2xl:px-0">
      <h3 className="primary-text font-bold mb-8">Procedures</h3>

      <div className="overflow-x-auto mb-6">
        <div className="flex gap-4 w-max min-w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border
                  ${
                    activeTab === tab
                      ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                      : "border-[#EEF3F8] text-main"
                  }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div> 
      {/* Dynamic Component Rendering */}
      <div>
        {tabComponents[activeTab]}
      </div>
    </div>
  );
};

export default Procedures;
