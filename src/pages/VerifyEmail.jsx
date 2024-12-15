/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    // Cari index kosong yang bisa diisi
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

    // Update nilai OTP
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });

    // Fokus pada kotak berikutnya jika ada input
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
  //   const [email, setEmail] = useState("");
  const { state } = useLocation();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const { otpToken } = location.state || {};
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Ambil email dari state yang dikirimkan melalui navigate
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
      const response = await axios.post(
        "http://localhost:5000/cultivo/api/verify-otp",
        {
          otp,
          token: otpToken,
        }
      );
      if (response.status === 200) {
        alert("Verification successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      setError(null); // Reset error
      const response = await axios.post(
        "http://localhost:5000/cultivo/api/resend-otp",
        { email }
      );

      alert("Kode OTP berhasil dikirim ulang ke email Anda");
      //   setOtpToken(response.data.token);
      setTimer(300); // Reset timer
      setOtpExpired(false); // Set OTP sebagai aktif kembali
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  //   const formatTime = (seconds) => {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  //   };

  //   const maskEmail = (email) => {
  //     const emailParts = email.split("@");
  //     const masked = emailParts[0].slice(0, 3) + "..." + emailParts[1];
  //     return masked;
  //   };

  return (
    <section className="mx-7 lg:mx-20 xl:mx-40 mt-24 lg:mt-20  rounded-2xl bg-white shadow-xl p-7 lg:p-10">
      <div className="flex justify-center gap-16 items-center">
        <div className="bg-red- w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
          <h1 className="text-hitam text-4xl font-extrabold">Kode OTP</h1>
          <div className="text-base mt-5">
            Masukkan kode yang kami kirim ke email Anda{" "}
            <span className="mr-1 text-hijau-opa">{email}</span>
            berhati-hatilah untuk tidak membagikan kode tersebut kepada siapa
            pun.
          </div>
          <div className="grid-1 grid mt-5">
            <div className="">
              <OTP
                separator={<span>-</span>}
                value={otp}
                onChange={setOtp}
                length={6}
              />
              <button
                className="p-2 w-full bg-hitam mt-10 hover:bg-hover text-white rounded-md"
                onClick={handleVerify}
              >
                Verify
              </button>
              {error && <div>{error}</div>}
            </div>
            <div className="mt-3 text-base flex justify-center">
              Belum terima kode OTP?{" "}
              <button
                onClick={handleResendOtp}
                // disabled={!otpExpired}
                className="text-hijau-opa ml-1"
              >
                kirim ulang
              </button>
            </div>
            <div className="mt-2 text-sm flex justify-center">
              {/* <p>
                {otpExpired
                  ? "Kode OTP kadaluwarsa"
                  : `Kode OTP akan kadaluwarsa dalam: ${formatTime(timer)}`}
              </p> */}
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
  );
};

export default EmailVerify;
