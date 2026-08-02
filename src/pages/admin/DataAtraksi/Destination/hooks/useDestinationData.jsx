import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios"; // sesuaikan depth path

const useWisataData = () => {
  const [totalCounts, setTotalCounts] = useState({
    total_agrotourism: 0,
    total_activity: 0,
    total_city: 0,
  });
  const [agrotourism, setAgrotourism] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchWisataList = async () => {
    try {
      const response = await instance.get("/agrotourism");
      setAgrotourism(response.data.data);
    } catch (error) {
      console.error("Gagal memuat daftar wisata:", error);
    }
  };

  useEffect(() => {
    fetchWisataList();
  }, []);

  useEffect(() => {
    const fetchTotalCounts = async () => {
      try {
        const response = await instance.get("/total/agrotourism");
        setTotalCounts(response.data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchTotalCounts();
  }, []);

  const handleDeleteSuccess = () => {
    fetchWisataList();
  };

  const filteredOrders = agrotourism.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return {
    totalCounts,
    loading,
    error,
    search,
    setSearch,
    currentOrders,
    currentPage,
    totalPages,
    handlePageChange,
    handleDeleteSuccess,
  };
};

export default useWisataData;