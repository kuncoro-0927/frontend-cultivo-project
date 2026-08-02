import Rating from "@mui/material/Rating";
import { formatDate } from "../utils/reviewHelpers";
const ReviewCard = ({ review }) => {
  return (
    <div>
      <div className="ticket-card max-w-[800px] md:h-[200px] h-[120px] mt-10 border flex border-gray-200 w-full rounded-t-lg shadow-sm">
        <div className="w-[150px] md:w-[200px] flex items-center justify-center rounded-tl-lg overflow-hidden">
          <img src={review.image} alt="Agrotourism" className="w-full h-full object-cover" />
        </div>
        <div className="p-4 md:p-4 w-full flex flex-col justify-between">
          <h1 className="font-bold text-sm md:text-lg">{review.agrotourism_name}</h1>
          <p className="mt-2 text-xs md:text-sm flex items-center text-hitam2 font-semibold">
            Tanggal: {formatDate(review.selected_date)}
          </p>
          <Rating name="read-only" value={review.rating} readOnly sx={{ fontSize: "2rem" }} />
          <p className="mt-2 text-xs hidden md:flex md:text-sm items-center text-hitam2 font-semibold">
            Diberikan pada: {formatDate(review.created_at)}
          </p>
        </div>
      </div>

      {/* Bagian detail tambahan ulasan */}
      <div className="ticket-card p-2 max-w-[800px] mb-4 border border-gray-200 w-full rounded-b-lg shadow-sm">
        <p className="mt-2 text-xs md:hidden md:text-sm items-center text-hitam2 font-semibold">
          Diberikan pada: {formatDate(review.created_at)}
        </p>
        <Rating name="read-only" value={review.rating} readOnly sx={{ fontSize: "1.7rem" }} />
        <p className="text-sm md:text-base mt-1 md:mt-0 text-hitam2">{review.review_text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
