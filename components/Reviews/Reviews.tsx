import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";

const Reviews = ({ reviewData }: { reviewData: any }) => {
  console.log("review from bangladesh", reviewData);
  const { headline, rating, review, user, images, created_at } = reviewData;
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="container mx-auto px-4 2xl:px-0">
      <div className=" bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold secondary-text  mr-3">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{user?.name}</div>
              <div className="text-xs text-gray-500">{formattedDate}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <VscVerifiedFilled className="text-gray-600" />
            <span className="text-xs text-green-600 font-medium">
              Review Verified
            </span>
          </div>
        </div>
        {/* Title & Stars */}
        <div className="mt-4">
          <div className="font-bold text-lg text-gray-900">
            {headline}
          </div>
          <div className="flex items-center mt-1">
            {[...Array(rating)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Review Text */}
        <div className="mt-3 text-gray-700 text-sm">
          {review}
        </div>
        {/* Images */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16 gap-4 mt-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-md overflow-hidden bg-gray-100"
            >
              <img
                src={img?.image_url}
                alt={`Review photo ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
