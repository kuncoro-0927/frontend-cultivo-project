import { useEffect, useState } from "react";
import { instance } from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";
import { useWishlist } from "../../contexts/WishlistsContext";
import { showSnackbar } from "../../component/CustomSnackbar";

export function useWishlistActions() {
  const { isLoggedIn } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  const isInWishlist = (agrotourismId) => {
    return wishlist.some((item) => item.agrotourism_id === agrotourismId);
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
        await instance.post("/add/wishlist", { agrotourism_id: agrotourismId });
        const updatedWishlist = [...wishlist, { agrotourism_id: agrotourismId }];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        showSnackbar("Wisata ditambahkan ke favorit", "success");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return {
    wishlist,
    isModalOpen,
    isInWishlist,
    toggleWishlist,
    handleCloseModal,
  };
}
