/* eslint-disable no-unused-vars */
import CardAktivitas from "../component/card/CardAktivitas";
import CardDaerah from "../component/card/CardDaerah";
import CardRekomendasi from "../component/card/CardRekomendasi";
import { aktivitasList } from "../data_sementara/DataWisata";
import SwiperCardReview from "../component/SwiperCardReview";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { rekomendasiList } from "../data_sementara/DataWisata";
import { useState, useEffect } from "react";

import { instance } from "../utils/axios";
// import { useAuth } from "../contexts/AuthContext";
const Home = () => {
  const [city, setDaerah] = useState([]);
  const [agrotourism, setAgrotourism] = useState([]);

  useEffect(() => {
    getDaerah();
  }, []);

  useEffect(() => {
    getAgrotourism();
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

  const getAgrotourism = async () => {
    try {
      const response = await instance.get("/agrotourism");

      const dataAgrotourism = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setAgrotourism(dataAgrotourism);
    } catch (error) {
      console.error("Error fetching data daerah:", error);
    }
  };

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  return (
    <>
      <section
        className="mx-7 md:mx-10 px-7 lg:h-[600px] xl:h-screen h-96 bg-cover bg-center lg:mx-10 rounded-2xl md:rounded-3xl flex items-center justify-center lg:px-12 mt-[66px] sm:mt-[73px]  lg:mt-[74\3px]"
        style={{ backgroundImage: "url('images/header.svg')" }}
      >
        <div className="text-center max-w-5xl">
          <h1 className="text-white text-2xl md:text-3xl lg:text-5xl font-medium lg:font-bold">
            Pertanian adalah usaha bijaksana yang mendatangkan kekayaan sejati,
            moral yang baik, dan kebahagiaan.
          </h1>

          <div className="lg:mt-20 mt-7 flex justify-center">
            <div className="relative">
              <span className="ml-1 sm:ml-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <CiSearch className="text-2xl font-bold" />
              </span>
              <input
                type="text"
                placeholder="Wisata, atraksi, atau aktivitas"
                className="pl-11 sm:pl-14 text-xs lg:text-base px-6 py-3 md:py-3 text-hitam border border-gray-300 rounded-full w-[250px] md:w-[400px] lg:w-[500px] focus:outline-none focus:border-gray-500 "
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-7 sm:mt-20 mt-14 md:mx-10 lg:mx-14 md:mt-20 lg:mt-28">
        <div>
          <p className="text-xl font-extrabold text-hitam sm:text-3xl md:text-4xl">
            Aktivitas Populer
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start sm:mt-7 mt-5 md:mt-10">
          <img
            className="rounded-2xl md:w-[600px] lg:w-[500px] xl:w-[700px] md:mr-7 lg:mr-8"
            src="/images/green_garden.svg"
            alt=""
          />

          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center sm:mt-10 md:mt-10 mt-5 lg:mt-0 ">
                <div className="py-1 px-4 bg-hijau-muda w-auto rounded-full">
                  <p className="text-center text-xl sm:text-2xl text-hitam font-bold md:text-2xl lg:text-2xl">
                    Green
                  </p>
                </div>
                <div className="ml-1">
                  <p className="font-bold text-xl sm:text-2xl text-hitam md:text-2xl lg:text-2xl">
                    Garden, Malang
                  </p>
                </div>
              </div>

              <div className="mt-2 sm:mt-5">
                <p className="text-sm sm:text-lg md:text-base lg:text-lg text-hitam">
                  Nikmati pengalaman seru memetik apel jenis manalagi dan apel
                  anna langsung dari pohonnya! Apel manalagi yang segar dan
                  manis, serta apel anna dengan rasa asam segar yang dipetik
                  sendiri. Rasakan kesegaran buah apel yang baru saja dipetik,
                  sambil menikmati pemandangan perkebunan yang memukau.
                </p>
              </div>
            </div>
            <div className="mt-5 ">
              <div className="flex items-center ml-auto mt-2">
                <button className="text-[0.7rem] sm:text-[0.7rem] md:text-[0.7rem] lg:text-sm pl-3 pr-1 py-1 lg:px-4 md:py-1 lg:pr-1 lg:py-1 rounded-full bg-hijau-opa bg-opacity-80 hover:bg-hijau-opa hover:opacity-900 duration-300 text-white flex items-center">
                  Selengkapnya
                  <div className="py-3 px-3 rounded-full ml-1 md:px-3 md:py-3 bg-button text-white md:rounded-full md:ml-2 lg:ml-2 lg:py-3 lg:px-3 items-center">
                    <LuArrowUpRight className="lg:text-base" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 sm:mt-14 mx-7 md:mt-10 md:mx-10 lg:mx-14 ">
        <div className="grid grid-cols-2 md:flex lg:justify-between lg:p-1 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {aktivitasList.map((wisata, index) => (
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

        <div className="carousel  carousel-center max-w-full py-2 px-2 lg:hidden ">
          <div className="carousel-item gap-3">
            {aktivitasList.map((wisata, index) => (
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

      <section className="mx-7  mt-14 md:mt-10 lg:mt-28 md:mx-10 lg:mx-14">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
            Eksplor Daerah Wisata <br />
            di Indonesia
          </h1>
        </div>

        <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(city) &&
              city.slice(0, 4).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
        </div>

        <div className="carousel carousel-center max-w-full space-x-3 px-8 py-3 lg:hidden ">
          <div className="carousel-item gap-3">
            {Array.isArray(city) &&
              city.slice(0, 4).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-5 lg:mt-14 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 ">
          <Link
            to="/seluruhwisata"
            className="text-[0.5rem] py-2 px-3 md:text-sm lg:text-sm border text-hitam border-black rounded-xl"
          >
            Lihat Semua Daerah
          </Link>
        </div>
      </section>

      <section className="mt-10 sm:mt-14 mx-7 md:mt-10 md:mx-10 lg:mx-14 lg:mt-20 ">
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Wisata yang Kami Rekomendasikan
        </h1>
        {/* <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [1, 2, 9, 10].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <Link
                    key={agrotourismItem.id}
                    to={`/wisata/detail/${agrotourismItem.id}`}
                  >
                    <CardRekomendasi
                      title={agrotourismItem.name}
                      description={truncateDescriptionByChar(
                        agrotourismItem.description,
                        70
                      )}
                      image={agrotourismItem.url_image}
                      price={agrotourismItem.price}
                    />
                  </Link>
                ))}
          </div>
        </div>

        <div className="carousel  carousel-center max-w-full py-2 px-2 lg:hidden ">
          <div className="carousel-item gap-3">
            {Array.isArray(agrotourism) &&
              agrotourism
                .filter((agrotourismItem) =>
                  [1, 2, 3, 4].includes(agrotourismItem.id)
                )
                .map((agrotourismItem) => (
                  <Link
                    key={agrotourismItem.id}
                    to={`/wisata/detail/${agrotourismItem.id}`}
                  >
                    <CardRekomendasi
                      title={agrotourismItem.name}
                      description={truncateDescriptionByChar(
                        agrotourismItem.description,
                        70
                      )}
                      image={agrotourismItem.url_image}
                      price={agrotourismItem.price}
                    />
                  </Link>
                ))}
          </div>
        </div> */}

        <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-between lg:p-1 xl:mt-14 ">
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(rekomendasiList) &&
              rekomendasiList.map((agrotourismItem) => (
                <CardRekomendasi
                  key={agrotourismItem.id}
                  title={agrotourismItem.title}
                  description={truncateDescriptionByChar(
                    agrotourismItem.description,
                    70
                  )}
                  image={agrotourismItem.image}
                  price={agrotourismItem.price}
                />
              ))}
          </div>
        </div>

        <div className="carousel  carousel-center max-w-full py-2 px-10 lg:hidden ">
          <div className="carousel-item gap-3">
            {Array.isArray(rekomendasiList) &&
              rekomendasiList.map((agrotourismItem) => (
                <CardRekomendasi
                  key={agrotourismItem.id}
                  title={agrotourismItem.title}
                  description={truncateDescriptionByChar(
                    agrotourismItem.description,
                    70
                  )}
                  image={agrotourismItem.image}
                  price={agrotourismItem.price}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="mx-7 md:mx-10 lg:mx-14 bg-cover mt-10 justify-center lg:mt-20">
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl mb-7 md:mb-10 lg:mb-20 text-hitam">
          Apa Kata Pengunjung
        </h1>

        <SwiperCardReview />
      </section>
    </>
  );
};

export default Home;
