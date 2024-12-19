/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// // import { TextField } from "@mui/material";

// import dayjs from "dayjs";
// import axios from "axios";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// const Sales = () => {
//   // State untuk menyimpan tanggal mulai dan akhir
//   const [startDate, setStartDate] = useState(dayjs().subtract(1, "month")); // Default 1 bulan lalu
//   const [endDate, setEndDate] = useState(dayjs()); // Default hari ini
//   const [totalSales, setTotalSales] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);

//   // Fungsi untuk menangani filter berdasarkan tanggal
//   const handleFilter = async () => {
//     try {
//       // Gunakan tanggal default jika pengguna belum memilih tanggal
//       const start = startDate || dayjs().subtract(1, "month");
//       const end = endDate || dayjs();

//       // Mengirimkan tanggal yang dipilih ke backend
//       const response = await axios.get(
//         "http://localhost:5000/cultivo/api/total/sales",
//         {
//           params: {
//             startDate: start.format("YYYY-MM-DD"), // format ke YYYY-MM-DD
//             endDate: end.format("YYYY-MM-DD"),
//           },
//         }
//       );
//       if (response.data.success) {
//         setTotalSales(response.data.total_sales);
//         setTotalOrders(response.data.total_orders); // Menyimpan total orders
//       } else {
//         setTotalSales(0); // Jika tidak ada total penjualan
//         setTotalOrders(0); // Jika tidak ada total order
//       }
//     } catch (error) {
//       console.error("Error fetching sales and order data", error);
//     }
//   };

//   // Efek untuk memanggil handleFilter setiap kali tanggal berubah atau saat pertama kali di-load
//   useEffect(() => {
//     handleFilter(); // Menjalankan filter
//   }, [startDate, endDate]); // Memanggil filter jika tanggal berubah

//   return (
//     <div className="mt-52">
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Start Date"
//           value={startDate}
//           onChange={(newDate) => setStartDate(newDate)}
//         />

//         {/* DatePicker untuk tanggal akhir */}

//         <DatePicker
//           label="End Date"
//           value={endDate}
//           onChange={(newDate) => setEndDate(newDate)}
//         />

//         {/* Menampilkan total penjualan dan total order */}
//         <div style={{ marginTop: "16px" }}>
//           <h3>Total Sales: {totalSales}</h3>
//           <h3>Total Orders: {totalOrders}</h3>
//         </div>
//       </LocalizationProvider>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker label="Tanggal" />
//         </DemoContainer>
//       </LocalizationProvider>
//     </div>
//   );
// };

// export default Sales;
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const useSalesData = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "week")); // Default 1 bulan lalu
  const [endDate, setEndDate] = useState(dayjs()); // Default hari ini
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);

  const fetchSalesData = async (start = startDate, end = endDate) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/cultivo/api/total/sales",
        {
          params: {
            startDate: start.format("YYYY-MM-DD"),
            endDate: end.format("YYYY-MM-DD"),
          },
        }
      );
      if (response.data.success) {
        setTotalSales(response.data.total_sales || 0); // Jika tidak ada penjualan, set ke 0
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

  // Menghitung persentase
  const calculatePercentage = (statusCount, totalOrders) => {
    return totalOrders
      ? ((statusCount / totalOrders) * 100).toFixed(2) // Menghitung persentase dan membatasi dua angka desimal
      : 0;
  };

  // Menyusun persentase berdasarkan status
  const successPercentage = calculatePercentage(totalSuccess, totalOrders);
  const pendingPercentage = calculatePercentage(totalPending, totalOrders);
  const failedPercentage = calculatePercentage(totalFailed, totalOrders);

  useEffect(() => {
    fetchSalesData(); // Fetch data on mount and when dates change
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
