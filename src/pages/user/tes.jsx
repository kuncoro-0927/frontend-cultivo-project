import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const Tes = () => {
  const [loading, setLoading] = useState(false);

  // Fungsi untuk menangani submit dan mengubah status loading
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit
    setLoading(true);

    // Simulasikan proses pengiriman
    setTimeout(() => {
      setLoading(false); // Mengubah status loading setelah beberapa detik
    }, 2000); // Waktu tunggu 2 detik (simulasi)
  };

  return (
    <div className="mt-20">
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        margin="normal"
        name="name"
        InputLabelProps={{
          sx: {
            color: "black",
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran label responsif
            "&.Mui-focused": {
              color: "black",
            },
            ".dark &": {
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
            },
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            color: "black",
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran teks responsif
            ".dark &": {
              color: "white",
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "black",
            ".dark &": {
              borderBottomColor: "white",
            },
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "black",
            ".dark &": {
              borderBottomColor: "white",
            },
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "black",
            ".dark &": {
              borderBottomColor: "white",
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Name"
        variant="outlined" // Ganti menjadi outlined
        margin="normal"
        name="name"
        InputLabelProps={{
          sx: {
            color: "black",
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran label responsif
            "&.Mui-focused": {
              color: "black",
            },
            ".dark &": {
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "black", // Ubah warna teks di dalam input
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran teks responsif
            ".dark &": {
              color: "white",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border default
            ".dark &": {
              borderColor: "white",
            },
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border saat hover
            ".dark &": {
              borderColor: "white",
            },
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border saat focused
            ".dark &": {
              borderColor: "white",
            },
          },
        }}
      />

      <TextField
        fullWidth
        label="Name"
        variant="outlined" // Ganti menjadi outlined
        margin="normal"
        name="name"
        InputLabelProps={{
          sx: {
            color: "black",
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran label responsif
            "&.Mui-focused": {
              color: "black",
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "black", // Ubah warna teks di dalam input
            fontSize: { xs: "0.875rem", md: "1rem" }, // Ukuran teks responsif
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border default
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border saat hover
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Warna border saat focused
          },
        }}
      />

      <LoadingButton
        type="submit"
        onClick={handleSubmit} // Menambahkan fungsi handleSubmit ke tombol
        loading={loading}
        endIcon={<SendIcon />}
        loadingPosition="end"
        variant="contained"
        sx={{
          mt: 3,
          fontSize: { xs: "12px", md: "13px" },
          padding: { xs: "8px 16px", md: "8px 16px" },
          backgroundColor: "#22282C", // Default for light mode
          color: "white",
          "&:hover": {
            backgroundColor: "#020617", // Darker for light mode
          },
          ".dark &": {
            backgroundColor: loading ? "#f1f5f9" : "#E2E8F0", // Red for dark mode during submit
            "&:hover": {
              backgroundColor: loading ? "#f1f5f9" : "#E2E8F0", // Darker red on hover during submit in dark mode
            },
          },
        }}
        className="dark:bg-gray-100 dark:text-hitam dark:hover:bg-gray-200"
      >
        {loading ? "Sending..." : "Send"}
      </LoadingButton>
    </div>
  );
};

export default Tes;
