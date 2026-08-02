import AgrotourismCard from "../../../../component/AgrotourismCard";

const WisataListSection = ({
  cityName,
  wisataList,
  isInWishlist,
  toggleWishlist,
  truncateDescriptionByChar,
}) => {
  const list = Array.isArray(wisataList) ? wisataList : [];
  // Catatan: di kode asli, versi mobile TIDAK memotong deskripsi (pakai teks penuh),
  // sementara versi desktop dipotong 85 karakter. Perilaku ini sengaja dipertahankan.
  const passThrough = (description) => description;

  return (
    <section className="mt-10 sm:mt-20 mx-4 md:mt-20 md:mx-6 2xl:mx-32 lg:mx-10 lg:mt-24">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Daerah Wisata {cityName}
        </h1>
      </div>

      <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:justify-between lg:w-full lg:gap-3">
          {list.map((wisata) => (
            <AgrotourismCard
              key={wisata.id}
              agrotourism={wisata}
              isFavorite={isInWishlist(wisata.id)}
              onToggleWishlist={toggleWishlist}
              truncateDescription={(desc) =>
                truncateDescriptionByChar(desc, 85)
              }
              iconPositionClass="absolute top-2 right-6"
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
        <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {list.map((wisata) => (
            <AgrotourismCard
              key={wisata.id}
              agrotourism={wisata}
              isFavorite={isInWishlist(wisata.id)}
              onToggleWishlist={toggleWishlist}
              truncateDescription={passThrough}
              iconPositionClass="absolute top-1 right-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WisataListSection;
