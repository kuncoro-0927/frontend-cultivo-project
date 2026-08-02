import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../component/CustomSnackbar";

const OTP_DURATION = 300; // 5 menit dalam detik

export const useOtpVerification = (email) => {
  const [otpToken, setOtpToken] = useState(null);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(OTP_DURATION);
  const [otpExpired, setOtpExpired] = useState(false);
  const [error, setError] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const navigate = useNavigate();

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

  const resetTimer = () => {
    setTimer(OTP_DURATION);
    setOtpExpired(false);
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
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Verifikasi gagal");
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
      resetTimer();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  return {
    otpToken,
    setOtpToken,
    otp,
    setOtp,
    timer,
    otpExpired,
    error,
    loadingVerify,
    handleVerify,
    handleResendOtp,
    resetTimer,
  };
};
