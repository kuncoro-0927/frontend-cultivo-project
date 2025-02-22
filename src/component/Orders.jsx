/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../utils/axios";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
const PopUpPesan = ({ open, onClose, wisataName, price }) => {
  const navigate = useNavigate();
  const { wisataId } = useParams();
  const [loading, setLoading] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const total = quantity * price; // Contoh total harga

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : null;
      const response = await instance.post("/create-order", {
        user_id: "123", // Ganti dengan ID user sebenarnya
        agrotourism_id: wisataId,
        selected_date: formattedDate,
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
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
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
          position: "absolute", // Tambahkan position absolute
          top: "50%", // Posisi dari atas 50%
          left: "50%", // Posisi dari kiri 50%
          transform: "translate(-50%, -50%)", // Pindahkan elemen ke tengah
        }}
      >
        <div className="flex mb-8 items-center justify-between">
          <div className="text-xl font-bold">
            {modalStep === 1 ? "Pilih tanggal" : "Konfirmasi pesanan"}
          </div>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>

        {modalStep === 1 && (
          <>
            <div className="bg-hijau-muda rounded-md bg-opacity-40 mt-7 mb-3">
              <h2 className="text-base font-bold text-hitam2 px-5 py-3">{`${wisataName}`}</h2>
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
            <p className="text-hitam2 mb-2 font-extrabold">{wisataName}</p>

            <div className="flex items-center justify-between text-hitam2">
              <p>
                {" "}
                {selectedDate ? formatDate(selectedDate) : "Belum dipilih"}
              </p>
              <button
                onClick={() => setModalStep(1)}
                className="underline font-medium text-sm"
              >
                Ubah tanggal?
              </button>
            </div>
            <div className="mt-4 bg-gray-100 flex justify-between rounded-md p-4">
              <label className="block text-sm md:text-base mb-2 font-bold text-hitam2">
                Total tiket
              </label>

              <div className="flex items-center bg-white gap-2 md:gap-40 p-4 rounded-md">
                <div>
                  {" "}
                  <p className="font-extrabold text-sm text-hitam2 mb-1">
                    Tiket
                  </p>
                  <p className="text-xs text-hitam2 mb-1 ">harga per orang</p>
                  <p className="font-extrabold md:text-lg text-hitam2">
                    IDR {Number(price).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2.5 py-0.5 border border-gray-400 rounded-full"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="px-2.5 py-0.5 border border-gray-400 rounded-full"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex text-hitam2 items-center justify-between">
              <div className="mt-4">
                <p className="font-semibold text-sm mb-1">Total harga</p>
                <p className="font-extrabold text-xl">
                  IDR {Number(total).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex justify-end mt-5 gap-2">
                <button
                  className="py-2 px-4 bg-hitam rounded-md text-white"
                  onClick={handleConfirmOrder}
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                  ) : (
                    "Pesan"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PopUpPesan;
