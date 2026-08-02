import { IconButton } from "@mui/material";
import { IoShareSocial } from "react-icons/io5";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PopUpPesan from "../../../../component/Orders";
import ModalSignUp from "../../../../component/ModalSignUp";
import ShareMenu from "./ShareMenu";

const BookingSidebar = ({ wisataDetail, booking, wishlistState, shareMenu }) => {
  const { isFavorite, onWishlistClick } = wishlistState;

  return (
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
          onClick={booking.handleButtonClick}
          className="w-full py-3 mr-5 lg:mt-5 mb-10 bg-hitam rounded-md text-white font-bold flex justify-center hover:-translate-y-1 duration-300"
        >
          Pesan sekarang
        </button>

        <ModalSignUp
          open={booking.isLoginModalOpen}
          handleClose={() => booking.setIsLoginModalOpen(false)}
        />
        <PopUpPesan
          open={booking.isPopUpOpen}
          onClose={booking.closePopUp}
          wisataName={wisataDetail?.name || ""}
          onConfirm={booking.handleNextStep}
          modalStep={booking.modalStep}
          selectedDate={booking.selectedDate}
          setSelectedDate={booking.setSelectedDate}
          quantity={booking.quantity}
          setQuantity={booking.setQuantity}
          total={booking.total}
          price={wisataDetail?.price.toLocaleString()}
        />
      </div>

      <div className="px-5 border text-sm font-medium max-w-72 text-hitam flex items-center justify-between py-5 rounded-br-lg rounded-bl-lg">
        <button
          onClick={shareMenu.handleClick}
          className="flex items-center text-base font-bold gap-2"
        >
          <IoShareSocial className="text-2xl " /> Bagikan
        </button>

        <ShareMenu
          anchorEl={shareMenu.anchorEl}
          open={shareMenu.open}
          shareUrl={shareMenu.shareUrl}
          onClose={shareMenu.handleClose}
          onCopyLink={shareMenu.handleCopyLink}
        />

        <div>
          <IconButton onClick={onWishlistClick}>
            {isFavorite ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <span className="font-bold text-base">Simpan</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
