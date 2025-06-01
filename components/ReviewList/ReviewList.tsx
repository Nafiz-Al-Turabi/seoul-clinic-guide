"use client";
import React, { useState } from "react";
import CustomTable, { TableColumn } from "../reusable/CustomTable";
import {
  useGetAdminReviewsQuery,
  useGetReviewDetailsQuery,
} from "@/app/store/api/reviewsApi";
import { FaStar } from "react-icons/fa";

const ReviewList = () => {
  const { data, isLoading } = useGetAdminReviewsQuery(null);
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
  }));

  const formatReview = (review: string) => {
    return review?.split(" ").slice(0, 20).join(" ") + "...";
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

  const formatData = (data: any) => {
    return data?.map((item: any) => ({
      ...item,
      message: formatReview(item?.message),
      rating: formatRating(item?.rating),
    }));
  };

  const columns: TableColumn[] = [
    { key: "name", label: "Name", type: "text" },
    { key: "referer", label: "referer", type: "text" },
    { key: "procedure", label: "Procedure", type: "text" },
    { key: "clinic_name", label: "Clinic Name", type: "text" },
    { key: "rating", label: "Rating", type: "text" },
    { key: "message", label: "Reviews", type: "text" },
  ];

  const TableActions = (row: any) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedReviewId(row.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
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

  console.log(reviewDetails, "reviewDetails");

  return (
    <div>
      <CustomTable
        columns={columns}
        data={formatData(reviewsData)}
        actions={TableActions}
      />

      {selectedReviewId && reviewDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-4 sm:mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Review Details
            </h3>

            {detailsLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div>
                <div className="mb-4">
                  <p>
                    <strong>Name:</strong> {reviewDetails?.data?.user?.name}
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Clinic:</strong> {reviewDetails?.data?.clinic?.name}
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Procedure:</strong> {reviewDetails.procedure}
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Rating:</strong> {reviewDetails.rating}
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Message:</strong> {reviewDetails?.data?.review}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setSelectedReviewId(null)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                Close
              </button>
              <button
                onClick={() => handleApproveReview(reviewDetails.id)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => handleRejectReview(reviewDetails.id)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
