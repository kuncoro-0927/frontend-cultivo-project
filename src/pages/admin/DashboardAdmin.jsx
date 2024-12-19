/* eslint-disable no-unused-vars */
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Table from "../../component/Admin/Table/Table";
import TableOrderDashboard from "../../component/Admin/Table/TableOrderDashboard";
import ProgressBar from "../../component/Admin/Progress/OrdersOverview";
import { useState } from "react";
import TopAgrotourism from "../../component/Admin/Table/TopAgrotourism";
import TopUsers from "../../component/Admin/Table/TopUsers";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { LuMountain } from "react-icons/lu";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useSalesData from "./Sales";
import useTodaySalesData from "./TodaySales";
import { IoWalletOutline } from "react-icons/io5";
import { instance } from "../../utils/axios";
const Dashboard = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [totalAgrotourism, setTotalAgrotourism] = useState(null);
  const {
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
  } = useSalesData();

  const { totalTodaySales, totalTotalOrders } = useTodaySalesData();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await instance.get("/total/amount");
        console.log(response.data);
        setTotalAmount(response.data.totalAmount);
      } catch (err) {
        setError("Gagal memuat total amount");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);
  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };

  useEffect(() => {
    // Fungsi untuk mendapatkan jumlah total agrotourism
    const fetchTotalAgrotourism = async () => {
      try {
        const response = await instance.get("/total/agrotourism"); // Ganti dengan URL API sesuai dengan route kamu
        setTotalAgrotourism(response.data.total_agrotourism);
      } catch (error) {
        console.error("Error fetching total agrotourism:", error);
      }
    };

    fetchTotalAgrotourism();
  }, []);
  return (
    <>
      <div className="flex">
        <section className=" w-[900px] mt-24 mx-10 mb-20">
          <div className="shadow-md flex items-center justify-between rounded-md py-8 px-5 mb-5">
            <div className="w-72">
              <p className="font-extrabold text-2xl">
                IDR {formatNumber(totalAmount)}
              </p>
              <p className="text-sm font-medium">Total saldo</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  slotProps={{
                    textField: {
                      sx: {
                        width: "200px",
                        // Ukuran lebar datepicker
                        fontSize: "12px", // Ukuran font label dan input
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  slotProps={{
                    textField: {
                      sx: {
                        width: "200px", // Ukuran lebar datepicker
                        fontSize: "12px", // Ukuran font label dan input
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex items-center space-x-6">
            <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
              <div className="text-sm flex items-center gap-4">
                <div className="bg-orange-100 p-2 rounded-md text-orange-600 text-base font-extrabold">
                  {" "}
                  <IoPricetagsOutline />
                </div>
                <p className="font-semibold">Total Penjualan</p>
              </div>
              <p className="font-extrabold text-xl mt-3">
                IDR {formatNumber(totalSales)}
              </p>

              <p className="text-xs font-bold mt-5 text-orange-600">
                + IDR {formatNumber(totalTodaySales)} hari ini
              </p>
            </div>
            <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
              <div className="text-sm flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-md text-green-600 text-base font-extrabold">
                  {" "}
                  <IoCartOutline />
                </div>
                <p className="font-semibold">Total Pesanan</p>
              </div>
              <p className="font-extrabold text-xl mt-3">{totalOrders}</p>

              <p className="text-xs font-bold mt-5 text-green-600">
                +{totalTotalOrders} hari ini
              </p>
            </div>

            <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
              <div className="text-sm flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-md text-blue-600 text-base font-extrabold">
                  {" "}
                  <LuMountain />
                </div>
                <p className="font-semibold">Total Wisata</p>
              </div>
              <p className="font-extrabold text-xl mt-3">{totalAgrotourism}</p>

              <p className="text-xs font-bold mt-5 text-blue-600">
                Terus tingkatkan!
              </p>
            </div>
          </div>

          <div className="flex mt-10  mb-10">
            <div
              className="relative w-[400px]  rounded-2xl shadow-md overflow-hidden"
              style={{
                backgroundImage: `url("/public/images/hasri.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Elemen gradien dan blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* Konten di atas blur */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-bold text-lg">Halo, Hasri!</p>
                <p className="text-sm">Admin Cultivo</p>
                {/* <div className="mt-2 text-lg font-extrabold">Admin Cultivo</div> */}
              </div>
            </div>

            <div className="ml-7">
              {" "}
              <Table />
            </div>
          </div>
          <div>
            <TableOrderDashboard />
          </div>
        </section>

        <section className="mt-24 w-full mr-10">
          <div className="shadow-md rounded-xl  p-4">
            <h1 className="text-sm font-bold mb-3">Data Status Pesanan</h1>
            <div className="">
              <div className="text-xs flex mb-1 justify-between">
                <span>Berhasil</span>
                <span className="font-bold">{totalSuccess}</span>
              </div>
              <ProgressBar percentage={successPercentage} />
              <div className="text-xs mt-3 mb-1 flex justify-between">
                <span>Pending</span>
                <span className="font-bold">{totalPending}</span>
              </div>
              <ProgressBar percentage={pendingPercentage} />
              <div className="text-xs mt-3 mb-1 flex justify-between">
                <span>Gagal</span>
                <span className="font-bold">{totalFailed}</span>
              </div>
              <ProgressBar percentage={failedPercentage} />
            </div>
          </div>

          <div className="mb-5 mt-5">
            <TopAgrotourism />
            {/* <TopUsers /> */}
          </div>
          <div>
            <TopUsers />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
