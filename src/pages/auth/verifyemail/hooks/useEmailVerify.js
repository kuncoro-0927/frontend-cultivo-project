import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../component/CustomSnackbar";
const OTP_DURATION = 300;

export function useEmailVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { otpToken } = location.state || {};

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(OTP_DURATION);
  const [otpExpired, setOtpExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);

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
    setLoadingVerify(true);
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
      await instance.post("/resend-otp", { email });

      showSnackbar("Kode OTP dikirim ke Email Anda", "success");

      setTimer(OTP_DURATION);
      setOtpExpired(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  return {
    otp,
    setOtp,
    timer,
    otpExpired,
    email,
    error,
    loadingVerify,
    handleVerify,
    handleResendOtp,
  };
}
