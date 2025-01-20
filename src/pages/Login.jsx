/* eslint-disable no-unused-vars */
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { instance } from "../../src/utils/axios";
import { showSnackbar } from "../component/CustomSnackbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await instance.post("/login", { email, password });

      if (response.status === 200) {
        const { isverified, otpToken, role, message } = response.data;

        if (isverified) {
          const checkStatus = await instance.get("verify-token", {
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
        } else {
          showSnackbar(message, "info");
          navigate("/email/verify", {
            state: { otpToken, email },
          });
        }
      }
    } catch (error) {
      showSnackbar("Login gagal, silahkan coba lagi", "error");
      // setError("Login failed, please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Login dengan Google
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/cultivo/api/auth/google";
  };

  return (
    <>
      <section className=" lg:mx-10 lg:my-10 rounded-2xl lg:p-0">
        <Link to="/" className="lg:ml-0">
          <img
            src="/images/logo2.svg"
            className="m-5 md:m-0 w-24 md:w-28"
            alt="Logo"
          />
        </Link>
        <div className="flex justify-center mt-16 md:mt-0 lg:ml-32 md:justify-start gap-20 items-center">
          <div className="">
            <h1 className="text-hitam text-center text-xl lg:text-2xl font-semibold">
              {" "}
              Masuk dengan akun anda
            </h1>
            <p className="text-center mt-3 text-xs md:text-sm text-gray-500">
              Masuk untuk memulai perjalanan seru Anda
            </p>

            <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleLogin} className="flex flex-col">
                <input
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
                />
                <div className="flex items-center justify-between">
                  <div className="mt-3 text-sm">Lupa kata sandi?</div>
                  <div className="text-red-500 text-sm mt-2">
                    {error && <div>{error}</div>}
                  </div>
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

          <div className="relative md:block lg:ml-auto hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
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
