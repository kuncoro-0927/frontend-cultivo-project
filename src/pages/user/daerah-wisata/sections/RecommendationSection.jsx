import AgrotourismCard from "../../../../component/AgrotourismCard";

const RECOMMENDATION_IDS = [1, 2, 9, 10];

const RecommendationSection = ({
  agrotourism,
  isInWishlist,
  toggleWishlist,
  truncateDescriptionByChar,
  isLoading,
}) => {
  const list = Array.isArray(agrotourism)
    ? agrotourism.filter((item) => RECOMMENDATION_IDS.includes(item.id))
    : [];

  return (
    <section className="mt-10 sm:mt-14 mx-4 md:mt-10 2xl:mx-32 md:mx-6 lg:mx-10 lg:mt-20 ">
      <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
        Rekomendasi untuk Anda
      </h1>
      <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
        <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
          {list.map((item) => (
            <AgrotourismCard
              key={item.id}
              agrotourism={item}
              isFavorite={isInWishlist(item.id)}
              onToggleWishlist={toggleWishlist}
              truncateDescription={truncateDescriptionByChar}
              isLoading={isLoading}
              iconPositionClass="absolute top-2 right-2"
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
        <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((item) => (
            <AgrotourismCard
              key={item.id}
              agrotourism={item}
              isFavorite={isInWishlist(item.id)}
              onToggleWishlist={toggleWishlist}
              truncateDescription={truncateDescriptionByChar}
              isLoading={isLoading}
              iconPositionClass="absolute top-0 right-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
