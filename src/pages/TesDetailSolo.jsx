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
import PopUpPesan from "../component/TesPesan";
import PopUpSoloPesan from "../component/TesSoloPesan";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { useWishlist } from "../contexts/WishlistsContext";
import { showSnackbar } from "../component/CustomSnackbar";
import { useAuth } from "../contexts/AuthContext";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import ModalSignUp from "../component/ModalSignUp";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { soloList } from "../data_sementara/DataWisata";
import { Skeleton } from "@mui/material";
const TesDetailSolo = () => {
  const reviewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  const { wishlist, setWishlist } = useWishlist();
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  // Temukan data Kampoeng Karet dari soloList
  const kampoengKaret = soloList.find(
    (item) => item.title === "Kampoeng Karet, Karanganyar"
  );

  // Cek apakah deskripsi panjang
  const kampoengKaretDescription = kampoengKaret?.description || "";
  const isLongDescription = kampoengKaretDescription.split(" ").length > 60;
  const { url_gallery } = kampoengKaret;

  const handleButtonClick = () => {
    // Langsung buka modal atau pop-up tanpa pemeriksaan login
    setIsPopUpOpen(true); // atau setIsPopUpOpen(true); sesuai kebutuhanmu
  };

  const toggleWishlist = (agrotourismId) => {
    setIsModalOpen(true); // Langsung buka modal saat fungsi dipanggil
  };

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

  const totalReviews = reviews.length;
  const ratingCount = [1, 2, 3, 4, 5].map((rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  });

  useEffect(() => {
    // Cek apakah data sudah pernah dimuat sebelumnya
    const isAlreadyLoaded = localStorage.getItem("hasVisitedBefore");

    if (isAlreadyLoaded) {
      // Jika sudah pernah dibuka, set isLoading false langsung
      setIsLoading(false);
    } else {
      // Jika belum pernah dibuka, mulai loading dan simpan status ke localStorage
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("hasVisitedBefore", "true"); // Simpan status agar tidak loading lagi
      }, 2000); // Waktu simulasi loading
    }
  }, []);
  const review = [
    {
      review_id: 1,
      user_name: "Hasri kece pake bgt",
      rating: 5,
      review_text:
        "Baru pertama kesini tempatnya bagus bangett, kegiatannya juga seru-seru. heran deh 4 orang di bawah reviewnya gajelas bgt",
    },
    {
      review_id: 2,
      user_name: "Dzaki, K nya kocak",
      rating: 1,
      review_text:
        "Ini tempat apaan dah, gabisa party disini kocak. nyesel kesini ga ada musik dugemnya, lain kali puter playlistnya whisnu santika bang biar anak anak pada seneng",
    },
    {
      review_id: 3,
      user_name: "Imel soft spoken",
      rating: 3,
      review_text:
        "Ini nih tempat yang aku cari ahaha, tempatnya asri, nyaman, tapi sayang penjaganya ga soft spoken jadi aku bintang 3 ",
    },
    {
      review_id: 4,
      user_name: "Qaulan pelatih yoga",
      rating: 5,
      review_text:
        "Keren bgt sih guys asli, bisa buat yoga juga disini sebenernya tp dimarahin yg punya hehe",
    },
    {
      review_id: 5,
      user_name: "Dinda dan paksu",
      rating: 5,
      review_text:
        "Bagus bgt tempatnya serius, buat yg ada pasangan jangan lupa kesini yaa, buat yang jomblo dirumah aja biar ga macet",
    },
  ];

  const averageRating = 4.7; // Rating rata-rata dummy
  const ratingPercentage = [80, 10, 5, 3, 2]; // Persentase untuk tiap rating (dummy)

  return (
    <>
      <div className="md:hidden h-[300px] mt-16 relative">
        {isLoading ? (
          <>
            {/* Skeleton untuk gambar */}
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="mt-5 w-full"
              style={{ height: "300px" }} // Tinggi 300px agar sesuai
            />
            {/* Skeleton untuk tombol wishlist */}
            <div className="absolute top-2 right-2 p-2">
              <Skeleton
                variant="circular"
                width={35}
                height={35}
                animation="wave"
              />
            </div>
          </>
        ) : (
          <>
            {/* Konten asli */}
            <img
              className="mt-5 max-w-3xl h-full object-cover w-full"
              src="/images/solo/kampungkaret.svg"
              alt=""
            />
            <div className="absolute top-2 right-2 p-2">
              <IconButton onClick={() => toggleWishlist(soloList.id)}>
                {isInWishlist(soloList.id) ? (
                  <FavoriteIcon
                    className="text-red-500"
                    sx={{ width: 35, height: 35 }}
                  />
                ) : (
                  <FavoriteIcon sx={{ width: 35, height: 35 }} />
                )}
              </IconButton>
            </div>
          </>
        )}
      </div>

      <section className="text-hitam2 sm:mt-0 mx-4 md:mt-20 md:mx-6 lg:mx-14 lg:mt-24 md:pt-0 flex flex-col md:flex-row ">
        <div className="flex-1 ">
          <h1 className="text-2xl mt-20 sm:text-3xl hidden md:block font-extrabold md:text-3xl text-hitam2">
            Kampoeng Karet
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
                  Review
                </p>
                <p className="mx-2">-</p>
              </>
            ) : (
              <p></p>
            )}
            <div className="underline font-semibold">
              <Link to="#" className=" hover:font-bold duration-200">
                Solo
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              className="mt-5 max-w-3xl rounded-xl w-full"
              src="/images/solo/kampungkaret.svg"
              alt=""
            />
          </div>
          <h1 className="text-2xl mt-5 md:hidden sm:text-3xl font-extrabold md:text-3xl text-hitam2">
            Kampoeng Karet
          </h1>
          <div className="flex md:hidden mt-2 items-center text-hitam2 ">
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
                Review
              </p>
              <p className="mx-2">-</p>
            </>

            <div className="underline font-semibold">
              <Link to="#" className=" hover:font-bold duration-200">
                Solo
              </Link>
            </div>
          </div>
          <div className="mt-7">
            <h2 className="text-2xl font-extrabold">Highlight</h2>
          </div>
          <p className="mt-2 text-md sm:text-base lg:text-base text-hitam lg:max-w-3xl">
            {isExpanded || !isLongDescription
              ? kampoengKaretDescription
              : kampoengKaretDescription.split(" ").slice(0, 60).join(" ") +
                "..."}
          </p>
          {/* Tampilkan tombol jika deskripsi panjang */}
          {isLongDescription && (
            <button
              onClick={toggleExpanded}
              className="mt-3 text-hitam2 text-sm hover:text-blue-500 underline"
            >
              {isExpanded ? "Lebih sedikit" : "Lebih banyak"}
            </button>
          )}
          <div className="flex-wrap justify-start mt-4 lg:mt-10 gap-4 flex">
            {isLoading ? (
              // Skeleton untuk gambar
              <>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <Skeleton
                      variant="rectangular"
                      width={150}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </>
            ) : (
              // Gambar asli jika sudah dimuat
              (() => {
                const kampoengKaret = soloList.find(
                  (item) => item.title === "Kampoeng Karet, Karanganyar"
                );

                if (
                  kampoengKaret &&
                  Array.isArray(kampoengKaret.url_gallery) &&
                  kampoengKaret.url_gallery.length > 0
                ) {
                  return kampoengKaret.url_gallery
                    .slice(0, 4)
                    .map((url, index) => (
                      <div key={index} className="flex justify-center">
                        <CardImg img={url.trim()} />
                      </div>
                    ));
                } else if (
                  kampoengKaret &&
                  typeof kampoengKaret.url_gallery === "string" &&
                  kampoengKaret.url_gallery.length > 0
                ) {
                  try {
                    const parsedUrls = JSON.parse(kampoengKaret.url_gallery);
                    return parsedUrls.slice(0, 4).map((url, index) => (
                      <div key={index} className="flex justify-center">
                        <CardImg img={url.trim()} />
                      </div>
                    ));
                  } catch (e) {
                    console.error("Error parsing url_gallery:", e);
                    return <p>No images available</p>;
                  }
                } else {
                  return <p>No images available</p>;
                }
              })()
            )}
          </div>

          <button className="mt-7 text-hitam underline" onClick={handleOpen}>
            Lihat semua
          </button>
          <div className="mt-7">
            <h2 className="text-2xl font-extrabold">Apa yang termasuk</h2>
          </div>
          <div className="flex items-start gap-16 mt-2">
            {/* Fasilitas Termasuk */}
            <div className="grid justify-start mt-4 gap-4 max-w-4xl">
              <p className="font-semibold text-sm md:text-base text-hitam2">
                TERMASUK
              </p>
              {Array.isArray(soloList[1].fasilitas.included) &&
              soloList[1].fasilitas.included.length > 0 ? (
                soloList[1].fasilitas.included.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3 text-xl">
                      <div className="text-green-500">
                        <IoMdCheckmark />
                      </div>
                      <div className="text-sm md:text-base grid">{item}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No include available</p>
              )}
            </div>

            {/* Fasilitas Tidak Termasuk */}
            <div className="grid justify-start mt-4 gap-4 max-w-4xl">
              <p className="font-semibold text-sm md:text-base text-hitam2">
                TIDAK TERMASUK
              </p>
              {Array.isArray(soloList[1].fasilitas.not_included) &&
              soloList[1].fasilitas.not_included.length > 0 ? (
                soloList[1].fasilitas.not_included.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3 text-xl">
                      <div className="text-red-500">
                        <IoMdClose />
                      </div>
                      <div className="text-sm md:text-base grid">{item}</div>
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
            Dukuh Kenteng, Desa Putukrejo, Kecamatan Ngargoyoso, Kabupaten
            Karanganyar, Jawa Tengah.
          </p>
          <div ref={reviewRef}>
            <div className="mt-7 ">
              <h2 className="text-2xl text-hitam2 font-extrabold">
                Ulasan Pengguna
              </h2>
            </div>
            <div className="mt-3 md:flex items-start justify-between text-hitam2 lg:max-w-3xl">
              {/* Bagian Kiri - Total Review */}
              <div className="flex items-end gap-3">
                <h1 className="flex items-center text-3xl md:text-4xl font-extrabold text-hitam2">
                  <Rating
                    readOnly
                    max={1}
                    value={averageRating}
                    sx={{ fontSize: "2rem" }}
                    className="mr-2"
                  />
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </h1>
                <p>{review.length} ulasan terverfikasi</p>
              </div>

              {/* Progress Bar */}
              <div className="">
                {[5, 4, 3, 2, 1].map((number, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {/* Angka di Sebelah Kiri */}
                    <span className="text-sm font-semibold text-hitam2">
                      {number}
                    </span>

                    {/* Progress Bar */}
                    <LinearProgress
                      variant="determinate"
                      value={ratingPercentage[4 - index]} // Menyesuaikan dengan rating yang dibalik
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

            {/* Daftar Review */}
            <div className="mt-5">
              {review.map((review) => (
                <div key={review.review_id} className="mb-4">
                  {/* Rating Component */}
                  <Rating name="read-only" value={review.rating} readOnly />

                  {/* Review details */}
                  <div className="lg:max-w-3xl">
                    <h1 className="text-sm font-semibold">
                      {review.user_name || "Anonymous"}
                    </h1>
                    <p className="text-base border-b pb-5 mt-2">
                      {review.review_text || "No review text available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showNavbar && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center z-10 lg:hidden md:hidden">
              <div className="text-sm">
                Mulai dari
                <div className="text-lg font-extrabold">IDR 10.000</div>
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
                <h2 className="text-xl font-bold">Lihat semua</h2>
                <button onClick={handleClose} className="mt-4 text-3xl">
                  <IoClose />
                </button>
              </div>

              <div className="grid grid-cols-1 justify-center mt-10 gap-10">
                {(() => {
                  // Temukan objek Kampoeng Karet dalam soloList
                  const kampoengKaret = soloList.find(
                    (item) => item.title === "Kampoeng Karet, Karanganyar"
                  );

                  // Pastikan objek Kampoeng Karet ditemukan dan memiliki url_gallery yang valid
                  if (
                    kampoengKaret &&
                    Array.isArray(kampoengKaret.url_gallery) &&
                    kampoengKaret.url_gallery.length > 0
                  ) {
                    return kampoengKaret.url_gallery
                      .slice(0, 4)
                      .map((url, index) => (
                        <div key={index} className="flex justify-center">
                          <img
                            className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                            src={url.trim()}
                            alt=""
                          />
                        </div>
                      ));
                  } else if (
                    kampoengKaret &&
                    typeof kampoengKaret.url_gallery === "string" &&
                    kampoengKaret.url_gallery.length > 0
                  ) {
                    // Jika url_gallery berupa string, coba parsing JSON-nya
                    try {
                      const parsedUrls = JSON.parse(kampoengKaret.url_gallery);
                      return parsedUrls.slice(0, 4).map((url, index) => (
                        <div key={index} className="flex justify-center">
                          <img
                            className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                            src={url.trim()}
                            alt=""
                          />
                        </div>
                      ));
                    } catch (e) {
                      console.error("Error parsing url_gallery:", e);
                      return <p>No images available</p>;
                    }
                  } else {
                    return <p>No images available</p>;
                  }
                })()}
              </div>
            </Box>
          </Modal>
        </div>

        <div className=" ">
          <div className="md:flex flex-col hidden w-[270px]">
            <div className="bg-hijau-opa font-medium w-[270px] lg:text-sm text-white flex items-center justify-center py-2 rounded-tr-lg rounded-tl-lg">
              Harga terbaik
            </div>
            <div className="px-5 items-center justify-center w-[270px] border shadow-sm">
              <p className="text-[0.8rem] mt-5">Mulai dari</p>
              <div className="flex justify-start text-2xl font-extrabold">
                IDR 10.000
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
              <PopUpSoloPesan
                open={isPopUpOpen}
                onClose={() => {
                  setIsPopUpOpen(false);
                }}
              />
            </div>

            <div className="px-5 border text-sm font-medium max-w-72 text-hitam flex items-center justify-between py-5 rounded-br-lg rounded-bl-lg">
              <button className="flex items-center text-base font-bold gap-2">
                <IoShareSocial className="text-2xl " /> Bagikan
              </button>
              <div>
                <IconButton
                  onClick={() => toggleWishlist(soloList.id)}
                  className=""
                >
                  {isInWishlist(soloList.id) ? (
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

export default TesDetailSolo;
