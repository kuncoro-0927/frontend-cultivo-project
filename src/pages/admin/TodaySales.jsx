import { useState, useEffect } from "react";
import { instance } from "../../utils/axios";
const useTodaySalesData = () => {
  const [totalTodaySales, setTotalSales] = useState(0);
  const [totalTotalOrders, setTotalOrders] = useState(0);
  const [totalTodaySuccess, setTotalSuccess] = useState(0);

  const fetchTodaySalesData = async () => {
    try {
      const response = await instance.get("/total/today/sales");

      if (response.data.success) {
        setTotalSales(response.data.total_sales || 0); // Jika tidak ada penjualan, set ke 0
        setTotalOrders(response.data.total_orders || 0);
        setTotalSuccess(response.data.total_success || 0);
      } else {
        setTotalSales(0);
        setTotalOrders(0);
        setTotalSuccess(0);
      }
    } catch (error) {
      console.error("Error fetching today's sales and order data", error);
    }
  };

  useEffect(() => {
    fetchTodaySalesData(); // Fetch data saat pertama kali load
  }, []);

  return {
    totalTodaySales,
    totalTotalOrders,
    totalTodaySuccess,
  };
};

export default useTodaySalesData;
