import AgrotourismCard from "../../../../component/AgrotourismCard";
const DESKTOP_IDS = [33, 16, 2, 20];
const MOBILE_IDS = [33, 16, 2, 20];

const PopularSection = ({
  agrotourism,
  isInWishlist,
  toggleWishlist,
  truncateDescriptionByChar,
  isLoading,
}) => {
  const list = Array.isArray(agrotourism) ? agrotourism : [];

  return (
    <section className="mx-4 sm:mt-20 mt-14 md:mx-6 lg:mx-10 2xl:mx-32 md:mt-20 lg:mt-28">
      <div className="md:flex md:items-start md:justify-between">
        <div>
          <span>Destinasi populer</span>
          <h1 className="text-xl font-extrabold text-hitam sm:text-3xl  md:text-4xl">
            Agrowisata
            <p className="bg-hijau-muda ml-2 inline-block px-5 rounded-full py-2">
              Cultivo
            </p>
          </h1>
        </div>
        <div className="max-w-lg md:max-w-[300px] lg:max-w-lg mt-2 md:mt-0 md:text-right">
          <span className="text-sm text-gray-400">
            Temukan destinasi agrowisata populer dari Cultivo, yang menawarkan
            pengalaman alam yang beragam.
          </span>
        </div>
      </div>

      <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:gap-3 lg:w-full">
          {list
            .filter((item) => DESKTOP_IDS.includes(item.id))
            .map((item) => (
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
        <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {list
            .filter((item) => MOBILE_IDS.includes(item.id))
            .map((item) => (
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

export default PopularSection;
