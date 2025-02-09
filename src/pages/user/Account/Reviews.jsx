import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import SidebarAccount from "../../../component/SidebarAccount";
import ModalReview from "../../../component/ModalReview";
import Rating from "@mui/material/Rating";
const Review = () => {
  const [tickets, setTickets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tickets");

  useEffect(() => {
    if (user) {
      fetchTickets();
      fetchReviews();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const response = await instance.get("/ticket/user");
      setTickets(response.data);
    } catch (error) {
      console.error("Gagal memuat tiket.", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await instance.get("/reviews/user");
      setReviews(response.data.reviews); // Adjust if structure is different
    } catch (error) {
      console.error("Gagal memuat ulasan.", error);
    }
  };

  const handleOpenModal = (ticketId) => {
    setSelectedTicketId(ticketId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const hasReviewedTicket = (ticket) => {
    return reviews.some((review) => review.ticket_code === ticket.ticket_code);
  };

  return (
    <>
      <ModalReview
        open={modalOpen}
        handleClose={handleCloseModal}
        ticketId={selectedTicketId}
      />
      <section className="flex 2xl:mx-32">
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-20 md:p-8 mx-4 w-full text-hitam">
          <h1 className="font-extrabold text-3xl mb-5">Ulasan</h1>
          <div className="flex">
            <button
              onClick={() => setActiveTab("tickets")}
              className={`font-bold py-2 px-4 ${
                activeTab === "tickets" ? "border-blue-400  border-b-4 " : ""
              }`}
            >
              Tiket Anda
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-bold py-2 px-4 ml-5 ${
                activeTab === "reviews" ? "border-blue-400 border-b-4" : ""
              }`}
            >
              Ulasan Anda
            </button>
          </div>

          {activeTab === "tickets" ? (
            tickets.length === 0 ? (
              <div className="mt-10 w-full flex flex-col items-center">
                <p className="text-hitam text-xl lg:text-2xl font-extrabold">
                  Anda belum memiliki pesanan tiket
                </p>
                <img
                  className="w-40 mt-7"
                  src="/public/images/agenda.png"
                  alt="Agenda"
                />
                <p className="text-center mt-5 font-medium">
                  Petualangan Anda berikutnya menanti. Temukan bersama kami!
                </p>
                <Link
                  to="/seluruhwisata"
                  className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-2 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
                >
                  Eksplor
                </Link>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="ticket-card max-w-[800px] mb-4 mt-10 border flex border-gray-200 w-full rounded-lg shadow-sm"
                >
                  <div className="md:h-[200px] h-[120px] w-[120px] md:w-[200px] flex items-center justify-center rounded-l-lg overflow-hidden">
                    <img
                      src={ticket.agrotourism_url_image}
                      alt="Agrotourism"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-4 flex flex-col justify-between">
                    <h1 className="font-bold text-lg">
                      {ticket.agrotourism_name}
                    </h1>
                    <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold ">
                      {formatDate(ticket.selected_date)}
                    </p>
                    <button
                      onClick={() => handleOpenModal(ticket.id)}
                      disabled={hasReviewedTicket(ticket)}
                      className={`${
                        hasReviewedTicket(ticket)
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-hover"
                      } px-4 py-2 rounded-md text-gray-300 text-xs md:text-sm`}
                    >
                      {hasReviewedTicket(ticket) ? "Selesai" : "Beri Ulasan"}
                    </button>
                  </div>
                </div>
              ))
            )
          ) : reviews.length === 0 ? (
            <p className="mt-10 text-center text-hitam font-bold">
              Anda belum memberikan ulasan.
            </p>
          ) : (
            reviews.map((review) => (
              <div key={`review-${review.id}`}>
                {" "}
                {/* Parent div tetap diberi key */}
                {/* Bagian utama ulasan */}
                <div
                  key={`review-content-${review.id}`}
                  className="ticket-card max-w-[800px] mt-10 border flex border-gray-200 w-full rounded-t-lg shadow-sm"
                >
                  <div className="md:h-[200px] h-[120px] w-[120px] md:w-[200px] flex items-center justify-center rounded-tl-lg overflow-hidden">
                    <img
                      src={review.image}
                      alt="Agrotourism"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-4 flex flex-col justify-between">
                    <h1 className="font-bold text-sm md:text-lg">
                      {review.agrotourism_name}
                    </h1>
                    <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold ">
                      Tanggal: {formatDate(review.selected_date)}
                    </p>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      sx={{ fontSize: "2rem" }}
                    />
                    <p className="mt-2 text-xs hidden md:flex md:text-sm items-center text-hitam2 font-semibold ">
                      Diberikan pada: {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>
                {/* Bagian detail tambahan ulasan */}
                <div
                  key={`review-details-${review.id}`}
                  className="ticket-card p-2 max-w-[800px] mb-4 border border-gray-200 w-full rounded-b-lg shadow-sm"
                >
                  <p className="mt-2 text-xs md:hidden md:text-sm items-center text-hitam2 font-semibold ">
                    Diberikan pada: {formatDate(review.created_at)}
                  </p>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    sx={{ fontSize: "1.7rem" }}
                  />
                  <p className="text-sm md:text-base mt-1 md:mt-0 text-hitam2">
                    {review.review_text}
                  </p>
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
