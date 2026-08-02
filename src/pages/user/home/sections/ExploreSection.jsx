import DaerahList from "../../../../component/DaerahList";

const ExploreSection = ({ city, isLoading, handleOpenModalSearch }) => {
  return (
    <section className="mx-4  mt-14 md:mt-10 lg:mt-28 2xl:mx-32 md:mx-6 lg:mx-10">
      <div className="flex items-center ">
        <div className="">
          <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Jelajahi tujuan kami
          </h1>
        </div>
        <div className="mt-5 ml-auto lg:mt-0 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 hidden md:block">
          <button
            onClick={handleOpenModalSearch}
            className="text-base py-1 text-center w-full border-b  text-hitam border-black block"
          >
            Lihat semua destinasi
          </button>
        </div>
      </div>

      <div className="mt-7 md:mx-0 lg:p-1 lg:mt-16">
        <DaerahList
          city={city}
          isLoading={isLoading}
          variant="desktop"
          limit={5}
        />
      </div>

      <div className="carousel carousel-center max-w-full lg:hidden pt-2 ">
        <DaerahList
          city={city}
          isLoading={isLoading}
          variant="mobile"
          limit={5}
        />
      </div>

      <div className="mt-5 lg:mt-14 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 md:hidden">
        <button
          onClick={handleOpenModalSearch}
          className="text-xs py-2 text-center w-full md:text-sm lg:text-sm border text-hitam border-black rounded-md block"
        >
          Lihat semua destinasi
        </button>
      </div>
    </section>
  );
};

export default ExploreSection;
