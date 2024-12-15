/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { instance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/UserServices";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await instance.get("/verify-token", {
          withCredentials: true,
        }); // Mengirim cookie ke backend

        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);
  const login = (userData) => {
    // Menyimpan token dan user di state serta cookie (jika diperlukan)
    setUser(userData);
    setIsLoggedIn(true);

    // Cookies.set("token", token); // Jika kamu ingin menyimpan token di cookie
  };
  const logout = async () => {
    try {
      // Hapus token dari cookie
      Cookies.remove("token");

      // Kirim request untuk logout ke backend
      await instance.post("/logout", {});

      // Segera set status isLoggedIn ke false dan set user ke null di AuthContext
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Arahkan ke halaman login setelah logout
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(
        "Error saat logout:",
        error.message || error.response?.data?.message
      );
    }
  };

  const updateUser = (newUserData) => {
    // Update di sessionStorage
    sessionStorage.setItem("user", JSON.stringify(newUserData));

    // Update di AuthContext
    setUser(newUserData);
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    // Cek apakah sudah ada token di cookie atau localStorage
    const fetchUserData = async () => {
      try {
        // Anggap getUserData mengambil data pengguna dari API
        const data = await getUserData();
        setUser(data); // Simpan data user ke state
      } catch (error) {
        console.error("Gagal mengambil data pengguna", error);
      } finally {
        setIsLoading(false); // Setelah selesai memuat, set isLoading ke false
      }
    };

    fetchUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setUser,
        user,
        login,
        logout,
        updateUser,
        isLoading,
        openSnackbar,
        snackbarOpen,
        snackbarMessage,
        closeSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
