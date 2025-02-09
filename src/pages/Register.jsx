/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { instance } from "../utils/axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../component/CustomSnackbar";
import { IconButton, Tooltip, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }

    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });

    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  const handleKeyDown = (event, currentIndex) => {
    if (event.key === "Backspace") {
      let otpArray = value.split("");

      if (otpArray[currentIndex]) {
        // Hapus karakter pada posisi saat ini
        otpArray[currentIndex] = "";
      } else if (currentIndex > 0) {
        // Jika kosong, pindah ke input sebelumnya dan hapus
        otpArray[currentIndex - 1] = "";
        focusInput(currentIndex - 1);
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 0, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(ele) => {
              inputRefs.current[index] = ele;
            }}
            value={value[index] ?? ""}
            onChange={(event) => handleChange(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            maxLength={1}
            style={{
              width: "40px",
              textAlign: "center",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              margin: "0 5px",
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpToken, setOtpToken] = useState(null);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  useEffect(() => {
    let interval;
    if (timer > 0 && !otpExpired) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
    }

    return () => clearInterval(interval);
  }, [timer, otpExpired]);
  const handleRegister = async () => {
    setErrorName("");
    setErrorEmail("");
    setErrorPassword("");

    setLoading(true);
    try {
      const response = await instance.post("/register", {
        name,
        email,
        password,
      });

      setOtpToken(response.data.token);
      setStep(2);
      setTimer(300);
      setOtpExpired(false);
    } catch (err) {
      if (err.response && err.response.data) {
        const { field, message } = err.response.data;

        if (field === "name") setErrorName(message);
        else if (field === "email") setErrorEmail(message);
        else if (field === "password") setErrorPassword(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    setError(null);
    try {
      const response = await instance.post("/verify-otp", {
        otp,
        token: otpToken,
      });
      if (response.status === 200) {
        showSnackbar("Verifikasi sukses!", "success");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Verifikasi gagal");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError(null);
      const response = await instance.post("/resend-otp", { email });

      showSnackbar("Kode OTP dikirim ke Email Anda.", "success");
      setOtpToken(response.data.token);
      setTimer(300);
      setOtpExpired(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const maskEmail = (email) => {
    const [local, domain] = email.split("@");
    if (local.length <= 2) {
      return `${local[0]}***@${domain}`;
    }
    return `${local[0]}${"*".repeat(local.length - 2)}${local.slice(
      -1
    )}@${domain}`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/cultivo/api/auth/google`;
  };

  return (
    <div className="">
      {step === 1 ? (
        <section className=" lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
          <Link to="/" className="lg:ml-0">
            <img
              src="/images/logo2.svg"
              className="m-5 md:m-0 w-24 md:w-28"
              alt="Logo"
            />
          </Link>
          <div className="flex justify-center mt-14 2xl:mt-0 2xl:min-h-screen 2xl:items-center lg:justify-center  md:justify-start gap-20 items-center">
            <div className="">
              <h1 className="text-hitam text-center text-xl lg:text-2xl font-extrabold">
                {" "}
                Buat akun anda
              </h1>
              <p className="text-center mt-3 text-sm text-gray-500">
                Daftar untuk memulai perjalanan seru Anda
              </p>

              <button
                onClick={handleGoogleLogin}
                className="bg-gray-200 w-full bg-opacity-30 rounded-md p-2 mt-5 flex items-center justify-center gap-2"
              >
                <img className="w-[22px]" src="/images/google.svg" alt="" />
                <p className="text-sm"> Masuk dengan Google</p>
              </button>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex-grow border-b border-gray-300"></div>
                <div className="mx-4 text-xs">Atau</div>
                <div className="flex-grow border-b border-gray-300"></div>
              </div>
              <div className="grid-1 space-y-5 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
                <TextField
                  fullWidth
                  label="Nama"
                  variant="outlined"
                  name="firstName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim().length >= 3) {
                      setErrorName("");
                    }
                  }}
                  size="small"
                  error={Boolean(errorName)}
                  helperText={errorName}
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
                <button
                  onClick={handleRegister}
                  className="p-2 text-sm bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                  ) : (
                    "Daftar"
                  )}
                </button>
                <div className="mt-5 text-xs md:text-sm flex justify-center gap-1">
                  Sudah punya akun?
                  <Link to="/login" className="font-semibold">
                    Masuk
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative md:block  hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
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
                    Kami menawarkan pengalaman agrowisata unik dari berbagai
                    kota di Indonesia, dengan aktivitas yang menggabungkan
                    keindahan alam dan edukasi.
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
      ) : (
        <section className=" lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
          <Link to="/" className="lg:ml-0">
            <img
              src="/images/logo2.svg"
              className="m-5 md:m-0 w-24 md:w-28"
              alt="Logo"
            />
          </Link>

          <div className="flex p-10 justify-center md:p-0 md:mt-0 mt-7 2xl:mt-0 2xl:min-h-screen 2xl:items-center lg:justify-center  md:justify-start gap-20 items-center">
            <div className="">
              <h1 className="text-hitam text-center text-2xl lg:text-2xl font-semibold">
                {" "}
                Verifikasi kode OTP
              </h1>
              <div className="md:text-normal text-sm mt-5">
                Silakan masukkan kode yang kami kirim ke email Anda
                <p className="mr-1 text-blue-400">{maskEmail(email)}</p>
                Demi keamanan Anda, pastikan untuk tidak membagikan kode ini
                <br />
                kepada siapa pun. Jaga kerahasiaannya untuk melindungi akun
                Anda.
              </div>

              <div className="grid-1 grid mt-5">
                <div className="">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <OTP
                      separator={<span>-</span>}
                      value={otp}
                      onChange={setOtp}
                      length={6}
                    />
                  </div>

                  <button
                    className="p-2 w-full bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                    onClick={handleVerify}
                    disabled={loadingVerify}
                  >
                    {loadingVerify ? (
                      <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                    ) : (
                      "Verifikasi"
                    )}
                  </button>
                  {error && (
                    <div className="text-red-500 mt-3 text-sm">{error}</div>
                  )}
                </div>
                <div className="md:mt-3 mt-10 text-sm flex justify-center">
                  Belum terima kode OTP?
                  <Tooltip
                    title={
                      !otpExpired ? "Kirim ulang saat kode kadaluwarsa" : ""
                    }
                  >
                    <span>
                      <button
                        onClick={handleResendOtp}
                        disabled={!otpExpired}
                        className={`ml-1 hover:underline ${
                          otpExpired
                            ? "text-blue-400"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Kirim ulang
                      </button>
                    </span>
                  </Tooltip>
                </div>
                <div className="mt-2 text-sm flex justify-center">
                  <p>
                    {otpExpired
                      ? "Kode OTP kadaluwarsa"
                      : `Kode OTP akan kadaluwarsa dalam: ${formatTime(timer)}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative md:block  hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
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
                    Kami menawarkan pengalaman agrowisata unik dari berbagai
                    kota di Indonesia, dengan aktivitas yang menggabungkan
                    keindahan alam dan edukasi.
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
      )}
    </div>
  );
};

export default Register;
