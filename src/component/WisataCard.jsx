import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardRekomendasi from "./card/CardRekomendasi";

const WisataCard = ({ wisata, description, isFavorite, onToggle, iconPositionClassName }) => {
  const rating = wisata.average_rating
    ? parseFloat(wisata.average_rating).toFixed(1)
    : "0.0";

  return (
    <div className="relative">
      <Link to={`/wisata/detail/${wisata.id}`}>
        <CardRekomendasi
          title={wisata.name}
          description={description}
          image={wisata.url_image}
          price={Number(wisata.price).toLocaleString("id-ID")}
          average_rating={rating}
        />
      </Link>

      <div className={iconPositionClassName}>
        <IconButton onClick={() => onToggle(wisata.id)} className="p-2">
          <FavoriteIcon
            className={isFavorite ? "text-red-500" : ""}
            sx={{ width: 28, height: 28 }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default WisataCard;
