import SidebarAccount from "../../../component/SidebarAccount";

import { CiCalendar } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
//import { IoMdDownload } from "react-icons/io";

import TicketPdf from "../../../component/TicketPdfContent";
const SoloBookings = () => {
  return (
    <>
      <section className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-20 mx-4 w-full  text-hitam">
          <h1 className="font-extrabold text-3xl mb-5">Pesanan Anda</h1>
          <span className="font-bold border-b-4 py-2 border-blue-400">
            Tiket Anda
          </span>

          <div className="ticket-card max-w-[800px] mb-4 mt-10">
            <div className="border lg:flex border-gray-200 w-full rounded-lg shadow-sm">
              {/* Kolom kiri: Gambar */}
              <div className="lg:h-[200px] h-[120px] rounded-t-lg lg:rounded-tr-none w-full lg:w-[200px] items-center justify-center lg:rounded-l-lg overflow-hidden">
                <img
                  src="/images/solo/kampungkaret.svg"
                  alt="Agrotourism"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Kolom tengah: Informasi tiket */}
              <div className="p-4 md:p-4 flex flex-col justify-between">
                <div className="">
                  <h1 className="font-bold text-lg">Kampoeng Karet</h1>
                  <p className="text-sm w-full md:w-96 max-w-xl font-medium">
                    Dukuh Kenteng, Desa Putukrejo, Kecamatan Ngargoyoso,
                    Kabupaten Karanganyar, Jawa Tengah
                  </p>
                  <p className="text-sm md:text-sm mt-4 flex items-center">
                    <IoTicketOutline className="text-sm md:text-lg mr-1 font-extrabold" />{" "}
                    <span className="mr-1 font-bold">Jumlah tiket:</span>{" "}
                    <span>1</span>
                  </p>
                  <p className="mt-2 text-sm md:text-sm flex items-center">
                    <CiCalendar className=" text-sm md:text-lg mr-1 font-extrabold" />{" "}
                    <span className="mr-1 font-bold">Tanggal Tiket: </span>{" "}
                    <span>29 Januari 2025</span>
                  </p>
                </div>
                <div>
                  <button className="underline text-sm md:text-sm">
                    Lihat Tiket
                  </button>
                </div>
              </div>

              {/* Kolom kanan: ID dan status tiket */}
              <div className="lg:text-right  p-4 md:p-4 ml-auto items-center flex lg:flex-col justify-between">
                <div className="">
                  <p className="text-sm">ID Tiket: CV02973191</p>
                  <p className="text-green-500 text-sm mt-2 font-bold">Aktif</p>
                </div>
                <div className="">
                  {/* <button className="py-2 px-3 flex ml-auto items-center font-semibold">
                    <span className="text-sm mr-2">
                      Unduh Tiket <TicketPdf />
                    </span>
                  </button> */}
                  <TicketPdf />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SoloBookings;
