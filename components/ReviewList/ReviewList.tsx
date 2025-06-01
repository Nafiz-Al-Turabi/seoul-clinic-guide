"use client";
import React from "react";
import CustomTable, { TableColumn } from "../reusable/CustomTable";
import { useGetAdminReviewsQuery } from "@/app/store/api/reviewsApi";
import { StarIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";

const ReviewList = () => {
  const { data, isLoading } = useGetAdminReviewsQuery(null);
  const reviews = data?.data?.reviews;
  const reviewsData = reviews?.map((review: any) => ({
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

  const TableActions = () => {
    return (
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Details
        </button>
      </div>
    );
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={formatData(reviewsData)}
        actions={TableActions}
      />
    </div>
  );
};

export default ReviewList;
