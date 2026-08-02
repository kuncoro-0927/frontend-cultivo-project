import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../component/CustomSnackbar";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim().length >= 3) setErrorEmail("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim().length >= 3) setErrorPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrorName("");
    setErrorEmail("");
    setErrorPassword("");

    try {
      const response = await instance.post("/login", { email, password });

      if (response.status === 200) {
        const { isverified } = response.data;

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
          showSnackbar(message || "Akun belum diverifikasi!", "info");
          navigate("/email/verify", { state: { otpToken, email } });
        } else {
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
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/cultivo/api/auth/google`;
  };

  return {
    email,
    password,
    loading,
    showPassword,
    errorName,
    errorEmail,
    errorPassword,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleGoogleLogin,
  };
}
