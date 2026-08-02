import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
import { useAuth } from "../../../../../contexts/AuthContext";

export function useReview() {
  const [tickets, setTickets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [activeTab, setActiveTab] = useState("tickets");
  const { user } = useAuth();

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
      setReviews(response.data.reviews);
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

  const hasReviewedTicket = (ticket) => {
    return reviews.some((review) => review.ticket_code === ticket.ticket_code);
  };

  return {
    tickets,
    reviews,
    modalOpen,
    selectedTicketId,
    activeTab,
    setActiveTab,
    handleOpenModal,
    handleCloseModal,
    hasReviewedTicket,
  };
}
