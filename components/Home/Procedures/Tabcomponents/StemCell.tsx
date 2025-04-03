import React from "react";
import stemCell from "@/public/assets/stemCellImages/stem-cell.jpg";
import stemCell2 from "@/public/assets/stemCellImages/filler.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const stemCellData = [
  {
    id: 1,
    image: stemCell,
    title: "Stem Cell Facial",
  },
  {
    id: 2,
    image: stemCell2,
    title: "Stem Cell Facial",
  },
];

const StemCell = () => {
  const pathname = usePathname();
  const isStemCell = pathname === "/procedures";

  return (
    <div
      className={`grid gap-4 ${
        isStemCell
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
      }`}
    >
      {stemCellData.map((item) => (
        <div key={item.id}>
          <div>
            <Image
              src={item.image}
              alt="stem-cell"
              className="aspect-3/2 object-cover rounded-lg"
            />
          </div>
          <h5 className="primary-text font-bold">{item.title}</h5>
          <p className="text-sm text-gray-400">4 clinics</p>
        </div>
      ))}
    </div>
  );
};

export default StemCell;
