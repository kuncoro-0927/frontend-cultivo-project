import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
const useDaerahData = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    instance
      .get("/daerah")
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return {
    loading,
    error,
    search,
    setSearch,
    currentOrders,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useDaerahData;