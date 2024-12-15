/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { Modal, Box } from "@mui/material";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { IoClose } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
// import { instance } from "../utils/axios";
// const PopUpPesan = ({
//   open,
//   onClose,
//   wisataName,
//   onConfirm,
//   modalStep,
//   setModalStep,
//   selectedDate,
//   setSelectedDate,
//   quantity,
//   setQuantity,
//   total,
// }) => {
//   const navigate = useNavigate(); // Inisialisasi useNavigate
//   const { wisataId } = useParams(); // Ambil id dari URL
//   const wisata = wisataId;
//   // Fungsi untuk mengonfirmasi pesanan dan mengarahkan ke halaman pembayaran
//   const handleConfirmOrder = async () => {
//     try {
//       const response = await instance.post("/create-order", {
//         user_id: "123", // Sesuaikan dengan ID user dari AuthContext atau JWT
//         agrotourism_id: wisata,
//         selected_date: selectedDate,
//         quantity: quantity,
//         total_price: total,
//       });

//       if (response.status === 201) {
//         const { hashedToken } = response.data;
//         const wisataSlug = wisataName.toLowerCase().replace(/ /g, "-");

//         // Navigasi ke halaman payment dengan token
//         navigate(`/payment/${wisataSlug}/${hashedToken}`);
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           margin: "auto",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//           width: "90%",
//           maxWidth: "700px",
//         }}
//       >
//         <div className="flex items-center justify-between">
//           <h1 className="text-xl font-bold mb-4">
//             {modalStep === 1 ? "Pilih Tanggal" : "Konfirmasi Pesanan"}
//           </h1>
//           <button onClick={onClose} className="text-xl">
//             <IoClose />
//           </button>
//         </div>

//         {modalStep === 1 && (
//           <>
//             <div className="bg-hijau-muda rounded-md bg-opacity-40 mt-7 mb-3">
//               <h2 className="text-base font-bold px-5 py-3">{`${wisataName}`}</h2>
//             </div>
//             <div className="hidden md:block lg:block">
//               <DayPicker
//                 mode="single"
//                 numberOfMonths={2}
//                 pagedNavigation
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//               />
//             </div>
//             <div className="lg:hidden md:hidden flex justify-center">
//               <DayPicker
//                 mode="single"
//                 numberOfMonths={1}
//                 pagedNavigation
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//               />
//             </div>
//             <div className="flex justify-end mt-4 gap-2">
//               <button
//                 className={`py-2 px-4 rounded-md ${
//                   selectedDate
//                     ? "hover:bg-hover bg-hitam rounded-md text-white"
//                     : " bg-gray-100 text-gray-300 rounded-md cursor-not-allowed"
//                 }`}
//                 onClick={() => onConfirm(selectedDate)}
//                 disabled={!selectedDate}
//               >
//                 Konfirmasi
//               </button>
//             </div>
//           </>
//         )}

//         {modalStep === 2 && (
//           <>
//             <p>
//               <strong>Nama Wisata:</strong> {wisataName}
//             </p>
//             <p>
//               <strong>Tanggal:</strong>{" "}
//               {selectedDate
//                 ? selectedDate.toLocaleDateString()
//                 : "Belum dipilih"}
//             </p>
//             <div className="mt-4">
//               <label className="block mb-2 font-bold">Jumlah Tiket:</label>
//               <div className="flex items-center gap-2">
//                 <button
//                   className="px-3 py-2 bg-gray-300 rounded-md"
//                   onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                 >
//                   -
//                 </button>
//                 <span>{quantity}</span>
//                 <button
//                   className="px-3 py-2 bg-gray-300 rounded-md"
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <p className="mt-4">
//               <strong>Total Harga:</strong> IDR {total.toLocaleString()}
//             </p>
//             <div className="flex justify-end mt-5 gap-2">
//               <button
//                 className="py-2 px-4 bg-gray-300 rounded-md"
//                 onClick={() => {
//                   console.log("Kembali ke langkah pertama");
//                   setModalStep(1);
//                 }}
//               >
//                 Kembali
//               </button>
//               <button
//                 className="py-2 px-4 bg-hitam rounded-md text-white"
//                 onClick={handleConfirmOrder} // Gunakan handleConfirmOrder untuk navigasi
//               >
//                 Konfirmasi Pesanan
//               </button>
//             </div>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default PopUpPesan;

import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../utils/axios";

const PopUpPesan = ({ open, onClose, wisataName }) => {
  const navigate = useNavigate();
  const { wisataId } = useParams();

  // State untuk mengelola langkah modal
  const [modalStep, setModalStep] = useState(1);

  // State lainnya
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const total = quantity * 10000; // Contoh total harga

  // Fungsi untuk mengonfirmasi pesanan
  const handleConfirmOrder = async () => {
    try {
      const response = await instance.post("/create-order", {
        user_id: "123", // Ganti dengan ID user sebenarnya
        agrotourism_id: wisataId,
        selected_date: selectedDate,
        quantity,
        total_price: total,
      });

      if (response.status === 201) {
        const { hashedToken } = response.data;
        const wisataSlug = wisataName.toLowerCase().replace(/ /g, "-");

        // Navigasi ke halaman pembayaran
        navigate(`/payment/${wisataSlug}/${hashedToken}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "700px",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold mb-4">
            {modalStep === 1 ? "Pilih Tanggal" : "Konfirmasi Pesanan"}
          </h1>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>

        {modalStep === 1 && (
          <>
            <div className="bg-hijau-muda rounded-md bg-opacity-40 mt-7 mb-3">
              <h2 className="text-base font-bold px-5 py-3">{`${wisataName}`}</h2>
            </div>
            <div className="hidden md:block lg:block">
              <DayPicker
                mode="single"
                numberOfMonths={2}
                pagedNavigation
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
            <div className="lg:hidden md:hidden flex justify-center">
              <DayPicker
                mode="single"
                numberOfMonths={1}
                pagedNavigation
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedDate
                    ? "hover:bg-hover bg-hitam rounded-md text-white"
                    : " bg-gray-100 text-gray-300 rounded-md cursor-not-allowed"
                }`}
                onClick={() => setModalStep(2)}
                disabled={!selectedDate}
              >
                Konfirmasi
              </button>
            </div>
          </>
        )}

        {modalStep === 2 && (
          <>
            <p>
              <strong>Nama Wisata:</strong> {wisataName}
            </p>
            <p>
              <strong>Tanggal:</strong>{" "}
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : "Belum dipilih"}
            </p>
            <div className="mt-4">
              <label className="block mb-2 font-bold">Jumlah Tiket:</label>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 bg-gray-300 rounded-md"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="px-3 py-2 bg-gray-300 rounded-md"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="mt-4">
              <strong>Total Harga:</strong> IDR {total.toLocaleString()}
            </p>
            <div className="flex justify-end mt-5 gap-2">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md"
                onClick={() => setModalStep(1)} // Kembali ke step 1
              >
                Kembali
              </button>
              <button
                className="py-2 px-4 bg-hitam rounded-md text-white"
                onClick={handleConfirmOrder}
              >
                Konfirmasi Pesanan
              </button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PopUpPesan;
