const OrdersToolbar = ({ search, onSearchChange }) => {
  return (
    <div className="ml-auto">
      <button className="ml-auto px-3 py-3 mr-5 lg:mt-5 mb-5 bg-blue-500 rounded-full text-white flex justify-center hover:-translate-y-1 duration-300">
        + Buat Pesanan
      </button>
      <div className="mr-5">
        <input
          type="text"
          placeholder="Cari Data Pesanan"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <p className="text-xs mt-1 text-gray-500 text-end">
          Filter pesanan berdasarkan nama
        </p>
      </div>
    </div>
  );
};

export default OrdersToolbar;
