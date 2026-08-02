import SidebarAccount from "../../../../component/SidebarAccount";
import ModalReview from "../../../../component/ModalReview";
import TabButtons from "./components/TabButtons";
import EmptyTickets from "./components/EmptyTickets";
import TicketReviewCard from "./components/TicketReviewCard";
import ReviewCard from "./components/ReviewCard";
import { useReview } from "./hooks/useReview";

const Review = () => {
  const {
    tickets,
    reviews,
    modalOpen,
    selectedTicketId,
    activeTab,
    setActiveTab,
    handleOpenModal,
    handleCloseModal,
    hasReviewedTicket,
  } = useReview();

  return (
    <>
      <ModalReview
        open={modalOpen}
        handleClose={handleCloseModal}
        ticketId={selectedTicketId}
      />
      <section className="flex 2xl:mx-32">
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>

        <div className="mt-20 md:p-8 mx-4 w-full text-hitam">
          <h1 className="font-extrabold text-2xl md:text-3xl mb-5">Ulasan</h1>

          <TabButtons activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "tickets" ? (
            tickets.length === 0 ? (
              <EmptyTickets />
            ) : (
              tickets.map((ticket) => (
                <TicketReviewCard
                  key={ticket.id}
                  ticket={ticket}
                  hasReviewed={hasReviewedTicket(ticket)}
                  onOpenModal={handleOpenModal}
                />
              ))
            )
          ) : reviews.length === 0 ? (
            <p className="mt-10 text-center text-hitam font-bold">
              Anda belum memberikan ulasan.
            </p>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={`review-${review.review_id}`} review={review} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Review;
