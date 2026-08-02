import ModalSignUp from "../../../component/ModalSignUp";
import { useDaerahWisata } from "./hooks/useDaerahWisata";
import SearchHeroSection from "./sections/SearchHeroSection";
import CityListSection from "./sections/CityListSection";
import RecommendationSection from "./sections/RecommendationSection";

const DaerahWisata = () => {
  const {
    agrotourism,
    city,
    isModalOpen,
    isModalSearchOpen,
    isInWishlist,
    toggleWishlist,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    handleCloseModal,
    truncateDescriptionByChar,
  } = useDaerahWisata();

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />

      <SearchHeroSection
        handleOpenModalSearch={handleOpenModalSearch}
        isModalSearchOpen={isModalSearchOpen}
        handleCloseModalSearch={handleCloseModalSearch}
        handleSelectAgrotourism={handleSelectAgrotourism}
      />

      <CityListSection city={city} />

      <RecommendationSection
        agrotourism={agrotourism}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        truncateDescriptionByChar={truncateDescriptionByChar}
      />
    </>
  );
};

export default DaerahWisata;
