import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios"; // Ganti dengan path axios Anda
import { useAuth } from "../contexts/AuthContext";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CustomSnackbar, showSnackbar } from "../component/CustomSnackbar"; // Import showSnackbar

const PaymentPage = () => {
  const { hashedToken } = useParams(); // Ambil hashedToken dari URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    // Fungsi untuk fetch detail order
    const fetchOrderDetail = async () => {
      try {
        const response = await instance.get(`/order/detail/${hashedToken}`);
        const data = response.data.data;

        setIsPaymentCompleted(data.payment_status === "success");
        setOrderDetail(response.data.data); // Set data order
      } catch (err) {
        setError("Gagal mengambil detail order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [hashedToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handlePayment = async () => {
    try {
      // Panggil backend untuk mendapatkan Snap token dengan order_id yang sesuai
      const response = await instance.post("/payment", {
        order_id: orderDetail.order_id, // Menggunakan order_id yang diambil dari backend
        total_price: orderDetail.total_price,
        email: user?.email,
      });

      const { snapToken } = response.data;

      // Panggil Snap Midtrans
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          showSnackbar("Pembayaran berhasil!", "success");
          console.log("Success:", result);
          setIsPaymentCompleted(true);
        },
        onPending: function (result) {
          showSnackbar("Menunggu pembayaran.", "info");
          console.log("Pending:", result);
        },
        onError: function (result) {
          showSnackbar("Pembayaran gagal!", "error");
          console.log("Error:", result);
        },
        onClose: function () {
          showSnackbar("Transaksi dibatalkan!", "error");
        },
      });
    } catch (error) {
      console.error("Gagal memproses pembayaran:", error);
      showSnackbar("Terjadi kesalahan. Silakan coba lagi.", "error");

      // Log the error to better understand it
      console.log(error.response?.data || error.message || error);
    }
  };

  return (
    <>
      <CustomSnackbar />
      <section className="flex flex-col-reverse md:flex-col lg:flex-row mx-10 mt-10 md:mt-24 md:mx-14 space-y-10 lg:space-y-0 ">
        <div className="md:w-[700px] w-[400px] pr-10 ">
          <div className="font-extrabold mt-10 md:mt-0 text-3xl md:text-4xl text-hitam">
            Pembayaran
          </div>

          <div className="bg-hijau-muda text-xs md:text-base grid md:flex items-center justify-between space-x-3 font-normal bg-opacity-30 py-3 px-2 md:px-4 mt-5">
            <FaRegCircleUser className="hidden md:flex" />
            <p className="flex-1">
              Kamu masuk sebagai{" "}
              <span className="font-bold">{user?.email}</span>
            </p>
            <p className="md:text-end mt-1">
              Bukan anda?{" "}
              <span className="underline font-medium">Ganti akun</span>
            </p>
          </div>

          <div className="mt-10">
            <h1 className="font-extrabold text-2xl">Informasi Pengguna</h1>
            <div className="md:flex grid items-center justify-between">
              <p className="text-sm mt-1">
                Perbarui Profile anda jika data belum lengkap atau ada
                kesalahan.
              </p>

              <Link
                to="/account/profile"
                className="text-sm mt-2 md:mt-0s underline hover:text-blue-500"
              >
                Perbarui
              </Link>
            </div>

            <div className="mt-7 grid md:grid-cols-2 gap-x-5 gap-y-8">
              <TextField
                label="Nama Depan"
                variant="outlined"
                value={isLoggedIn ? user?.firstname : ""}
                disabled
                size="normal"
              />

              <TextField
                label="Nama Belakang"
                variant="outlined"
                value={isLoggedIn ? user?.lastname : ""}
                required
                disabled
                size="normal"
              />

              <TextField
                label="Email"
                variant="outlined"
                value={isLoggedIn ? user?.email : ""}
                required
                disabled
                size="normal"
              />

              <MuiTelInput
                value={isLoggedIn ? user?.phonenumber : ""}
                fullWidth
                label="Nomor Telepon"
                required
                disabled
                defaultCountry="ID"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isPaymentCompleted} // Nonaktifkan tombol jika pembayaran selesai
            className={`px-4 mt-5 py-3 mr-5 lg:mt-5 mb-10 rounded-md flex justify-center hover:-translate-y-1 duration-300 ${
              isPaymentCompleted
                ? "bg-gray-200 bg-opacity-50 text-gray-300 cursor-not-allowed" // Gaya tombol nonaktif
                : "bg-hitam text-white hover:-translate-y-1" // Gaya tombol aktif
            }`}
          >
            {isPaymentCompleted ? "Pembayaran Selesai" : "Bayar"}
          </button>
        </div>

        <div className="md:mt-20 w-[400px] px-10 bg-gray-300 bg-opacity-20 py-10 md:pt-14">
          {orderDetail ? (
            <div>
              <h2 className="font-extrabold text-2xl">Detail Pesanan</h2>
              <p className="text-sm mt-1">
                Pastikan detail pesanan anda sesuai ya
              </p>
              <p className="font-bold text-lg mt-5">
                {orderDetail.wisata_name}
              </p>
              <div className="border-b border-gray-400 my-6"></div>
              <div className="flex items-center mt-5 justify-between">
                <p className="font-normal">Tanggal </p>{" "}
                <p className="font-bold">
                  {new Date(orderDetail.selected_date).toLocaleDateString()}
                </p>
              </div>
              <div className="border-b border-gray-400 my-6"></div>
              <div className="flex items-center mt-5 justify-between">
                <p>Jumlah Tiket</p>
                <p>
                  {orderDetail.quantity} x {orderDetail.wisata_price}
                </p>
              </div>
              <div className="border-b border-gray-400 my-6"></div>
              <div className="flex items-center mt-5 justify-between">
                <p className="font-bold">Total Harga</p>
                <p className="font-bold">
                  IDR {orderDetail.total_price.toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p>Order tidak ditemukan.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PaymentPage;
