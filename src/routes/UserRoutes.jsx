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
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import PaymentPage from "../component/Payment";
import Bookings from "../pages/user/Account/Bookings";
import EmailVerify from "../pages/VerifyEmail";
import Sales from "../pages/admin/Sales";
import Edukasi from "../pages/user/Activity/Edukasi";
import Perkebunan from "../pages/user/Activity/Perkebunan";
import Alam from "../pages/user/Activity/Alam";
import Wishlist from "../pages/user/Account/Wishlists";

import Reviews from "../pages/user/Account/Reviews";

function UserRoutes() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/email/verify" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  const isAccountPage = location.pathname.startsWith("/account");

  const shouldShowNavBar = !isAuthPage;
  const shouldShowFooter = !isAuthPage && !isAccountPage;

  return (
    <>
      {shouldShowNavBar && <NavBar />}

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
          path="/account/review"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route path="/tentang" element={<About />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/aktivitas" element={<Aktivitas />} />
        <Route path="/aktivitas/edukasi" element={<Edukasi />} />
        <Route path="/aktivitas/perkebunan" element={<Perkebunan />} />
        <Route path="/aktivitas/alam" element={<Alam />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/seluruhwisata" element={<DaerahWisata />} />
        <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} />
        <Route path="/wisata/detail/:wisataId" element={<WisataDetail />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email/verify" element={<EmailVerify />} />
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
