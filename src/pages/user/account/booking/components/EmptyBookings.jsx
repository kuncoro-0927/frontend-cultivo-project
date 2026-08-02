import { Link } from "react-router-dom";

const EmptyBookings = () => {
  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <p className="text-hitam text-xl lg:text-2xl font-extrabold">
        Anda belum memiliki pesanan
      </p>
      <img className="w-40 mt-7" src="/images/agenda.png" alt="Agenda" />
      <p className="text-center mt-5 font-medium">
        Petualangan Anda berikutnya menanti.
        <br /> Temukan bersama kami!
      </p>
      <Link
        to="/seluruhwisata"
        className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-2 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
      >
        Eksplor
      </Link>
    </div>
  );
};

export default EmptyBookings;
