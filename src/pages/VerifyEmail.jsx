/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import axios from "axios";
import { showSnackbar } from "../component/CustomSnackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { instance } from "../utils/axios";
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

const EmailVerify = () => {
  const { state } = useLocation();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);
  const [otpExpired, setOtpExpired] = useState(false);
  const { otpToken } = location.state || {};
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);
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

  const handleVerify = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleResendOtp = async () => {
    try {
      setError(null);
      const response = await instance.post("/resend-otp", { email });

      showSnackbar("Kode OTP dikirim ke Email Anda", "success");

      setTimer(300);
      setOtpExpired(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  const maskEmail = (email) => {
    const [localPart, domainPart] = email.split("@");
    if (!localPart || localPart.length < 2) return email; // Handle edge cases like empty or single-character local part
    const maskedLocalPart = localPart[0] + "*".repeat(localPart.length - 1);
    return `${maskedLocalPart}@${domainPart}`;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <section className=" lg:mx-10  lg:my-10 rounded-2xl lg:p-0">
      <Link to="/" className="lg:ml-0">
        <img
          src="/images/logo2.svg"
          className="m-5 md:m-0 w-24 md:w-28"
          alt="Logo"
        />
      </Link>

      <div className="flex p-10 justify-center md:p-0 md:mt-0 mt-7 lg:ml-24 md:justify-start gap-20 items-center">
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
            kepada siapa pun. Jaga kerahasiaannya untuk melindungi akun Anda.
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
              >
                Verifikasi
              </button>
              {error && (
                <div className="text-red-500 mt-3 text-sm">{error}</div>
              )}
            </div>
            <div className="md:mt-3 mt-10 text-sm flex justify-center">
              Belum terima kode OTP?
              <button
                onClick={handleResendOtp}
                disabled={!otpExpired}
                className="text-blue-400 ml-1"
              >
                Kirim ulang
              </button>
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

        <div className="relative md:block lg:ml-auto hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
          {/* Gambar dengan efek sudut melengkung */}
          <div className="relative">
            <img
              src="/images/bg-home-3.jpg"
              alt="Furniture"
              className="lg:h-screen  object-cover  " // Gambar dengan efek rounded khusus
            />

            {/* Overlay Teks */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
              <h2 className="text-2xl font-bold">
                Temukan Agrowisata Terbaik untuk Liburan Anda
              </h2>
              <p className="mt-2 text-sm">
                Kami menawarkan pengalaman agrowisata unik dari berbagai kota di
                Indonesia, dengan aktivitas yang menggabungkan keindahan alam
                dan edukasi.
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
  );
};

export default EmailVerify;
