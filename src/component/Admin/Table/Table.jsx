import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
const Table = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await instance.get("/all/transactions");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div className="w-full border shadow-md  rounded-lg">
      <table className="w-[300px] mx-auto  rounded-lg min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
              <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                Transaksi Terakhir
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          {transactions.map((transaction) => (
            <tr key={transaction.order_id}>
              <td className="p-4 border-t border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                    {transaction.order_id}
                  </p>
                </div>
              </td>
              <td className="p-4 border-t border-blue-gray-50">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                  {transaction.amount}
                </p>
              </td>

              <td className="p-4 border-t border-blue-gray-50">
                <div className="w-max">
                  <div
                    className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md 
    ${
      transaction.status === "pending" ? "bg-orange-500/20 text-orange-900" : ""
    }
    ${transaction.status === "failed" ? "bg-red-500/20 text-red-900" : ""}
    ${transaction.status === "success" ? "bg-green-500/20 text-green-900" : ""}
  `}
                    style={{ opacity: 1 }}
                  >
                    <span>{transaction.status}</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          {/* Repeat similar structure for other rows */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
