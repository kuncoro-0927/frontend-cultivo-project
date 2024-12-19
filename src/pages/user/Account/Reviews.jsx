/* eslint-disable no-unused-vars */
// Review.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { instance } from "../../../utils/axios";

const Review = () => {
  const [tickets, setTickets] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useAuth();

  // Fetch tiket pengguna
  const fetchTickets = async () => {
    try {
      const response = await instance.get("/ticket/user");
      setTickets(response.data);
    } catch (error) {
      console.error("Gagal memuat tiket.", error);
      alert("Gagal memuat tiket.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const submitReview = async (ticketId) => {
    if (!user?.id || !ticketId) {
      console.error("User ID atau Ticket ID tidak valid!");
      return;
    }

    try {
      setLoading(true);
      await instance.post("/create/reviews", {
        ticket_id: ticketId,
        user_id: user.id, // User ID dari AuthContext
        review_text: reviewText,
        rating: rating,
      });
      alert("Review berhasil dikirim");
      setReviewText(""); // Clear form after submit
      setRating(5); // Reset rating
    } catch (error) {
      console.error("Gagal mengirim review", error);
      alert("Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-52">
      <h1 className="text-2xl font-bold mb-4">Tiket dan Review</h1>

      {tickets.length === 0 ? (
        <p>Belum ada tiket yang ditemukan.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.ticket_code}
            className="p-4 border rounded-md shadow-sm mb-4 bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              Tiket: {ticket.ticket_code}
            </h2>
            <p>Status: {ticket.status}</p>

            {/* Menampilkan review jika sudah ada */}
            {ticket.review_text ? (
              <div className="mt-4">
                <h3 className="font-semibold">Review Anda:</h3>
                <p>{ticket.review_text}</p>
                <p>Rating: {ticket.rating}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitReview(ticket.ticket_code);
                }}
                className="mt-4"
              >
                <textarea
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Bagaimana pengalaman Anda?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Rating:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="border p-2 rounded-md w-20"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim Review"}
                </button>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Review;
