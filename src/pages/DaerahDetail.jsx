import { useParams } from "react-router-dom";
import CardAktivitas from "../component/card/CardAktivitas";
import {
  soloList,
  malangList,
  yogyakartaList,
} from "../data_sementara/DataWisata";

const WisataDetail = () => {
  const { daerahName } = useParams();

  // Menentukan daftar wisata berdasarkan daerah
  const listMap = {
    solo: soloList,
    malang: malangList,
    yogyakarta: yogyakartaList,
  };

  const wisataList = listMap[daerahName.toLowerCase()];

  // Jika wisataList tidak ada atau tidak valid
  if (!wisataList || !Array.isArray(wisataList)) {
    return (
      <div className="mt-5 sm:mt-14 mx-7 md:mt-10 md:mx-10 lg:mx-14 lg:mt-24 text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
        <h1 className="mt-52">
          Daerah Wisata{" "}
          {daerahName.charAt(0).toUpperCase() + daerahName.slice(1)} Tidak
          Ditemukan
        </h1>
      </div>
    );
  }

  return (
    <section className="mt-5 sm:mt-14 mx-7 md:mt-10 md:mx-10 lg:mx-14 lg:mt-24">
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Eksplor Daerah Wisata{" "}
          {daerahName.charAt(0).toUpperCase() + daerahName.slice(1)}
        </h1>
      </div>

      {/* Grid untuk tampilan besar (desktop) */}
      <div className="md:flex lg:justify-between lg:p-1 lg:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-3 lg:justify-between lg:w-full lg:gap-3">
          {wisataList.map((wisata, index) => (
            <CardAktivitas
              key={index}
              title={wisata.title}
              description={wisata.description}
              image={wisata.image}
              price={wisata.price}
              path={wisata.path}
            />
          ))}
        </div>
      </div>

      {/* Carousel untuk tampilan mobile */}
      <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
        <div className="carousel-item gap-3">
          {wisataList.map((wisata, index) => (
            <CardAktivitas
              key={index}
              title={wisata.title}
              description={wisata.description}
              image={wisata.image}
              price={wisata.price}
              path={wisata.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WisataDetail;
