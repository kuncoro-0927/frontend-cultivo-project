import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import OrderStatusBadge from "./OrderStatusBadge";

const OrdersTable = ({ orders }) => {
  return (
    <div className="rounded-lg min-w-max table-auto text-left">
      <div>
        <div className="flex items-center">
          <div className="rounded-full bg-blue-50 font-bold px-3 my-3 flex items-center justify-between">
            <div className="w-[150px] border-blue-gray-100 bg-blue-gray-50/50 p-4">Id Order</div>
            <div className="border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">Nama</div>
            <div className="border-blue-gray-100 w-[250px] max-w-xl bg-blue-gray-50/50 p-4">Email</div>
            <div className="border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">Wisata</div>
            <div className="border-blue-gray-100 w-[70px] max-w-xl bg-blue-gray-50/50 p-4">Tiket</div>
            <div className="border-blue-gray-100 w-[90px] max-w-xl bg-blue-gray-50/50 p-4">Harga</div>
            <div className="w-[110px] max-w-xl bg-blue-gray-50/50 p-4">Status</div>
            <div className="border-blue-gray-100 w-[100px] mr-0 bg-blue-gray-50/50 p-4">Aksi</div>
          </div>
        </div>
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.order_id} className="flex items-center justify-between">
              <div className="rounded-full border border-gray-200 px-3 shadow-md my-2 flex items-center justify-between">
                <div className="p-4 w-[150px] max-w-xl">{order.order_id}</div>
                <div className="p-4 w-[200px] max-w-xl">{order.user_name}</div>
                <div className="p-4 w-[250px] max-w-xl text-blue-500 font-semibold underline">
                  {order.email}
                </div>
                <div className="p-4 w-[200px] max-w-xl">{order.agrotourism_name}</div>
                <div className="p-4 w-[70px] max-w-xl">{order.quantity}</div>
                <div className="p-4 w-[90px] max-w-xl">{order.total_price}</div>
                <div className="p-4 w-[110px] max-w-xl">
                  <OrderStatusBadge status={order.status} />
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
    </div>
  );
};

export default OrdersTable;
