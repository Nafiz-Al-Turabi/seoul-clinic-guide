import Image from "next/image";
import React from "react";

const ClinicCard = ({clinic}) => {
  return (
    <div key={clinic.id} className="px-2">
      <div className="">
        <Image
          src={clinic.image}
          alt="clinic-image"
          className="aspect-auto rounded-xl"
        />
      </div>
      <div>
        <h4 className="primary-text">{clinic.name}</h4>
        <p className="text-sm text-gray-500">{clinic.address}</p>
      </div>
    </div>
  );
};

export default ClinicCard;
