import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TitleRatingLocation = ({
  wrapperClassName,
  hasReviews,
  averageRating,
  cityId,
  cityName,
  onReviewClick,
}) => {
  return (
    <div className={wrapperClassName}>
      {hasReviews ? (
        <>
          <p className="mr-1 flex text-base font-semibold items-center gap-1">
            <FaStar className="text-yellow-300" />
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </p>
          <p
            className="underline ml-2 cursor-pointer"
            onClick={onReviewClick}
          >
            Ulasan
          </p>
          <p className="mx-2">-</p>
        </>
      ) : (
        <p></p>
      )}
      <div className="underline font-semibold">
        <Link
          to={`/wisata/daerah/${cityId}`}
          className=" hover:font-bold duration-200"
        >
          {cityName}
        </Link>
      </div>
    </div>
  );
};

export default TitleRatingLocation;
