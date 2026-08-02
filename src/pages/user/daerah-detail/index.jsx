import ModalSignUp from "../../../component/ModalSignUp";
import { useDaerahDetail } from "./hooks/useDaerahDetail";
import SearchHeroSection from "./sections/SearchHeroSection";
import WisataListSection from "./sections/WisataListSection";
import RecommendationSection from "./sections/RecommendationSection";

const DaerahDetail = () => {
  const {
    cityName,
    cityImage,
    agrotourism,
    wisataList,
    isModalOpen,
    isModalSearchOpen,
    isInWishlist,
    toggleWishlist,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    handleCloseModal,
    truncateDescriptionByChar,
  } = useDaerahDetail();

  return (
    <>
      <SearchHeroSection
        cityName={cityName}
        cityImage={cityImage}
        handleOpenModalSearch={handleOpenModalSearch}
        isModalSearchOpen={isModalSearchOpen}
        handleCloseModalSearch={handleCloseModalSearch}
        handleSelectAgrotourism={handleSelectAgrotourism}
      />

      <WisataListSection
        cityName={cityName}
        wisataList={wisataList}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        truncateDescriptionByChar={truncateDescriptionByChar}
      />

      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />

      <RecommendationSection
        agrotourism={agrotourism}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        truncateDescriptionByChar={truncateDescriptionByChar}
      />
    </>
  );
};

export default DaerahDetail;
