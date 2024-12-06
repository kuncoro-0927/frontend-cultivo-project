/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth(); // Tambahkan `isLoading`
  const token = localStorage.getItem("token"); // Ambil token dari localStorage
  const location = useLocation();

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const isTokenValid = (token) => {
    if (!token) return false;
    const payload = decodeToken(token);
    return payload && payload.exp && Date.now() < payload.exp * 1000;
  };

  // Tampilkan loading jika AuthContext belum selesai inisialisasi
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect ke login jika token tidak valid
  if (!isTokenValid(token)) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Validasi role jika requiredRole diberikan
  const payload = decodeToken(token);
  if (requiredRole && payload?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Redirect ke login jika `user` belum tersedia
  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default PrivateRoute;
