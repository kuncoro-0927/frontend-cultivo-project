import useSalesData from "../Sales";
import useTodaySalesData from "../TodaySales";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";

import useDaerahData from "./hooks/useDaerahData";
import { formatNumber } from "./utils/formatNumber";
import StatCard from "../../../../component/StatCard";
import ActionBar from "./components/ActionBar";
import OrdersTable from "./components/OrdersTable";
import PaginationControls from "../../../../component/PaginationControls";

const Daerah = () => {
  const { totalSales, totalOrders, totalSuccess } = useSalesData();
  const { totalTodaySales, totalTotalOrders, totalTodaySuccess } = useTodaySalesData();

  const {
    search,
    setSearch,
    currentOrders,
    currentPage,
    totalPages,
    handlePageChange,
  } = useDaerahData();

  return (
    <>
      <section className="mx-7 flex mt-32 items-center gap-5">
        <StatCard
          icon={<IoCartOutline />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Total Pesanan"
          value={totalOrders}
          todayLabel={`+${totalTotalOrders} hari ini`}
          todayColor="text-green-600"
        />
        <StatCard
          icon={<IoPricetagsOutline />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          label="Total Penjualan"
          value={`IDR ${formatNumber(totalSales)}`}
          todayLabel={`+ IDR ${formatNumber(totalTodaySales)} hari ini`}
          todayColor="text-orange-600"
        />
        <StatCard
          icon={<GrTransaction />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          label="Transaksi Berhasil"
          value={totalSuccess}
          todayLabel={`+ ${totalTodaySuccess} hari ini`}
          todayColor="text-blue-600"
        />
        <ActionBar search={search} setSearch={setSearch} />
      </section>

      <section className="mx-7 mt-10">
        <div className="w-[900px] mx-auto text-sm mb-20 overflow-x-auto rounded-lg">
          <div className="rounded-lg min-w-max table-auto text-left">
            <OrdersTable orders={currentOrders} />
          </div>
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

export default Daerah;