"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReviewSection({
  clinicId,
  clinicName,
}: {
  clinicId: string;
  clinicName: string;
}) {
  const router = useRouter();
  return (
    <div className="px-4">
      <div className="container mx-auto xl:px-4 2xl:px-0 py-8">
        <div className="bg-white rounded-lg shadow-md border border-[#EEF3F8] overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between ">
              <div>
                <h5 className="text-2xl font-semibold text-gray-800">
                  Our Rating: 5.0
                </h5>
                <p className="text-sm text-gray-500">Based on 1 Review</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
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
                <button onClick={() => router.push(`/review?clinicId=${clinicId}&clinicName=${clinicName}`)} className="bg-[#68b0d4] text-white px-4 py-2 my-4 rounded-md hover:bg-[#68b0d4]/80 transition-all cursor-pointer">
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
