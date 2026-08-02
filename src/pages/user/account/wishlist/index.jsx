import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import ModalSignUp from "../../../../component/ModalSignUp";
import WishlistCard from "./components/WishlistCard";
import EmptyWishlist from "./components/EmptyWishlist";
import { useWishlistPageData } from "./hooks/useWishlistPageData";
import { useWishlistActions } from "../../../../hooks/user/useWishlistActions";

const Wishlist = () => {
  const { wishlistData, loading } = useWishlistPageData();
  const { wishlist, isModalOpen, isInWishlist, toggleWishlist, handleCloseModal } =
    useWishlistActions();

  if (loading) return <p>Loading tickets...</p>;

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />
      <section className="flex 2xl:mx-32">
        <div className="mt-10 md:p-8 mx-4 w-full text-hitam">
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

          {wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-start lg:p-1 xl:mt-14">
              {/* Layout desktop (lg ke atas) */}
              <div className="hidden md:hidden lg:flex lg:justify-start lg:gap-7 lg:w-full">
                {wishlistData.map((wish) => (
                  <WishlistCard
                    key={wish.agrotourism_id}
                    wish={wish}
                    isFavorite={isInWishlist(wish.agrotourism_id)}
                    onToggle={toggleWishlist}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Layout mobile/tablet (di bawah lg) */}
          <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3 md:max-w-full">
            <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {wishlistData.map((wish) => (
                <WishlistCard
                  key={wish.agrotourism_id}
                  wish={wish}
                  isFavorite={isInWishlist(wish.agrotourism_id)}
                  onToggle={toggleWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
