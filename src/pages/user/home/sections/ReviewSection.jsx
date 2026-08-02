import SwiperCardReview from "../../../../component/SwiperCardReview";

const ReviewSection = () => {
  return (
    <section className="mx-7 md:mx-6 lg:mx-10 bg-cover 2xl:mx-32 mt-10 justify-center lg:mt-20">
      <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl mb-7 md:mb-10 lg:mb-20 text-hitam">
        Apa kata pengunjung
      </h1>

      <SwiperCardReview />
    </section>
  );
};

export default ReviewSection;
