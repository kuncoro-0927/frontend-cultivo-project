import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import instance from "../../src/utils/axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/login", { email, password });

      const user = { name: response.data.name, role: response.data.role };

      localStorage.setItem("token", response.data.token);
      login(response.data.token, user);
      navigate("/dashboard");
    } catch (err) {
      setError("Login gagal: " + err.response.data.message);
    }
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
                  <p className="mt-3 text-sm">Lupa Kata Sandi?</p>
                  <p className="text-red-500 text-sm mt-2">
                    {error && <div>{error}</div>}
                  </p>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                >
                  Login
                </button>
                <p className="mt-5 text-xs md:text-base">
                  Belum punya akun? Daftar{" "}
                  <Link to="/register" className="font-semibold">
                    disini
                  </Link>
                </p>
              </form>
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
