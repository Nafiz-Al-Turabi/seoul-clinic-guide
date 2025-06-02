"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

export default function ReviewSection({
  clinicId,
  clinicName,
  reviews,
}: {
  clinicId: string;
  clinicName: string;
  reviews: any;
}) {
  const router = useRouter();
  console.log(reviews, "reviews");

  const rating =
    reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) /
    reviews?.length;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaRegStarHalfStroke key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="px-4">
      <div className="container mx-auto xl:px-4 2xl:px-0 py-8">
        <div className="bg-white rounded-lg shadow-md border border-[#EEF3F8] overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between ">
              <div>
                <h5 className="text-2xl font-semibold text-gray-800">
                  Our Rating: {rating?.toFixed(1)}
                </h5>
                <p className="text-sm text-gray-500">
                  Based on {reviews?.length} Review
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-x-2">
                <span className="flex text-yellow-400">
                  {renderStars(rating || 0)}
                </span>
                <span className="text-sm text-gray-500">
                  Verified Feedback from Our Happy Patients
                </span>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <span className="text-lg  text-gray-700">
                  What Was Your Experience with{" "}
                  <span className="font-semibold">{clinicName}</span>?
                </span>
                <button
                  onClick={() =>
                    router.push(
                      `/review?clinicId=${clinicId}&clinicName=${clinicName}`
                    )
                  }
                  className="bg-[#68b0d4] text-white px-4 py-2 my-4 rounded-md hover:bg-[#68b0d4]/80 transition-all cursor-pointer"
                >
                  Share Your Review
                </button>
              </div>
              <p className="mt-2 text-gray-500">
                Be part of our growing community of satisfied patients tell us
                about your journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
