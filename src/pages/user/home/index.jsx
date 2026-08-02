import ModalSignUp from "../../../component/ModalSignUp";
import { useHome } from "./hooks/useHome";
import HeroSection from "./sections/HeroSection";
import PopularSection from "./sections/PopularSection";
import ExploreSection from "./sections/ExploreSection";
import RecommendationSection from "./sections/RecommendationSection";
import ReviewSection from "./sections/ReviewSection";

const Home = () => {
  const {
    city,
    agrotourism,
    isModalOpen,
    isModalSearchOpen,
    isLoading,
    isInWishlist,
    toggleWishlist,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    handleCloseModal,
    truncateDescriptionByChar,
  } = useHome();

  return (
    <>
      <ModalSignUp open={isModalOpen} handleClose={handleCloseModal} />

      <HeroSection
        handleOpenModalSearch={handleOpenModalSearch}
        isModalSearchOpen={isModalSearchOpen}
        handleCloseModalSearch={handleCloseModalSearch}
        handleSelectAgrotourism={handleSelectAgrotourism}
      />

      <PopularSection
        agrotourism={agrotourism}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        truncateDescriptionByChar={truncateDescriptionByChar}
        isLoading={isLoading}
      />

      <ExploreSection
        city={city}
        isLoading={isLoading}
        handleOpenModalSearch={handleOpenModalSearch}
      />

      <RecommendationSection
        agrotourism={agrotourism}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        truncateDescriptionByChar={truncateDescriptionByChar}
        isLoading={isLoading}
      />

      <ReviewSection />
    </>
  );
};

export default Home;
