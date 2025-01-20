import { TeamData } from "../data_sementara/Team";
import CardTeam from "../component/card/CardTeam";
import { TextField } from "@mui/material";
const Kontak = () => {
  return (
    <>
      <section className="mt-32 mx-7 text-hitam2">
        <div className=" text-center space-y-2">
          <p className="font-bold">Hubungi kami</p>
          <p className="text-3xl font-extrabold ">Ada yang bisa dibantu?</p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            dolorum!
          </p>
        </div>

        <div className="carousel carousel-center max-w-full mt-7 md:mx-0 gap-3  lg:gap-10 lg:mt-16">
          <div className="carousel-item hidden md:hidden lg:flex  lg:gap-3">
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

      <section className="mx-40 mt-28 flex gap-10">
        <div className="bg-gray-100 rounded-lg p-6 w-full">
          <h2 className="text-lg font-semibold mb-4">Hubungi tim kami</h2>
          <form>
            {/* Nama Depan dan Belakang sejajar */}
            <div className="flex gap-4 mb-4">
              <TextField
                fullWidth
                label="Nama depan"
                variant="outlined"
                name="firstName"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important", // Warna teks input menjadi hitam
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important", // Warna border menjadi hitam
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important", // Warna label menjadi hitam
                    fontSize: { xs: "0.875rem", md: "14px" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black !important", // Menghindari label biru saat fokus
                  },
                }}
              />
              <TextField
                fullWidth
                label="Nama belakang"
                variant="outlined"
                name="lastName"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important", // Warna teks input menjadi hitam
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important", // Warna border menjadi hitam
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important", // Warna label menjadi hitam
                    fontSize: { xs: "0.875rem", md: "14px" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black !important", // Menghindari label biru saat fokus
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
                    fontSize: { xs: "0.875rem", md: "14px" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
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
                    fontSize: { xs: "0.875rem", md: "14px" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
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
                multiline
                rows={6} // Mengatur ukuran lebih besar
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important",
                    fontSize: { xs: "0.875rem", md: "14px" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black !important",
                  },
                }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick=""
                className="bg-hover text-white px-4 py-2 rounded-md w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Samping */}
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
