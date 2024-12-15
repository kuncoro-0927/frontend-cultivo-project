import axios from "axios";
// import Cookies from "js-cookie";
import { showSnackbar } from "../component/CustomSnackbar";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  timeout: 10000000,
  withCredentials: true,
  // headers: { "X-custom-header": "foobar" },
});

instance.interceptors.request.use(
  (config) => {
    // const token = Cookies.get("jwt");
    // config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      showSnackbar("Terjadi Kesalahan, silakan login kembali.", "error");
      // showSnackbar("Transaksi dibatalkan!", "error");
      // localStorage.removeItem("token");
      // sessionStorage.removeItem("user");
      // window.location.href = "/login"; // Redirect ke halaman login
    }
    return Promise.reject(error);
  }
);

export { instance };
