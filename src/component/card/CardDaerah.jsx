/* eslint-disable react/prop-types */
// src/components/CardDaerah.jsx

import { FaLocationDot } from "react-icons/fa6";
export default function CardDaerah({ title, img }) {
  return (
    <>
      <div className="border  border-gray-300 rounded-lg w-full h-full max-w-[165px]  md:max-w-[200px] lg:max-w-[270px] lg:max-h-[380px]  relative overflow-hidden hover:-translate-y-2 duration-200 flex flex-col">
        <img
          className="lg:h-full  w-full h-full max-w-[165px] md:max-w-[200px] lg:max-w-[270px] object-cover rounded-t-lg "
          src={img}
          alt="Image"
        />

        <div className="p-4 flex items-center gap-2 text-hitam2">
          <FaLocationDot />
          {title}
        </div>
      </div>
    </>
  );
}
