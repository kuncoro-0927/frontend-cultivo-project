import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../component/CustomSnackbar";
import { useAuth } from "../../../../contexts/AuthContext";

export function usePaymentPage() {
  const { hashedToken } = useParams();
  const { user, isLoggedIn, logout } = useAuth();

  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await instance.get(`/order/detail/${hashedToken}`);
        const data = response.data.data;

        setIsPaymentCompleted(data.payment_status === "success");
        setOrderDetail(data);
      } catch (err) {
        setError("Gagal mengambil detail order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [hashedToken]);

  const handlePayment = async () => {
    try {
      const response = await instance.post("/payment", {
        order_id: orderDetail.order_id,
        total_price: orderDetail.total_price,
        email: user?.email,
      });

      const { snapToken } = response.data;

      window.snap.pay(snapToken, {
        onSuccess: function () {
          showSnackbar("Pembayaran berhasil!", "success");
          setIsPaymentCompleted(true);
        },
        onPending: function () {
          showSnackbar("Menunggu pembayaran.", "info");
        },
        onError: function () {
          showSnackbar("Pembayaran gagal!", "error");
        },
        onClose: function () {
          showSnackbar("Transaksi dibatalkan!", "error");
        },
      });
    } catch (error) {
      console.error("Gagal memproses pembayaran:", error);
      showSnackbar("Terjadi kesalahan. Silakan coba lagi.", "error");
    }
  };

  return {
    user,
    isLoggedIn,
    logout,
    orderDetail,
    loading,
    error,
    isPaymentCompleted,
    handlePayment,
  };
}
