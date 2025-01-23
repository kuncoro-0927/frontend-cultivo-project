/* eslint-disable react/prop-types */
// src/components/CardDaerah.jsx

import { FaLocationDot } from "react-icons/fa6";
export default function CardDaerah({ title, img }) {
  return (
    <>
      <div className="border  border-gray-300 rounded-lg w-full h-full max-h[250px] md:max-w-[250px] lg:max-w-[270px] lg:max-h-[380px] md:max-h-[300px] relative overflow-hidden group  flex flex-col">
        <img
          className="lg:h-[200px] md:h-[175px] w-[170px] md:w-full h-[180px] object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
          src={img}
          alt="Image"
        />
        <div>
          <div className="p-4 flex items-center gap-2 text-hitam2">
            <FaLocationDot />
            {title}
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}
