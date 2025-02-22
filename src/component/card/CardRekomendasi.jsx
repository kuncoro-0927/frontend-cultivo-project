/* eslint-disable react/prop-types */

import { Skeleton } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";

export default function CardRekomendasi({
  title,
  image,
  price,
  average_rating,
  isLoading,
}) {
  const truncateTitle = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div className="border border-gray-300 rounded-lg h-full max-h-[280px] md:w-[250px] lg:w-[270px] 2xl:w-[300px] lg:max-h-[380px] md:max-h-[300px] relative overflow-hidden group flex flex-col">
      {/* Bagian Gambar */}
      <div className="relative w-full overflow-hidden flex-shrink-0">
        {/* Skeleton untuk Gambar */}
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <img
            className="lg:h-[200px] md:h-[175px] w-full h-[160px] object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt="Image"
          />
        )}

        {/* Rating di pojok kiri bawah */}
        {isLoading ? (
          <Skeleton
            variant="text"
            width="50%"
            height={30}
            className="absolute bottom-0 left-0 py-1 px-5 backdrop-blur-lg text-white rounded-tr-lg text-sm font-medium flex items-center"
          />
        ) : (
          <div className="absolute bottom-0 left-0 py-1 px-5 backdrop-blur-lg text-white rounded-tr-lg text-sm font-medium flex items-center">
            <span className="mr-1 flex items-center gap-1">
              <FaStar className="text-yellow-300" /> {average_rating || "0.0"}
            </span>
          </div>
        )}
      </div>

      {/* Bagian Konten */}
      <div className="flex flex-col px-3 py-2 md:py-2 flex-grow">
        {/* Skeleton untuk Judul */}
        {isLoading ? (
          <Skeleton
            width="80%"
            height={20}
            className="mb-7 md:mb-4 font-bold text-hitam2"
          />
        ) : (
          <h1
            className="text-sm md:text-base mb-7 md:mb-4 font-bold text-hitam2"
            title={title} // Tooltip agar bisa melihat judul lengkap saat hover
          >
            {truncateTitle(title, 23)}
          </h1>
        )}

        {/* Bagian Bawah: From dan Harga */}
        <div className="flex items-center mt-auto">
          {/* Skeleton untuk Harga */}
          {isLoading ? (
            <div className="flex items-center ml-auto">
              <Skeleton width="50%" height={20} />
            </div>
          ) : (
            <div>
              <p className="text-[0.5rem] md:text-[0.7rem] md:font-normal">
                Dari
              </p>
              <p className="text-[0.8rem] sm:text-base font-semibold md:text-sm lg:text-base lg:font-bold">
                IDR {price}
              </p>
            </div>
          )}

          {/* Skeleton untuk Icon */}
          {isLoading ? (
            <div className="ml-auto">
              <Skeleton variant="circular" width={30} height={30} />
            </div>
          ) : (
            <div className="flex items-center ml-auto">
              <div className="py-2 px-2 rounded-full md:px-3 md:py-3 bg-button text-white md:rounded-full md:ml-2 lg:ml-2 lg:py-3 lg:px-3 items-center">
                <LuArrowRight className="lg:text-sm" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
