import TitleRatingLocation from "../components/TitleRatingLocation";
import GallerySection from "../components/GallerySection";
import IncludeExcludeList from "../components/IncludeExcludeList";

const HighlightSection = ({
  wisataDetail,
  hasReviews,
  averageRating,
  onReviewClick,
  description,
}) => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl hidden md:block font-extrabold md:text-3xl text-hitam2">
        {wisataDetail.name}
      </h1>

      <TitleRatingLocation
        wrapperClassName="items-center hidden md:flex text-hitam2"
        hasReviews={hasReviews}
        averageRating={averageRating}
        cityId={wisataDetail.city_id}
        cityName={wisataDetail.city_name}
        onReviewClick={onReviewClick}
      />

      <div className="hidden md:block lg:h-[500px] ">
        <img
          className="mt-5 max-w-3xl h-full object-cover rounded-xl w-full 2xl:max-w-4xl"
          src={wisataDetail.url_image}
          alt=""
        />
      </div>

      <h1 className="text-2xl mt-5 md:hidden sm:text-3xl font-extrabold md:text-3xl text-hitam2">
        {wisataDetail.name}
      </h1>

      <TitleRatingLocation
        wrapperClassName="flex md:hidden mt-2 items-center text-hitam2 "
        hasReviews={hasReviews}
        averageRating={averageRating}
        cityId={wisataDetail.city_id}
        cityName={wisataDetail.city_name}
        onReviewClick={onReviewClick}
      />

      <div className="mt-7">
        <h2 className="text-2xl font-extrabold">Highlight</h2>
      </div>
      <p className="mt-2 text-md sm:text-base lg:text-base text-hitam lg:max-w-3xl 2xl:max-w-4xl">
        {description.displayText}
      </p>

      {description.isLongDescription && (
        <button
          onClick={description.toggleExpanded}
          className="mt-3 text-hitam2 text-sm hover:text-blue-500 underline"
        >
          {description.isExpanded ? "Lebih sedikit" : "Lebih banyak"}
        </button>
      )}

      <GallerySection urlGallery={wisataDetail.url_gallery} />

      <div className="mt-7">
        <h2 className="text-2xl font-extrabold">Apa yang termasuk</h2>
      </div>
      <IncludeExcludeList
        include={wisataDetail.include}
        exclude={wisataDetail.exclude}
      />
    </>
  );
};

export default HighlightSection;
