/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
const TableOrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Mengambil data dari API
    instance
      .get("/last/orders") // Sesuaikan dengan URL API backend
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options); // Format: Januari 16, 2025
  };

  return (
    <>
      <div className="w-full border shadow-md  rounded-lg">
        <table className="w-full rounded-lg min-w-max table-auto text-left">
          <thead>
            <tr className="p-4">
              <th className="block antialiased p-4 font-sans text-base text-blue-gray-900 font-bold leading-none opacity-70">
                Orderan Terakhir
              </th>
            </tr>
            <tr>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Id Order
                </p>
              </th>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Nama
                </p>
              </th>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Wisata
                </p>
              </th>
              {/* <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Tanggal
                </p>
              </th> */}
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Jumlah Tiket
                </p>
              </th>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Total Harga
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="p-4 border-t border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                      {order.order_id}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {order.user_name}
                  </p>
                </td>
                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {order.agrotourism_name}
                  </p>
                </td>
                {/* <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {formatDate(order.selected_date)}
                  </p>
                </td> */}
                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {order.quantity}
                  </p>
                </td>
                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {order.total_price}
                  </p>
                </td>
              </tr>
            ))}
            {/* Repeat similar structure for other rows */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableOrderDashboard;
