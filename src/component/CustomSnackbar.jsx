/* eslint-disable react-refresh/only-export-components */
// src/components/CustomSnackbar.js
import { useState, useRef, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

let showSnackbar; // Agar fungsi bisa dipanggil di luar

const CustomSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const snackbarRef = useRef(null);

  // Fungsi untuk menampilkan snackbar
  showSnackbar = (msg, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  // Fungsi untuk menutup snackbar
  const handleClose = () => {
    setOpen(false);
  };

  // Gunakan ref untuk mengakses snackbar di luar komponen
  useEffect(() => {
    snackbarRef.current = { showSnackbar };
  }, []);

  return (
    <Snackbar
      open={open}
      // Durasi 10 detik
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posisi di kanan bawah
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export { CustomSnackbar, showSnackbar };
