import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import { useWisataDetail } from "./hooks/useWisataDetail";
import { useWishlist } from "./hooks/useWishlist";
import { useShareMenu } from "./hooks/useShareMenu";
import { useDescriptionToggle } from "./hooks/useDescriptionToggle";
import { useScrollNavbar } from "./hooks/useScrollNavbar";
import { useBookingFlow } from "./hooks/useBookingFlow";
import { useReviewStats } from "./hooks/useReviewStats";

import MobileHero from "./components/MobileHero";
import MobileBookingBar from "./components/MobileBookingBar";
import HighlightSection from "./sections/HighlightSection";
import AddressSection from "./sections/AddressSection";
import ReviewsSection from "./sections/ReviewsSection";
import SidebarSection from "./sections/SidebarSection";

const WisataDetail = () => {
  const reviewRef = useRef(null);
  const { wisataId } = useParams();
  const { isLoggedIn } = useAuth();

  const { wisataDetail, reviews } = useWisataDetail(wisataId);

  const booking = useBookingFlow(isLoggedIn, wisataDetail?.price);
  const wishlist = useWishlist(isLoggedIn, () =>
    booking.setIsLoginModalOpen(true)
  );
  const shareMenu = useShareMenu();
  const description = useDescriptionToggle(wisataDetail?.description || "");
  const showNavbar = useScrollNavbar();
  const { averageRating, ratingPercentage } = useReviewStats(reviews);

  const scrollToReviews = () =>
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });

  if (!wisataDetail) {
    return <div></div>;
  }

  const wishlistState = {
    isFavorite: wishlist.isInWishlist(wisataDetail.id),
    onWishlistClick: () => wishlist.toggleWishlist(wisataDetail.id),
  };

  return (
    <>
      <MobileHero
        imageUrl={wisataDetail.url_image}
        isFavorite={wishlistState.isFavorite}
        onShareClick={shareMenu.handleClick}
        onWishlistClick={wishlistState.onWishlistClick}
      />

      <section className="text-hitam2 sm:mt-0 mx-7 md:mt-20 md:mx-6 lg:mx-14 2xl:mx-32 lg:mt-24 md:pt-0 flex flex-col md:flex-row ">
        <div className="flex-1 ">
          <HighlightSection
            wisataDetail={wisataDetail}
            hasReviews={reviews.length > 0}
            averageRating={averageRating}
            onReviewClick={scrollToReviews}
            description={description}
          />

          <AddressSection
            address={wisataDetail.address}
            gmapsUrl={wisataDetail.url_gmaps}
          />

          <ReviewsSection
            ref={reviewRef}
            reviews={reviews}
            averageRating={averageRating}
            ratingPercentage={ratingPercentage}
          />

          {showNavbar && (
            <MobileBookingBar
              price={wisataDetail.price}
              onBookClick={booking.handleButtonClick}
            />
          )}
        </div>

        <SidebarSection
          wisataDetail={wisataDetail}
          booking={booking}
          wishlistState={wishlistState}
          shareMenu={shareMenu}
        />
      </section>
    </>
  );
};

export default WisataDetail;
