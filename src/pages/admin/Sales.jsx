/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { instance } from "../../utils/axios";
const useSalesData = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "week"));
  const [endDate, setEndDate] = useState(dayjs());
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);

  const fetchSalesData = async (start = startDate, end = endDate) => {
    try {
      const response = await instance.get("/total/sales", {
        params: {
          startDate: start.format("YYYY-MM-DD"),
          endDate: end.format("YYYY-MM-DD"),
        },
      });
      if (response.data.success) {
        setTotalSales(response.data.total_sales || 0);
        setTotalOrders(response.data.total_orders || 0);
        setTotalSuccess(response.data.total_success || 0);
        setTotalPending(response.data.total_pending || 0);
        setTotalFailed(response.data.total_failed || 0);
      } else {
        setTotalSales(0);
        setTotalOrders(0);
        setTotalSuccess(0);
        setTotalPending(0);
        setTotalFailed(0);
      }
    } catch (error) {
      console.error("Error fetching sales and order data", error);
    }
  };

  const calculatePercentage = (statusCount, totalOrders) => {
    return totalOrders ? ((statusCount / totalOrders) * 100).toFixed(2) : 0;
  };

  const successPercentage = calculatePercentage(totalSuccess, totalOrders);
  const pendingPercentage = calculatePercentage(totalPending, totalOrders);
  const failedPercentage = calculatePercentage(totalFailed, totalOrders);

  useEffect(() => {
    fetchSalesData();
  }, [startDate, endDate]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    totalSales,
    totalOrders,
    totalSuccess,
    totalPending,
    totalFailed,
    successPercentage,
    pendingPercentage,
    failedPercentage,
  };
};

export default useSalesData;
