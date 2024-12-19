import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Home from "../pages/Home";
import Profile from "../pages/user/Profile";
import About from "../pages/About";
import Aktivitas from "../pages/Aktivitas";
import Kontak from "../pages/Kontak";
import DaerahWisata from "../pages/DaerahWisata";
import DaerahDetail from "../pages/DaerahDetail";
import WisataDetail from "../pages/WisataDetail";
import Review from "../component/Review";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Tes from "../pages/user/tes";
import Checkout from "../component/Checkout";
import PaymentPage from "../component/TesPayment";
import Bookings from "../pages/user/Account/Bookings";
import EmailVerify from "../pages/VerifyEmail";
import Sales from "../pages/admin/Sales";
import Pertanian from "../pages/user/Activity/Pertanian";
import Perkebunan from "../pages/user/Activity/Perkebunan";
import Perikanan from "../pages/user/Activity/Perikanan";
import Wishlist from "../pages/user/Account/Wishlists";
import Testiket from "../pages/user/Account/testiket";
import Reviews from "../pages/user/Account/Reviews";
function UserRoutes() {
  const location = useLocation();

  const shouldShowFooter = !location.pathname.startsWith("/account");

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/tiket"
          element={
            <PrivateRoute>
              <Testiket />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/review"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route path="/tentang" element={<About />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/tes" element={<Tes />} />
        <Route path="/aktivitas" element={<Aktivitas />} />
        <Route path="/aktivitas/pertanian" element={<Pertanian />} />
        <Route path="/aktivitas/perkebunan" element={<Perkebunan />} />
        <Route path="/aktivitas/perikanan" element={<Perikanan />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/seluruhwisata" element={<DaerahWisata />} />
        <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} />
        <Route path="/wisata/detail/:wisataId" element={<WisataDetail />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email/verify" element={<EmailVerify />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/payment/:namawisata/:hashedToken"
          element={<PaymentPage />}
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default UserRoutes;
