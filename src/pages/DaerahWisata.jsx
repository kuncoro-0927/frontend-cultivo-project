/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import CardDaerah from "../component/card/CardDaerah";
import { instance } from "../utils/axios";
import { useState, useEffect } from "react";
import { daerahList } from "../data_sementara/DataWisata";
const DaerahWisata = () => {
  const [city, setDaerah] = useState([]);

  useEffect(() => {
    getDaerah();
  }, []);

  const getDaerah = async () => {
    try {
      const response = await instance.get("/daerah");

      const dataDaerah = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setDaerah(dataDaerah);
    } catch (error) {
      console.error("Error fetching data daerah:", error);
    }
  };

  return (
    <>
      <section className="mx-7 mt-20 sm:mt-20 md:mt-20 lg:mt-28 md:mx-10 lg:mx-14">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Eksplor Daerah Wisata <br />
            di Indonesia
          </h1>
        </div>

        {/* <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          <div className="hidden md:hidden lg:grid lg:justify-between lg:grid-cols-4 lg:w-full lg:gap-3 lg:gap-y-10">
            {Array.isArray(city) &&
              city.map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 px-8 py-3 lg:hidden">
          <div className="carousel-item gap-3">
            {Array.isArray(city) &&
              city.map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
        </div> */}

        {/* DATA DUMMY BUAT EXHIBITION */}
        <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          <div className="hidden md:hidden lg:grid lg:justify-between lg:grid-cols-4 lg:w-full lg:gap-3 lg:gap-y-10">
            {Array.isArray(daerahList) &&
              daerahList.map((daerahItem) => (
                <CardDaerah
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 py-3 lg:hidden">
          <div className="carousel-item gap-3 px-1">
            {Array.isArray(daerahList) &&
              daerahList.map((daerahItem) => (
                <CardDaerah
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DaerahWisata;
