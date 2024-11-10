import { useParams } from "react-router-dom";
import CardAktivitas from "../component/card/CardAktivitas";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const DaerahDetail = () => {
  const { daerahId } = useParams(); // Menangkap daerahId dari URL
  const [wisataList, setWisataList] = useState([]);
  const [daerahName, setDaerahName] = useState(""); // Menyimpan nama daerah
  // const [wisata, setWisata] = useState([]);

  // useEffect(() => {
  //   getWisata();
  // }, []);

  // const getWisata = async () => {
  //   const response = await axios.get("http://localhost:5000/wisata");
  //   setWisata(response.data);
  // };
  useEffect(() => {
    console.log("Daerah ID:", daerahId); // Debugging untuk memastikan ID yang benar
    // Mengambil daftar wisata berdasarkan daerah_id dari API
    axios
      .get(`http://localhost:5000/wisata`) // Ambil semua wisata
      .then((response) => {
        const filteredWisata = response.data.filter(
          (wisata) => wisata.daerah_id === parseInt(daerahId) // Filter berdasarkan daerahId yang sesuai
        );
        setWisataList(filteredWisata); // Menyimpan daftar wisata yang terfilter

        // Menyimpan nama daerah sesuai dengan ID
        const daerah = response.data.find(
          (wisata) => wisata.daerah_id === parseInt(daerahId)
        );
        if (daerah) setDaerahName(daerah.daerah_name); // Set nama daerah
      })
      .catch((error) => {
        console.error("Error fetching wisata list:", error);
      });

    axios
      .get(`http://localhost:5000/daerah/${daerahId}`) // API untuk mendapatkan data daerah berdasarkan daerah_id
      .then((response) => {
        setDaerahName(response.data.name); // Misalkan nama daerah disimpan di kolom "name"
      })
      .catch((error) => {
        console.error("Error fetching daerah name:", error);
      });
  }, [daerahId]);

  return (
    <section className="mt-5 sm:mt-14 mx-7 md:mt-10 md:mx-10 lg:mx-14 lg:mt-24">
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold md:text-4xl text-hitam">
          Eksplor Daerah Wisata {daerahName}
        </h1>
      </div>

      {/* Grid untuk tampilan besar (desktop) */}
      <div className="md:flex lg:justify-between lg:p-1 lg:mt-14">
        <div className="hidden md:hidden lg:grid lg:grid-cols-3 lg:justify-between lg:w-full lg:gap-3">
          {/* {daerah.map((daerahItem) => (
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
            ))} */}

          {wisataList.map((wisata) => (
            <Link
              key={wisata.id}
              to={`/wisata/detail/${wisata.id}`} // Mengarahkan ke halaman detail wisata berdasarkan id wisata
            >
              <CardAktivitas
                title={wisata.name}
                description={wisata.description}
                image={`http://localhost:5000/images/${wisata.image}`}
                price={wisata.price}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Carousel untuk tampilan mobile */}
      <div className="carousel carousel-center max-w-full py-2 px-2 lg:hidden">
        <div className="carousel-item gap-3">
          {wisataList.map((wisata, index) => (
            <CardAktivitas
              key={index}
              title={wisata.name}
              description={wisata.description}
              image={`http://localhost:5000/images/${wisata.image}`}
              price={wisata.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DaerahDetail;
