import DaerahList from "../../../../component/DaerahList";

const CityListSection = ({ city }) => {
  return (
    <section className="mx-4 mt-10 2xl:mx-32 sm:mt-20 md:mt-20 lg:mt-16 md:mx-6 lg:mx-10">
      <div className="">
        <h1 className="text-2xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Jelajahi kota Agrowisata Anda
        </h1>
      </div>

      {/* Desktop: grid, bukan carousel */}
      <div className="mt-7 md:mx-0 lg:p-1 lg:mt-7">
        <DaerahList
          city={city}
          variant="desktop"
          className="hidden md:hidden lg:grid lg:grid-cols-6 lg:gap-5 lg:w-full"
        />
      </div>

      {/* Mobile: tetap carousel */}
      <div className="carousel carousel-center max-w-full lg:hidden pt-2">
        <DaerahList city={city} variant="mobile" />
      </div>
    </section>
  );
};

export default CityListSection;
