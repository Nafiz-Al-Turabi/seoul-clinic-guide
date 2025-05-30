import Image from "next/image";
import React from "react";
import placeholder from "@/public/clinic-placeholder.jpg";
import Link from "next/link";

const ProcedureCard = ({procedure}) => {
  return (
    <Link href={`/clinics?procedure=${procedure?.id}`} className="bg-transparent p-1 hover:bg-[#68b0d421] duration-300 rounded-lg">
      <div className="relative object-cover rounded-lg overflow-hidden">
        <Image
          src={procedure?.image_url || placeholder}
          width={400}
            height={300}
          alt="stem-cell"
          className="aspect-3/2 object-cover rounded-lg"
        />
      </div>
      <h5 className="text-base primary-text font-bold">{procedure?.name}</h5>
      <p className="text-sm text-gray-400">{procedure?.clinic_count} Clinics</p>
    </Link>
  );
};

export default ProcedureCard;
