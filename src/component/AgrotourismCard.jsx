import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardRekomendasi from "../component/card/CardRekomendasi";

/**
 * Card agrowisata + tombol wishlist.
 * `isLoading` opsional — kalau tidak dikirim, CardRekomendasi menerima `undefined`
 * (perilakunya sama seperti prop tidak dikirim sama sekali).
 */
const AgrotourismCard = ({
  agrotourism,
  isFavorite,
  onToggleWishlist,
  truncateDescription,
  isLoading,
  iconPositionClass = "absolute top-2 right-2",
}) => {
  return (
    <div className="relative">
      <Link to={`/wisata/detail/${agrotourism.id}`}>
        <CardRekomendasi
          title={agrotourism.name}
          description={truncateDescription(agrotourism.description, 70)}
          image={agrotourism.url_image}
          price={Number(agrotourism.price).toLocaleString("id-ID")}
          average_rating={
            agrotourism.average_rating
              ? parseFloat(agrotourism.average_rating).toFixed(1)
              : "0.0"
          }
          isLoading={isLoading}
        />
      </Link>

      <div className={iconPositionClass}>
        <IconButton
          onClick={() => onToggleWishlist(agrotourism.id)}
          className="p-2"
        >
          {isFavorite ? (
            <FavoriteIcon className="text-red-500" sx={{ width: 28, height: 28 }} />
          ) : (
            <FavoriteIcon sx={{ width: 28, height: 28 }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default AgrotourismCard;
