"use client";
import React, { useEffect } from "react";
import { useGetSubscriptionsQuery } from "@/app/store/api/subscriptionApi";
import { MdOutlineUnsubscribe } from "react-icons/md";

const Subscribers = () => {
  const { data: subscribers,refetch } = useGetSubscriptionsQuery(null);
  const subscribersData = subscribers?.data || [];
  const token = localStorage.getItem("token");

  const handleDownload = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions/export`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
      refetch();
    },[refetch]);

  return (
    <div className="  ">
      <div className=" mx-auto bg-white border border-[#EEF3F8] rounded-xl  p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h5 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0 flex items-center gap-2">
            <span className="primary-text text-2xl">
              <MdOutlineUnsubscribe />
            </span>
            Subscriber List({subscribersData?.length || 0}) 
          </h5>
          <button
            onClick={handleDownload}
            className="bg-[#68B0D4] hover:bg-[#68B0D4]/90 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 border-b">#</th>
                <th className="px-5 py-3 border-b">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {subscribersData.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-5 py-6 text-center text-gray-400"
                  >
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                subscribersData
                  ?.slice(0, 10)
                  .map((subscriber: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50  transition duration-150"
                    >
                      <td className="px-5 py-3">{index + 1}</td>
                      <td className="px-5 py-3">{subscriber.email}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
