import { useState } from "react";
import { TeamData } from "../data_sementara/Team";
import CardTeam from "../component/card/CardTeam";
import { TextField } from "@mui/material";
import { instance } from "../utils/axios"; // Pastikan Anda menginstal axios (npm install axios)
import { showSnackbar } from "../component/CustomSnackbar";
import { CustomSnackbar } from "../component/CustomSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

const Kontak = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // State untuk mengelola status kiriman
  const [status, setStatus] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi email dengan regex
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setStatus("error");
      } else {
        setStatus("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Validasi email sebelum submit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
      setStatus("error");
      showSnackbar("Gagal mengirim pesan. Coba lagi nanti.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomSnackbar />
      <section className="lg:mt-32 2xl:mx-32 mt-20 mx-4 text-hitam2">
        <div className="text-center space-y-2">
          <p className="font-bold">Hubungi kami</p>
          <p className="text-3xl font-extrabold ">Ada yang bisa dibantu?</p>
          <p className="text-sm text-gray-600">
            Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan apa
            pun.
          </p>
        </div>

        <div className="carousel carousel-center max-w-full mt-7 md:mx-0 gap-3  lg:gap-10 lg:mt-16">
          <div className="carousel-item hidden md:hidden lg:flex  lg:gap-5">
            {Array.isArray(TeamData) &&
              TeamData.slice(0, 6).map((daerahItem, index) => (
                <CardTeam
                  key={index}
                  title={daerahItem.title}
                  img={daerahItem.image}
                  role={daerahItem.role}
                />
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 py-3 lg:hidden ">
          <div className="carousel-item gap-3 px-1">
            {Array.isArray(TeamData) &&
              TeamData.slice(0, 6).map((daerahItem, index) => (
                <CardTeam
                  key={index}
                  title={daerahItem.title}
                  img={daerahItem.image}
                  role={daerahItem.role}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="lg:justify-center lg:mx-32 2xl:mx-52 mx-4 mt-10 lg:mt-28 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4">Hubungi tim kami</h2>
          <form onSubmit={handleSubmit}>
            {/* Nama Depan dan Belakang */}
            <div className="flex gap-4 mb-4">
              <TextField
                fullWidth
                label="Nama depan"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Nama belakang"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
                required
                error={status === "error"}
                helperText={
                  status === "error" ? "Masukkan email yang valid!" : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
            </div>

            {/* No Telepon */}
            <div className="mb-4">
              <TextField
                fullWidth
                label="No telepon"
                variant="outlined"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
            </div>

            {/* Pesan */}
            <div className="mb-4">
              <TextField
                fullWidth
                label="Pesan"
                variant="outlined"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={6}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-hover text-white px-4 py-2 rounded-md w-full"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className=" p-4 w-full">
          <div>
            <p className="font-bold">Email Support</p>
            <p className="text-sm mt-1 text-gray-800">
              Butuh bantuan? Email kami dan kami akan segera membantu!
            </p>
            <p className="text-sm font-bold underline mt-2">
              official.cultivo@gmail.com
            </p>
            <h1 className="border-b mt-5"></h1>
          </div>

          <div className="mt-5">
            <p className="font-bold">Alamat Kami</p>
            <p className="text-sm mt-1">Malang, Jawa Timur</p>

            <h1 className="border-b mt-5"></h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontak;
