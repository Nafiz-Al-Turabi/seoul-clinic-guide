"use client";
import React from "react";
import { PiShareFat, PiUsersThree } from "react-icons/pi";
import { FiInfo } from "react-icons/fi";
import Image from "next/image";
import chartImage from "@/public/chart.svg";
import { TbUsersPlus } from "react-icons/tb";
import SearchEngagementChart from "../Charts/SearchEngagementChart";
import UserConversionChart from "../Charts/UserConversionChart";
import { useGetDashboardUserEngagementQuery } from "@/app/store/api/dashboardApi";
import Subscribers from "../Subscribers/Subscribers";
import MostSearchClinic from "../MostSearchClinic/MostSearchClinic";
import OverviewUsers from "../OverviewUsers/OverviewUsers";
const Overview = () => {
  const { data: searcUserEngagementData } =
    useGetDashboardUserEngagementQuery(null);
  console.log(searcUserEngagementData?.data, "user_engagements");
  const totalUsers = searcUserEngagementData?.data?.newUserInLast7Days || 0;
  return (
    <div>
      <header className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#EEF3F8]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
                <PiUsersThree size={20} />
              </span>
              <h5 className="text-base font-bold">User Engagements</h5>
            </div>
            <button className="text-main cursor-pointer">
              <FiInfo size={20} />
            </button>
          </div>
          <div className="my-4 flex items-center gap-2">
            <p className="text-[2rem] font-bold ">1.273</p>
            <p className="text-xs bg-[#22CAAD21] text-[#22CAAD] p-1 rounded-sm">
              +55
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs primary-text font-medium">
              User Increased by 10% in last 7 days
            </p>
            <Image
              src={chartImage}
              alt="user-engagement"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#EEF3F8]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
                <PiShareFat size={20} />
              </span>
              <h5 className="text-base font-bold">User Counts</h5>
            </div>
            <button className="text-main cursor-pointer">
              <FiInfo size={20} />
            </button>
          </div>
          <div className="my-4 flex items-center gap-2">
            <p className="text-[2rem] font-bold ">273</p>
            <p className="text-xs bg-[#22CAAD21] text-[#22CAAD] p-1 rounded-sm">
              +100
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs primary-text font-medium">
              User Increased by 10% in last 7 days{" "}
            </p>
            <Image
              src={chartImage}
              alt="user-engagement"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#EEF3F8]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#F0F6F9] rounded-md p-2 secondary-text">
                <TbUsersPlus size={20} />
              </span>
              <h5 className="text-base font-bold">New User</h5>
            </div>
            <button className="text-main cursor-pointer">
              <FiInfo size={20} />
            </button>
          </div>
          <div className="my-4 flex items-center gap-2">
            <p className="text-[2rem] font-bold ">{totalUsers?.total}</p>
            <p className="text-xs bg-[#22CAAD21] text-[#22CAAD] p-1 rounded-sm">
              +60
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs primary-text font-medium">
              User Increased by {totalUsers?.increasePercent}% in last{" "}
              {totalUsers?.days} days{" "}
            </p>
            <Image
              src={chartImage}
              alt="user-engagement"
              width={100}
              height={100}
            />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 xl:col-span-7 2xl:col-span-8">
          <SearchEngagementChart />
        </div>
        <div className=" col-span-12 xl:col-span-5 2xl:col-span-4">
          <MostSearchClinic />
        </div>
      </div>
      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 xl:col-span-7 2xl:col-span-8">
          {/* <MostSearchClinic /> */}
          <OverviewUsers />
        </div>
        <div className=" col-span-12 xl:col-span-5 2xl:col-span-4">
          <Subscribers />
        </div>
      </div>
    </div>
  );
};

export default Overview;
