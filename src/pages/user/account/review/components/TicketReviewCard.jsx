import { formatDate, truncateTitle } from "../utils/reviewHelpers";

const TicketReviewCard = ({ ticket, hasReviewed, onOpenModal }) => {
  return (
    <div className="ticket-card max-w-[800px] md:h-[200px] h-[150px] mb-4 mt-10 border flex border-gray-200 w-full rounded-lg shadow-sm">
      <div className="w-[180px] md:w-[200px] flex items-center justify-center rounded-l-lg overflow-hidden">
        <img
          src={ticket.agrotourism_url_image}
          alt="Agrotourism"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 w-full md:p-4 flex flex-col justify-between">
        <h1 className="font-bold text-basae">
          {truncateTitle(ticket.agrotourism_name, 35)}
        </h1>
        <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold">
          {formatDate(ticket.selected_date)}
        </p>
        <button
          onClick={() => onOpenModal(ticket.id)}
          disabled={hasReviewed}
          className={`${
            hasReviewed ? "bg-gray-100 cursor-not-allowed" : "bg-hover"
          } px-4 py-2 mt-2 rounded-md text-gray-300 text-xs md:text-sm`}
        >
          {hasReviewed ? "Selesai" : "Beri Ulasan"}
        </button>
      </div>
    </div>
  );
};

export default TicketReviewCard;
