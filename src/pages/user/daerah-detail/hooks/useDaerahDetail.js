/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../../utils/axios";
import { useWishlist } from "../../../../contexts/WishlistsContext";
import { showSnackbar } from "../../../../component/CustomSnackbar";
import { useAuth } from "../../../../contexts/AuthContext";

export const useDaerahDetail = () => {
  const { daerahId } = useParams();
  const [cityName, setCityName] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [agrotourism, setAgrotourism] = useState([]);
  const [wisataList, setWisataList] = useState([]);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null);

  const handleOpenModalSearch = () => {
    setModalSearchOpen(true);
  };

  const handleCloseModalSearch = () => {
    setModalSearchOpen(false);
  };

  const handleSelectAgrotourism = (agrotourism) => {
    setSelectedAgrotourism(agrotourism);
    setModalSearchOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };

  const toggleWishlist = async (agrotourismId) => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isInWishlist(agrotourismId)) {
        await instance.delete(`/delete/wishlist/${agrotourismId}`);
        const updatedWishlist = wishlist.filter(
          (item) => item.agrotourism_id !== agrotourismId,
        );
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Berhasil dihapus dari favorit", "success");
      } else {
        await instance.post("/add/wishlist", {
          agrotourism_id: agrotourismId,
        });
        const updatedWishlist = [
          ...wishlist,
          { agrotourism_id: agrotourismId },
        ];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Berhasil ditambahkan ke favorit", "success");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    }
    return description.slice(0, charLimit) + "...";
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

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  useEffect(() => {
    instance
      .get(`/agrotourism`)
      .then((response) => {
        const agrotourismData = response.data.data;

        if (Array.isArray(agrotourismData)) {
          const filteredWisata = agrotourismData.filter(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId),
          );
          const updatedWisata = filteredWisata.map((wisata) => ({
            ...wisata,
            average_rating: parseFloat(wisata.average_rating) || 0,
          }));
          setWisataList(updatedWisata);

          const city = agrotourismData.find(
            (agrotourism) => agrotourism.city_id === parseInt(daerahId),
          );
          if (city) setCityName(city.city_name);
        } else {
          console.error(
            "Data dari /agrotourism tidak berupa array:",
            response.data,
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching wisata list:", error);
      });
  }, [daerahId]);

  useEffect(() => {
    getAgrotourism();
  }, []);

  useEffect(() => {
    instance
      .get(`/daerah`)
      .then((response) => {
        const dataDaerah = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        const selectedCity = dataDaerah.find(
          (daerahItem) => daerahItem.id === parseInt(daerahId),
        );
        if (selectedCity) {
          setCityName(selectedCity.name);
          setCityImage(selectedCity.url);
        }
      })
      .catch((error) => {
        console.error("Error fetching data daerah:", error);
      });
  }, [daerahId]);

  return {
    cityName,
    cityImage,
    agrotourism,
    wisataList,
    isModalOpen,
    isModalSearchOpen,
    isInWishlist,
    toggleWishlist,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    handleCloseModal,
    truncateDescriptionByChar,
  };
};
