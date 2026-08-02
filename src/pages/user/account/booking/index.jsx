import SidebarAccount from "../../../../component/SidebarAccount";
import TicketCard from "./components/TicketCard";
import EmptyBookings from "./components/EmptyBookings";
import { useBookings } from "./hooks/useBookings";

const Booking = () => {
  const { tickets, loading } = useBookings();

  if (loading) return <p>Loading tickets...</p>;

  return (
    <section className="flex 2xl:mx-32">
      {/* Sidebar */}
      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>

      <div className="mt-20 md:p-8 mx-4 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl mb-5">
          Pesanan Anda
        </h1>
        <span className="font-bold border-b-4 py-2 border-blue-400">
          Tiket Anda
        </span>

        {tickets.length === 0 ? (
          <EmptyBookings />
        ) : (
          tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        )}
      </div>
    </section>
  );
};

export default Booking;
