import { useState } from "react";
import { LuMountain } from "react-icons/lu";
import { CiMapPin, CiCamera } from "react-icons/ci";

import useWisataData from "./hooks/useWisataData";
import StatCard from "../../../../component/StatCard";
import PaginationControls from "../../../../component/PaginationControls";
import ActionBar from "./components/ActionBar";
import WisataTable from "./components/WisataTable";

const Wisata = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWisata, setSelectedWisata] = useState(null);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleEditWisata = (wisataId) => {
    setSelectedWisata(wisataId);
    setIsModalOpen(true);
  };

  const {
    totalCounts,
    search,
    setSearch,
    currentOrders,
    currentPage,
    totalPages,
    handlePageChange,
    handleDeleteSuccess,
  } = useWisataData();

  return (
    <>
      <section className="mx-7 flex mt-32 items-center gap-5">
        <StatCard
          icon={<LuMountain />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Total Wisata"
          value={totalCounts.total_agrotourism}
          todayLabel="+ hari ini"
          todayColor="text-blue-600"
        />
        <StatCard
          icon={<CiMapPin />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          label="Total Daerah"
          value={totalCounts.total_city}
          todayLabel="+ hari ini"
          todayColor="text-red-600"
        />
        <StatCard
          icon={<CiCamera />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          label="Total Aktivitas"
          value={totalCounts.total_activity}
          todayLabel="+ hari ini"
          todayColor="text-orange-600"
        />

        <ActionBar
          search={search}
          setSearch={setSearch}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          selectedWisata={selectedWisata}
        />
      </section>

      <section className="mx-7 mt-10">
        <div className="text-sm mb-20 overflow-x-auto rounded-lg">
          <div className="rounded-lg min-w-max table-auto text-left">
            <WisataTable
              items={currentOrders}
              onEdit={handleEditWisata}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Wisata;