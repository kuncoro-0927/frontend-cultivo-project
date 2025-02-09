/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import CardImg from "../component/card/CardImg";
import { Modal, Box } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import PopUpPesan from "../component/Orders";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Share as ShareIcon,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";
import { useWishlist } from "../contexts/WishlistsContext";
import { showSnackbar } from "../component/CustomSnackbar";
import { useAuth } from "../contexts/AuthContext";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import ModalSignUp from "../component/ModalSignUp";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
const WisataDetail = () => {
  const reviewRef = useRef(null);
  const { wisataId } = useParams();
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);
  const [wisataDetail, setWisataDetail] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openModalShare = Boolean(anchorEl);
  const shareUrl = window.location.href; // URL halaman saat ini

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModalShare = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showSnackbar("Link berhasil disalin!", "success");
    } catch (error) {
      console.error("Gagal menyalin link:", error);
    }
    handleCloseModalShare();
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const description = wisataDetail?.description || "";

  const isLongDescription = description.split(" ").length > 60;

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsPopUpOpen(true);
    }
  };
  const toggleWishlist = async (agrotourismId) => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isInWishlist(agrotourismId)) {
        await instance.delete(`/delete/wishlist/${agrotourismId}`);
        const updatedWishlist = wishlist.filter(
          (item) => item.agrotourism_id !== agrotourismId
        );
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wisata dihapus dari favorit", "success");
      } else {
        // Tambahkan ke wishlist
        await instance.post("/add/wishlist", { agrotourism_id: agrotourismId });
        const updatedWishlist = [
          ...wishlist,
          { agrotourism_id: agrotourismId },
        ];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wisata ditambahkan ke favorit", "success");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  useEffect(() => {
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
    setModalStep(2);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wisataResponse = await instance.get(`/agrotourism/${wisataId}`);
        setWisataDetail(wisataResponse.data.data[0]);

        const reviewResponse = await instance.get(
          `/review/agrotourism/${wisataId}`
        );

        setReviews(reviewResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data wisata atau review.");
      }
    };

    fetchData();
  }, [wisataId]);

  useEffect(() => {}, [reviews]);

  useEffect(() => {}, [wisataDetail]);

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

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const totalReviews = reviews.length;
  const ratingCount = [1, 2, 3, 4, 5].map((rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  });

  const ratingPercentage = ratingCount.map(
    (count) => (count / totalReviews) * 100
  );

  return (
    <>
      <div className="md:hidden bg-red-300 h-[300px] relative">
        <img
          className="mt-5 max-w-3xl h-full object-cover w-full "
          src={wisataDetail.url_image}
          alt=""
        />

        <div className="absolute top-12 right-2 p-2">
          <div className="flex items-center gap-2">
            {/* Tombol Bagikan */}
            <div className="bg-white/80 rounded-full p-2 flex justify-center items-center shadow-md">
              <IconButton sx={{ width: 25, height: 25 }} onClick={handleClick}>
                <ShareIcon
                  sx={{ width: 25, height: 25 }}
                  className="text-gray-700"
                />
              </IconButton>
            </div>

            {/* Tombol Wishlist */}
            <div className="bg-white/80 rounded-full p-2 shadow-md">
              <IconButton
                sx={{ width: 25, height: 25 }}
                onClick={() => toggleWishlist(wisataDetail.id)}
              >
                {isInWishlist(wisataDetail.id) ? (
                  <FavoriteIcon
                    sx={{ width: 25, height: 25 }}
                    className="text-red-500"
                  />
                ) : (
                  <FavoriteIcon
                    sx={{ width: 25, height: 25 }}
                    className="text-gray-700"
                  />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <section className="text-hitam2 sm:mt-0 mx-7 md:mt-20 md:mx-6 lg:mx-14 2xl:mx-32 lg:mt-24 md:pt-0 flex flex-col md:flex-row ">
        <div className="flex-1 ">
          <h1 className="text-2xl sm:text-3xl hidden md:block font-extrabold md:text-3xl text-hitam2">
            {wisataDetail.name}
          </h1>
          <div className="items-center hidden md:flex text-hitam2">
            {reviews.length > 0 ? (
              <>
                <p className="mr-1 flex text-base font-semibold items-center gap-1">
                  <FaStar className="text-yellow-300" />
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </p>
                <p
                  className="underline ml-2 cursor-pointer"
                  onClick={() =>
                    reviewRef.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ulasan
                </p>
                <p className="mx-2">-</p>
              </>
            ) : (
              <p></p>
            )}
            <div className="underline font-semibold">
              <Link
                to={`/wisata/daerah/${wisataDetail.city_id}`}
                className=" hover:font-bold duration-200"
              >
                {wisataDetail.city_name}
              </Link>
            </div>
          </div>

          <div className="hidden md:block lg:h-[500px] ">
            <img
              className="mt-5 max-w-3xl h-full object-cover rounded-xl w-full 2xl:max-w-4xl"
              src={wisataDetail.url_image}
              alt=""
            />
          </div>

          <h1 className="text-2xl mt-5 md:hidden sm:text-3xl font-extrabold md:text-3xl text-hitam2">
            {wisataDetail.name}
          </h1>
          <div className="flex md:hidden mt-2 items-center text-hitam2 ">
            {reviews.length > 0 ? (
              <>
                <p className="mr-1 flex text-base font-semibold items-center ">
                  <FaStar className="text-yellow-300" />
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </p>
                <p
                  className="underline ml-2 cursor-pointer"
                  onClick={() =>
                    reviewRef.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ulasan
                </p>
                <p className="mx-2">-</p>
              </>
            ) : (
              <p></p>
            )}
            <div className="underline font-semibold">
              <Link
                to={`/wisata/daerah/${wisataDetail.city_id}`}
                className=" hover:font-bold duration-200"
              >
                {wisataDetail.city_name}
              </Link>
            </div>
          </div>
          <div className="mt-7">
            <h2 className="text-2xl font-extrabold">Highlight</h2>
          </div>
          <p className="mt-2 text-md sm:text-base lg:text-base text-hitam lg:max-w-3xl 2xl:max-w-4xl">
            {isExpanded || !isLongDescription
              ? wisataDetail.description
              : wisataDetail.description.split(" ").slice(0, 60).join(" ") +
                "..."}
          </p>

          {isLongDescription && (
            <button
              onClick={toggleExpanded}
              className="mt-3 text-hitam2 text-sm hover:text-blue-500 underline"
            >
              {isExpanded ? "Lebih sedikit" : "Lebih banyak"}
            </button>
          )}
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

          <button
            className="mt-7 text-sm text-hitam underline"
            onClick={handleOpen}
          >
            Semua gambar
          </button>

          <div className="mt-7">
            <h2 className="text-2xl font-extrabold">Apa yang termasuk</h2>
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
            <h2 className="text-2xl font-extrabold">Alamat</h2>
          </div>
          <p className="mt-5 md:mt-2 text-md sm:text-base lg:text-lg text-hitam lg:max-w-3xl">
            {wisataDetail.address}
          </p>
          <Link
            className="text-sm underline hover:text-blue-500 mt-2"
            to={wisataDetail.url_gmaps}
          >
            Lihat di Google Maps
          </Link>
          {reviews.length > 0 && (
            <div ref={reviewRef}>
              <div className="mt-7 ">
                <h2 className="text-2xl text-hitam2 font-extrabold">
                  Ulasan Pengguna
                </h2>
              </div>
              <div className="mt-3 md:flex items-start justify-between text-hitam2 lg:max-w-3xl ">
                <div className="flex items-end gap-3">
                  <h1 className="flex items-center text-3xl md:text-4xl font-extrabold text-hitam2">
                    <Rating
                      readOnly
                      max={1}
                      defaultValue={1}
                      sx={{ fontSize: "2rem" }}
                      className="mr-2"
                    />{" "}
                    {averageRating ? averageRating.toFixed(1) : "0.0"}
                  </h1>
                  <p>{reviews[0].total_reviews} ulasan terverifikasi</p>
                </div>

                <div className="">
                  {[5, 4, 3, 2, 1].map((number, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-hitam2">
                        {number}
                      </span>

                      <LinearProgress
                        variant="determinate"
                        value={ratingPercentage[4 - index]}
                        color="inherit"
                        sx={{
                          width: "270px",
                          borderRadius: 5,
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                {reviews.map((review) => (
                  <div key={review.review_id} className="mb-4">
                    <Rating name="read-only" value={review.rating} readOnly />

                    <div className="lg:max-w-3xl">
                      <h1 className="text-xs font-semibold">
                        {review.user_name || "Anonymous"}
                      </h1>
                      <div
                        className="text-base w-full  border-b pb-5 mt-2 rounded-md 
                        max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 
                        break-words"
                      >
                        {review.review_text || "No review text available."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reviews.length === 0 && <p></p>}

          {showNavbar && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center z-10 lg:hidden md:hidden">
              <div className="text-sm">
                Mulai dari
                <div className="text-lg font-extrabold">
                  IDR {Number(wisataDetail.price).toLocaleString("id-ID")}
                </div>
              </div>
              <button
                onClick={handleButtonClick}
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
                <h2 className="text-xl font-bold">Semua gambar</h2>
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

        <div className=" ">
          <div className="md:flex flex-col hidden w-[270px]">
            <div className="bg-hijau-opa font-medium w-[270px] lg:text-base text-white flex items-center justify-center py-2 rounded-tr-lg rounded-tl-lg">
              Harga terbaik
            </div>
            <div className="px-5 items-center justify-center w-[270px] border shadow-sm">
              <p className="text-[0.8rem] mt-5">Mulai dari</p>
              <div className="flex justify-start text-2xl font-extrabold">
                IDR {Number(wisataDetail.price).toLocaleString("id-ID")}
              </div>
              <button
                onClick={handleButtonClick}
                className="w-full py-3 mr-5 lg:mt-5 mb-10 bg-hitam rounded-md text-white font-bold flex justify-center hover:-translate-y-1 duration-300"
              >
                Pesan sekarang
              </button>
              <ModalSignUp
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
              />
              <PopUpPesan
                open={isPopUpOpen}
                onClose={() => {
                  setIsPopUpOpen(false);
                  setModalStep(1);
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

            <div className="px-5 border text-sm font-medium max-w-72 text-hitam flex items-center justify-between py-5 rounded-br-lg rounded-bl-lg">
              <button
                onClick={handleClick}
                className="flex items-center text-base font-bold gap-2"
              >
                <IoShareSocial className="text-2xl " /> Bagikan
              </button>
              <Menu
                anchorEl={anchorEl}
                open={openModalShare}
                onClose={handleCloseModalShare}
              >
                <MenuItem
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                >
                  <FaWhatsapp className="mr-2 text-green-500" />{" "}
                  <span className="text-sm">WhatsApp</span>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <FaFacebook className="mr-2 text-blue-600" />{" "}
                  <span className="text-sm">Facebook</span>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <FaTwitter className="mr-2 text-blue-400" />{" "}
                  <span className="text-sm">Twitter</span>
                </MenuItem>
                <MenuItem onClick={handleCopyLink}>
                  <FiCopy className="mr-2 text-gray-600" />{" "}
                  <span className="text-sm">Salin Link</span>
                </MenuItem>
              </Menu>
              <div>
                <IconButton
                  onClick={() => toggleWishlist(wisataDetail.id)}
                  className=""
                >
                  {isInWishlist(wisataDetail.id) ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <span className="font-bold text-base">Simpan</span>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-5 lg:mt-10">
            <h1 className="font-semibold text-lg">Mengapa Cultivo?</h1>
            <div className="space-y-3 mt-5">
              <p className="flex items-center gap-2">
                <FaCheck /> Pengalaman yang unik
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
                <FaCheck /> Agrowisata Ramah Lingkungan
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WisataDetail;
