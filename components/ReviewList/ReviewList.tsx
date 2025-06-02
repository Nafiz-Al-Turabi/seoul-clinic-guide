"use client";
import React, { useState } from "react";
import CustomTable, { TableColumn } from "../reusable/CustomTable";
import {
  useApproveReviewMutation,
  useDeleteReviewMutation,
  useGetAdminReviewsQuery,
  useGetReviewDetailsQuery,
} from "@/app/store/api/reviewsApi";
import { FaStar, FaTimes } from "react-icons/fa";
import Image from "next/image";

const ReviewList = () => {
  const { data, isLoading, refetch } = useGetAdminReviewsQuery(null);
  const reviews = data?.data?.reviews;
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const reviewsData = reviews?.map((review: any) => ({
    id: review?.id,
    name: review?.user?.name,
    referer: review?.referer,
    procedure: review?.procedure,
    rating: review?.rating,
    clinic_name: review?.clinic?.name,
    message: review?.review,
    approved: review?.approved,
  }));

  const formatReview = (review: string) => {
    return review?.split(" ").slice(0, 10).join(" ") + "...";
  };

  const formatRating = (rating: number) => {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">{rating}</span>
        <span>
          <FaStar size={16} color="#FFD700" />
        </span>
      </div>
    );
  };

  const formatStatus = (status: boolean) => {
    return (
      <div className="flex items-center gap-2">
        <span
          className={`font-bold text-sm px-2 py-1 rounded-md ${
            status === true
              ? "text-[#68b0d4] border-[#68b0d4]"
              : "text-[#ffe600] border-[#ffe600]"
          }`}
        >
          {status === true ? "Approved" : "Pending"}
        </span>
      </div>
    );
  };

  const formatData = (data: any) => {
    return data?.map((item: any) => ({
      ...item,
      message: formatReview(item?.message),
      rating: formatRating(item?.rating),
      approved: formatStatus(item?.approved),
    }));
  };

  const columns: TableColumn[] = [
    { key: "name", label: "Name", type: "text" },
    { key: "referer", label: "referer", type: "text" },
    { key: "procedure", label: "Procedure", type: "text" },
    { key: "clinic_name", label: "Clinic Name", type: "text" },
    { key: "rating", label: "Rating", type: "text" },
    { key: "message", label: "Reviews", type: "text" },
    { key: "approved", label: "Status", type: "text" },
  ];

  const TableActions = (row: any) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedReviewId(row.id)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Details
        </button>
      </div>
    );
  };

  const { data: reviewDetails, isLoading: detailsLoading } =
    useGetReviewDetailsQuery(selectedReviewId, {
      skip: !selectedReviewId,
    });

  const Details = reviewDetails?.data;
  console.log(Details, "Details");

  const [approveReview, { isLoading: approveLoading }] =
    useApproveReviewMutation();

  const handleApproveReview = (id: number) => {
    approveReview(id);
    refetch();
    setSelectedReviewId(null);
  };

  const [deleteReview, { isLoading: deleteLoading }] =
    useDeleteReviewMutation();

  const handleDeleteReview = (id: number) => {
    deleteReview(id);
    refetch();
    setSelectedReviewId(null);
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={formatData(reviewsData)}
        actions={TableActions}
      />

      {selectedReviewId && reviewDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 2xl:px-0 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-7xl mx-4 sm:mx-auto relative">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Review Details{" "}
              <span
                className={`text-sm px-2 py-1 rounded-md border ${
                  Details?.approved === true
                    ? "text-[#68b0d4] border-[#68b0d4]"
                    : "text-[#ffe600] border-[#ffe600]"
                }`}
              >
                {Details?.approved === true ? "Approved" : "Pending"}
              </span>
            </h3>

            {detailsLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div>
                <div className="grid grid-cols-2 border-b pb-4">
                  <div className="mb-4">
                    <p>
                      <strong>Name:</strong> {Details?.user?.name}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p>
                      <strong>Title:</strong> {Details?.headline}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p>
                      <strong>Clinic:</strong> {Details?.clinic?.name}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p>
                      <strong>Procedure:</strong> {Details?.procedure}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="flex items-center gap-1">
                      <strong>Rating:</strong> {Details?.rating}
                      <span className="text-yellow-500">
                        <FaStar size={16} />
                      </span>
                    </p>
                  </div>
                  <div className="mb-4">
                    <p>
                      <strong>Referer:</strong> {Details?.referer}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4 my-4">
                  {Details?.images?.map((img: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center">
                      <Image
                        width={100}
                        height={100}
                        src={img?.image_url}
                        alt={img.caption || `Image ${idx + 1}`}
                        className="w-32 h-32 object-cover rounded"
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {img.tags?.map((tag: string, tagIdx: number) => (
                          <span
                            key={tagIdx}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 border-t pt-4">
                  <p>
                    <strong>Reviews:</strong> {reviewDetails?.data?.review}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setSelectedReviewId(null)}
                className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                <FaTimes />
              </button>
              {Details?.approved === false && (
                <button
                  onClick={() => handleApproveReview(Details.id)}
                  disabled={approveLoading}
                  className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 ${
                    approveLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {approveLoading ? "Approving..." : "Approve"}
                </button>
              )}
              {Details?.approved === false && (
                <button
                  onClick={() => handleDeleteReview(Details.id)}
                  disabled={deleteLoading}
                  className={`bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 ${
                    deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {deleteLoading ? "Rejecting..." : "Reject"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
