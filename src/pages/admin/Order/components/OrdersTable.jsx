import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";

const columns = [
  { label: "ID Pesanan", width: "w-[150px]" },
  { label: "Nama", width: "w-[200px]" },
  { label: "Email", width: "w-[250px]" },
  { label: "Wisata", width: "w-[200px]" },
  { label: "Tiket", width: "w-[70px]" },
  { label: "Harga", width: "w-[90px]" },
  { label: "Status", width: "w-[110px]" },
  { label: "Aksi", width: "w-[100px] mr-0" },
];

const statusStyle = {
  pending: "bg-blue-500/20 text-blue-900",
  failed: "bg-red-500/20 text-red-900",
  success: "bg-green-500/20 text-green-900",
};

const OrdersTable = ({ orders }) => {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="rounded-full bg-blue-50 font-bold px-3 my-3 flex items-center justify-between">
          {columns.map((col) => (
            <div
              key={col.label}
              className={`${col.width} border-blue-gray-100 bg-blue-gray-50/50 p-4`}
            >
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="flex items-center justify-between"
          >
            <div className="rounded-full px-3 shadow-md my-2 flex items-center justify-between">
              <div className="p-4 w-[150px] max-w-xl">{order.order_id}</div>
              <div className="p-4 w-[200px] max-w-xl">{order.user_name}</div>
              <div className="p-4 w-[250px] max-w-xl text-blue-500 font-semibold underline">
                {order.email}
              </div>
              <div className="p-4 w-[200px] max-w-xl">
                {order.agrotourism_name}
              </div>
              <div className="p-4 w-[70px] max-w-xl">{order.quantity}</div>
              <div className="p-4 w-[90px] max-w-xl">{order.total_price}</div>
              <div className="p-4 w-[110px] max-w-xl">
                <div className="w-max">
                  <div
                    className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md ${
                      statusStyle[order.status] || ""
                    }`}
                  >
                    <span>{order.status}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 text-base flex items-center gap-2">
                <MdRemoveRedEye />
                <MdEdit />
                <MdDelete />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center">No matching records found.</div>
      )}
    </div>
  );
};

export default OrdersTable;
