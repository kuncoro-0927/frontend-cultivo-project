/* eslint-disable no-unused-vars */
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../src/utils/axios";
import { TextField } from "@mui/material";
import { showSnackbar } from "../component/CustomSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      showSnackbar("Token tidak valid atau sudah kadaluarsa.", "error");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      showSnackbar(
        "Kata sandi baru dan konfirmasi kata sandi tidak cocok.",
        "error"
      );
      return;
    }
    try {
      setLoading(true);
      const res = await instance.post("/reset-password", {
        token,
        newPassword,
      });

      showSnackbar(res.data.message, "success");
      setTimeout(() => navigate("/login"), 3000); // Redirect ke login setelah sukses
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Terjadi kesalahan.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="lg:mx-10 2xl:mx-32 lg:my-10 rounded-2xl lg:p-0">
        <Link to="/" className="lg:ml-0">
          <img
            src="/images/logo2.svg"
            className="m-5 md:m-0 w-24 md:w-28"
            alt="Logo"
          />
        </Link>
        <div className="flex justify-center mt-16 2xl:mt-0 2xl:min-h-screen 2xl:items-center md:mt-0 lg:justify-center md:justify-start gap-20 items-center">
          <div className="">
            <h1 className="text-hitam text-center text-xl lg:text-2xl font-extrabold">
              Atur Kata Sandi Baru
            </h1>
            <p className="text-center mt-3 text-xs md:text-sm text-gray-500">
              Silahkan masukkan kata sandi Anda yang baru
            </p>

            <div className="grid-1 grid mt-10 w-[260px] sm:w-[500px] md:w-[300px] lg:w-[350px]">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* New Password Field */}
                <TextField
                  fullWidth
                  label="Kata sandi baru"
                  type={showPassword ? "text" : "password"} // Ubah tipe input
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  size="small"
                  helperText="Masukkan setidaknya 8 karakter"
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

                {/* Confirm Password Field */}
                <TextField
                  fullWidth
                  label="Konfirmasi kata sandi"
                  type={showConfirmPassword ? "text" : "password"} // Ubah tipe input
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="small"
                  helperText={
                    newPassword !== confirmPassword && confirmPassword
                      ? "Kata sandi tidak cocok"
                      : " "
                  }
                  error={newPassword !== confirmPassword && confirmPassword} // Display error if passwords don't match
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="p-2 bg-hitam mt-10 hover:bg-hover text-white text-sm rounded-md"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : (
                    "Kirim"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="relative md:block hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
            <div className="relative">
              <img
                src="/images/bg-home-3.jpg"
                alt="Furniture"
                className="lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-2xl font-bold">
                  Temukan Agrowisata Terbaik untuk Liburan Anda
                </h2>
                <p className="mt-2 text-sm">
                  Kami menawarkan pengalaman agrowisata unik dari berbagai kota
                  di Indonesia, dengan aktivitas yang menggabungkan keindahan
                  alam dan edukasi.
                </p>
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
    </>
  );
};

export default ResetPassword;
