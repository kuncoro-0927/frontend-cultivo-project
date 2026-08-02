import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlistActions } from "./useWishlistActions";
import { instance } from "../../utils/axios";

export function useCategoryWisataPage(activitySlug) {
  const { daerahId } = useParams();

  const [cityName, setCityName] = useState("");
  const [agrotourism, setAgrotourism] = useState([]);
  const [wisataList, setWisataList] = useState([]);

  const [agrotourismData, setAgrotourismData] = useState([]);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null); 

  const wishlistActions = useWishlistActions();

  const handleOpenModalSearch = () => setModalSearchOpen(true);
  const handleCloseModalSearch = () => setModalSearchOpen(false);

  const handleSelectAgrotourism = (agrotourism) => {
    setSelectedAgrotourism(agrotourism);
    setModalSearchOpen(false);
  };

  useEffect(() => {
    instance
      .get(`/agrotourism`)
      .then((response) => {
        const data = response.data.data;

        if (Array.isArray(data)) {
          const filteredWisata = data.filter(
            (item) => item.city_id === parseInt(daerahId)
          );
          const updatedWisata = filteredWisata.map((wisata) => ({
            ...wisata,
            average_rating: parseFloat(wisata.average_rating) || 0,
          }));
          setWisataList(updatedWisata);

          const city = data.find((item) => item.city_id === parseInt(daerahId));
          if (city) setCityName(city.city_name);
        } else {
          console.error("Data dari /agrotourism tidak berupa array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching wisata list:", error);
      });
  }, [daerahId]);

  useEffect(() => {
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

    getAgrotourism();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/agrotourism/activity/${activitySlug}`);
        setAgrotourismData(response.data);
      } catch (error) {
        console.error(`Gagal mengambil data activity: ${activitySlug}`, error);
      }
    };

    fetchData();
  }, [activitySlug]);

  return {
    cityName,
    agrotourism,
    wisataList,
    agrotourismData,
    isModalSearchOpen,
    selectedAgrotourism,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    ...wishlistActions,
  };
}
