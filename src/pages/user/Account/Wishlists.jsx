import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
//import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import CardRekomendasi from "../../../component/card/CardRekomendasi";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  //const { wisataId } = useParams();
  const getWishlist = async () => {
    try {
      const response = await instance.get("/get/wishlist"); // API endpoint untuk mendapatkan tiket
      console.log(response.data);
      setWishlist(response.data); // Menyimpan tiket yang diterima
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
      <section className="flex">
        <div className="mt-20 mx-4 w-full  text-hitam">
          <Link
            className="flex text-base font-bold items-center gap-2"
            to="/account/profile"
          >
            <IoMdArrowBack className="text-lg" />
            Kembali ke Profil
          </Link>
          <h1 className="font-extrabold text-3xl mt-5 mb-5">
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
                src="/public/images/ticket-wishlist.png"
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
                {wishlist.map((wish) => (
                  <Link
                    key={wish.agrotourism_id}
                    to={`/wisata/detail/${wish.agrotourism_id}`}
                  >
                    <CardRekomendasi
                      title={wish.name}
                      description={truncateDescriptionByChar(
                        wish.description,
                        70
                      )}
                      image={wish.url_image}
                      price={wish.price}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
            <div className="carousel-item gap-3">
              {wishlist.map((wish) => (
                <Link
                  key={wish.agrotourism_id}
                  to={`/wisata/detail/${wish.agrotourism_id}`}
                >
                  <CardRekomendasi
                    title={wish.name}
                    description={truncateDescriptionByChar(
                      wish.description,
                      70
                    )}
                    image={wish.url_image}
                    price={wish.price}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
