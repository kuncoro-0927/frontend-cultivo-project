/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import useSalesData from "../Sales";
import useTodaySalesData from "../TodaySales";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { Link } from "react-router-dom";
import TambahWisata from "../../../component/Admin/Modal/TambahWisata";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // State untuk filter pencarian

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Jumlah baris per halaman

  const { totalSales, totalOrders, totalSuccess } = useSalesData();
  const { totalTodaySales, totalTotalOrders, totalTodaySuccess } =
    useTodaySalesData();
  useEffect(() => {
    // Mengambil data dari API
    instance
      .get("/all/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  // Filter data berdasarkan pencarian
  const filteredOrders = orders.filter((order) =>
    order.user_name.toLowerCase().includes(search.toLowerCase())
  );

  // Hitung data untuk halaman saat ini
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };
  return (
    <>
      <section className="mx-7 flex mt-32 items-center gap-5">
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
            <div className="bg-blue-100 p-2 rounded-md text-blue-600 text-base font-extrabold">
              {" "}
              <GrTransaction />
            </div>
            <p className="font-semibold">Transaksi Berhasil</p>
          </div>
          <p className="font-extrabold text-xl mt-3">{totalSuccess}</p>

          <p className="text-xs font-bold mt-5 text-blue-600">
            + {totalTodaySuccess} hari ini
          </p>
        </div>

        <div className="ml-auto ">
          <div className="mb-5 flex justify-end">
            <button className="ml-auto px-3 py-3 mr-5 lg:mt-5 mb-5 bg-blue-500 rounded-full text-white  hover:-translate-y-1 duration-300">
              <TambahWisata />
            </button>
          </div>
          <div className="mr-5">
            {/* Input Search */}
            <input
              type="text"
              placeholder="Cari Data Pesanan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <p className="text-xs mt-1 text-gray-500 text-end">
              Filter pesanan berdasarkan nama
            </p>
          </div>
        </div>
      </section>
      <section className="mx-7 mt-10">
        <div className=" text-sm mb-20 overflow-x-auto rounded-lg">
          <div className=" rounded-lg min-w-max table-auto text-left">
            <div className="">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-50 font-bold px-3 my-3 flex items-center justify-between  ">
                  <div className=" w-[150px] border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Id Order
                  </div>
                  <div className="border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">
                    Nama
                  </div>
                  <div className="border-blue-gray-100 w-[250px] max-w-xl bg-blue-gray-50/50 p-4">
                    Email
                  </div>
                  <div className=" border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">
                    Wisata
                  </div>
                  <div className=" border-blue-gray-100 w-[70px] max-w-xl bg-blue-gray-50/50 p-4">
                    Tiket
                  </div>
                  <div className=" border-blue-gray-100 w-[90px] max-w-xl bg-blue-gray-50/50 p-4">
                    Harga
                  </div>
                  <div className=" w-[110px] max-w-xl bg-blue-gray-50/50 p-4">
                    Status
                  </div>
                  <div className=" border-blue-gray-100 w-[100px] mr-0 bg-blue-gray-50/50 p-4">
                    Aksi
                  </div>
                </div>
              </div>
            </div>
            <div>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className="flex items-center justify-between " // Menambahkan garis batas bawah antar baris
                  >
                    <div className="rounded-full border border-gray-200 px-3 shadow-md my-2 flex items-center justify-between  ">
                      <div className="p-4  w-[150px] max-w-xl">
                        {order.order_id}
                      </div>

                      <div className=" p-4 w-[200px] max-w-xl">
                        {order.user_name}
                      </div>
                      <div className="p-4 w-[250px] max-w-xl  text-blue-500 font-semibold underline ">
                        {order.email}
                      </div>

                      <div className="p-4 w-[200px] max-w-xl ">
                        {order.agrotourism_name}
                      </div>
                      <div className="p-4 w-[70px] max-w-xl ">
                        {order.quantity}
                      </div>
                      <div className="p-4 w-[90px] max-w-xl ">
                        {order.total_price}
                      </div>
                      <div className="p-4 w-[110px] max-w-xl ">
                        <div className="w-max">
                          <div
                            className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md
                          ${
                            order.status === "pending"
                              ? "bg-blue-500/20 text-blue-900"
                              : ""
                          }
                          ${
                            order.status === "failed"
                              ? "bg-red-500/20 text-red-900"
                              : ""
                          }
                          ${
                            order.status === "success"
                              ? "bg-green-500/20 text-green-900"
                              : ""
                          }
                        `}
                          >
                            <span>{order.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 text-base flex items-center gap-2 ">
                        <MdRemoveRedEye />

                        <MdEdit />

                        <MdDelete />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div colSpan="5" className="p-4 text-center">
                    No matching records found.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-7 pb-5">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
