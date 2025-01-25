import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SoloPaymentPage = () => {
  return (
    <>
      <section className="flex flex-col-reverse lg:flex-col xl:flex-row mx-5 mt-10 md:mt-10 md:mx-10 space-y-10 lg:space-y-0 ">
        <div className="md:w-[700px] md:mt-10 lg:mt-10 md:pr-10 ">
          <div className="font-extrabold mt-10 md:mt-0 text-3xl md:text-4xl text-hitam">
            Pembayaran
          </div>

          <div className="bg-hijau-muda  text-xs md:text-base grid md:flex items-center justify-between space-x-3 font-normal bg-opacity-30 py-3 px-2 md:px-4 mt-5">
            <FaRegCircleUser className="hidden md:flex" />
            <p className="flex-1">
              Kamu masuk sebagai{" "}
              <span className="font-bold">kamu@gmail.com</span>
            </p>
            <p className="md:text-end mt-1">
              Bukan kamu?{" "}
              <span className="underline font-medium">Ganti akun</span>
            </p>
          </div>

          <div className="mt-10">
            <h1 className="font-extrabold text-2xl">Informasi pengguna</h1>
            <div className="md:flex grid items-center justify-between">
              <p className="text-sm mt-1">
                Perbarui profil Anda jika data tidak lengkap atau terdapat
                kesalahan.
              </p>

              <Link
                to="/account/profile"
                className="text-sm mt-2 md:mt-0s underline hover:text-blue-500"
              >
                Perbarui
              </Link>
            </div>

            <div className="mt-7 grid md:grid-cols-2 gap-x-5 gap-y-8">
              <TextField
                label="Nama Depan"
                variant="outlined"
                disabled
                size="normal"
              />

              <TextField
                label="Nama Belakang"
                variant="outlined"
                required
                disabled
                size="normal"
              />

              <TextField
                label="Email"
                variant="outlined"
                required
                disabled
                size="normal"
              />

              <MuiTelInput
                fullWidth
                label="Nomor Telepon"
                required
                disabled
                defaultCountry="ID"
              />
            </div>
          </div>

          <button className="px-4 mt-5 py-3 mr-5 lg:mt-5 mb-10 rounded-md flex justify-center  duration-300 bg-hitam text-white font-bold hover:-translate-y-1">
            Bayar
          </button>
        </div>

        <div className="lg:mt-20 w-full lg:w-[400px] px-10 bg-gray-300 bg-opacity-20 py-10 lg:pt-14">
          <div>
            <h2 className="font-extrabold text-2xl">Detail Pesanan</h2>
            <p className="text-sm mt-1">Pastikan pesananmu sudah sesuai, ya!</p>
            <p className="font-bold text-lg mt-5">Kampoeng Karet</p>
            <div className="border-b border-gray-400 my-6"></div>
            <div className="flex items-center mt-5 justify-between">
              <p className="font-normal">Tanggal </p>{" "}
              <p className="font-bold">29 Januari 2025</p>
            </div>
            <div className="border-b border-gray-400 my-6"></div>
            <div className="flex items-center mt-5 justify-between">
              <p>Total tiket</p>
              <p>1 x 10.000</p>
            </div>
            <div className="border-b border-gray-400 my-6"></div>
            <div className="flex items-center mt-5 justify-between">
              <p className="font-bold">Total harga</p>
              <p className="font-bold">IDR 10.000</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SoloPaymentPage;
