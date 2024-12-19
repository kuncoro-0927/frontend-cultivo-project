/* eslint-disable no-unused-vars */
import SidebarAccount from "../../component/SidebarAccount";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState, useEffect } from "react";
import { updateUserProfile, getUserData } from "../../services/UserServices"; // Import service untuk API
import { useNavigate } from "react-router-dom"; // Untuk navigasi setelah update
import Cookies from "js-cookie";
import { showSnackbar } from "../../component/CustomSnackbar";
const Profile = () => {
  const { updateUser } = useAuth();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();

  // State untuk form data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
  });

  // Ambil data pengguna dari server ketika komponen pertama kali dimuat
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserData(); // Ambil data profil dari API
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          phonenumber: data.phonenumber || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        setMessage("Gagal mengambil data profil.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : `${name} tidak boleh kosong`,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(""); // Reset message

    try {
      const response = await updateUserProfile(formData); // Kirim data ke server untuk diperbarui

      // Update cookies dengan data baru
      Cookies.set("user", JSON.stringify(formData), { expires: 7, path: "/" });

      setMessage("Profil berhasil diperbarui!");
      showSnackbar("Profil berhasil diperbarui!", "success");
      if (updateUser) {
        updateUser(formData); // Update state global jika perlu
      }

      // Setelah berhasil, navigasi ke halaman lain jika diperlukan
      setTimeout(() => {
        setMessage("");
        navigate("/account/profile"); // Navigasi ulang ke profil atau halaman lain
      }, 5000);
    } catch (error) {
      console.error("Gagal update profil:", error);
      setMessage("Terjadi kesalahan saat memperbarui profil.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <section className="flex ">
      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>
      <div className="p-8 mt-20">
        <span className="font-extrabold text-3xl">Informasi Akun</span>
        <p>Lengkapi data akun anda</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:mt-7">
            <div className="w-96">
              <TextField
                fullWidth
                label="Nama Depan"
                variant="outlined"
                value={formData.firstname}
                onChange={handleInputChange}
                name="firstname"
                error={!!errors.firstname}
                helperText={errors.firstname}
                required
                size="normal"
                InputLabelProps={{
                  sx: {
                    color: errors.firstname
                      ? theme.palette.error.main
                      : "black",
                    fontSize: { xs: "0.875rem", md: "0.9rem" },
                    "&.Mui-focused": {
                      color: errors.firstname
                        ? `${theme.palette.error.main} !important`
                        : "black !important",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: errors.firstname
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.firstname
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                }}
              />
            </div>

            <div className="w-96">
              <TextField
                fullWidth
                label="Nama Belakang"
                variant="outlined"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                error={!!errors.lastname}
                helperText={errors.lastname}
                required
                size="normal"
                InputLabelProps={{
                  sx: {
                    color: errors.lastname ? theme.palette.error.main : "black",
                    fontSize: { xs: "0.875rem", md: "0.9rem" },
                    "&.Mui-focused": {
                      color: errors.lastname
                        ? `${theme.palette.error.main} !important`
                        : "black !important",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: errors.lastname
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.lastname
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                }}
              />
            </div>

            <div className="w-96">
              <MuiTelInput
                value={formData.phonenumber}
                onChange={(value) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    phonenumber: value.trim()
                      ? ""
                      : "Nomor Telepon tidak boleh kosong",
                  }));
                  setFormData((prevData) => ({
                    ...prevData,
                    phonenumber: value,
                  }));
                }}
                fullWidth
                label="Nomor Telepon"
                required
                error={!!errors.phonenumber}
                helperText={errors.phonenumber}
                defaultCountry="ID"
                InputLabelProps={{
                  sx: {
                    color: errors.phonenumber
                      ? theme.palette.error.main
                      : "black",
                    fontSize: { xs: "0.875rem", md: "0.9rem" },
                    "&.Mui-focused": {
                      color: errors.phonenumber
                        ? `${theme.palette.error.main} !important`
                        : "black !important",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: errors.phonenumber
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.phonenumber
                      ? `${theme.palette.error.main} !important`
                      : "black !important",
                  },
                }}
              />
            </div>

            <div className="w-96">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email || ""}
                required
                disabled
                size="normal"
              />
            </div>
          </div>
          <div className="flex items-center ">
            <button
              type="submit"
              className={`px-4 mt-5 lg:mt-7 py-3 mr-5 lg:text-base lg:font-medium flex justify-center hover:-translate-y-1 duration-300 ${
                Object.values(formData).every((field) => field)
                  ? "hover:bg-hover bg-hitam rounded-md text-white"
                  : "bg-gray-100 text-gray-300 rounded-md cursor-not-allowed"
              }`}
              disabled={Object.values(formData).some((field) => !field)}
            >
              Simpan
            </button>

            {message && <p className="ml-4 text-green-500">{showSnackbar}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
