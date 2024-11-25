/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/cultivo/api/register",
        { name, email, password }
      );

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <section className="mx-7 lg:mx-20 xl:mx-40 mt-24 lg:mt-20 rounded-2xl bg-white shadow-xl p-7 lg:p-10">
        <div className="flex justify-center gap-16 items-center">
          <div className="">
            <h1 className="text-hitam text-4xl font-extrabold">Daftar Akun</h1>

            <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2 px-4 border rounded-md"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 px-4 mt-7 border rounded-md"
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
                {error && (
                  <p className="mt-2" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                >
                  Daftar
                </button>
                <p className="mt-5 text-xs md:text-base">
                  Sudah punya akun? Masuk{" "}
                  <Link to="/login" className="font-semibold">
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

export default Register;
