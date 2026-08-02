const OrderSummaryCard = ({ orderDetail }) => {
  if (!orderDetail) {
    return <p>Order not found.</p>;
  }

  return (
    <div>
      <h2 className="font-extrabold text-2xl">Detail Pesanan</h2>
      <p className="text-sm mt-1">Pastikan pesananmu sudah sesuai, ya!</p>
      <p className="font-bold text-lg mt-5">{orderDetail.wisata_name}</p>

      <div className="border-b border-gray-400 my-6"></div>
      <div className="flex items-center mt-5 justify-between">
        <p className="font-normal">Tanggal </p>
        <p className="font-bold">
          {new Date(orderDetail.selected_date).toLocaleDateString()}
        </p>
      </div>

      <div className="border-b border-gray-400 my-6"></div>
      <div className="flex items-center mt-5 justify-between">
        <p>Total tiket</p>
        <p>
          {orderDetail.quantity} x {orderDetail.wisata_price}
        </p>
      </div>

      <div className="border-b border-gray-400 my-6"></div>
      <div className="flex items-center mt-5 justify-between">
        <p className="font-bold">Total harga</p>
        <p className="font-bold">
          IDR {orderDetail.total_price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
