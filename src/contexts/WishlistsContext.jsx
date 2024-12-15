/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../utils/axios";

const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil wishlist pengguna setelah login atau saat aplikasi dimuat
    const fetchWishlist = async () => {
      try {
        const response = await instance.get("/get/wishlist");
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []); // Hanya sekali saat komponen pertama kali dimuat

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
