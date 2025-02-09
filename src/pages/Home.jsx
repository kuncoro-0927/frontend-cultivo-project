/* eslint-disable no-unused-vars */

import CardDaerah from "../component/card/CardDaerah";
import CardRekomendasi from "../component/card/CardRekomendasi";

import SwiperCardReview from "../component/SwiperCardReview";
import { FiSearch } from "react-icons/fi";
import { FaMapMarkedAlt, FaMountain } from "react-icons/fa";

import { PiPottedPlantFill } from "react-icons/pi";
import { useAuth } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalSignUp from "../component/ModalSignUp";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios";
import { useWishlist } from "../contexts/WishlistsContext";
import { showSnackbar } from "../component/CustomSnackbar";
import ModalSearch from "../component/ModalSearch";
const Home = () => {
  const [city, setDaerah] = useState([]);
  const [agrotourism, setAgrotourism] = useState([]);
  const { wisataId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };
  const handleOpenModalSearch = () => {
    setModalSearchOpen(true);
  };
  const handleSelectAgrotourism = (agrotourism) => {
    setSelectedAgrotourism(agrotourism);
    setModalSearchOpen(false);
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
    getDaerah();
  }, []);

  useEffect(() => {
    getAgrotourism();
  }, []);

  const getDaerah = async () => {
    try {
      const response = await instance.get("/daerah");

      const dataDaerah = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setDaerah(dataDaerah);
    } catch (error) {
      console.error("Error fetching data daerah:", error);
    }
  };

  const getAgrotourism = async () => {
    try {
      const response = await instance.get("/agrotourism");

      const dataAgrotourism = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setAgrotourism(dataAgrotourism);
    } catch (error) {
      console.error("Error fetching data daerah:", error);
    }
  };

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseModalSearch = () => {
    setModalSearchOpen(false);
  };
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

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
      <section className="mt-[80px] sm:mt-[80px] 2xl:mx-32 grid lg:mt-[75px] 2xl:mt-[100px] mx-4 md:mx-6 md:flex items-center space-x-0 md:space-x-4">
        <div className="relative">
          <span className="ml-0 bg-white p-1.5 rounded-full sm:ml-2 absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="md:text-lg font-extrabold" />
          </span>
          {/* <button
            onClick={() => setModalSearchOpen(true)}
            type="text"
            placeholder="Search Destination"
            className="pl-14 sm:pl-14 text-xs lg:text-base px-6 py-4 md:py-3 text-hitam bg-gray-100  rounded-full w-[300px] md:w-[400px] lg:w-[430px] focus:outline-none focus:border-gray-500 "
          ><button/> */}
          <button
            onClick={handleOpenModalSearch}
            type="text"
            className="text-left pl-12 md:pl-16 text-xs lg:text-base px-6 py-3 md:py-3 text-gray-400 bg-gray-100  rounded-full w-[300px] md:w-[400px] lg:w-[430px] focus:outline-none focus:border-gray-500 "
          >
            Cari Destinasi
          </button>
          {/* {selectedAgrotourism && (
            <p className="mt-4">
              Selected Agrotourism: {selectedAgrotourism.name}
            </p>
          )} */}

          <ModalSearch
            isOpen={isModalSearchOpen}
            handleClose={handleCloseModalSearch}
            onSelect={handleSelectAgrotourism}
          />
        </div>{" "}
        <div className="flex-row flex mt-3 md:mt-0 space-x-3 ">
          <Link
            to="/aktivitas/edukasi"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <FaMapMarkedAlt className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Edukasi</span>
          </Link>

          <Link
            to="/aktivitas/perkebunan"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <PiPottedPlantFill className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Perkebunan</span>
          </Link>
          <Link
            to="/aktivitas/alam"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <FaMountain className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Wisata alam</span>
          </Link>
        </div>
      </section>
      <section
        className="mx-4 md:mx-6 px-7  lg:h-[600px] xl:h-screen 2xl:h-[700px] h-[550px] bg-cover bg-center lg:mx-10 rounded-2xl md:rounded-3xl flex items-center justify-center lg:px-12 mt-[20px] sm:mt-[20px] lg:mt-[30px] relative"
        style={{ backgroundImage: "url('images/bg-home-kids.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl md:rounded-3xl"></div>

        <div className="text-center max-w-5xl relative z-10">
          <h1 className="text-white mb-5 text-3xl md:text-3xl lg:text-6xl font-bold lg:font-medium">
            Jelajahi pengalaman Agrowisata di Indonesia
          </h1>
          <span className="text-white">
            Temukan keindahan alam dan nikmati berbagai kegiatan pertanian yang
            menarik.
          </span>
        </div>

        {/* Stats Container */}
        <div className="absolute bottom-8 md:bottom-20 w-full max-w-xs md:max-w-2xl backdrop-blur-xl rounded-lg flex items-center justify-center mt-auto">
          <div className="flex w-full max-w-3xl">
            <div className="text-white border-r px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">10+</h1>
              <span className="text-xs md:text-sm">Total Kota Tersedia</span>
            </div>
            <div className="text-white border-r px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">50+</h1>
              <span className="text-xs md:text-sm">Total Agrowisata</span>
            </div>
            <div className="text-white px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">5.0</h1>
              <span className="text-xs md:text-sm">Rating rata-rata</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mt-20 mt-14 md:mx-6 lg:mx-10 2xl:mx-32 md:mt-20 lg:mt-28">
        <div className="md:flex md:items-start md:justify-between">
          <div>
            <span>Destinasi populer</span>
            <h1 className="text-xl font-extrabold text-hitam sm:text-3xl  md:text-4xl">
              Agrowisata
              <p className="bg-hijau-muda ml-2 inline-block px-5 rounded-full py-2">
                Cultivo
              </p>
            </h1>
          </div>
          <div className="max-w-lg md:max-w-[300px] lg:max-w-lg mt-2 md:mt-0 md:text-right">
            <span className="text-sm text-gray-400">
              Temukan destinasi agrowisata populer dari Cultivo, yang menawarkan
              pengalaman alam yang beragam.
            </span>
          </div>
        </div>
        <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [6, 16, 2, 20].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <div key={agrotourismItem.id} className="relative">
                    {/* Link hanya membungkus card tanpa ikon wishlist */}
                    <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                      <CardRekomendasi
                        title={agrotourismItem.name}
                        description={truncateDescriptionByChar(
                          agrotourismItem.description,
                          70
                        )}
                        image={agrotourismItem.url_image}
                        price={Number(agrotourismItem.price).toLocaleString(
                          "id-ID"
                        )}
                        average_rating={
                          agrotourismItem.average_rating
                            ? parseFloat(
                                agrotourismItem.average_rating
                              ).toFixed(1)
                            : "0.0"
                        }
                        isLoading={isLoading}
                      />
                    </Link>

                    <div className="absolute top-2 right-2">
                      <IconButton
                        onClick={() => toggleWishlist(agrotourismItem.id)}
                        className="p-2"
                      >
                        {isInWishlist(agrotourismItem.id) ? (
                          <FavoriteIcon
                            className="text-red-500"
                            sx={{ width: 28, height: 28 }}
                          />
                        ) : (
                          <FavoriteIcon
                            className=""
                            sx={{ width: 28, height: 28 }}
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
          <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [6, 16, 2, 20].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <div key={agrotourismItem.id} className="relative">
                    <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                      <CardRekomendasi
                        title={agrotourismItem.name}
                        description={truncateDescriptionByChar(
                          agrotourismItem.description,
                          70
                        )}
                        image={agrotourismItem.url_image}
                        price={Number(agrotourismItem.price).toLocaleString(
                          "id-ID"
                        )}
                        average_rating={
                          agrotourismItem.average_rating
                            ? parseFloat(
                                agrotourismItem.average_rating
                              ).toFixed(1)
                            : "0.0"
                        }
                        isLoading={isLoading}
                      />
                    </Link>

                    <div className="absolute top-0 right-0 ">
                      <IconButton
                        onClick={() => toggleWishlist(agrotourismItem.id)}
                        className=""
                      >
                        {isInWishlist(agrotourismItem.id) ? (
                          <FavoriteIcon
                            className="text-red-500"
                            sx={{ width: 28, height: 28 }}
                          />
                        ) : (
                          <FavoriteIcon
                            className=""
                            sx={{ width: 28, height: 28 }}
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="mx-4  mt-14 md:mt-10 lg:mt-28 2xl:mx-32 md:mx-6 lg:mx-10">
        <div className="flex items-center ">
          <div className="">
            <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
              Jelajahi tujuan kami
            </h1>
            {/* <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
                cities in Indonesia
              </h1>
              <img
                className="w-24 h-11 object-cover rounded-full ml-2"
                src="/images/bg-home-2.jpg"
                alt=""
              />
            </div> */}
          </div>
          <div className="mt-5 ml-auto lg:mt-0 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 hidden md:block">
            <button
              onClick={handleOpenModalSearch}
              className="text-base py-1 text-center w-full border-b  text-hitam border-black block"
            >
              Lihat semua destinasi
            </button>
          </div>
        </div>

        <div className="mt-7 md:mx-0  gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-5">
            {Array.isArray(city) &&
              city.slice(0, 5).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah
                    title={daerahItem.name}
                    img={daerahItem.url}
                    isLoading={isLoading}
                  />
                </Link>
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full lg:hidden pt-2 ">
          <div className="carousel-item gap-3">
            {Array.isArray(city) &&
              city.slice(0, 5).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah
                    title={daerahItem.name}
                    img={daerahItem.url}
                    isLoading={isLoading}
                  />
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-5 lg:mt-14 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 md:hidden">
          <button
            onClick={handleOpenModalSearch}
            className="text-xs py-2 text-center w-full md:text-sm lg:text-sm border text-hitam border-black rounded-md block"
          >
            Lihat semua destinasi
          </button>
        </div>
      </section>

      <section className="mt-10 sm:mt-14 mx-4 md:mt-10 2xl:mx-32 md:mx-6 lg:mx-10 lg:mt-20 ">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Rekomendasi untuk Anda
        </h1>
        <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [1, 2, 9, 10].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <div key={agrotourismItem.id} className="relative">
                    {/* Link hanya membungkus card tanpa ikon wishlist */}
                    <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                      <CardRekomendasi
                        title={agrotourismItem.name}
                        description={truncateDescriptionByChar(
                          agrotourismItem.description,
                          70
                        )}
                        image={agrotourismItem.url_image}
                        price={Number(agrotourismItem.price).toLocaleString(
                          "id-ID"
                        )}
                        average_rating={
                          agrotourismItem.average_rating
                            ? parseFloat(
                                agrotourismItem.average_rating
                              ).toFixed(1)
                            : "0.0"
                        }
                        isLoading={isLoading}
                      />
                    </Link>

                    <div className="absolute top-2 right-2">
                      <IconButton
                        onClick={() => toggleWishlist(agrotourismItem.id)}
                        className="p-2"
                      >
                        {isInWishlist(agrotourismItem.id) ? (
                          <FavoriteIcon
                            className="text-red-500"
                            sx={{ width: 28, height: 28 }}
                          />
                        ) : (
                          <FavoriteIcon
                            className=""
                            sx={{ width: 28, height: 28 }}
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
          <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [1, 2, 9, 10].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <div key={agrotourismItem.id} className="relative">
                    <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                      <CardRekomendasi
                        title={agrotourismItem.name}
                        description={truncateDescriptionByChar(
                          agrotourismItem.description,
                          70
                        )}
                        image={agrotourismItem.url_image}
                        price={Number(agrotourismItem.price).toLocaleString(
                          "id-ID"
                        )}
                        average_rating={
                          agrotourismItem.average_rating
                            ? parseFloat(
                                agrotourismItem.average_rating
                              ).toFixed(1)
                            : "0.0"
                        }
                        isLoading={isLoading}
                      />
                    </Link>

                    <div className="absolute top-0 right-0 ">
                      <IconButton
                        onClick={() => toggleWishlist(agrotourismItem.id)}
                        className=""
                      >
                        {isInWishlist(agrotourismItem.id) ? (
                          <FavoriteIcon
                            className="text-red-500"
                            sx={{ width: 28, height: 28 }}
                          />
                        ) : (
                          <FavoriteIcon
                            className=""
                            sx={{ width: 28, height: 28 }}
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="mx-7 md:mx-6 lg:mx-10 bg-cover 2xl:mx-32 mt-10 justify-center lg:mt-20">
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl mb-7 md:mb-10 lg:mb-20 text-hitam">
          Apa kata pengunjung
        </h1>

        <SwiperCardReview />
      </section>
    </>
  );
};

export default Home;
