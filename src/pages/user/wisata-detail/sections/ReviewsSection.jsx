import { forwardRef } from "react";
import Rating from "@mui/material/Rating";
import RatingDistribution from "../components/RatingDistribution";
import ReviewCard from "../components/ReviewCard";

const ReviewsSection = forwardRef(
  ({ reviews, averageRating, ratingPercentage }, ref) => {
    if (reviews.length === 0) return null;

    return (
      <div ref={ref}>
        <div className="mt-7 ">
          <h2 className="text-2xl text-hitam2 font-extrabold">
            Ulasan Pengguna
          </h2>
        </div>
        <div className="mt-3 md:flex items-start justify-between text-hitam2 lg:max-w-3xl ">
          <div className="flex items-end gap-3">
            <h1 className="flex items-center text-3xl md:text-4xl font-extrabold text-hitam2">
              <Rating
                readOnly
                max={1}
                defaultValue={1}
                sx={{ fontSize: "2rem" }}
                className="mr-2"
              />{" "}
              {averageRating ? averageRating.toFixed(1) : "0.0"}
            </h1>
            <p>{reviews[0].total_reviews} ulasan terverifikasi</p>
          </div>

          <RatingDistribution ratingPercentage={ratingPercentage} />
        </div>

        <div className="mt-5">
          {reviews.map((review) => (
            <ReviewCard key={review.review_id} review={review} />
          ))}
        </div>
      </div>
    );
  }
);

ReviewsSection.displayName = "ReviewsSection";

export default ReviewsSection;
