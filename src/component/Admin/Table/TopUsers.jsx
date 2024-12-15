import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
const TopUsers = () => {
  const [topUser, setTopUser] = useState([]);

  useEffect(() => {
    instance
      .get("/top/user")
      .then((response) => {
        setTopUser(response.data.data); // Set array langsung
      })
      .catch((error) =>
        console.error("Error fetching top agrotourism:", error)
      );
  }, []);

  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };

  return (
    <div className="w-full border shadow-md  rounded-lg">
      <table className="w-full  rounded-lg min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
              <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                Pengguna Teratas
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          {topUser.map((user) => (
            <tr key={user.users_id}>
              <td className="p-4 border-y border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="block antialiased font-bold text-sm leading-normal text-blue-gray-900">
                      {user.user_name}
                    </p>
                    <div className="flex items-center gap-5">
                      <p className="text-xs text-blue-500">{user.user_email}</p>

                      <p className="text-xs">
                        <span className="underline">
                          Orders:{user.total_transactions}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              <td className="p-4 border-y border-blue-gray-50">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-extrabold">
                  IDR: {formatNumber(user.total_amount)}
                </p>
              </td>
            </tr>
          ))}

          {/* Repeat similar structure for other rows */}
        </tbody>
      </table>
    </div>
  );
};

export default TopUsers;
