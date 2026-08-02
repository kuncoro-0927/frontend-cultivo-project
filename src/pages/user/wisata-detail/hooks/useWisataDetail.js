import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";
export const useWisataDetail = (wisataId) => {
  const [wisataDetail, setWisataDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wisataResponse = await instance.get(`/agrotourism/${wisataId}`);
        setWisataDetail(wisataResponse.data.data[0]);

        const reviewResponse = await instance.get(
          `/review/agrotourism/${wisataId}`
        );
        setReviews(reviewResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data wisata atau review.");
      }
    };

    fetchData();
  }, [wisataId]);

  return { wisataDetail, reviews, error };
};
