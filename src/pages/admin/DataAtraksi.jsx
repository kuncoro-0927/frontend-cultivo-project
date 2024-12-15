import { useState } from "react";
import WisataTable from "../../component/Admin/Table/WisataTable";
//import zs from "../../component/Admin/Modal/TambahWisata";
import CreateAgrotourismModal from "../../component/Admin/Modal/CreateAgrotourism";
const DataAtraksi = () => {
  const [activeTab, setActiveTab] = useState("wisata");

  const renderContent = () => {
    switch (activeTab) {
      case "wisata":
        return <WisataTable />;
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
              <CreateAgrotourismModal className="mb-5" />
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
          {activeTab === "wisata" && (
            <CreateAgrotourismModal className="mb-5" />
          )}
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
