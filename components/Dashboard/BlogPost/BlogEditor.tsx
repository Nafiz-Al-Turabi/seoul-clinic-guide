"use client";
import { PiTextTBold } from "react-icons/pi";
import { TbPhotoVideo } from "react-icons/tb";
import { FaListOl } from "react-icons/fa";

export default function BlogEditor() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <hr className="w-full border border-[#151623]" />
        <div className="flex gap-4 border border-black p-1.5 rounded-full">
          <button className="border border-black p-2 rounded-full text-main cursor-pointer">
            <PiTextTBold size={20} />
          </button>
          <button className="border border-black p-2 rounded-full text-main cursor-pointer">
            <TbPhotoVideo size={20} />
          </button>
          <button className="border border-black p-2 rounded-full text-main cursor-pointer">
            <FaListOl size={20} />
          </button>
        </div>
        <hr className="w-full border border-black" />
      </div>
    </div>
  );
}
