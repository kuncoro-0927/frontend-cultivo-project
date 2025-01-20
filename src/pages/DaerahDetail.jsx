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
const DaerahDetail = () => {
  const { daerahId } = useParams();
  const [agrotourism, setAgrotourism] = useState([]);
  const [wisataList, setWisataList] = useState([]);
  const [cityName, setCityName] = useState(""); // Gunakan state hanya untuk cityName
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <section className="mt-20 sm:mt-20 mx-4 md:mt-20 md:mx-10 lg:mx-10 lg:mt-24">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Daerah Wisata {cityName}
            {/* Tampilkan cityName */}
          </h1>
        </div>

        <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
          <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:justify-between lg:w-full lg:gap-3">
            {wisataList.map((wisata) => (
              <div key={wisata.id} className="relative">
                <Link to={`/wisata/detail/${wisata.id}`}>
                  <CardRekomendasi
                    title={wisata.name}
                    description={truncateDescriptionByChar(
                      wisata.description,
                      85
                    )}
                    image={wisata.url_image}
                    price={wisata.price}
                    average_rating={wisata.average_rating.toFixed(1)}
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
        <div className="lg:hidden carousel carousel-center md:space-x-3 md:px-8 md:py-3 md:max-w-full ">
          <div className="carousel-item justify-between flex flex-wrap gap-4">
            {wisataList.map((wisata) => (
              <div key={wisata.id} className="relative">
                <Link to={`/wisata/detail/${wisata.id}`}>
                  <CardRekomendasi
                    title={wisata.name}
                    description={wisata.description}
                    image={wisata.url_image}
                    price={wisata.price}
                    average_rating={wisata.average_rating.toFixed(1)}
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
      </section>

      <section className="mt-10 sm:mt-14 mx-4 md:mt-10 md:mx-6 lg:mx-10 lg:mt-20 ">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Mungkin Anda suka
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
          <div className="md:carousel-item justify-between flex flex-wrap gap-4">
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

export default DaerahDetail;
