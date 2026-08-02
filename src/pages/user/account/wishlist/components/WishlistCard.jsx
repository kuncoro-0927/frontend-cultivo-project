import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardRekomendasi from "../../../../../component/card/CardRekomendasi";
import { truncateDescriptionByChar } from "../../../../../utils/textHelpers";

const WishlistCard = ({ wish, isFavorite, onToggle }) => {
  return (
    <div className="relative">
      <Link to={`/wisata/detail/${wish.agrotourism_id}`}>
        <CardRekomendasi
          title={wish.name}
          description={truncateDescriptionByChar(wish.description, 70)}
          image={wish.url_image}
          price={Number(wish.price).toLocaleString("id-ID")}
          average_rating={wish.rating}
        />
      </Link>
      <div className="absolute top-2 right-2">
        <IconButton
          onClick={() => onToggle(wish.agrotourism_id)}
          className="p-2"
        >
          <FavoriteIcon
            className={isFavorite ? "text-red-500" : ""}
            sx={{ width: 28, height: 28 }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default WishlistCard;
