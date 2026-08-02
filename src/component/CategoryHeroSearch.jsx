import { FiSearch } from "react-icons/fi";
import ModalSearch from "./ModalSearch";

const CategoryHeroSearch = ({
  backgroundImage,
  title,
  subtitle,
  isModalSearchOpen,
  onOpenSearch,
  onCloseSearch,
  onSelect,
}) => {
  return (
    <section
      className="relative mt-[63px] sm:mt-[63px] lg:mt-[65px] px-7 lg:h-[200px] xl:h-[400px] h-[250px] bg-cover bg-center flex flex-col items-center justify-center lg:px-12"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <h1 className="relative text-white font-bold text-xl text-left mr-auto mt-10 md:mt-0 md:mr-0 md:text-4xl md:text-center">
        {title} <br />
        <span className="md:text-4xl text-xl">{subtitle}</span>
      </h1>

      <div className="absolute mt-5 md:mt-10 bottom-5 md:relative md:max-w-2xl w-full px-7">
        <span className="ml-0 bg-hitam2 h-full w-16 flex items-center justify-center rounded-full sm:ml-0 absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <FiSearch className="md:text-lg text-white font-extrabold" />
        </span>

        <button
          onClick={onOpenSearch}
          type="text"
          className="text-left pl-6 md:pl-6 text-xs lg:text-base px-6 py-3 md:py-3 text-gray-400 bg-gray-100 rounded-full w-full focus:outline-none focus:border-gray-500"
        >
          Cari Destinasi
        </button>

        <ModalSearch
          isOpen={isModalSearchOpen}
          handleClose={onCloseSearch}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
};

export default CategoryHeroSearch;
