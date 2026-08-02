import ModalSignUp from "../../../../component/ModalSignUp";
import CategoryHeroSearch from "../../../../component/CategoryHeroSearch"
import WisataCard from "../../../../component/WisataCard"
import { useCategoryWisataPage } from "../../../../hooks/user/useCategoryWisataPage";
import {truncateDescriptionByChar} from "../../../../utils/textHelpers"

const Edukasi = () => {
  const {
    agrotourismData,
    isModalSearchOpen,
    isModalOpen,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    isInWishlist,
    toggleWishlist,
    handleCloseModal,
  } = useCategoryWisataPage("pertanian");

  return (
    <>
      <CategoryHeroSearch
        backgroundImage="/images/edukasi.jpg"
        title="Pesan Aktivitas Agrowisata"
        subtitle="Edukasi"
        isModalSearchOpen={isModalSearchOpen}
        onOpenSearch={handleOpenModalSearch}
        onCloseSearch={handleCloseModalSearch}
        onSelect={handleSelectAgrotourism}
      />

      <section className="mt-10 sm:mt-20 mx-7 2xl:mx-32 md:mt-20 md:mx-6 lg:mx-14 lg:mt-24">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Agrowisata edukasi populer
          </h1>
        </div>

        <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />

        {/* Layout desktop (lg ke atas) */}
        <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
          <div className="hidden md:hidden lg:grid lg:grid-cols-4 lg:justify-between lg:w-full lg:gap-3">
            {agrotourismData.map((wisata) => (
              <WisataCard
                key={wisata.id}
                wisata={wisata}
                description={truncateDescriptionByChar(wisata.description, 85)}
                isFavorite={isInWishlist(wisata.id)}
                onToggle={toggleWishlist}
                iconPositionClassName="absolute top-2 right-6"
              />
            ))}
          </div>
        </div>

        {/* Layout mobile/tablet (di bawah lg) */}
        <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3 md:max-w-full">
          <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {agrotourismData.map((wisata) => (
              <WisataCard
                key={wisata.id}
                wisata={wisata}
                description={wisata.description}
                isFavorite={isInWishlist(wisata.id)}
                onToggle={toggleWishlist}
                iconPositionClassName="absolute top-0 right-0"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Edukasi;
