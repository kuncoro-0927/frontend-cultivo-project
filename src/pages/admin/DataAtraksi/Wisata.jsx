/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import useSalesData from "../Sales";
import useTodaySalesData from "../TodaySales";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { CiMapPin, CiCamera } from "react-icons/ci";
import TambahWisata from "../../../component/Admin/Modal/TambahWisata";
import EditWisata from "../../../component/Admin/Modal/EditWisata";
import DeleteButton from "../../../component/Admin/Modal/DeleteAgrotourism";
import { LuMountain } from "react-icons/lu";
const Wisata = () => {
  const [totalCounts, setTotalCounts] = useState({
    total_agrotourism: 0,
    total_activity: 0,
    total_city: 0,
  });
  const [totalAgrotourism, setTotalAgrotourism] = useState(null);
  const [agrotourism, setAgrotourism] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // State untuk filter pencarian
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [selectedWisata, setSelectedWisata] = useState(null); // State untuk ID wisata yang dipilih
  const handleEditWisata = (wisataId) => {
    // Set selectedWisata untuk membuka modal edit dengan ID wisata
    setSelectedWisata(wisataId);
    // Buka modal edit
    setIsModalOpen(true);
  };

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Jumlah baris per halaman

  const { totalSales, totalOrders, totalSuccess } = useSalesData();
  const { totalTodaySales, totalTotalOrders, totalTodaySuccess } =
    useTodaySalesData();
  // useEffect(() => {
  //   // Mengambil data dari API
  //   instance
  //     .get("/agrotourism")
  //     .then((response) => {
  //       setAgrotourism(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("Failed to load orders");
  //       setLoading(false);
  //     });
  // }, []);

  const fetchWisataList = async () => {
    try {
      const response = await instance.get("/agrotourism");
      setAgrotourism(response.data.data);
    } catch (error) {
      console.error("Gagal memuat daftar wisata:", error);
    }
  };
  const handleDeleteSuccess = () => {
    fetchWisataList(); // Refresh data setelah berhasil hapus
  };

  useEffect(() => {
    fetchWisataList();
  }, []);

  useEffect(() => {
    // Memanggil API untuk mendapatkan data total counts
    const fetchTotalCounts = async () => {
      try {
        const response = await instance.get("/total/agrotourism"); // Sesuaikan URL API
        setTotalCounts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchTotalCounts();
  }, []);
  // Filter data berdasarkan pencarian
  const filteredOrders = agrotourism.filter((agrotourism) =>
    agrotourism.name.toLowerCase().includes(search.toLowerCase())
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

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  return (
    <>
      <section className="mx-7 flex mt-32 items-center gap-5">
        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-md text-blue-600 text-base font-extrabold">
              {" "}
              <LuMountain />
            </div>
            <p className="font-semibold">Total Wisata</p>
          </div>
          <p className="font-extrabold text-xl mt-3">
            {totalCounts.total_agrotourism}
          </p>

          <p className="text-xs font-bold mt-5 text-blue-600">+ hari ini</p>
        </div>

        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-red-100 p-2 rounded-md text-red-600 text-base font-extrabold">
              {" "}
              <CiMapPin />
            </div>
            <p className="font-semibold">Total Daerah</p>
          </div>
          <p className="font-extrabold text-xl mt-3">
            {totalCounts.total_city}
          </p>

          <p className="text-xs font-bold mt-5 text-red-600">+ hari ini</p>
        </div>

        <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
          <div className="text-sm flex items-center gap-4">
            <div className="bg-orange-100 p-2 rounded-md text-orange-600 text-base font-extrabold">
              {" "}
              <CiCamera />
            </div>
            <p className="font-semibold">Total Aktivitas</p>
          </div>
          <p className="font-extrabold text-xl mt-3">
            {totalCounts.total_activity}
          </p>

          <p className="text-xs font-bold mt-5 text-orange-600">+ hari ini</p>
        </div>

        <div className="ml-auto ">
          {/* <button
            onClick={handleOpenModal}
            className="ml-auto px-3 py-3 mr-5 lg:mt-5 mb-5 bg-blue-500 rounded-full text-white flex justify-center hover:-translate-y-1 duration-300"
          >
            <TambahWisata />
          </button> */}
          <TambahWisata
            className=""
            open={isModalOpen}
            handleClose={handleCloseModal}
          />
          {selectedWisata && (
            <EditWisata
              open={isModalOpen}
              handleClose={handleCloseModal}
              wisataId={selectedWisata} // Pass the selected wisata ID to modal
            />
          )}
          <div className="mr-5">
            {/* Input Search */}
            <input
              type="text"
              placeholder="Cari Data Wisata"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <p className="text-xs mt-1 text-gray-500 text-end">
              Filter Wisata berdasarkan nama
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
                  <div className=" w-[200px] border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Nama Wisata
                  </div>
                  <div className="border-blue-gray-100 w-[110px] max-w-xl bg-blue-gray-50/50 p-4">
                    Kota
                  </div>
                  <div className="border-blue-gray-100 w-[130px] max-w-xl bg-blue-gray-50/50 p-4">
                    Aktivitas
                  </div>
                  <div className=" border-blue-gray-100 w-[100px] max-w-xl bg-blue-gray-50/50 p-4">
                    Tiket
                  </div>
                  <div className=" border-blue-gray-100 w-[270px] max-w-xl bg-blue-gray-50/50 p-4">
                    Alamat
                  </div>
                  <div className=" border-blue-gray-100 w-[130px] max-w-xl bg-blue-gray-50/50 p-4">
                    Include
                  </div>
                  <div className=" border-blue-gray-100 w-[130px] max-w-xl bg-blue-gray-50/50 p-4">
                    Exclude
                  </div>
                  <div className=" border-blue-gray-100 w-[100px] mr-0 bg-blue-gray-50/50 p-4">
                    Aksi
                  </div>
                </div>
              </div>
            </div>
            <div>
              {currentOrders.length > 0 ? (
                currentOrders.map((agro) => (
                  <div
                    key={agro.id}
                    className="flex items-center justify-between " // Menambahkan garis batas bawah antar baris
                  >
                    <div className="rounded-full border border-gray-200 px-3 shadow-md my-2 flex items-center justify-between  ">
                      <div className="p-4   w-[200px] max-w-xl">
                        {agro.name}
                      </div>
                      {/* description=
                      {truncateDescriptionByChar(
                        agrotourismItem.description,
                        70
                      )} */}
                      <div className=" p-4  w-[110px] max-w-xl">
                        {agro.city_name}
                      </div>
                      <div className="p-4 w-[130px] max-w-xl  ">
                        {agro.activity_name}
                      </div>
                      <div className="p-4  w-[100px] max-w-xl ">
                        {agro.price}
                      </div>
                      <div className="p-4  w-[270px] max-w-xl ">
                        {truncateDescriptionByChar(agro.address, 30)}
                      </div>
                      <div className="p-4  w-[130px] max-w-xl ">
                        {truncateDescriptionByChar(agro.include, 10)}
                      </div>
                      <div className="p-4  w-[130px] max-w-xl ">
                        {truncateDescriptionByChar(agro.exclude, 10)}
                      </div>
                      <div className="p-4 text-base flex items-center gap-2 ">
                        <MdRemoveRedEye />
                        {/* <EditWisata />
                        <MdEdit
                          onClick={() => handleEditWisata(agro.id)} // Memanggil fungsi edit
                          className="cursor-pointer"
                        /> */}
                        <button
                          className="hover:text-blue-500"
                          onClick={() => handleEditWisata(agro.id)} // Set ID wisata yang dipilih
                        >
                          <MdEdit />
                        </button>

                        <DeleteButton
                          wisataId={agro.id}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
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

export default Wisata;
