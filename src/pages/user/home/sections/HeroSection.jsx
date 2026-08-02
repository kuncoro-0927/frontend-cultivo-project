import { FiSearch } from "react-icons/fi";
import { FaMapMarkedAlt, FaMountain } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import ModalSearch from "../../../../component/ModalSearch";
const HeroSection = ({
  handleOpenModalSearch,
  isModalSearchOpen,
  handleCloseModalSearch,
  handleSelectAgrotourism,
}) => {
  return (
    <>
      <section className="mt-[80px] sm:mt-[80px] 2xl:mx-32 grid lg:mt-[75px] 2xl:mt-[100px] mx-4 lg:mx-6 lg:flex items-center space-x-0 lg:space-x-4">
        <div className="relative">
          <span className="ml-0 bg-white p-1.5 rounded-full sm:ml-2 absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="md:text-lg font-extrabold" />
          </span>
          <button
            onClick={handleOpenModalSearch}
            type="text"
            className="text-left pl-12 md:pl-16 text-xs lg:text-base px-6 py-3 md:py-3 text-gray-400 bg-gray-100  rounded-full w-[300px] md:w-[400px] lg:w-[430px] focus:outline-none focus:border-gray-500 "
          >
            Cari Destinasi
          </button>

          <ModalSearch
            isOpen={isModalSearchOpen}
            handleClose={handleCloseModalSearch}
            onSelect={handleSelectAgrotourism}
          />
        </div>{" "}
        <div className="flex-row flex mt-3 md:mt-3 space-x-3 ">
          <Link
            to="/aktivitas/edukasi"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <FaMapMarkedAlt className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Edukasi</span>
          </Link>

          <Link
            to="/aktivitas/perkebunan"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <PiPottedPlantFill className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Perkebunan</span>
          </Link>
          <Link
            to="/aktivitas/alam"
            className="p-2 flex text-xs md:text-sm items-center gap-x-2 bg-gray-100 rounded-full hover:bg-hover hover:text-white group duration-200"
          >
            <FaMountain className="bg-white rounded-full p-1.5 text-3xl text-current group-hover:text-black duration-200" />
            <span className="hidden md:block">Wisata alam</span>
          </Link>
        </div>
      </section>

      <section
        className="mx-4 md:mx-6 lg:mx-10 2xl:mx-32 px-7  lg:h-[600px] xl:h-[650px] 2xl:h-[700px] h-[550px] bg-cover bg-center rounded-2xl md:rounded-3xl flex items-center justify-center lg:px-12 mt-[20px] sm:mt-[20px] lg:mt-[30px] relative"
        style={{ backgroundImage: "url('images/bg-home-kids.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl md:rounded-3xl"></div>

        <div className="text-center max-w-5xl relative z-10">
          <h1 className="text-white mb-5 text-3xl md:text-3xl lg:text-6xl font-bold lg:font-medium">
            Jelajahi pengalaman Agrowisata di Indonesia
          </h1>
          <span className="text-white">
            Temukan keindahan alam dan nikmati berbagai kegiatan pertanian yang
            menarik.
          </span>
        </div>

        <div className="absolute bottom-8 md:bottom-20 w-full max-w-xs md:max-w-2xl backdrop-blur-xl rounded-lg flex items-center justify-center mt-auto">
          <div className="flex w-full max-w-3xl">
            <div className="text-white border-r px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">10+</h1>
              <span className="text-xs md:text-sm">Total Kota Tersedia</span>
            </div>
            <div className="text-white border-r px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">50+</h1>
              <span className="text-xs md:text-sm">Total Agrowisata</span>
            </div>
            <div className="text-white px-5 py-3 flex-1 text-center">
              <h1 className="text-xl md:text-2xl font-bold">5.0</h1>
              <span className="text-xs md:text-sm">Rating rata-rata</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
