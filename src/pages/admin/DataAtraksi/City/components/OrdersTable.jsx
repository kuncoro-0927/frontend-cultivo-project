import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";

const OrdersTable = ({ orders }) => {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="rounded-full w-full bg-blue-50 font-bold px-3 my-3 flex items-center justify-between">
          <div className="w-[150px] border-blue-gray-100 bg-blue-gray-50/50 p-4">
            Id Order
          </div>
          <div className="border-blue-gray-100 w-[200px] max-w-xl bg-blue-gray-50/50 p-4">
            Nama
          </div>
        </div>
      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div className="rounded-full w-full border border-gray-200 px-3 shadow-md my-2 flex items-center justify-between">
              <div className="p-4">{order.name}</div>
              <img
                src={order.url}
                alt="Spotify"
                className="w-11 h-11 object-cover rounded-md bg-red-200 bg-blue-gray-50/50"
              />
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