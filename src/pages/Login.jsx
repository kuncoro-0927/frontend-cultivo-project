/* eslint-disable no-unused-vars */
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { instance } from "../../src/utils/axios";
import { showSnackbar } from "../component/CustomSnackbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
              navigate("/user/dashboard");
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
      <section className="mx-7 lg:mx-20 xl:mx-40 mt-24 lg:mt-20 rounded-2xl bg-white shadow-xl p-7 lg:p-10">
        <div className="flex justify-center gap-16 items-center">
          <div className="">
            <h1 className="text-hitam text-2xl lg:text-4xl font-extrabold">
              {" "}
              Selamat Datang!
            </h1>

            <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleLogin} className="flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 px-4 border rounded-md"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2 px-4 mt-7 border rounded-md"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="mt-3 text-sm">Lupa Kata Sandi?</div>
                  <div className="text-red-500 text-sm mt-2">
                    {error && <div>{error}</div>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                >
                  Login
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex-grow border-b border-gray-300"></div>
                <div className="mx-4 text-sm">Atau</div>
                <div className="flex-grow border-b border-gray-300"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="bg-gray-200 bg-opacity-30 rounded-md p-2 mt-5 flex items-center justify-center gap-2"
              >
                <img
                  className="w-[22px]"
                  src="/public/images/google.svg"
                  alt=""
                />
                <p className="text-base"> Login dengan Google</p>
              </button>
              <div className="mt-5 text-xs md:text-base flex justify-center gap-1">
                Belum punya akun? Daftar{" "}
                <Link to="/register" className="font-semibold">
                  disini
                </Link>
              </div>
            </div>
          </div>
          <div className="md:block hidden lg:block">
            <img
              className="rounded-2xl md:h-[315px] lg:h-[400px] lg:w-[400px] object-cover"
              src="/public/images/login.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
