import Image from "next/image";
import React from "react";
import placeholder from "@/public/clinic.png";
import Link from "next/link";

const ClinicCard = ({clinic}) => {
  return (
    <Link href={`/clinics/${clinic?.slug}`} className="px-2 flex flex-col  group">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
        <Image
          src={clinic?.preview_image_url || placeholder}
          alt={clinic?.name || "Clinic Image"}
          fill
          className="object-cover object-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
        <h4 className="primary-text">{clinic?.name}</h4>
      <div>
        <p className="text-sm text-gray-500">{clinic?.address}</p>
      </div>
    </Link>
  );
};

export default ClinicCard;
