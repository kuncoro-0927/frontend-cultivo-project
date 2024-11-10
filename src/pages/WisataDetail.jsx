/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

import axios from "axios";
import CardImg from "../component/card/CardImg";
import { Modal, Box } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const WisataDetail = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [showAllImages, setShowAllImages] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams(); // Mengambil ID dari URL
  const [wisata, setWisata] = useState("");

  useEffect(() => {
    // Mengambil data wisata berdasarkan ID yang diterima dari URL
    axios
      .get(`http://localhost:5000/wisata/${id}`)
      .then((response) => {
        setWisata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wisata data:", error);
      });
  }, [id]); // Menyebabkan rerender jika id berubah

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
      setShowNavbar(
        currentScroll > 100 &&
          currentScroll < document.body.scrollHeight - window.innerHeight - 50
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleImages = () => {
    setShowAllImages(!showAllImages);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section className="mt-20 sm:mt-20 mx-7 md:mt-20 md:mx-10 lg:mx-14 lg:mt-24 flex flex-col md:flex-row ">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          {wisata.name}
        </h1>
        <p className="mt-5 md:mt-7 text-lg sm:text-base lg:text-lg text-gray-700 lg:max-w-3xl">
          {wisata.detail}
        </p>

        <div className="mt-7">
          <h2 className="text-xl font-bold">Fasilitas:</h2>
        </div>

        {/* FASILITAS UNTUK LAYAR BESAR */}
        <div className="flex-wrap justify-start mt-4 gap-4 flex max-w-4xl">
          {typeof wisata.facility === "string" && wisata.facility.length > 0 ? (
            wisata.facility.split(",").map((item, index) => (
              <div
                key={index}
                className="rounded-lg lg:flex items-center lg:justify-center px-4 py-3 border border-black hidden md:flex"
              >
                <div className="flex items-center text-xl">
                  <span className="text-base">{item.trim()}</span>{" "}
                </div>
              </div>
            ))
          ) : (
            <p>No facilities available</p>
          )}
        </div>

        {/* FASILITAS UNTUK LAYAR KECIL */}
        <div className="mt-1 gap-2 flex max-w-full carousel carousel-center py-1 lg:hidden">
          {typeof wisata.facility === "string" && wisata.facility.length > 0 ? (
            wisata.facility.split(",").map((item, index) => (
              <div
                key={index}
                className="carousel-item rounded-lg px-4 py-3 border border-black"
              >
                <div className="flex items-center text-xl">
                  <span className="text-base">{item.trim()}</span>{" "}
                </div>
              </div>
            ))
          ) : (
            <p>No facilities available</p>
          )}
        </div>

        <div className="flex-wrap justify-start mt-4 lg:mt-10 gap-4 flex max-w-4xl">
          {typeof wisata.gallery === "string" && wisata.gallery.length > 0 ? (
            // Memisahkan string gambar berdasarkan koma, menghilangkan spasi ekstra, dan menampilkan maksimal 4 gambar
            wisata.gallery
              .split(",")
              .slice(0, 4)
              .map((image, index) => (
                <div key={index} className="flex justify-center">
                  {/* Menambahkan path dasar di depan nama file gambar */}
                  <CardImg
                    img={`http://localhost:5000/images/${image.trim()}`}
                  />
                </div>
              ))
          ) : (
            <p>No images available</p> // Menampilkan pesan jika tidak ada gambar
          )}
        </div>

        <button className="mt-7 text-hitam underline" onClick={handleOpen}>
          Lihat Semua Gambar
        </button>

        {showNavbar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center z-10 lg:hidden md:hidden">
            <div className="text-sm">
              Mulai Dari
              <div className="text-lg font-extrabold">IDR {wisata.price}</div>
            </div>
            <button className="py-2 px-4 bg-hitam rounded-md text-white">
              Pesan Sekarang
            </button>
          </div>
        )}

        {/* Modal untuk menampilkan semua gambar */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              margin: 5,
              display: "grid",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "full",
              maxWidth: "full",
              maxHeight: "90vh",
              overflowY: "scroll",
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Semua Gambar</h2>
              <button onClick={handleClose} className="mt-4 text-3xl">
                <IoClose />
              </button>
            </div>

            <div className="grid grid-cols-1 justify-center mt-10 gap-10">
              {typeof wisata.gallery === "string" &&
              wisata.gallery.length > 0 ? (
                // Memisahkan string gambar berdasarkan koma, menghilangkan spasi ekstra, dan menampilkan maksimal 4 gambar
                wisata.gallery
                  .split(",")
                  .slice(0, 4)
                  .map((image, index) => (
                    <div
                      key={wisata.id}
                      className="relative flex justify-center"
                    >
                      <img
                        src={`http://localhost:5000/images/${image.trim()}`}
                        alt={`Gambar ${index + 1}`}
                        className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                      />
                    </div>
                  ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </Box>
        </Modal>
      </div>

      {/* Konten di sebelah kanan */}
      <div className="lg:flex flex-col hidden">
        <div className="bg-hijau-opa font-medium max-w-72 lg:text-sm text-white flex items-center justify-center py-2 rounded-tr-lg rounded-tl-lg">
          Jaminan Harga Terbaik
        </div>
        <div className="px-5 items-center justify-center max-w-72 border shadow-sm">
          <p className="text-[0.8rem] mt-5">Mulai Dari</p>
          <div className="flex justify-start text-2xl font-extrabold">
            IDR {wisata.price}
          </div>
          <button className="w-full py-3 mr-5 lg:mt-5 mb-10 bg-hitam rounded-md text-white flex justify-center hover:-translate-y-1 duration-300">
            Pesan Sekarang
          </button>
        </div>

        <div className="px-3 border font-medium max-w-72 text-hitam flex items-center justify-between py-5 rounded-br-lg rounded-bl-lg">
          <button className="flex items-center gap-2">
            <IoShareSocial className="text-xl" /> Bagikan
          </button>
          <button className="flex items-center gap-2">
            <CiHeart className="text-xl" /> Simpan
          </button>
        </div>

        <div className="lg:mt-10">
          <h1 className="font-semibold text-lg">Mengapa Cultivo?</h1>
          <div className="space-y-3 mt-5">
            <p className="flex items-center gap-2">
              <FaCheck /> Pengalaman Wisata Unik
            </p>
            <p className="flex items-center gap-2">
              <FaCheck /> Edukasi & Rekreasi
            </p>
            <p className="flex items-center gap-2">
              <FaCheck /> Tiket Mudah & Terjangkau
            </p>
            <p className="flex items-center gap-2">
              <FaCheck /> Dukung UMKM Lokal
            </p>
            <p className="flex items-center gap-2">
              <FaCheck /> Wisata Ramah Lingkungan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WisataDetail;
