import TambahWisata from "../../../../../component/Admin/Modal/TambahWisata";
import EditWisata from "../../../../../component/Admin/Modal/EditWisata";

const ActionBar = ({ search, setSearch, isModalOpen, handleCloseModal, selectedWisata }) => {
  return (
    <div className="ml-auto">
      <TambahWisata open={isModalOpen} handleClose={handleCloseModal} />

      {selectedWisata && (
        <EditWisata
          open={isModalOpen}
          handleClose={handleCloseModal}
          wisataId={selectedWisata}
        />
      )}

      <div className="mr-5">
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
  );
};

export default ActionBar;