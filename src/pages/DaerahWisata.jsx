//import NavBar from "../component/NavBar";
import { daerahList } from "../data_sementara/Daerah";
import CardDaerah from "../component/card/CardDaerah";
const DaerahWisata = () => {
  return (
    <>
      <section className="mx-7 mt-20 md:mt-10 lg:mt-28 md:mx-10 lg:mx-14">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Eksplor Daerah Wisata <br />
            di Indonesia
          </h1>
        </div>

        <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          {/* Kartu yang muncul secara horizontal di layar besar */}
          <div className="hidden md:hidden lg:grid lg:justify-between lg:grid-cols-4 lg:w-full lg:gap-3 lg:gap-y-10">
            {daerahList.map((daerah, index) => (
              <CardDaerah
                key={index}
                title={daerah.title}
                description={daerah.description}
                image={daerah.image}
                path={daerah.path} // Pastikan untuk menambahkan properti ini
              />
            ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 px-8 py-3 lg:hidden">
          <div className="carousel-item gap-3">
            {daerahList.map((daerah, index) => (
              <CardDaerah
                key={index}
                title={daerah.title}
                description={daerah.description}
                image={daerah.image}
                path={daerah.path} // Pastikan path ini ada
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DaerahWisata;
