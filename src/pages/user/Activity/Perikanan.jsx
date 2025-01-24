import CardAktivitas from "../../../component/card/CardAktivitas";
import { useState, useEffect } from "react";
import { instance } from "../../../utils/axios";
import { Link } from "react-router-dom";
const Perikanan = () => {
  const [agrotourismData, setAgrotourismData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/agrotourism/activity/perikanan");
        console.log("Data yang diterima:", response.data);

        // Jika data yang diterima adalah objek, kamu bisa langsung menyimpan response.data
        setAgrotourismData([response.data]); // Simpan dalam array
      } catch (error) {
        console.error("Gagal mengambil data activity_id 1", error);
      }
    };

    fetchData();
  }, []);
  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };
  return (
    <section className="mt-20 sm:mt-20 mx-7 md:mt-20 md:mx-6 lg:mx-14 lg:mt-24">
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Eksplor Daerah Wisata Pertanian
        </h1>
      </div>

      <div className="md:flex lg:justify-between lg:p-1 mt-5 lg:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-3 lg:justify-between lg:w-full lg:gap-3">
          {agrotourismData.length > 0 ? (
            agrotourismData.map((wisata) => (
              <Link key={wisata.id} to={`/wisata/detail/${wisata.id}`}>
                <CardAktivitas
                  title={wisata.name}
                  description={truncateDescriptionByChar(
                    wisata.description,
                    85
                  )}
                  image={wisata.url_image}
                  price={wisata.price}
                />
              </Link>
            ))
          ) : (
            <div>Data tidak ditemukan</div>
          )}
        </div>
      </div>

      <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
        <div className="carousel-item gap-3">
          {agrotourismData.map((wisata) => (
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

export default Perikanan;
