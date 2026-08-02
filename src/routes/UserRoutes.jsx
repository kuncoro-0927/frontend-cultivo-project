import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NoFooterLayout from "../layouts/NoFooterLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/user/home";
import Profile from "../pages/user/Profile";
import About from "../pages/user/About";
import Kontak from "../pages/user/contact";
import DaerahWisata from "../pages/user/daerah-wisata";
import DaerahDetail from "../pages/user/daerah-detail";
import WisataDetail from "../pages/user/wisata-detail";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import EmailVerify from "../pages/auth/verifyemail";

import PrivateRoute from "./PrivateRoute";
import PaymentPage from "../pages/user/payment";
import Sales from "../pages/admin/Sales";

import Edukasi from "../pages/user/activity/edukasi";
import Perkebunan from "../pages/user/activity/perkebunan";
import Alam from "../pages/user/activity/alam";

import Bookings from "../pages/user/account/booking";
import Wishlist from "../pages/user/account/wishlist";
import Reviews from "../pages/user/account/review";

function UserRoutes() {
  return (
    <Routes>
      {/* Halaman dengan NavBar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/aktivitas/edukasi" element={<Edukasi />} />
        <Route path="/aktivitas/perkebunan" element={<Perkebunan />} />
        <Route path="/aktivitas/alam" element={<Alam />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/seluruhwisata" element={<DaerahWisata />} />
        <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} />
        <Route path="/wisata/detail/:wisataId" element={<WisataDetail />} />
        <Route
          path="/payment/:namawisata/:hashedToken"
          element={<PaymentPage />}
        />
      </Route>

      {/* Halaman akun: NavBar tanpa Footer */}
      <Route element={<NoFooterLayout />}>
        <Route
          path="/account/profile"
          element={
            <PrivateRoute requiredRole="user">
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/bookings"
          element={
            <PrivateRoute requiredRole="user">
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/wishlist"
          element={
            <PrivateRoute requiredRole="user">
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/review"
          element={
            <PrivateRoute requiredRole="user">
              <Reviews />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Halaman auth: tanpa NavBar & Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email/verify" element={<EmailVerify />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
