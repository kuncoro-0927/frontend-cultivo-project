/* eslint-disable no-unused-vars */
import { useState } from "react";
import { showSnackbar } from "../component/CustomSnackbar";
import { Link } from "react-router-dom";
import { instance } from "../../src/utils/axios";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [loading, setLoading] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorEmail("");
    try {
      setLoading(true);
      const res = await instance.post("/forgot-password", { email });
      setMessage(res.data.message);
      showSnackbar("Tautan berhasil dikirim", "success");
    } catch (err) {
      if (err.response && err.response.data) {
        const { field, message } = err.response.data;

        if (field === "email") setErrorEmail(message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className=" lg:mx-10 2xl:mx-32   lg:my-10 rounded-2xl lg:p-0">
        <Link to="/" className="lg:ml-0">
          <img
            src="/images/logo2.svg"
            className="m-5 md:m-0 w-24 md:w-28"
            alt="Logo"
          />
        </Link>
        <div className="flex justify-center mt-16 2xl:mt-0 2xl:min-h-screen 2xl:items-center  md:mt-0 lg:justify-center md:justify-start gap-20 items-center">
          <div className="">
            <h1 className="text-hitam text-center text-xl lg:text-2xl font-extrabold">
              Lupa kata sandi?
            </h1>
            <p className="text-center mt-3 max-w-xs text-xs md:text-sm text-gray-500">
              Masukkan email Anda untuk menerima tautan reset kata sandi.
            </p>

            <div className="grid-1 mx-auto md:mx-0  grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim().length >= 3) {
                      setErrorEmail(""); // Hapus error jika sudah valid
                    }
                  }}
                  size="small"
                  error={Boolean(errorEmail)} // Jika ada error, beri warna merah
                  helperText={errorEmail} // Tampilkan pesan error di bawah input
                  sx={{
                    "& .MuiOutlinedInput-root": { color: "black !important" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black !important",
                    },
                    "& .MuiInputLabel-root": { color: "black !important" },
                  }}
                />

                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white text-sm rounded-md"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                  ) : (
                    "Kirim"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="relative md:block hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
            {/* Gambar dengan efek sudut melengkung */}
            <div className="relative">
              <img
                src="/images/bg-home-3.jpg"
                alt="Furniture"
                className="lg:h-[600px]  object-cover  " // Gambar dengan efek rounded khusus
              />

              {/* Overlay Teks */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-2xl font-bold">
                  Temukan Agrowisata Terbaik untuk Liburan Anda
                </h2>
                <p className="mt-2 text-sm">
                  Kami menawarkan pengalaman agrowisata unik dari berbagai kota
                  di Indonesia, dengan aktivitas yang menggabungkan keindahan
                  alam dan edukasi.
                </p>

                {/* Badge Section */}
                <div className="mt-5 flex gap-3">
                  <span className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-semibold">
                    Tiket mudah
                  </span>
                  <span className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-semibold">
                    Eksplor Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
