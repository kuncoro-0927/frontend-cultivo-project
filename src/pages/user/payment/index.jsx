import { CustomSnackbar } from "../../../component/CustomSnackbar";
import LoggedInAsBanner from "./components/LoggedInAsBanner";
import UserInfoSection from "./components/UserInfoSection";
import OrderSummaryCard from "./components/OrderSummaryCard";
import { usePaymentPage } from "./hooks/usePaymentPage";

const Payment = () => {
  const {
    user,
    isLoggedIn,
    logout,
    orderDetail,
    loading,
    error,
    isPaymentCompleted,
    handlePayment,
  } = usePaymentPage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <CustomSnackbar />
      <section className="flex flex-col-reverse md:flex-col lg:flex-row 2xl:mx-32 lg:justify-center mx-5 mt-10 md:mt-24 md:mx-14 space-y-10 lg:space-y-0">
        <div className="md:w-[700px] md:pr-10">
          <div className="font-extrabold mt-10 md:mt-0 text-3xl md:text-4xl text-hitam">
            Pembayaran
          </div>

          <LoggedInAsBanner email={user?.email} onLogout={logout} />

          <UserInfoSection user={user} isLoggedIn={isLoggedIn} />

          <button
            onClick={handlePayment}
            disabled={isPaymentCompleted}
            className={`px-4 mt-5 py-3 mr-5 lg:mt-5 mb-10 rounded-md flex justify-center hover:-translate-y-1 duration-300 ${
              isPaymentCompleted
                ? "bg-gray-200 bg-opacity-50 font-bold text-gray-300 cursor-not-allowed"
                : "bg-hitam text-white font-bold hover:-translate-y-1"
            }`}
          >
            {isPaymentCompleted ? "Pembayaran Berhasil" : "Bayar"}
          </button>
        </div>

        <div className="md:mt-20 w-full md:w-[400px] px-10 bg-gray-300 bg-opacity-20 py-10 md:pt-14">
          <OrderSummaryCard orderDetail={orderDetail} />
        </div>
      </section>
    </>
  );
};

export default Payment;
