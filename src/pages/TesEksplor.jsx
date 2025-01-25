/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import CardDaerah from "../component/card/CardDaerah";
import { instance } from "../utils/axios";
import { useState, useEffect } from "react";
import { daerahList } from "../data_sementara/DataWisata";
import { rekomendasiList } from "../data_sementara/DataWisata";
import ModalSearch from "../component/ModalSearch";
import { FiSearch } from "react-icons/fi";
import CardRekomendasi from "../component/card/CardRekomendasi";
import { IconButton } from "@mui/material";
import { showSnackbar } from "../component/CustomSnackbar";
import { useWishlist } from "../contexts/WishlistsContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../contexts/AuthContext";
import ModalSignUp from "../component/ModalSignUp";
const TesEksplor = () => {
  const [agrotourism, setAgrotourism] = useState([]);
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [city, setDaerah] = useState([]);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null);
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
  useEffect(() => {
    getDaerah();
  }, []);
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

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
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

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
      <section
        className="relative mt-[63px] sm:mt-[80px] lg:mt-[75px] px-7 lg:h-[200px] xl:h-[400px] h-[250px] bg-cover bg-bottom flex flex-col items-center justify-center lg:px-12"
        style={{ backgroundImage: "url('/images/eksplorr.jpg')" }}
      >
        {/* Overlay Gradasi */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Text */}
        <h1 className="relative text-white font-bold text-base text-left mr-auto mt-10 md:mt-0 md:mr-0 md:text-4xl md:text-center">
          Pesan kegiatan Agrowisata di kota <br />{" "}
          <span className="text-3xl">Indonesia</span>
        </h1>
        <div className="absolute mt-5 bottom-5 w-full px-7">
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

      <section className="mx-4 mt-10 sm:mt-20 md:mt-20 lg:mt-16 md:mx-6 lg:mx-10">
        <div className="">
          <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Jelajahi kota Agrowisata Anda
          </h1>
        </div>

        <div className="mt-7 md:mx-0  gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-10">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-5">
            {Array.isArray(daerahList) &&
              daerahList.map((daerahItem, index) => (
                <Link key={index} to={`/wisata/daerah/${daerahItem.id}`}>
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full lg:hidden pt-2 ">
          <div className="carousel-item gap-3">
            {Array.isArray(daerahList) &&
              daerahList.slice(0, 5).map((daerahItem, index) => (
                <Link key={index} to="/tes/solo">
                  <CardDaerah title={daerahItem.title} img={daerahItem.image} />
                </Link>
              ))}
          </div>
        </div>

        {/* DATA DUMMY BUAT EXHIBITION */}
        {/* <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          <div className="hidden md:hidden lg:grid lg:justify-between lg:grid-cols-4 lg:w-full lg:gap-3 lg:gap-y-10">
            {Array.isArray(daerahList) &&
              daerahList.map((daerahItem) => (
                <CardDaerah
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 py-3 lg:hidden">
          <div className="carousel-item gap-3 px-1">
            {Array.isArray(daerahList) &&
              daerahList.map((daerahItem) => (
                <CardDaerah
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div> */}
      </section>

      <section className="mt-10 sm:mt-14 mx-4 md:mt-10 md:mx-6 lg:mx-10 lg:mt-20 ">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Mungkin Anda suka
        </h1>
        <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(rekomendasiList) &&
              rekomendasiList
                .filter((agrotourismItem) =>
                  [1, 2, 9, 10].includes(agrotourismItem.id)
                )
                .map((agrotourismItem, index) => (
                  <div key={index} className="relative">
                    {/* Link hanya membungkus card tanpa ikon wishlist */}
                    <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                      <CardRekomendasi
                        title={agrotourismItem.name}
                        description={truncateDescriptionByChar(
                          agrotourismItem.description,
                          70
                        )}
                        image={agrotourismItem.url_image}
                        price={agrotourismItem.price}
                        average_rating={
                          agrotourismItem.average_rating
                            ? parseFloat(
                                agrotourismItem.average_rating
                              ).toFixed(1)
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

export default TesEksplor;
