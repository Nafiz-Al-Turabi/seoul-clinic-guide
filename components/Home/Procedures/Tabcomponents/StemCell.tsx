import React from "react";
import stemCell from "@/public/assets/stemCellImages/stem-cell.jpg";
import stemCell2 from "@/public/assets/stemCellImages/filler.png";
import Image from "next/image";
const StemCell = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
      <div>
        <div>
          <Image
            src={stemCell}
            alt="stem-cell"
            className="aspect-3/2 object-cover rounded-lg"
          />
        </div>
        <h5 className="primary-text font-bold">Stem Cell Facial</h5>
        <p className="text-sm text-gray-500">4 clinics</p>
      </div>
    </div>
  );
};

export default StemCell;
