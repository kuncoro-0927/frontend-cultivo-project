import { useState } from "react";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../component/CustomSnackbar";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setStatus(emailRegex.test(value) ? "" : "error");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      showSnackbar("Email tidak valid! Gunakan format yang benar.", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await instance.post("/form/contact", formData);

      if (response.status === 200) {
        setStatus("success");
        showSnackbar("Pesan berhasil dikirim!", "success");
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
      setStatus("error");
      showSnackbar("Gagal mengirim pesan. Coba lagi nanti.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { formData, status, loading, handleChange, handleSubmit };
};
