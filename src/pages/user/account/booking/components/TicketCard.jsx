import { CiCalendar } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import TicketPdf from "../../../../../component/TicketPdfContent";
import { formatDate } from "../hooks/useBookings";

const statusColor = {
  Active: "text-green-500",
  Used: "text-blue-500",
  Expired: "text-red-500",
};

const TicketCard = ({ ticket }) => {
  return (
    <div
      id={`ticket-${ticket.ticket_code}`}
      className="ticket-card max-w-[800px] mb-4 mt-10"
    >
      <div className="border lg:flex border-gray-200 w-full rounded-lg shadow-sm">
        {/* Kolom kiri: Gambar */}
        <div className="lg:h-[200px] h-[120px] rounded-t-lg lg:rounded-tr-none w-full lg:w-[200px] items-center justify-center lg:rounded-l-lg overflow-hidden">
          <img
            src={ticket.agrotourism_url_image}
            alt="Agrotourism"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Kolom tengah: Informasi tiket */}
        <div className="p-4 md:p-4 flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-lg">{ticket.agrotourism_name}</h1>
            <p className="text-sm w-64 md:w-96 max-w-xl font-medium">
              {ticket.agrotourism_address}
            </p>
            <p className="text-sm md:text-sm mt-4 flex items-center">
              <IoTicketOutline className="text-sm md:text-lg mr-1 font-extrabold" />{" "}
              <span className="mr-1 font-bold">Jumlah tiket:</span>{" "}
              <span>{ticket.quantity}</span>
            </p>
            <p className="mt-2 text-sm md:text-sm flex items-center">
              <CiCalendar className="text-sm md:text-lg mr-1 font-extrabold" />{" "}
              <span className="mr-1 font-bold">Tanggal Tiket: </span>{" "}
              <span>{formatDate(ticket.selected_date)}</span>
            </p>
          </div>
        </div>

        {/* Kolom kanan: ID dan status tiket */}
        <div className="lg:text-right p-4 md:p-4 ml-auto items-center flex lg:flex-col justify-between">
          <div>
            <p className="text-sm">ID Tiket: {ticket.ticket_code}</p>
            <p
              className={`text-sm mt-2 font-bold ${
                statusColor[ticket.status] || "text-black"
              }`}
            >
              {ticket.status}
            </p>
          </div>
          <div>
            <TicketPdf ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
