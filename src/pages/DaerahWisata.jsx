import { Link } from "react-router-dom";
import CardDaerah from "../component/card/CardDaerah";
import axios from "axios";
import { useState, useEffect } from "react";

const DaerahWisata = () => {
  const [daerah, setDaerah] = useState([]);

  useEffect(() => {
    getDaerah();
  }, []);

  const getDaerah = async () => {
    const response = await axios.get("http://localhost:5000/daerah");
    setDaerah(response.data);
  };

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
            {daerah.map((daerahItem) => (
              <Link
                key={daerahItem.id}
                to={`/wisata/daerah/${daerahItem.id}`} // Menambahkan path dinamis untuk daerah
              >
                <CardDaerah
                  title={daerahItem.name}
                  image={daerahItem.url}
                  path={daerahItem.path}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 px-8 py-3 lg:hidden">
          <div className="carousel-item gap-3">
            {daerah.map((daerahItem) => (
              <Link
                key={daerahItem.id}
                to={`/wisata/daerah/${daerahItem.id}`} // Menambahkan path dinamis untuk daerah
              >
                <CardDaerah
                  title={daerahItem.name}
                  image={daerahItem.url}
                  path={daerahItem.path}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DaerahWisata;
