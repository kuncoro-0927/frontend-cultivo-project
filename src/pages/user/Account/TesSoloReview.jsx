/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import ModalReview from "../../../component/ModalReview"; // Import ModalReview

import SidebarAccount from "../../../component/SidebarAccount";

const SoloReview = () => {
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State modal
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Untuk menyimpan ticketId yang dipilih

  // Fetch tiket pengguna

  const handleOpenModal = (ticketId) => {
    setSelectedTicketId(ticketId); // Set ticketId yang dipilih
    setModalOpen(true); // Buka modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Tutup modal
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options); // Format: Januari 16, 2025
  };
  return (
    <>
      <ModalReview
        open={modalOpen}
        handleClose={handleCloseModal}
        ticketId={selectedTicketId} // Mengoper ticketId yang dipilih
      />
      <section className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-20 mx-4 w-full  text-hitam">
          <h1 className="font-extrabold text-3xl mb-5">Ulasan</h1>
          <span className="font-bold border-b-4 py-2 border-blue-400">
            Tiket Anda
          </span>

          <div className="ticket-card max-w-[800px]  mb-4 mt-10">
            <div className="border flex border-gray-200 w-full rounded-lg shadow-sm">
              {/* Kolom kiri: Gambar */}
              <div className=" md:h-[200px] h-[150px] w-[120px]  md:w-[200px] md:flex items-center justify-center rounded-l-lg overflow-hidden">
                <img
                  src="/images/solo/kampungkaret.svg"
                  alt="Agrotourism"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Kolom tengah: Informasi tiket */}
              <div className="py-2 px-4 md:p-4 flex flex-col justify-between">
                <div className="">
                  <h1 className="font-bold text-lg">Kampoeng Karet</h1>

                  <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold ">
                    <span>29 Januari 2025</span>
                  </p>
                </div>
                <p className="text-xs mt-2 md:text-sm">
                  Yuk, ceritakan keseruan Kamu di wisata ini!
                </p>
                <div className="mt-2">
                  <button
                    onClick={handleOpenModal}
                    className="bg-hover px-4 py-2 rounded-md text-white text-xs md:text-sm"
                  >
                    Ulasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SoloReview;
