/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { IoClose } from "react-icons/io5";

// import { Modal, Box } from "@mui/material";
// import { MdOutlineEmail } from "react-icons/md";
// //import { CiMap } from "react-icons/ci";

// import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";
// import { instance } from "../utils/axios";
// import Rating from "@mui/material/Rating";
// import { useAuth } from "../contexts/AuthContext";

// const ModalReview = ({ open, handleClose }) => {
//   const [tickets, setTickets] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const { user, isLoading } = useAuth();

//   // Fetch tiket pengguna
//   const fetchTickets = async () => {
//     try {
//       const response = await instance.get("/ticket/user");
//       setTickets(response.data);
//     } catch (error) {
//       console.error("Gagal memuat tiket.", error);
//       alert("Gagal memuat tiket.");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchTickets();
//     }
//   }, [user]);

//   const submitReview = async (ticketId) => {
//     if (!user?.id || !ticketId) {
//       console.error("User ID atau Ticket ID tidak valid!");
//       return;
//     }

//     try {
//       setLoading(true);
//       await instance.post("/create/reviews", {
//         ticket_id: ticketId,
//         user_id: user.id, // User ID dari AuthContext
//         review_text: reviewText,
//         rating: rating,
//       });
//       alert("Review berhasil dikirim");
//       setReviewText(""); // Clear form after submit
//       setRating(5); // Reset rating
//     } catch (error) {
//       console.error("Gagal mengirim review", error);
//       alert("Gagal mengirim review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Modal open={open} onClose={handleClose}>
// <Box
//   sx={{
//     justifyContent: "center",
//     alignItems: "center",
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     borderRadius: 5,
//     width: { xs: "350px", sm: "450px" },
//     maxWidth: "100%",
//     maxHeight: "90vh",
//   }}
// >
//       <div className="">
//         <button
//           onClick={handleClose}
//           className="text-2xl flex p-4  justify-end ml-auto"
//         >
//           <IoClose />
//         </button>
//         <div className="px-5 pb-2 text-center rounded-t-lg border-b">
//           <h2 className="text-xl mb-2 font-semibold text-hitam2">
//             Nilai perjalananmu
//           </h2>

//           <Rating
//             sx={{ fontSize: "2.7rem" }}
//             name="half-rating"
//             defaultValue={2.5}
//             precision={0.5}
//           />
//         </div>

//         <div className="flex justify-center mx-5 items-center pt-7"></div>
//         <div className="flex justify-center mx-5 items-center pb-7 mt-5">
//           <Link
//             to="/register"
//             className="border flex items-center hover:border-hitam2 duration-300 justify-between border-gray-400 rounded-xl px-6 py-4 w-full"
//           >
//             Lanjutkan dengan email
//             <MdOutlineEmail className="text-2xl" />
//           </Link>
//         </div>
//       </div>
//     </Box>
//   </Modal>
//       <div className="max-w-3xl mx-auto p-4 mt-52">
//         <h1 className="text-2xl font-bold mb-4">Tiket dan Review</h1>

//         {tickets.length === 0 ? (
//           <p>Belum ada tiket yang ditemukan.</p>
//         ) : (
//           tickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               className="p-4 border rounded-md shadow-sm mb-4 bg-white"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 Tiket: {ticket.ticket_code}
//               </h2>
//               <p>Status: {ticket.status}</p>

//               {/* Menampilkan review jika sudah ada */}
//               {ticket.review_text ? (
//                 <div className="mt-4">
//                   <h3 className="font-semibold">Review Anda:</h3>
//                   <p>{ticket.review_text}</p>
//                   <p>Rating: {ticket.rating}</p>
//                 </div>
//               ) : (
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     submitReview(ticket.ticket_code);
//                   }}
//                   className="mt-4"
//                 >
//                   <textarea
//                     className="w-full p-2 border rounded-md mb-2"
//                     placeholder="Bagaimana pengalaman Anda?"
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     required
//                   />
//                   <div className="mb-4">
//                     <label className="block font-semibold mb-1">Rating:</label>
//                     <input
//                       type="number"
//                       min="1"
//                       max="5"
//                       className="border p-2 rounded-md w-20"
//                       value={rating}
//                       onChange={(e) => setRating(Number(e.target.value))}
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                     disabled={loading}
//                   >
//                     {loading ? "Mengirim..." : "Kirim Review"}
//                   </button>
//                 </form>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// // export default ModalReview;

import { useState } from "react";
import { Modal, Box, TextField, Rating, useTheme } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { instance } from "../utils/axios";

const ModalReview = ({ open, handleClose, ticketId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const handleReviewSubmit = async () => {
    if (!reviewText) {
      alert("Mohon isi review terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      await instance.post("/create/reviews", {
        ticket_id: ticketId,

        review_text: reviewText,
        rating: rating,
      });
      alert("Review berhasil dikirim!");
      setReviewText(""); // Clear review text
      setRating(0); // Reset rating
      handleClose(); // Close modal after submission
    } catch (error) {
      console.error("Gagal mengirim review", error);
      alert("Gagal mengirim review. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          padding: 3,
          width: { xs: "350px", sm: "450px" },
          maxWidth: "100%",
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={handleClose}
          className="text-2xl flex text-hitam2 mb-3  justify-end ml-auto"
        >
          <IoClose />
        </button>
        <div className="px-5 pb-2 text-center rounded-t-lg border-b">
          <h2 className="text-xl mb-2 font-bold text-hitam2">
            Bagaimana Pengalaman Anda?
          </h2>

          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
            sx={{ fontSize: "2.7rem" }}
          />
        </div>

        <TextField
          fullWidth
          label="Tulis Review"
          multiline
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          InputLabelProps={{
            sx: {
              color: reviewText ? "black" : theme.palette.main, // Periksa apakah reviewText ada, jika tidak beri warna error
              fontSize: { xs: "0.875rem", md: "0.9rem" },
              "&.Mui-focused": {
                color: reviewText ? "black !important" : `black !important`,
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: reviewText ? "black !important" : `black !important`, // Periksa reviewText, jika kosong beri warna error
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: reviewText ? "black !important" : `black !important`, // Periksa reviewText, jika kosong beri warna error
            },
          }}
        />

        {/* Rating */}
        {/* <div className="flex items-center">
          <Typography variant="body1" mr={2}>
            Rating:{" "}
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
          />
        </div> */}

        {/* Tombol Kirim Review */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleReviewSubmit}
            className="bg-hover text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Review"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalReview;
