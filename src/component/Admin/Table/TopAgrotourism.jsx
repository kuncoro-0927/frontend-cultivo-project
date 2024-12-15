import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
const TopAgrotourism = () => {
  const [topAgrotourism, setTopAgrotourism] = useState([]);

  useEffect(() => {
    instance
      .get("/top/agrotourism")
      .then((response) => {
        setTopAgrotourism(response.data.data); // Set array langsung
      })
      .catch((error) =>
        console.error("Error fetching top agrotourism:", error)
      );
  }, []);

  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };

  return (
    <>
      <div className="w-full border shadow-md  rounded-lg">
        <table className="w-full mb-3 rounded-lg min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Wisata Teratas
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {topAgrotourism.map((agro) => (
              <tr key={agro.agrotourism_id}>
                <td className="p-4 border-t border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={agro.agrotourism_image}
                      alt="Spotify"
                      className=" w-11 h-11 object-cover rounded-md bg-red-200 bg-blue-gray-50/50 "
                    />
                    <div>
                      <p className="block antialiased font-bold text-sm leading-normal text-blue-gray-900">
                        {agro.agrotourism_name}
                      </p>
                      <div className="flex items-center gap-5">
                        <p className="text-xs underline">{agro.city_name}</p>

                        <p className="text-xs">
                          <span className="text-blue-500">Transaksi</span>
                          <span className=" ml-3 font-medium">
                            #{agro.total_transactions}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-extrabold">
                    IDR: {formatNumber(agro.total_amount)}
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

export default TopAgrotourism;
