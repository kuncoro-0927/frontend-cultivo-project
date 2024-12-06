import SidebarAccount from "../../component/SidebarAccount";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../../services/UserServices";
const Profile = () => {
  const { user, updateUser } = useAuth();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phonenumber: user?.phonenumber || "",
  });

  const [isFormChanged, setIsFormChanged] = useState(() => {
    const savedFormChanged = localStorage.getItem("isFormChanged");
    return savedFormChanged ? JSON.parse(savedFormChanged) : false;
  });

  useEffect(() => {
    const formChanged =
      formData.firstname !== user?.firstname ||
      formData.lastname !== user?.lastname ||
      formData.phonenumber !== user?.phonenumber;

    localStorage.setItem("isFormChanged", JSON.stringify(formChanged));
    setIsFormChanged(formChanged);
  }, [formData, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi langsung saat mengetik
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim()
        ? ""
        : name === "firstname"
        ? "Nama depan tidak boleh kosong"
        : "Nama belakang tidak boleh kosong",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await updateUserProfile(formData);

      localStorage.setItem("user", JSON.stringify(formData));

      setMessage("Profil berhasil diperbarui!");
      if (updateUser) {
        updateUser(formData);
      }
      setTimeout(() => {
        setMessage("");
      }, 5000);
      localStorage.setItem("isFormChanged", JSON.stringify(false));
      setIsFormChanged(false);
      console.log("Respons server:", response);
    } catch (error) {
      console.error("Gagal update profil:", error);
      setMessage("Terjadi kesalahan saat memperbarui profil.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <section className="flex ">
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="p-8 mt-20 ">
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

              <div className="">
                <TextField
                  fullWidth
                  label="Nama Belakang"
                  variant="outlined"
                  name="lastname"
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  required
                  size="normal"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    sx: {
                      color: errors.lastname
                        ? theme.palette.error.main
                        : "black",
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

              <div className="">
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

              <div className="">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="name"
                  value={user?.email}
                  required
                  disabled
                  size="normal"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "black",
                      fontSize: { xs: "0.875rem", md: "0.9rem" },
                      "&.Mui-focused": {
                        color: "black !important",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "black",
                      fontSize: { xs: "0.875rem", md: "0.9rem" },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black !important",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black !important",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black !important",
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex items-center ">
              <button
                type="submit"
                className={`px-4 mt-5 lg:mt-7 py-3 mr-5 lg:text-base lg:font-medium flex justify-center hover:-translate-y-1 duration-300 ${
                  !isFormChanged
                    ? "bg-gray-100 text-gray-300 rounded-md cursor-not-allowed"
                    : "hover:bg-hover bg-hitam rounded-md text-white "
                }`}
                disabled={!isFormChanged}
              >
                Simpan
              </button>

              {message && <p className="ml-4 text-green-500">{message}</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
