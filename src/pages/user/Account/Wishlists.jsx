import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import CardRekomendasi from "../../../component/card/CardRekomendasi";
import { useWishlist } from "../../../contexts/WishlistsContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { showSnackbar } from "../../../component/CustomSnackbar";
import { useAuth } from "../../../contexts/AuthContext";
import ModalSignUp from "../../../component/ModalSignUp";
const Wishlist = () => {
  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
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

  const getWishlist = async () => {
    try {
      const response = await instance.get("/get/wishlist"); // API endpoint untuk mendapatkan tiket

      setWishlistData(response.data); // Menyimpan tiket yang diterima
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
      <section className="flex 2xl:mx-32">
        <div className="mt-10 md:p-8 mx-4 w-full  text-hitam">
          <Link
            className="flex text-base font-bold items-center gap-2"
            to="/account/profile"
          >
            <IoMdArrowBack className="text-lg" />
            Kembali ke Profil
          </Link>
          <h1 className="font-extrabold text-2xl md:text-3xl mt-5 mb-5">
            Favorit wisata Anda
          </h1>

          {/* Menampilkan pesan jika wishlist kosong */}
          {wishlist.length === 0 ? (
            <div className="mt-10 w-full flex flex-col items-center ">
              <p className="text-hitam text-xl lg:text-2xl font-extrabold">
                Anda belum memiliki favorit wisata
              </p>
              <img
                className="w-40 mt-7"
                src="/images/ticket-wishlist.png"
                alt="Agenda"
              />
              <p className="text-center mt-5 font-medium">
                Raih momen liburan impianmu, <br /> mulai dengan menambahkan
                destinasi ke favoritmu!
              </p>
              <Link
                to="/seluruhwisata"
                className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-2 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
              >
                Eksplor
              </Link>
            </div>
          ) : (
            <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-start lg:p-1 xl:mt-14">
              <div className="hidden md:hidden lg:flex lg:justify-start lg:gap-7 lg:w-full ">
                {wishlistData.map((wish) => (
                  <div key={wish.agrotourism_id} className="relative">
                    <Link to={`/wisata/detail/${wish.agrotourism_id}`}>
                      <CardRekomendasi
                        title={wish.name}
                        description={truncateDescriptionByChar(
                          wish.description,
                          70
                        )}
                        image={wish.url_image}
                        price={Number(wish.price).toLocaleString("id-ID")}
                        average_rating={wish.rating}
                      />
                    </Link>
                    <div className="absolute top-2 right-2">
                      <IconButton
                        onClick={() => toggleWishlist(wish.agrotourism_id)}
                        className="p-2"
                      >
                        {isInWishlist(wish.agrotourism_id) ? (
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
          )}

          <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
            <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {wishlistData.map((wish) => (
                <div key={wish.agrotourism_id} className="relative">
                  <Link to={`/wisata/detail/${wish.agrotourism_id}`}>
                    <CardRekomendasi
                      title={wish.name}
                      description={truncateDescriptionByChar(
                        wish.description,
                        70
                      )}
                      image={wish.url_image}
                      price={Number(wish.price).toLocaleString("id-ID")}
                      average_rating={wish.rating}
                    />
                  </Link>
                  <div className="absolute top-2 right-2">
                    <IconButton
                      onClick={() => toggleWishlist(wish.agrotourism_id)}
                      className="p-2"
                    >
                      {isInWishlist(wish.agrotourism_id) ? (
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
        </div>
      </section>
    </>
  );
};

export default Wishlist;
