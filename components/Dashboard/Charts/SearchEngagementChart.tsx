"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { ApexOptions } from "apexcharts";
import { LuChartSpline } from "react-icons/lu";
import { FiInfo } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyData = [
  1000, 2000, 500, 2000, 4500, 2800, 1600, 3500, 3700, 2500, 2900,
];

const formatValue = (val: number) =>
  val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toString();

const SearchEngagementChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("Sep");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedIndex = months.indexOf(selectedMonth);
  const selectedValue = monthlyData[selectedIndex];
  const formattedValue = formatValue(selectedValue);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        height: 350,
        fontFamily: "Inter, sans-serif",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "straight",
        width: 3,
        colors: ["#68B0D4"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.1,
          stops: [0, 100],
          colorStops: [
            { offset: 0, color: "#68B0D4", opacity: 0.3 },
            { offset: 100, color: "#68B0D4", opacity: 0.1 },
          ],
        },
      },
      grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 5,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        max: Math.ceil(Math.max(...monthlyData) / 1000) * 1000,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => (val >= 1000 ? `${val / 1000}k` : val),
          style: {
            colors: "#000",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        x: { show: false },
        y: {
          formatter: (val: number) => val.toLocaleString(),
        },
        marker: { show: false },
        theme: "light",
      },
      markers: {
        size: 0,
        colors: ["#68B0D4"],
        strokeColors: "#FFFFFF",
        strokeWidth: 4,
        hover: { size: 8 },
      },
      annotations: {
        xaxis: [
          {
            x: selectedMonth,
            borderColor: "#111",
            strokeDashArray: 2,
            label: {
              show: true,
              borderColor: "#68B0D4",
              style: {
                color: "#fff",
                background: "#68B0D4",
                fontSize: "12px",
              },
              text: `${formattedValue}`,
              offsetY: -8,
            },
          },
        ],
      },
    }),
    [selectedMonth]
  );

  const series = [
    {
      name: "",
      data: monthlyData,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
            <LuChartSpline size={20} />
          </div>
          <h5 className="text-lg font-semibold text-main">Search Engagement</h5>
          <button className="text-main cursor-pointer">
            <FiInfo size={20} />
          </button>
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-between gap-2 px-4 py-2 border rounded-lg text-sm focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <CiCalendar size={20} />

            <span>{selectedMonth}</span>
            <ArrowDown size={16} className="text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
              {months.map((month) => (
                <div
                  key={month}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(month);
                    setIsDropdownOpen(false);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ReactApexChart
        options={chartOptions as ApexOptions}
        series={series}
        type="area"
        height={330}
      />
    </div>
  );
};

export default SearchEngagementChart;
