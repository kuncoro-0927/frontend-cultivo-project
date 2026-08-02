import TambahWisata from "../../../../component/Admin/Modal/TambahWisata";

const ActionBar = ({ search, setSearch }) => {
  return (
    <div className="ml-auto">
      <div className="ml-auto">
        <TambahWisata />
      </div>
      <div className="mr-5">
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
  );
};

export default ActionBar;
