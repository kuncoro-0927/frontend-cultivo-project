/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { instance } from "../utils/axios";
import { Link } from "react-router-dom";
import CardRekomendasi from "../component/card/CardRekomendasi";
import { IconButton } from "@mui/material";
import { useWishlist } from "../contexts/WishlistsContext";
import { showSnackbar } from "../component/CustomSnackbar";
import { useAuth } from "../contexts/AuthContext";
import ModalSignUp from "../component/ModalSignUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalSearch from "../component/ModalSearch";
import { FiSearch } from "react-icons/fi";
import { soloList } from "../data_sementara/DataWisata";
import { rekomendasiList } from "../data_sementara/DataWisata";
const TesSolo = () => {
  const { daerahId } = useParams();
  const [city, setDaerah] = useState([]);
  const [cityName, setCityName] = useState(""); // State untuk nama kota
  const [cityImage, setCityImage] = useState("");
  const [agrotourism, setAgrotourism] = useState([]);
  const [wisataList, setWisataList] = useState([]);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null);
  const [visibleSoloCount, setVisibleSoloCount] = useState(4);

  const handleShowMore = () => {
    setVisibleSoloCount(soloList.length); // Tampilkan semua item
  };

  const handleReset = () => {
    setVisibleSoloCount(4); // Reset ke 4 item saat di-refresh
  };
  const handleOpenModalSearch = () => {
    setModalSearchOpen(true);
  };
  const handleCloseModalSearch = () => {
    setModalSearchOpen(false);
  };
  const handleSelectAgrotourism = (agrotourism) => {
    setSelectedAgrotourism(agrotourism);
    setModalSearchOpen(false);
  };
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        showSnackbar("Wishlist berhasil dihapus", "success");
      } else {
        // Tambahkan ke wishlist
        await instance.post("/add/wishlist", { agrotourism_id: agrotourismId });
        const updatedWishlist = [
          ...wishlist,
          { agrotourism_id: agrotourismId },
        ];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wishlist berhasil ditambahkan", "success");
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
    instance
      .get(`/agrotourism`)
      .then((response) => {
        const agrotourismData = response.data.data;

        if (Array.isArray(agrotourismData)) {
          const filteredWisata = agrotourismData.filter(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId)
          );
          const updatedWisata = filteredWisata.map((wisata) => ({
            ...wisata,
            average_rating: parseFloat(wisata.average_rating) || 0, // Mengonversi menjadi angka
          }));
          setWisataList(updatedWisata);

          const city = agrotourismData.find(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId)
          );
          if (city) setCityName(city.city_name); // Set city_name di sini
        } else {
          console.error(
            "Data dari /agrotourism tidak berupa array:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching wisata list:", error);
      });
  }, [daerahId]);

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
  useEffect(() => {
    getAgrotourism();
  }, []);
  useEffect(() => {}, [wisataList]);

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  useEffect(() => {
    instance
      .get(`/daerah`)
      .then((response) => {
        const dataDaerah = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setDaerah(dataDaerah);

        // Cari daerah berdasarkan daerahId dari URL
        const selectedCity = dataDaerah.find(
          (daerahItem) => daerahItem.id === parseInt(daerahId)
        );
        if (selectedCity) {
          setCityName(selectedCity.name); // Set nama kota
          setCityImage(selectedCity.url); // Set gambar kota
        }
      })
      .catch((error) => {
        console.error("Error fetching data daerah:", error);
      });
  }, [daerahId]);

  return (
    <>
      <section
        className="relative mt-[63px] sm:mt-[63px] lg:mt-[65px] px-7 lg:h-[200px] xl:h-[400px] h-[250px] bg-cover bg-bottom flex flex-col items-center justify-center lg:px-12"
        style={{ backgroundImage: "url('/images/solo.svg')" }}
      >
        {/* Overlay Gradasi */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Text */}
        <h1 className="relative text-white font-bold text-xl text-left mr-auto mt-10 md:mt-0 md:mr-0 md:text-4xl md:text-center">
          Pesan kegiatan Agrowisata <br />
          di kota
          <span className="ml-2 md:text-4xl text-xl">Solo</span>
        </h1>
        <div className="absolute mt-5 md:mt-10 bottom-5 md:relative md:max-w-xl w-full px-7">
          <span className="ml-0 bg-hitam2 h-full w-16 flex items-center justify-center rounded-full sm:ml-0 absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="md:text-lg text-white font-extrabold" />
          </span>

          <button
            onClick={handleOpenModalSearch}
            type="text"
            className="text-left pl-6 md:pl-6 text-xs lg:text-base px-6 py-3 md:py-3 text-gray-400 bg-gray-100 rounded-full w-full focus:outline-none focus:border-gray-500"
          >
            Cari Destinasi
          </button>

          <ModalSearch
            isOpen={isModalSearchOpen}
            handleClose={handleCloseModalSearch}
            onSelect={handleSelectAgrotourism}
          />
        </div>
      </section>

      <section className="mt-10 sm:mt-20 mx-4 md:mt-20 md:mx-6 lg:mx-10 lg:mt-24">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Daerah wisata Solo
            {/* Tampilkan cityName */}
          </h1>
        </div>

        <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
          <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:justify-between lg:w-full lg:gap-3">
            {soloList.map((wisata, index) => (
              <div key={index} className="relative">
                <Link to="/tes/detail/solo">
                  <CardRekomendasi
                    title={wisata.title}
                    description={truncateDescriptionByChar(
                      wisata.description,
                      85
                    )}
                    image={wisata.image}
                    price={wisata.price}
                    average_rating={
                      wisata.average_rating
                        ? parseFloat(wisata.average_rating).toFixed(1)
                        : "0.0"
                    }
                  />
                </Link>

                <div className="absolute top-2 right-6">
                  <IconButton
                    onClick={() => toggleWishlist(wisata.id)}
                    className="p-2"
                  >
                    {isInWishlist(wisata.id) ? (
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

        {/* <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
        <div className="carousel-item gap-3">
          {wisataList.map((wisata) => (
            <Link key={wisata.id} to={`/wisata/detail/${wisata.id}`}>
              <CardAktivitas
                title={wisata.name}
                description={wisata.description}
                image={wisata.url_image}
                price={wisata.price}
              />
            </Link>
          ))}
        </div>
      </div> */}
        <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
          <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {soloList.slice(0, visibleSoloCount).map((wisata, index) => (
              <div key={index} className="relative">
                <Link to="/tes/detail/solo">
                  <CardRekomendasi
                    title={wisata.title}
                    description={wisata.description}
                    image={wisata.image}
                    price={wisata.price}
                    average_rating={
                      wisata.average_rating
                        ? parseFloat(wisata.average_rating).toFixed(1)
                        : "0.0"
                    }
                  />
                </Link>

                <div className="absolute top-1 right-1">
                  <IconButton
                    onClick={() => toggleWishlist(wisata.id)}
                    className=""
                  >
                    {isInWishlist(wisata.id) ? (
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

        <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
        {visibleSoloCount < soloList.length && (
          <div className="text-center mt-6 md:hidden">
            <button
              onClick={handleShowMore}
              className="underline text-hitam2 hover:-translate-y-2 duration-200"
            >
              Muat lebih banyak update 6
            </button>
          </div>
        )}
      </section>

      <section className="mt-10 sm:mt-14 mx-4 md:mt-10 md:mx-6 lg:mx-10 lg:mt-20 ">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Mungkin Anda suka
        </h1>
        <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(rekomendasiList) &&
              rekomendasiList.map((agrotourismItem, index) => (
                <div key={index} className="relative">
                  {/* Link hanya membungkus card tanpa ikon wishlist */}
                  <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                    <CardRekomendasi
                      title={agrotourismItem.title}
                      description={truncateDescriptionByChar(
                        agrotourismItem.description,
                        70
                      )}
                      image={agrotourismItem.image}
                      price={agrotourismItem.price}
                      average_rating={
                        agrotourismItem.average_rating
                          ? parseFloat(agrotourismItem.average_rating).toFixed(
                              1
                            )
                          : "0.0"
                      }
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
            {Array.isArray(rekomendasiList) &&
              rekomendasiList.map((agrotourismItem, index) => (
                <div key={index} className="relative">
                  {/* Link hanya membungkus card tanpa ikon wishlist */}
                  <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                    <CardRekomendasi
                      title={agrotourismItem.title}
                      description={truncateDescriptionByChar(
                        agrotourismItem.description,
                        70
                      )}
                      image={agrotourismItem.image}
                      price={agrotourismItem.price}
                      average_rating={
                        agrotourismItem.average_rating
                          ? parseFloat(agrotourismItem.average_rating).toFixed(
                              1
                            )
                          : "0.0"
                      }
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
    </>
  );
};

export default TesSolo;
