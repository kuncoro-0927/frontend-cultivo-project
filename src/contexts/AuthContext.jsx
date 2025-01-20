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
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await instance.get("/verify-token", {
          withCredentials: true,
        });
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
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = async () => {
    try {
      Cookies.remove("token");

      await instance.post("/logout", {});

      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      setWishlist(null);
      localStorage.removeItem("wishlist");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      navigate("/login", { replace: true });
      window.location.reload();
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
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
