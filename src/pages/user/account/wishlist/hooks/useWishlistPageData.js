import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
export function useWishlistPageData() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      const response = await instance.get("/get/wishlist");
      setWishlistData(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return { wishlistData, loading };
}
