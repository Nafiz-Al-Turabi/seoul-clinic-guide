import Image from "next/image";
import React from "react";
import placeholder from "@/public/clinic.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ClinicCard = ({ clinic }) => {
  const router = useRouter();
  return (
    <Link
      href={`/clinics/${clinic?.slug}`}
      className="px-2 flex flex-col justify-between bg-white group h-[520px] p-4 shadow rounded-xl"
    >
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
          <Image
            src={clinic?.preview_image_url || placeholder}
            alt={clinic?.name || "Clinic Image"}
            fill
            className="object-cover object-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mb-2">
          <h4 className="primary-text">{clinic?.name}</h4>
          <p className="text-sm text-gray-500">{clinic?.address}</p>
        </div>
      </div>
      <button onClick={() => router.push(`/clinics/${clinic?.slug}`)} className="primary-bg text-white px-4 py-2 rounded-full cursor-pointer">
        View Details
      </button>
    </Link>
  );
};

export default ClinicCard;
