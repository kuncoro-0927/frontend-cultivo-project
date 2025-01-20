/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { CiCalendar } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import TicketPdf from "../../../component/TicketPdfContent";
import ModalReview from "../../../component/ModalReview"; // Import ModalReview
import { useAuth } from "../../../contexts/AuthContext";
import SidebarAccount from "../../../component/SidebarAccount";

const Review = () => {
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State modal
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Untuk menyimpan ticketId yang dipilih
  const { user, isLoading } = useAuth();

  // Fetch tiket pengguna
  const fetchTickets = async () => {
    try {
      const response = await instance.get("/ticket/user");
      setTickets(response.data);
    } catch (error) {
      console.error("Gagal memuat tiket.", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

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
        <div className="mt-20 mx-5 md:p-8 w-full  text-hitam">
          <h1 className="font-extrabold text-3xl mb-5">Reviews</h1>
          <span className="font-bold border-b-4 py-2 border-blue-400">
            Tiket Anda
          </span>

          {/* Cek apakah ada tiket */}
          {tickets.length === 0 ? (
            // Jika tidak ada tiket

            <div className="mt-10 w-full flex flex-col items-center ">
              <p className="text-hitam text-xl lg:text-2xl font-extrabold">
                Kamu Belum Memiliki Pesanan Tiket
              </p>
              <img
                className="w-40 mt-7"
                src="/public/images/agenda.png"
                alt="Agenda"
              />
              <p className="text-center mt-5 font-medium">
                Petualangan Anda berikutnya menanti.
                <br /> Temukan bersama kami!
              </p>
              <Link
                to="/seluruhwisata"
                className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-2 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
              >
                Eksplor
              </Link>
            </div>
          ) : (
            // Jika ada tiket
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                id={`ticket-${ticket.ticket_code}`}
                className="ticket-card max-w-[800px]  mb-4 mt-10"
              >
                <div className="border flex border-gray-200 w-full rounded-lg shadow-sm">
                  {/* Kolom kiri: Gambar */}
                  <div className=" md:h-[200px] h-[120px] w-[120px]  md:w-[200px] md:flex items-center justify-center rounded-l-lg overflow-hidden">
                    <img
                      src={ticket.agrotourism_url_image}
                      alt="Agrotourism"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Kolom tengah: Informasi tiket */}
                  <div className="p-4 md:p-4 flex flex-col justify-between">
                    <div className="">
                      <h1 className="font-bold text-lg">
                        {ticket.agrotourism_name}
                      </h1>

                      <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold ">
                        <span>{formatDate(ticket.selected_date)}</span>
                      </p>
                    </div>
                    {/* <p className="text-xs md:text-sm">
                      Yuk, ceritakan keseruan pengalaman Kamu di wisata ini!
                    </p> */}
                    <div>
                      <button
                        onClick={() => handleOpenModal(ticket.id)}
                        className="bg-hover px-4 py-2 rounded-md text-white text-xs md:text-sm"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Review;
