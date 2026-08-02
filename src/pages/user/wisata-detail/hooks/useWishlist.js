import { useEffect } from "react";
import { instance } from "../../../../utils/axios";
import { useWishlist as useWishlistContext } from "../../../../contexts/WishlistsContext";
import { showSnackbar } from "../../../../component/CustomSnackbar";

export const useWishlist = (isLoggedIn, onRequireLogin) => {
  const { wishlist, setWishlist } = useWishlistContext();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  const isInWishlist = (agrotourismId) =>
    wishlist.some((item) => item.agrotourism_id === agrotourismId);

  const toggleWishlist = async (agrotourismId) => {
    if (!isLoggedIn) {
      onRequireLogin?.();
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

  return { isInWishlist, toggleWishlist };
};
