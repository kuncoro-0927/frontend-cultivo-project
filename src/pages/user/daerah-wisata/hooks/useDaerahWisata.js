import { useState, useEffect } from "react";
import { instance } from "../../../../utils/axios";
import { useWishlist } from "../../../../contexts/WishlistsContext";
import { showSnackbar } from "../../../../component/CustomSnackbar";
import { useAuth } from "../../../../contexts/AuthContext";

export const useDaerahWisata = () => {
  const [agrotourism, setAgrotourism] = useState([]);
  const [city, setDaerah] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const [selectedAgrotourism, setSelectedAgrotourism] = useState(null);

  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
  };

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

  const toggleWishlist = async (agrotourismId) => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isInWishlist(agrotourismId)) {
        await instance.delete(`/delete/wishlist/${agrotourismId}`);
        const updatedWishlist = wishlist.filter(
          (item) => item.agrotourism_id !== agrotourismId
        );
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wisata dihapus dari favorit", "success");
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
        showSnackbar("Wisata ditambahkan ke favorit", "success");
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

  useEffect(() => {
    getDaerah();
  }, []);

  useEffect(() => {
    getAgrotourism();
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  return {
    agrotourism,
    city,
    isModalOpen,
    isModalSearchOpen,
    selectedAgrotourism,
    isInWishlist,
    toggleWishlist,
    handleOpenModalSearch,
    handleCloseModalSearch,
    handleSelectAgrotourism,
    handleCloseModal,
    truncateDescriptionByChar,
  };
};
