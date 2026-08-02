import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  return (
    <div className="mb-4">
      <Rating name="read-only" value={review.rating} readOnly />

      <div className="lg:max-w-3xl">
        <h1 className="text-xs font-semibold">
          {review.user_name || "Anonymous"}
        </h1>
        <div
          className="text-base w-full  border-b pb-5 mt-2 rounded-md 
          max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 
          break-words"
        >
          {review.review_text || "No review text available."}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
