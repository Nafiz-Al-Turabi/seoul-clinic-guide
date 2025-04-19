import Image from "next/image";
import React from "react";
import stemCell from "@/public/assets/stemCellImages/stem-cell.jpg";
import stemCell2 from "@/public/assets/stemCellImages/filler.png";

const ProcedureCard = () => {
  return (
    <div>
      <div>
        <Image
          src={stemCell}
          alt="stem-cell"
          className="aspect-3/2 object-cover rounded-lg"
        />
      </div>
      <h5 className="text-base primary-text font-bold">Hello bangladesh</h5>
      <p className="text-sm text-gray-400">4 clinics</p>
    </div>
  );
};

export default ProcedureCard;
