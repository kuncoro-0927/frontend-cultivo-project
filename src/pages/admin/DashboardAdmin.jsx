import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section className="bg-gray-50 pt-28">
      <div className="mx-10">
        <h1 className="text-2xl font-medium">
          Halo {user?.name}, Senang<br></br> Melihat Anda Kembali
        </h1>
        <div className="flex items-center space-x-6 mt-8">
          <div className="bg-red-200 w-72 h-36 rounded-2xl px-5 py-7">
            <p className="font-extrabold">IDR 1.450.000</p>
            <p className="text-sm">Total Penjualan</p>
            <p className="text-xs mt-5 text-gray-500">+300.000 hari ini</p>
          </div>
          <div className="bg-red-200 w-72 h-36 rounded-2xl px-5 py-7">
            <p className="font-extrabold">IDR 1.450.000</p>
            <p className="text-sm">Total Penjualan</p>
            <p className="text-xs mt-5 text-gray-500">+300.000 hari ini</p>
          </div>
          <div className="bg-red-200 w-72 h-36 rounded-2xl px-5 py-7">
            <p className="font-extrabold">IDR 1.450.000</p>
            <p className="text-sm">Total Penjualan</p>
            <p className="text-xs mt-5 text-gray-500">+300.000 hari ini</p>
          </div>
          <div className="bg-red-200 w-72 h-36 rounded-2xl px-5 py-7">
            <p className="font-extrabold">IDR 1.450.000</p>
            <p className="text-sm">Total Penjualan</p>
            <p className="text-xs mt-5 text-gray-500">+300.000 hari ini</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
