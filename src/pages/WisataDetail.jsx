/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import CardImg from "../component/card/CardImg";
import { Modal, Box } from "@mui/material";
// import { CiHeart } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import PopUpPesan from "../component/TesPesan";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { useWishlist } from "../contexts/WishlistsContext";
import { showSnackbar } from "../component/CustomSnackbar";

import { IoMdClose, IoMdCheckmark } from "react-icons/io";
const WisataDetail = () => {
  const { wisataId } = useParams();
  const { wishlist, setWishlist } = useWishlist();
  const isInWishlist = wishlist.some(
    (item) => item.agrotourism_id === wisataId
  );
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: Pilih Tanggal, 2: Konfirmasi
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [showAllImages, setShowAllImages] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [wisataDetail, setWisataDetail] = useState(null);
  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Hapus dari wishlist
        await instance.delete(`/delete/wishlist/${wisataId}`);
        const updatedWishlist = wishlist.filter(
          (item) => item.agrotourism_id !== wisataId
        );
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wishlist berhasil dihapus", "success");
      } else {
        // Tambahkan ke wishlist
        await instance.post("/add/wishlist", { agrotourism_id: wisataId });
        const updatedWishlist = [...wishlist, { agrotourism_id: wisataId }];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  useEffect(() => {
    // Memuat wishlist dari localStorage saat komponen dimuat
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  useEffect(() => {
    if (wisataDetail?.price) {
      setTotal(wisataDetail.price * quantity);
    }
  }, [quantity, wisataDetail]);
  const handleNextStep = (date) => {
    setSelectedDate(date);
    setModalStep(2); // Pindah ke langkah Konfirmasi
  };
  useEffect(() => {
    instance
      .get(`/agrotourism/${wisataId}`)
      .then((response) => {
        const wisata = response.data.data[0];
        setWisataDetail(wisata);
        console.log("Wisata Detail (State):", wisata);
      })
      .catch((error) => {
        console.error("Error fetching wisata detail:", error);
      });
  }, [wisataId]);

  useEffect(() => {
    console.log("Updated Wisata Detail:", wisataDetail);
  }, [wisataDetail]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
      setShowNavbar(
        currentScroll > 0 &&
          currentScroll < document.body.scrollHeight - window.innerHeight - 0
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

  if (!wisataDetail) {
    return <div></div>;
  }
  return (
    <section className="mt-5 sm:mt-20 mx-7 md:mt-20 md:mx-10 lg:mx-14 lg:mt-24 pt-20 md:pt-0 flex flex-col md:flex-row ">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          {wisataDetail.name}
        </h1>
        <p className="mt-5 md:mt-7 text-md sm:text-base lg:text-lg text-hitam lg:max-w-3xl">
          {wisataDetail.description}
        </p>

        <div className="mt-7">
          <h2 className="text-2xl font-extrabold">Alamat</h2>
        </div>
        <p className="mt-5 md:mt-2 text-md sm:text-base lg:text-lg text-hitam lg:max-w-3xl">
          {wisataDetail.address}
        </p>

        <div className="mt-7">
          <h2 className="text-2xl font-extrabold">Apa yang termasuk?</h2>
        </div>
        <div className=" flex items-start gap-16 mt-2">
          <div className="grid justify-start mt-4 gap-4  max-w-4xl">
            <p className="font-semibold text-sm md:text-base text-hitam2">
              TERMASUK
            </p>
            {typeof wisataDetail.include === "string" &&
            wisataDetail.include.length > 0 ? (
              wisataDetail.include.split(",").map((item, index) => (
                <div key={index} className="">
                  <div className="flex items-center gap-3 text-xl">
                    <div className="text-green-500">
                      <IoMdCheckmark />
                    </div>
                    <div className="text-sm md:text-base grid">
                      {item.trim()}
                    </div>{" "}
                  </div>
                </div>
              ))
            ) : (
              <p>No include available</p>
            )}
          </div>

          <div className="grid justify-start mt-4 gap-4  max-w-4xl">
            <p className="font-semibold text-sm md:text-base text-hitam2">
              TIDAK TERMASUK
            </p>
            {typeof wisataDetail.exclude === "string" &&
            wisataDetail.exclude.length > 0 ? (
              wisataDetail.exclude.split(",").map((item, index) => (
                <div key={index} className="">
                  <div className="flex items-center gap-3 text-xl">
                    <div className="text-red-500">
                      <IoMdClose />
                    </div>
                    <div className="text-sm md:text-base grid">
                      {item.trim()}
                    </div>{" "}
                  </div>
                </div>
              ))
            ) : (
              <p>No exclude available</p>
            )}
          </div>
        </div>

        <div className="mt-7">
          <h2 className="text-2xl font-extrabold">Fasilitas</h2>
        </div>

        <div className="flex-wrap justify-start mt-4 gap-4 flex max-w-4xl">
          {typeof wisataDetail.facility === "string" &&
          wisataDetail.facility.length > 0 ? (
            wisataDetail.facility.split(",").map((item, index) => (
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

        <div className="mt-1 gap-2 flex max-w-full carousel carousel-center py-1 md:hidden">
          {typeof wisataDetail.facility === "string" &&
          wisataDetail.facility.length > 0 ? (
            wisataDetail.facility.split(",").map((item, index) => (
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

        <div className="flex-wrap justify-start mt-4 lg:mt-10 gap-4 flex">
          {Array.isArray(wisataDetail.url_gallery) &&
          wisataDetail.url_gallery.length > 0 ? (
            wisataDetail.url_gallery.slice(0, 4).map((url, index) => (
              <div key={index} className="flex justify-center">
                <CardImg img={url.trim()} />
              </div>
            ))
          ) : typeof wisataDetail.url_gallery === "string" &&
            wisataDetail.url_gallery.length > 0 ? (
            JSON.parse(wisataDetail.url_gallery)
              .slice(0, 4)
              .map((url, index) => (
                <div key={index} className="flex justify-center">
                  <CardImg img={url.trim()} />
                </div>
              ))
          ) : (
            <p>No images available</p>
          )}
        </div>

        <button className="mt-7 text-hitam underline" onClick={handleOpen}>
          Lihat Semua Gambar
        </button>

        {showNavbar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center z-10 lg:hidden md:hidden">
            <div className="text-sm">
              Mulai Dari
              <div className="text-lg font-extrabold">
                IDR {wisataDetail.price}
              </div>
            </div>
            <button
              onClick={() => setIsPopUpOpen(true)}
              className="py-2 px-4 bg-hitam rounded-md text-white"
            >
              Pesan Sekarang
            </button>
          </div>
        )}

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
              {Array.isArray(wisataDetail.url_gallery) &&
              wisataDetail.url_gallery.length > 0 ? (
                wisataDetail.url_gallery.slice(0, 4).map((url, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                      src={url.trim()}
                      alt=""
                    />
                  </div>
                ))
              ) : typeof wisataDetail.url_gallery === "string" &&
                wisataDetail.url_gallery.length > 0 ? (
                JSON.parse(wisataDetail.url_gallery)
                  .slice(0, 4)
                  .map((url, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                        src={url.trim()}
                        alt=""
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

      <div className="md:ml-10">
        <div className="md:flex flex-col hidden">
          <div className="bg-hijau-opa font-medium max-w-72 lg:text-sm text-white flex items-center justify-center py-2 rounded-tr-lg rounded-tl-lg">
            Jaminan Harga Terbaik
          </div>
          <div className="px-5 items-center justify-center max-w-72 border shadow-sm">
            <p className="text-[0.8rem] mt-5">Mulai Dari</p>
            <div className="flex justify-start text-2xl font-extrabold">
              IDR {Number(wisataDetail.price).toLocaleString("id-ID")}
            </div>
            <button
              onClick={() => setIsPopUpOpen(true)}
              className="w-full py-3 mr-5 lg:mt-5 mb-10 bg-hitam rounded-md text-white flex justify-center hover:-translate-y-1 duration-300"
            >
              Pesan Sekarang
            </button>
            <PopUpPesan
              open={isPopUpOpen}
              onClose={() => {
                setIsPopUpOpen(false);
                setModalStep(1); // Reset ke langkah pertama saat modal ditutup
              }}
              wisataName={wisataDetail?.name || ""}
              onConfirm={handleNextStep}
              modalStep={modalStep}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              quantity={quantity}
              setQuantity={setQuantity}
              total={total}
              price={wisataDetail?.price.toLocaleString()}
            />
          </div>

          <div className="px-3 border font-medium max-w-72 text-hitam flex items-center justify-between py-5 rounded-br-lg rounded-bl-lg">
            <button className="flex items-center gap-2">
              <IoShareSocial className="text-xl" /> Bagikan
            </button>
            {/* <button className="flex items-center gap-2">
              <CiHeart className="text-xl" /> Simpan
            </button> */}
            <IconButton onClick={toggleWishlist}>
              {isInWishlist ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>

        <div className="mt-10 mb-5 lg:mt-10">
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
