import axios from "axios";

import { showSnackbar } from "../component/CustomSnackbar";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  timeout: 10000000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      showSnackbar("Terjadi Kesalahan, silakan login kembali.", "error");
    }
    return Promise.reject(error);
  }
);

export { instance };
