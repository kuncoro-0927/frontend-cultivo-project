/* eslint-disable no-unused-vars */
import CardRekomendasi from "../../../component/card/CardRekomendasi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../utils/axios";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { showSnackbar } from "../../../component/CustomSnackbar";
import { useAuth } from "../../../contexts/AuthContext";
import { useWishlist } from "../../../contexts/WishlistsContext";
import ModalSignUp from "../../../component/ModalSignUp";
import { FiSearch } from "react-icons/fi";
import ModalSearch from "../../../component/ModalSearch";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Perkebunan = () => {
  const { daerahId } = useParams();
  const { isLoggedIn } = useAuth();
  const [cityName, setCityName] = useState("");
  const [agrotourism, setAgrotourism] = useState([]);
  const [wisataList, setWisataList] = useState([]);
  const { wishlist, setWishlist } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agrotourismData, setAgrotourismData] = useState([]);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [setSelectedAgrotourism] = useState(null);
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
            average_rating: parseFloat(wisata.average_rating) || 0,
          }));
          setWisataList(updatedWisata);

          const city = agrotourismData.find(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId)
          );
          if (city) setCityName(city.city_name);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/agrotourism/activity/perkebunan");

        setAgrotourismData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data activity_id 1", error);
      }
    };

    fetchData();
  }, []);
  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  return (
    <>
      <section
        className="relative mt-[63px] sm:mt-[63px] lg:mt-[65px] px-7 lg:h-[200px] xl:h-[400px] h-[250px] bg-cover bg-center flex flex-col items-center justify-center lg:px-12"
        style={{
          backgroundImage: "url('/images/perkebunan.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <h1 className="relative text-white font-bold text-xl text-left mr-auto mt-10 md:mt-0 md:mr-0 md:text-4xl md:text-center">
          Pesan Aktivitas Agrowisata <br />
          <span className=" md:text-4xl text-xl">Perkebunan</span>
        </h1>

        <div className="absolute mt-5 md:mt-10 bottom-5 md:relative md:max-w-2xl w-full px-7">
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
      <section className="mt-10 sm:mt-20 mx-7 2xl:mx-32 md:mt-20 md:mx-6 lg:mx-14 lg:mt-24">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Agrowisata perkebunan populer
          </h1>
        </div>

        <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
        <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
          <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:justify-between lg:w-full lg:gap-3">
            {agrotourismData.map((wisata) => (
              <div key={wisata.id} className="relative">
                <Link to={`/wisata/detail/${wisata.id}`}>
                  <CardRekomendasi
                    title={wisata.name}
                    description={truncateDescriptionByChar(
                      wisata.description,
                      85
                    )}
                    image={wisata.url_image}
                    price={Number(wisata.price).toLocaleString("id-ID")}
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

        <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
          <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {agrotourismData.map((wisata) => (
              <div key={wisata.id} className="relative">
                <Link to={`/wisata/detail/${wisata.id}`}>
                  <CardRekomendasi
                    title={wisata.name}
                    description={wisata.description}
                    image={wisata.url_image}
                    price={Number(wisata.price).toLocaleString("id-ID")}
                    average_rating={
                      wisata.average_rating
                        ? parseFloat(wisata.average_rating).toFixed(1)
                        : "0.0"
                    }
                  />
                </Link>
                <div className="absolute top-0 right-0 ">
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
      </section>
    </>
  );
};

export default Perkebunan;
