import SidebarAccount from "../../../component/SidebarAccount";
import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { CiCalendar } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
const Bookings = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTickets = async () => {
    try {
      const response = await instance.get("/ticket/user"); // API endpoint untuk mendapatkan tiket
      setTickets(response.data); // Menyimpan tiket yang diterima
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options); // Format: Januari 16, 2025
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <>
      <section className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-20 p-8 w-full  text-hitam">
          <h1 className="font-extrabold text-3xl mb-5">Pesanan Anda</h1>
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
                key={ticket.ticket_code}
                className="ticket-card max-w-[800px] mb-4 mt-10"
              >
                <div className="border flex border-gray-200 w-full rounded-lg shadow-sm">
                  {/* Kolom kiri: Gambar */}
                  <div className="h-[200px] w-[200px] flex items-center justify-center rounded-l-lg overflow-hidden">
                    <img
                      src={ticket.agrotourism_url_image}
                      alt="Agrotourism"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Kolom tengah: Informasi tiket */}
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h1 className="font-bold text-lg">
                        {ticket.agrotourism_name}
                      </h1>
                      <p className="text-sm font-medium">
                        {ticket.agrotourism_address}
                      </p>
                      <p className="text-sm mt-4 flex items-center">
                        <IoTicketOutline className="text-lg mr-1 font-extrabold" />{" "}
                        <span className="mr-1 font-bold">Jumlah tiket:</span>{" "}
                        <span>{ticket.quantity}</span>
                      </p>
                      <p className="mt-2 text-sm flex items-center">
                        <CiCalendar className="text-lg mr-1 font-extrabold" />{" "}
                        <span className="mr-1 font-bold">Tanggal Tiket: </span>{" "}
                        <span>{formatDate(ticket.selected_date)}</span>
                      </p>
                    </div>
                    <div>
                      <button className="underline text-sm">Lihat Tiket</button>
                    </div>
                  </div>

                  {/* Kolom kanan: ID dan status tiket */}
                  <div className="text-right p-4 ml-auto flex flex-col justify-between">
                    <div>
                      <p className="text-xs">ID Tiket: {ticket.ticket_code}</p>
                      <p
                        className={`text-base mt-2 font-bold ${
                          ticket.status === "Active"
                            ? "text-green-500"
                            : ticket.status === "Used"
                            ? "text-blue-500"
                            : ticket.status === "Expired"
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {ticket.status}
                      </p>
                    </div>
                    <div>
                      <button className="py-2 px-3 flex ml-auto items-center font-semibold">
                        <span className="text-sm mr-2">Unduh Tiket</span>
                        <IoMdDownload />
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

export default Bookings;
