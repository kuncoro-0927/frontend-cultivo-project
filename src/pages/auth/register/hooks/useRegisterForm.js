import { useState } from "react";
import { instance } from "../../../../utils/axios";
// onRegistered(token) dipanggil saat register sukses, supaya parent bisa
// pindah ke step OTP dan menyimpan token verifikasi.
export const useRegisterForm = ({ onRegistered }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim().length >= 3) setErrorName("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim().length >= 3) setErrorEmail("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim().length >= 3) setErrorPassword("");
  };

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
      onRegistered(response.data.token);
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

  return {
    name,
    email,
    password,
    errorName,
    errorEmail,
    errorPassword,
    loading,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  };
};
