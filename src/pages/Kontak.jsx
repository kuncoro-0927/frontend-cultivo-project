import { useState } from "react";
import { TeamData } from "../data_sementara/Team";
import CardTeam from "../component/card/CardTeam";
import { TextField } from "@mui/material";
import { instance } from "../utils/axios"; // Pastikan Anda menginstal axios (npm install axios)

const Kontak = () => {
  // State untuk menyimpan data form
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
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk mengirim form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading"); // Set status loading

    try {
      // Kirim data ke server backend
      const response = await instance.post("/form/contact", formData);

      if (response.status === 200) {
        setStatus("success"); // Sukses
        alert("Pesan berhasil dikirim!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        }); // Reset form
      }
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
      setStatus("error"); // Gagal
      alert("Gagal mengirim pesan. Coba lagi nanti.");
    }
  };

  return (
    <>
      <section className="lg:mt-32 mt-20 mx-4 text-hitam2">
        <div className="text-center space-y-2">
          <p className="font-bold">Hubungi kami</p>
          <p className="text-3xl font-extrabold ">Ada yang bisa dibantu?</p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            dolorum!
          </p>
        </div>

        <div className="carousel carousel-center max-w-full mt-7 md:mx-0 gap-3  lg:gap-10 lg:mt-16">
          <div className="carousel-item hidden md:hidden lg:flex  lg:gap-5">
            {Array.isArray(TeamData) &&
              TeamData.slice(0, 6).map((daerahItem) => (
                <CardTeam
                  key={daerahItem.id}
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
              TeamData.slice(0, 6).map((daerahItem) => (
                <CardTeam
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                  role={daerahItem.role}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="lg:mx-40 mx-4 mt-10 lg:mt-28 flex flex-col-reverse gap-10">
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
                disabled={status === "loading"}
              >
                {status === "loading" ? "Mengirim..." : "Submit"}
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
            <p className="text-sm font-bold underline mt-2">kamu@gmail.com</p>
            <h1 className="border-b mt-5"></h1>
          </div>
          <div className="mt-5">
            <p className="font-bold">Chat dengan kami</p>
            <p className="text-sm mt-1">Lorem ipsum dolor sit amet.</p>
            <p className="text-sm font-bold underline mt-2">kamu@gmail.com</p>
            <h1 className="border-b mt-5"></h1>
          </div>
          <div className="mt-5">
            <p className="font-bold">Chat dengan kami</p>
            <p className="text-sm mt-1">Lorem ipsum dolor sit amet.</p>
            <p className="text-sm font-bold underline mt-2">kamu@gmail.com</p>
            <h1 className="border-b mt-5"></h1>
          </div>
          <div className="mt-5">
            <p className="font-bold">Chat dengan kami</p>
            <p className="text-sm mt-1">Lorem ipsum dolor sit amet.</p>
            <p className="text-sm font-bold underline mt-2">kamu@gmail.com</p>
            <h1 className="border-b mt-5"></h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontak;
