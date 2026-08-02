import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
import useSalesData from "../../../Sales";
import useTodaySalesData from "../../../TodaySales";

const ROWS_PER_PAGE = 10;

export function useOrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { totalSales, totalOrders, totalSuccess } = useSalesData();
  const { totalTodaySales, totalTotalOrders, totalTodaySuccess } = useTodaySalesData();

  useEffect(() => {
    instance
      .get("/all/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.user_name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);

  const handlePageChange = (page) => setCurrentPage(page);

  const formatNumber = (number) => parseFloat(number).toLocaleString("id-ID");

  return {
    loading,
    error,
    search,
    setSearch,
    currentPage,
    currentOrders,
    totalPages,
    handlePageChange,
    formatNumber,
    totalSales,
    totalOrders,
    totalSuccess,
    totalTodaySales,
    totalTotalOrders,
    totalTodaySuccess,
  };
}
