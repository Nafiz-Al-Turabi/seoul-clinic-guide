import Image from "next/image";
import React from "react";
import stemCell from "@/public/assets/stemCellImages/stem-cell.jpg";
import stemCell2 from "@/public/assets/stemCellImages/filler.png";

const ProcedureCard = ({procedure}) => {
  return (
    <div>
      <div>
        <Image
          src={procedure?.image_url || stemCell}
          width={400}
            height={300}
          alt="stem-cell"
          className="aspect-3/2 object-cover rounded-lg"
        />
      </div>
      <h5 className="text-base primary-text font-bold">{procedure?.name}</h5>
      <p className="text-sm text-gray-400">{procedure?.clinic_count}</p>
    </div>
  );
};

export default ProcedureCard;
