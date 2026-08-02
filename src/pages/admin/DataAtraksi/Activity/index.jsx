import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import OrdersToolbar from "./components/OrdersToolbar";
import OrdersTable from "./components/OrdersTable";
import { useOrdersDashboard } from "./hooks/useOrdersDashboard";
import StatCard from "../../../../component/StatCard";
import PaginationControls from "../../../../component/PaginationControls";

const Aktivitas = () => {
  const {
    search,
    setSearch,
    currentPage,
    currentOrders,
    totalPages,
    handlePageChange,
    formatNumber,
    totalSales,
    totalOrders,
    totalSuccess,
    totalTodaySales,
    totalTotalOrders,
    totalTodaySuccess,
  } = useOrdersDashboard();

  return (
    <>
      <section className="mx-7 flex mt-32 items-center gap-5">
        <StatCard
          icon={<IoCartOutline />}
          iconBgClass="bg-green-100 text-green-600"
          label="Total Pesanan"
          value={totalOrders}
          deltaText={`+${totalTotalOrders} hari ini`}
          deltaColorClass="text-green-600"
        />

        <StatCard
          icon={<IoPricetagsOutline />}
          iconBgClass="bg-orange-100 text-orange-600"
          label="Total Penjualan"
          value={`IDR ${formatNumber(totalSales)}`}
          deltaText={`+ IDR ${formatNumber(totalTodaySales)} hari ini`}
          deltaColorClass="text-orange-600"
        />

        <StatCard
          icon={<GrTransaction />}
          iconBgClass="bg-blue-100 text-blue-600"
          label="Transaksi Berhasil"
          value={totalSuccess}
          deltaText={`+ ${totalTodaySuccess} hari ini`}
          deltaColorClass="text-blue-600"
        />

        <OrdersToolbar search={search} onSearchChange={setSearch} />
      </section>

      <section className="mx-7 mt-10">
        <div className="text-sm mb-20 overflow-x-auto rounded-lg">
          <OrdersTable orders={currentOrders} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Aktivitas;
