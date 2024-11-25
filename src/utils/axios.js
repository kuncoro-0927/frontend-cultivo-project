import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  timeout: 1000,
  headers: { "X-custom-header": "foobar" },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access");
    }
    return Promise.reject(error);
  }
);
export default instance;
