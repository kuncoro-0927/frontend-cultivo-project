import { IconButton } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MobileHero = ({
  imageUrl,
  isFavorite,
  onShareClick,
  onWishlistClick,
}) => {
  return (
    <div className="md:hidden h-[300px] relative">
      <img
        className="mt-5 max-w-3xl h-full object-cover w-full "
        src={imageUrl}
        alt=""
      />

      <div className="absolute top-12 right-2 p-2">
        <div className="flex items-center gap-2">
          <div className="bg-white/80 rounded-full p-2 flex justify-center items-center shadow-md">
            <IconButton sx={{ width: 25, height: 25 }} onClick={onShareClick}>
              <ShareIcon
                sx={{ width: 25, height: 25 }}
                className="text-gray-700"
              />
            </IconButton>
          </div>

          <div className="bg-white/80 rounded-full p-2 shadow-md">
            <IconButton
              sx={{ width: 25, height: 25 }}
              onClick={onWishlistClick}
            >
              <FavoriteIcon
                sx={{ width: 25, height: 25 }}
                className={isFavorite ? "text-red-500" : "text-gray-700"}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
