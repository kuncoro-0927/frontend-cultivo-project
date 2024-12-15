/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Simpan role pengguna
  const [isChecking, setIsChecking] = useState(true); // Indikator loading

  // Cek token dan role pengguna melalui backend
  const checkTokenValidity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/cultivo/api/verify-token",
        {
          withCredentials: true, // Kirim cookie token
        }
      );

      if (response.status === 200) {
        const userData = response.data.user; // Data user dari token yang didecode
        setIsAuthenticated(true);
        setUserRole(userData.role); // Simpan role pengguna

        // Jika requiredRole ada, pastikan role cocok
        if (requiredRole && userData.role !== requiredRole) {
          throw new Error("Role tidak sesuai");
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error validasi token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false); // Selesai pengecekan
    }
  };

  // Jalankan pengecekan token ketika komponen dimuat
  useEffect(() => {
    checkTokenValidity();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>; // Sementara menunggu validasi token
  }

  // Redirect ke login jika tidak terautentikasi
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Redirect ke halaman utama jika role tidak sesuai
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Jika sudah terautentikasi dan role sesuai, tampilkan children
  return children;
};

export default PrivateRoute;
