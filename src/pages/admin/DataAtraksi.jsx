import { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import TambahWisata from "../../component/Admin/Modal/TambahWisata";

const DataAtraksi = () => {
  const [activeTab, setActiveTab] = useState("wisata"); // Tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "wisata":
        return (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Kota</th>
                  <th>Aktivitas</th>
                  <th>Harga</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Telaga Madiredo</td>
                  <td>Malang</td>
                  <td>-</td>
                  <td>15.000</td>
                  <td>Malang, Jawa Timur</td>
                  <td className="flex items-center space-x-3 text-lg">
                    <button>
                      <BiDetail />
                    </button>
                    <button>
                      <FiEdit />
                    </button>
                    <button>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "aktivitas":
        return <div>Data Aktivitas</div>;
      case "daerah":
        return <div>Data Daerah</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-28 mx-7">
        <h1 className="text-3xl font-extrabold mb-4">Kelola Data Atraksi</h1>

        <div className="flex mb-7 mt-10 justify-between">
          <div>
            <button
              className={`py-2 px-4 mr-3 ${
                activeTab === "wisata"
                  ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base "
                  : "text-hitam border border-gray-400 py-2 px-3 font-medium md:text-sm lg:text-base rounded-full"
              }`}
              onClick={() => setActiveTab("wisata")}
            >
              Wisata
            </button>
            <button
              className={`py-2 px-4 mr-3 ${
                activeTab === "aktivitas"
                  ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base "
                  : "text-hitam border border-gray-400 py-2 px-3 font-medium md:text-sm lg:text-base rounded-full"
              }`}
              onClick={() => setActiveTab("aktivitas")}
            >
              Aktivitas
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "daerah"
                  ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base "
                  : "text-hitam border border-gray-400 py-2 px-3 font-medium md:text-sm lg:text-base rounded-full"
              }`}
              onClick={() => setActiveTab("daerah")}
            >
              Daerah
            </button>
          </div>
          {activeTab === "wisata" && <TambahWisata className="mb-5" />}
          {activeTab === "daerah" && (
            <button className="mb-5">Tambah Data Daerah</button>
          )}
          {activeTab === "aktivitas" && (
            <button className="mb-5">Tambah Data Aktivitas</button>
          )}
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DataAtraksi;
