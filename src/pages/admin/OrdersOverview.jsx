// /* eslint-disable react-hooks/exhaustive-deps */

// import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// const OrderOverviewData = () => {
//   const [startDate, setStartDate] = useState(dayjs().subtract(1, "month")); // Default 1 bulan lalu
//   const [endDate, setEndDate] = useState(dayjs()); // Default hari ini
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [successTransactions, setSuccessTransactions] = useState(0);
//   const [pendingTransactions, setPendingTransactions] = useState(0);
//   const [failedTransactions, setFailedTransactions] = useState(0);

//   const calculatePercentage = (count, total) => {
//     return total ? ((count / total) * 100).toFixed(2) : 0;
//   };

//   // Fetch data transaksi berdasarkan rentang tanggal
//   const fetchSalesData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/cultivo/api/total/sales",
//         {
//           params: {
//             startDate: startDate.format("YYYY-MM-DD"),
//             endDate: endDate.format("YYYY-MM-DD"),
//           },
//         }
//       );

//       if (response.data.success) {
//         const {
//           total_transactions,
//           success_transactions,
//           pending_transactions,
//           failed_transactions,
//         } = response.data;

//         setTotalOrders(total_transactions);
//         setSuccessTransactions(success_transactions);
//         setPendingTransactions(pending_transactions);
//         setFailedTransactions(failed_transactions);

//         setTotalSales(response.data.total_sales || 0);
//       } else {
//         setTotalSales(0);
//         setTotalOrders(0);
//         setSuccessTransactions(0);
//         setPendingTransactions(0);
//         setFailedTransactions(0);
//       }
//     } catch (error) {
//       console.error("Error fetching sales data", error);
//     }
//   };

//   // Effect untuk memanggil fetch data saat mount dan ketika tanggal berubah
//   useEffect(() => {
//     fetchSalesData(); // Fetch data ketika komponen pertama kali dimuat atau tanggal berubah
//   }, [startDate, endDate]);

//   return {
//     startDate,
//     endDate,
//     setStartDate,
//     setEndDate,
//     totalSales,
//     totalOrders,
//   };
// };

// export default OrderOverviewData;
