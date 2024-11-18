import { useState, useEffect } from "react";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  // Mengambil data review dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews)); // Mengubah string JSON kembali menjadi array
    }
  }, []);

  // Fungsi untuk menyimpan data review ke localStorage
  const saveReviewsToLocalStorage = (reviews) => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  // Fungsi untuk menghandle submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews); // Menambahkan review ke daftar
      saveReviewsToLocalStorage(updatedReviews); // Simpan review ke localStorage
      setNewReview(""); // Reset form setelah submit
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Beri Review Anda
      </h2>

      {/* Form untuk menulis review */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tulis review Anda disini..."
        />
        <button
          type="submit"
          className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Kirim Review
        </button>
      </form>

      {/* Daftar Review */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-white border rounded-md shadow-sm"
            >
              <p className="text-gray-800">{review}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Belum ada review.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
