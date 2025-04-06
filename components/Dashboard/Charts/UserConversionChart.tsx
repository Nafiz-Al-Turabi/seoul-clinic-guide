"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

import { LuChartLine } from "react-icons/lu";
import { FiInfo } from "react-icons/fi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserConversionChart = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
        startAngle: 0,
        endAngle: 460,
        expandOnClick: false,
        customScale: 1,
        offsetY: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },
    stroke: {
      show: true,
      width: 10,
      colors: ["#fff"],
      lineCap: "round", 
    },
    colors: ["#2D4C57", "#5AAEDF", "#B6DDF7"],
    labels: ["Visitor Converted", "Visitor Pending", "Visitor Left"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const chartSeries = [204, 52, 24]; 

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#EAF4FA] p-2 rounded-md">
            <LuChartLine size={20} className="text-[#5AAEDF]" />
          </div>
          <h4 className="text-lg font-semibold">User Conversion Rate</h4>
        </div>
        <FiInfo size={20} className="text-main cursor-pointer" />
      </div>

      <div className="flex flex-col items-center">
        <ReactApexChart
          options={chartOptions as ApexOptions}
          series={chartSeries}
          type="donut"
          width={400}
        />

        {/* Legend */}
        <div className="flex mt-4 gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2D4C57]"></span>
            Visitor Converted
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#5AAEDF]"></span>
            Visitor Pending
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#B6DDF7]"></span>
            Visitor Left
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversionChart;
