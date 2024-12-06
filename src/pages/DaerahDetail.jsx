import { useParams } from "react-router-dom";
import CardAktivitas from "../component/card/CardAktivitas";
import { useState, useEffect } from "react";
import { instance } from "../utils/axios";
import { Link } from "react-router-dom";
const DaerahDetail = () => {
  const { daerahId } = useParams();
  const [wisataList, setWisataList] = useState([]);
  const [daerahName, setDaerahName] = useState("");

  useEffect(() => {
    console.log("Daerah ID:", daerahId);

    instance
      .get(`/agrotourism`)
      .then((response) => {
        const agrotourismData = response.data.data;
        if (Array.isArray(agrotourismData)) {
          const filteredWisata = agrotourismData.filter(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId)
          );
          setWisataList(filteredWisata);

          const city = agrotourismData.find(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId)
          );
          if (city) setDaerahName(city.city_name);
        } else {
          console.error(
            "Data dari /agrotourism tidak berupa array:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching wisata list:", error);
      });

    instance
      .get(`/daerah/${daerahId}`)
      .then((response) => {
        setDaerahName(response.data.name);
      })
      .catch((error) => {
        console.error("Error fetching daerah name:", error);
      });
  }, [daerahId]);

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  return (
    <section className="mt-20 sm:mt-20 mx-7 md:mt-20 md:mx-10 lg:mx-14 lg:mt-24">
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Eksplor Daerah Wisata {daerahName}
        </h1>
      </div>

      <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-3 lg:justify-between lg:w-full lg:gap-3">
          {wisataList.map((wisata) => (
            <Link key={wisata.id} to={`/wisata/detail/${wisata.id}`}>
              <CardAktivitas
                title={wisata.name}
                description={truncateDescriptionByChar(wisata.description, 85)}
                image={wisata.url_image}
                price={wisata.price}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
        <div className="carousel-item gap-3">
          {wisataList.map((wisata) => (
            <Link key={wisata.id} to={`/wisata/detail/${wisata.id}`}>
              <CardAktivitas
                title={wisata.name}
                description={wisata.description}
                image={wisata.url_image}
                price={wisata.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DaerahDetail;
