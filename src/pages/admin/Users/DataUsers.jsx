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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { CiUser } from "react-icons/ci";
import { LuUserCheck } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
const DataUsers = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVerifiedUsers: 0,
    totalGoogleUsers: 0,
  });
  const [users, setUsers] = useState([]);

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
      .get("/all/user")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  // Filter data berdasarkan pencarian
  const filteredOrders = Array.isArray(users)
    ? users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

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

  useEffect(() => {
    // Mengambil data statistik dari backend
    const fetchUserStats = async () => {
      try {
        const response = await instance.get("/stats/user");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);
  return (
    <>
      <section className="mx-7 flex mt-32 items-end gap-5">
        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-md text-green-600 text-base font-extrabold">
              {" "}
              <CiUser />
            </div>
            <p className="font-semibold">Pengguna</p>
          </div>
          <p className="font-extrabold text-xl mt-3">{stats.totalUsers}</p>

          <p className="text-xs font-bold mt-5 text-green-600">
            Total seluruh pengguna
          </p>
        </div>

        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-orange-100 p-2 rounded-md text-orange-600 text-base font-extrabold">
              {" "}
              <LuUserCheck />
            </div>
            <p className="font-semibold">Verifikasi</p>
          </div>
          <p className="font-extrabold text-xl mt-3">
            {stats.totalVerifiedUsers}
          </p>

          <p className="text-xs font-bold mt-5 text-orange-600">
            Pengguna sudah terverifikasi
          </p>
        </div>

        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-md text-blue-600 text-base font-extrabold">
              {" "}
              <FaGoogle />
            </div>
            <p className="font-semibold">Google</p>
          </div>
          <p className="font-extrabold text-xl mt-3">
            {stats.totalGoogleUsers}
          </p>

          <p className="text-xs font-bold mt-5 text-blue-600">
            Dengan akun Google
          </p>
        </div>

        <div className="ml-auto ">
          <div className="">
            <TambahWisata />
          </div>
          <div className="mr-5">
            {/* Input Search */}
            <input
              type="text"
              placeholder="Cari Data Users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <p className="text-xs mt-1 text-gray-500 text-end">
              Filter Users berdasarkan nama
            </p>
          </div>
        </div>
      </section>
      <section className="mx-7 mt-10">
        <div className=" text-sm mb-20 overflow-x-auto rounded-lg">
          <div className=" rounded-lg min-w-max table-auto text-left">
            <div className="">
              <div className="flex items-center">
                <div className="rounded-full  bg-blue-50 font-bold px-3 my-3 flex items-center justify-between  ">
                  <div className=" w-[150px] border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Nama
                  </div>
                  <div className=" border-blue-gray-100 w-[150px] max-w-xl bg-blue-gray-50/50 p-4">
                    Nama Depan
                  </div>
                  <div className=" border-blue-gray-100  w-[150px] max-w-xl bg-blue-gray-50/50 p-4">
                    Nama Belakang
                  </div>
                  <div className=" border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">
                    Email
                  </div>
                  <div className="border-blue-gray-100 w-[160px] max-w-xl bg-blue-gray-50/50 p-4">
                    Telepon
                  </div>
                  <div className=" border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">
                    Google ID
                  </div>
                  <div className=" w-[70px] max-w-xl bg-blue-gray-50/50 p-4">
                    Verify
                  </div>
                  <div className=" border-blue-gray-100 w-[100px] mr-0 bg-blue-gray-50/50 p-4">
                    Aksi
                  </div>
                </div>
              </div>
            </div>
            <div>
              {currentOrders.length > 0 ? (
                currentOrders.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between " // Menambahkan garis batas bawah antar baris
                  >
                    <div className="rounded-full  px-3 shadow-md my-2 flex items-center justify-between  ">
                      <div className="p-4  w-[150px] max-w-xl">{user.name}</div>

                      <div className=" p-4 w-[150px] max-w-xl">
                        {user.firstname}
                      </div>
                      <div className="p-4 w-[150px] max-w-xl  text-blue-500 font-semibold underline ">
                        {user.lastname}
                      </div>
                      <div className="p-4 w-[200px] max-w-xl ">
                        {user.email}
                      </div>
                      <div className="p-4 w-[160px] max-w-xl ">
                        {user.phonenumber}
                      </div>
                      <div className="p-4 w-[200px] max-w-xl ">
                        {user.google_id}
                      </div>
                      <div className="p-4 w-[70px] max-w-xl ">
                        {user.isverified === 1 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
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

export default DataUsers;
