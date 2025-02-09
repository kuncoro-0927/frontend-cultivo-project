/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { instance } from "../../src/utils/axios";
import { showSnackbar } from "../component/CustomSnackbar";
import { TextField } from "@mui/material";
import { IconButton, Tooltip, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset error messages
    setErrorName("");
    setErrorEmail("");
    setErrorPassword("");

    try {
      const response = await instance.post("/login", { email, password });

      if (response.status === 200) {
        const { isverified, otpToken, role, message } = response.data;

        if (isverified) {
          const checkStatus = await instance.get("/verify-token", {
            withCredentials: true,
          });

          if (checkStatus.status === 200) {
            const { role: verifiedRole } = checkStatus.data.user;
            setIsLoggedIn(true);
            setUser(checkStatus.data.user);

            if (verifiedRole === "admin") {
              navigate("/admin/dashboard");
            } else if (verifiedRole === "attendant") {
              navigate("/attendant/dashboard");
            } else {
              navigate("/");
            }
          }
        }
      }
    } catch (err) {
      if (err.response) {
        const { field, message, isverified, otpToken } = err.response.data;

        if (!isverified && otpToken) {
          // Jika user belum verifikasi, arahkan ke halaman verifikasi
          showSnackbar(message || "Akun belum diverifikasi!", "info");
          navigate("/email/verify", {
            state: { otpToken, email },
          });
        } else {
          // Tangani error umum
          if (field === "name") setErrorName(message);
          else if (field === "email") setErrorEmail(message);
          else if (field === "password") setErrorPassword(message);
          else showSnackbar(message || "Terjadi kesalahan saat login", "error");
        }
      } else {
        showSnackbar("Gagal menghubungi server. Coba lagi nanti!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/cultivo/api/auth/google`;
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
              {" "}
              Masuk dengan akun anda
            </h1>
            <p className="text-center mt-3 text-xs md:text-sm text-gray-500">
              Masuk untuk memulai perjalanan seru Anda
            </p>

            <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                {/* <input
                  type="email"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 px-4 text-sm border rounded-md"
                  required
                />

                <input
                  type="password"
                  placeholder="Masukkan kata sandi anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2 px-4 text-sm mt-7 border  rounded-md"
                  required
                /> */}
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
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"} // Ubah tipe input
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.trim().length >= 3) {
                      setErrorPassword(""); // Hapus error jika sudah valid
                    }
                  }}
                  size="small"
                  error={Boolean(errorPassword)}
                  helperText={errorPassword}
                  sx={{
                    "& .MuiOutlinedInput-root": { color: "black !important" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black !important",
                    },
                    "& .MuiInputLabel-root": { color: "black !important" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="hover:text-blue-500 text-sm"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white text-sm rounded-md"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                  ) : (
                    "Masuk"
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex-grow border-b border-gray-300"></div>
                <div className="mx-4 text-xs">Atau</div>
                <div className="flex-grow border-b border-gray-300"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="bg-gray-200 bg-opacity-30 rounded-md p-2 mt-5 flex items-center justify-center gap-2"
              >
                <img className="w-[22px]" src="/images/google.svg" alt="" />
                <p className="text-sm"> Masuk dengan Google</p>
              </button>
              <div className="mt-5 text-xs md:text-sm flex justify-center gap-1">
                Belum punya akun?
                <Link to="/register" className="font-semibold">
                  Daftar
                </Link>
              </div>
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

export default Login;
