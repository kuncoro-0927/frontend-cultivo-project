/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";

export default function CardRekomendasi({
  title,
  image,
  price,
  average_rating,
}) {
  return (
    <div className="border  border-gray-300 rounded-lg w-full h-full  max-h[250px] md:max-w-[250px] lg:max-w-[270px] lg:max-h-[380px] md:max-h-[300px] relative overflow-hidden group  flex flex-col">
      {/* Bagian Gambar */}
      <div className="relative  w-full overflow-hidden flex-shrink-0">
        <img
          className="lg:h-[200px] md:h-[175px] w-full h-[160px] object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt="Image"
          style={{
            imageRendering: "auto",
            WebkitOptimizeContrast: "high",
          }}
        />

        {/* Rating di pojok kiri bawah */}
        <div className="absolute  bottom-0 left-0 py-1 px-5 backdrop-blur-lg text-white rounded-tr-lg text-sm font-medium flex items-center">
          <span className="mr-1 flex items-center gap-1">
            <FaStar className="text-yellow-300" /> {average_rating || "0.0"}
          </span>
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="flex flex-col px-3 py-2 md:py-2 flex-grow">
        <h1 className="text-sm md:text-base mb-7 md:mb-4 font-bold text-hitam2">
          {title}
        </h1>

        {/* Bagian Bawah: From dan Harga */}
        <div className="flex items-center mt-auto">
          <div>
            <p className="text-[0.5rem] md:text-[0.7rem] md:font-normal">
              Dari
            </p>
            <p className="text-[0.8rem] sm:text-base font-semibold md:text-sm lg:text-base lg:font-bold">
              IDR {price}
            </p>
          </div>
          <div className="flex items-center ml-auto">
            <div className="py-2 px-2 rounded-full md:px-3 md:py-3 bg-button text-white md:rounded-full md:ml-2 lg:ml-2 lg:py-3 lg:px-3 items-center">
              <LuArrowRight className="lg:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
